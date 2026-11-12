import { mutation, query } from "./_generated/server";
import { v } from "convex/values";
import { internal } from "./_generated/api";
import { welcome } from "./emailTemplates";

const profileFields = {
  yearGroup: v.string(),
  school: v.string(),
  subjects: v.array(v.string()),
  instagram: v.string(),
  wantsToContribute: v.boolean(),
  onboardingCompleted: v.boolean(),
};

export const getCurrent = query({
  args: {},
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) return null;

    return ctx.db
      .query("users")
      .withIndex("by_clerkId", (query) => query.eq("clerkId", identity.subject))
      .unique();
  },
});

export const saveProfile = mutation({
  args: profileFields,
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("You must be signed in to save your profile.");

    const existingUser = await ctx.db
      .query("users")
      .withIndex("by_clerkId", (query) => query.eq("clerkId", identity.subject))
      .unique();

    const profile = {
      clerkId: identity.subject,
      email: identity.email,
      name: identity.name,
      ...args,
    };

    const userId = existingUser ? existingUser._id : await ctx.db.insert("users", profile);
    if (existingUser) await ctx.db.patch(existingUser._id, profile);

    // One welcome email, the first time a profile with an email address is saved
    if (identity.email && !existingUser?.welcomeSentAt) {
      await ctx.db.patch(userId, { welcomeSentAt: Date.now() });
      const mail = welcome(identity.name ?? "");
      await ctx.scheduler.runAfter(0, internal.emails.send, { to: identity.email, ...mail });
    }
    return userId;
  },
});

export const setEmailPrefs = mutation({
  args: { emailReplies: v.boolean(), emailReminders: v.boolean() },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("You must be signed in.");
    const user = await ctx.db.query("users").withIndex("by_clerkId", (q) => q.eq("clerkId", identity.subject)).unique();
    if (!user) throw new Error("Finish onboarding first.");
    await ctx.db.patch(user._id, args);
  },
});
