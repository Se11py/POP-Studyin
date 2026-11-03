import { NextResponse } from "next/server";
import { after } from "next/server";
import { SeverityNumber } from "@opentelemetry/api-logs";
import { auth, currentUser } from "@clerk/nextjs/server";
import { loggerProvider, posthogLogsLogger } from "@/instrumentation";

const NOTION = "https://api.notion.com/v1";

async function notion(path: string, body: unknown, method = "POST") {
  const res = await fetch(`${NOTION}${path}`, {
    method,
    headers: {
      Authorization: `Bearer ${process.env.NOTION_API}`,
      "Notion-Version": "2022-06-28",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
  const json = await res.json();
  if (!res.ok) throw new Error(json.message ?? `Notion request failed (${res.status})`);
  return json;
}

const text = (value: string) => ({ rich_text: value ? [{ type: "text", text: { content: value } }] : [] });
// Notion select / multi-select option names can't contain commas
const option = (value: string) => ({ name: value.replace(/,/g, " ").slice(0, 100) });

/**
 * Adds or updates the signed-in student's row in the Notion "Pupils" table.
 * Values come from the Clerk user on the server, never from the request body.
 */
export async function POST() {
  const { userId } = await auth();
  if (!userId) return NextResponse.json({ success: false, error: "Not signed in" }, { status: 401 });

  const databaseId = process.env.NOTION_PUPILS_DB;
  if (!process.env.NOTION_API || !databaseId) {
    return NextResponse.json({ success: false, error: "Notion is not configured" }, { status: 500 });
  }

  try {
    const user = await currentUser();
    if (!user) return NextResponse.json({ success: false, error: "User not found" }, { status: 404 });

    const meta = (user.unsafeMetadata ?? {}) as Record<string, unknown>;
    const email = user.primaryEmailAddress?.emailAddress ?? null;
    const name = [user.firstName, user.lastName].filter(Boolean).join(" ") || email || "Unnamed";

    const properties: Record<string, unknown> = {
      Name: { title: [{ type: "text", text: { content: name } }] },
      Email: { email },
      Subjects: { multi_select: Array.isArray(meta.subjects) ? (meta.subjects as string[]).map(option) : [] },
      Instagram: text(typeof meta.instagram === "string" ? meta.instagram : ""),
      "Wants to contribute": { checkbox: meta.wantsToContribute === true },
      "Signed up": { date: { start: new Date(user.createdAt).toISOString() } },
      "Clerk ID": text(user.id),
    };
    if (typeof meta.yearGroup === "string" && meta.yearGroup) properties["Year group"] = { select: option(meta.yearGroup) };
    if (typeof meta.school === "string" && meta.school) properties.School = { select: option(meta.school) };

    // Upsert on Clerk ID so retries and edits never create duplicate rows
    const existing = await notion(`/databases/${databaseId}/query`, {
      filter: { property: "Clerk ID", rich_text: { equals: user.id } },
      page_size: 1,
    });

    if (existing.results?.length) {
      await notion(`/pages/${existing.results[0].id}`, { properties }, "PATCH");
    } else {
      await notion("/pages", { parent: { database_id: databaseId }, properties });
    }

    posthogLogsLogger?.emit({
      body: "Notion pupil sync completed",
      severityNumber: SeverityNumber.INFO,
      attributes: { operation: "notion_pupil_upsert", result: "success" },
    });
    after(async () => {
      await loggerProvider?.forceFlush();
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Notion pupil sync failed:", error);

    posthogLogsLogger?.emit({
      body: "Notion pupil sync failed",
      severityNumber: SeverityNumber.ERROR,
      attributes: { operation: "notion_pupil_upsert", result: "failure" },
    });
    after(async () => {
      await loggerProvider?.forceFlush();
    });

    return NextResponse.json({ success: false, error: "Failed to sync to Notion" }, { status: 502 });
  }
}
