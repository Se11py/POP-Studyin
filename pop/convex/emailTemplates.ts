/** Plain templates. Anything a student typed goes through esc() before it reaches HTML. */
export const esc = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

export const siteUrl = () => (process.env.SITE_URL ?? "").replace(/\/$/, "");

function layout(heading: string, bodyHtml: string, cta?: { href: string; label: string }) {
  return `<div style="font-family:Arial,Helvetica,sans-serif;max-width:520px;margin:0 auto;padding:24px;color:#111">
<h1 style="font-size:22px;margin:0 0 16px">${esc(heading)}</h1>
${bodyHtml}
${cta ? `<p style="margin:24px 0"><a href="${esc(cta.href)}" style="background:#1c3bff;color:#fff;padding:12px 20px;text-decoration:none;font-weight:bold;border-radius:4px">${esc(cta.label)}</a></p>` : ""}
<p style="font-size:12px;color:#666;margin-top:32px">POP Studying. You can change which emails you get on your profile page.</p></div>`;
}

export function welcome(name: string) {
  const first = name.split(" ")[0] || "there";
  const url = `${siteUrl()}/dashboard`;
  return {
    subject: "Welcome to POP Studying",
    html: layout(`Welcome, ${first}.`, `<p>Your profile is saved. Pick a subject and start revising.</p>`, { href: url, label: "Open your dashboard" }),
    text: `Welcome, ${first}.\n\nYour profile is saved. Pick a subject and start revising: ${url}`,
  };
}

export function reply(replier: string, reference: string | undefined, body: string, postId: string) {
  const url = `${siteUrl()}/discussion?post=${postId}`;
  const excerpt = body.length > 280 ? `${body.slice(0, 280)}…` : body;
  return {
    subject: `${replier} replied to your question${reference ? ` (${reference})` : ""}`,
    html: layout(`${replier} replied to your question`, `<blockquote style="margin:0;padding:12px 16px;background:#f4f4f0;white-space:pre-wrap">${esc(excerpt)}</blockquote>`, { href: url, label: "See the reply" }),
    text: `${replier} replied to your question:\n\n${excerpt}\n\n${url}`,
  };
}

export function applicationReceived(name: string) {
  const first = name.split(" ")[0] || "there";
  return {
    subject: "We got your contributor application",
    html: layout(`Thanks, ${first}.`, `<p>We review applications every week and will get back to you by email or Instagram.</p>`),
    text: `Thanks, ${first}.\n\nWe review applications every week and will get back to you by email or Instagram.`,
  };
}

export function applicationForStaff(a: { name: string; email?: string; yearGroup: string; instagram?: string; subjects: string[]; types: string[]; why: string; sample?: string }) {
  const rows = [
    ["Name", a.name], ["Email", a.email ?? "—"], ["Year", a.yearGroup], ["Instagram", a.instagram || "—"],
    ["Subjects", a.subjects.join(", ")], ["Contributing", a.types.join(", ")], ["Why", a.why], ["Sample", a.sample || "—"],
  ];
  return {
    subject: `New contributor application: ${a.name}`,
    html: layout("New contributor application", rows.map(([k, v]) => `<p style="margin:0 0 10px"><b>${esc(k)}</b><br>${esc(v)}</p>`).join("")),
    text: rows.map(([k, v]) => `${k}: ${v}`).join("\n"),
  };
}

export function examReminder(label: string, date: string, daysBefore: number) {
  const when = daysBefore === 1 ? "tomorrow" : `in ${daysBefore} days`;
  const url = `${siteUrl()}/dashboard`;
  return {
    subject: `${label} is ${when}`,
    html: layout(`${label} is ${when}`, `<p>${esc(label)} is on ${esc(date)}. A short session today is worth more than a long one the night before.</p>`, { href: url, label: "Revise now" }),
    text: `${label} is ${when} (${date}).\n\nRevise now: ${url}`,
  };
}
