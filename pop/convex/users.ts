import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

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

    if (existingUser) {
      await ctx.db.patch(existingUser._id, profile);
      return existingUser._id;
    }

    return ctx.db.insert("users", profile);
  },
});
