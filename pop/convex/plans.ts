import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const mine = query({
  args: {},
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) return null;
    return ctx.db.query("studyPlans").withIndex("by_clerkId", (q) => q.eq("clerkId", identity.subject)).first();
  },
});

export const save = mutation({
  args: {
    classId: v.string(),
    tier: v.optional(v.string()),
    targetGrade: v.string(),
    university: v.optional(v.string()),
    examDate: v.string(),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("You must be signed in.");
    if (!/^\d{4}-\d{2}-\d{2}$/.test(args.examDate)) throw new Error("Choose an exam date.");
    if (args.targetGrade.length > 4 || args.classId.length > 80) throw new Error("Invalid plan.");
    const university = args.university?.trim().slice(0, 80) || undefined;

    const doc = { clerkId: identity.subject, ...args, university };
    const existing = await ctx.db.query("studyPlans").withIndex("by_clerkId", (q) => q.eq("clerkId", identity.subject)).first();
    if (existing) {
      await ctx.db.replace(existing._id, doc);
      return existing._id;
    }
    return ctx.db.insert("studyPlans", doc);
  },
});

export const remove = mutation({
  args: {},
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("You must be signed in.");
    const existing = await ctx.db.query("studyPlans").withIndex("by_clerkId", (q) => q.eq("clerkId", identity.subject)).first();
    if (existing) await ctx.db.delete(existing._id);
  },
});
