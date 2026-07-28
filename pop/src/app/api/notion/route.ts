import { NextResponse } from "next/server";

// Endpoint to simulate or trigger Notion API sync for approved revision notes
export async function GET() {
  return NextResponse.json({
    status: "ok",
    connected: true,
    workspace: "Science (Cambridge IGCSE 0654) & IGCSE Biology triple (0610)",
    notionPages: [
      { id: "398c036c-c898-8125-b30a-e1f971e712cb", title: "6.3 Biotechnology and Genetic Modification", lastSynced: "2026-07-20T10:14:15Z" },
      { id: "398c036c-c898-81a3-bf26-f7f15f1feeb6", title: "5.1 Reproduction", lastSynced: "2026-07-18T14:20:00Z" },
      { id: "398c036c-c898-81ca-87db-d3ff7ac25ad9", title: "6.1 Organisms and their Environment", lastSynced: "2026-07-15T11:05:00Z" },
      { id: "398c036c-c898-81e2-b168-fde11b3763d1", title: "6.2 Human Influences on Ecosystems", lastSynced: "2026-07-09T03:00:00Z" }
    ]
  });
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { topicId, title, content, author, proofreader, summary } = body;

    // Simulate calling Notion API PATCH block / update page
    console.log(`[Notion API Sync] Syncing approved topic "${title}" (ID: ${topicId})`);
    console.log(`[Notion API Sync] Author: ${author}, Proofread by: ${proofreader}`);
    console.log(`[Notion API Sync] Change Summary: ${summary}`);

    return NextResponse.json({
      success: true,
      message: `Successfully synced "${title}" to Notion API`,
      syncedAt: new Date().toISOString(),
      notionPageUrl: `https://app.notion.com/p/${encodeURIComponent(title.replace(/\s+/g, '-'))}`,
      auditLog: {
        topicId,
        author,
        proofreader,
        summary,
        timestamp: new Date().toISOString()
      }
    });
  } catch (error) {
    return NextResponse.json({ success: false, error: "Failed to sync to Notion API" }, { status: 500 });
  }
}
