import { internalAction } from "./_generated/server";
import { v } from "convex/values";

/**
 * Sends one email through Resend. Needs these in the Convex environment (not .env.local):
 *   RESEND_API_KEY   the key from resend.com
 *   EMAIL_FROM       e.g. "POP Studying <hello@yourdomain.com>" on a verified domain
 *   SITE_URL         e.g. https://popstudying.com, used for links in emails
 * If the key is missing the email is skipped and logged, so nothing else breaks.
 */
export const send = internalAction({
  args: { to: v.string(), subject: v.string(), html: v.string(), text: v.string() },
  handler: async (_ctx, args) => {
    const key = process.env.RESEND_API_KEY;
    const from = process.env.EMAIL_FROM;
    if (!key || !from) {
      console.warn("Email skipped: RESEND_API_KEY or EMAIL_FROM is not set in the Convex environment.");
      return;
    }
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
      body: JSON.stringify({ from, to: [args.to], subject: args.subject, html: args.html, text: args.text }),
    });
    if (!res.ok) console.error("Resend rejected an email:", res.status, await res.text());
  },
});
