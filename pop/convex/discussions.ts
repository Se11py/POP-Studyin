import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const listByLesson = query({
  args: { classId: v.string(), lessonId: v.string() },
  handler: async (ctx, args) => {
    const posts = await ctx.db
      .query("discussionPosts")
      .withIndex("by_lesson", (q) => q.eq("classId", args.classId).eq("lessonId", args.lessonId))
      .order("asc")
      .collect();

    return posts.filter((post) => !post.hidden);
  },
});

export const createPost = mutation({
  args: {
    classId: v.string(),
    lessonId: v.string(),
    body: v.string(),
    parentId: v.optional(v.id("discussionPosts")),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("You must be signed in to post.");

    const trimmed = args.body.trim();
    if (!trimmed) throw new Error("Post cannot be empty.");
    if (trimmed.length > 2000) throw new Error("Post is too long.");

    return ctx.db.insert("discussionPosts", {
      classId: args.classId,
      lessonId: args.lessonId,
      parentId: args.parentId,
      authorClerkId: identity.subject,
      authorName: identity.name ?? identity.email ?? "Student",
      body: trimmed,
    });
  },
});

/** Author self-delete, or a "report" from any signed-in user — both soft-hide the post. */
export const hidePost = mutation({
  args: { postId: v.id("discussionPosts") },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("You must be signed in to do that.");

    const post = await ctx.db.get(args.postId);
    if (!post) return;

    await ctx.db.patch(args.postId, { hidden: true });
  },
});
