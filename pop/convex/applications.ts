import { mutation } from "./_generated/server";
import { v } from "convex/values";
import { internal } from "./_generated/api";
import { applicationForStaff, applicationReceived } from "./emailTemplates";

export const submit = mutation({
  args: {
    yearGroup: v.string(),
    instagram: v.optional(v.string()),
    subjects: v.array(v.string()),
    types: v.array(v.string()),
    why: v.string(),
    sample: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("You must be signed in to apply.");
    if (args.why.trim().length < 20 || args.why.length > 3000) throw new Error("Tell us a bit more about why.");
    if (args.subjects.length === 0 || args.types.length === 0) throw new Error("Choose a subject and a contribution type.");

    const existing = await ctx.db.query("contributorApplications").withIndex("by_clerkId", (q) => q.eq("clerkId", identity.subject)).first();
    if (existing && Date.now() - existing._creationTime < 24 * 3600_000) throw new Error("You've already applied. We'll be in touch.");

    const record = {
      clerkId: identity.subject,
      name: identity.name?.trim() || "Student",
      email: identity.email,
      ...args,
      why: args.why.trim(),
    };
    await ctx.db.insert("contributorApplications", record);

    if (identity.email) {
      await ctx.scheduler.runAfter(0, internal.emails.send, { to: identity.email, ...applicationReceived(record.name) });
    }
    const staff = process.env.CONTRIBUTOR_NOTIFY_EMAIL;
    if (staff) await ctx.scheduler.runAfter(0, internal.emails.send, { to: staff, ...applicationForStaff(record) });
  },
});
