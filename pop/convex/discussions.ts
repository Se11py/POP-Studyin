import { internalMutation, internalQuery, mutation, query } from "./_generated/server";
import { v } from "convex/values";
import type { Doc } from "./_generated/dataModel";
import { internal } from "./_generated/api";
import { reply as replyEmail } from "./emailTemplates";

/** Keep in step with the subject list on /discussion. */
const SUBJECT_IDS = ["physics", "chemistry", "biology", "maths", "alevel-physics", "alevel-maths", "tips", "examday"];

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
    reference: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("You must be signed in to post.");

    const reference = args.reference?.trim();
    if (reference && reference.length > 60) throw new Error("Reference is too long.");

    // Board threads are validated here; lesson discussions (any other classId) keep their old behaviour.
    let question: Doc<"discussionPosts"> | null = null;
    if (args.classId === "discussion") {
      if (!SUBJECT_IDS.includes(args.lessonId)) throw new Error("Choose a subject.");
      if (!reference) throw new Error("Add the paper question or topic.");
    } else if (args.classId === "discussion-replies") {
      const id = ctx.db.normalizeId("discussionPosts", args.lessonId);
      question = id ? await ctx.db.get(id) : null;
      if (!question || question.hidden || question.classId !== "discussion") throw new Error("That question isn't available.");
    }

    const trimmed = args.body.trim();
    if (!trimmed) throw new Error("Post cannot be empty.");
    if (trimmed.length > 2000) throw new Error("Post is too long.");

    // Slow spam down: at most 5 posts per student per minute
    const recent = await ctx.db
      .query("discussionPosts")
      .withIndex("by_author", (q) => q.eq("authorClerkId", identity.subject))
      .order("desc")
      .take(5);
    if (recent.length === 5 && Date.now() - recent[4]._creationTime < 60_000) {
      throw new Error("You're posting quickly. Wait a minute and try again.");
    }

    const postId = await ctx.db.insert("discussionPosts", {
      classId: args.classId,
      lessonId: args.lessonId,
      parentId: args.parentId,
      reference: reference || undefined,
      authorClerkId: identity.subject,
      // Never fall back to the email address: names are shown to every student.
      authorName: identity.name?.trim() || "Student",
      body: trimmed,
    });
    if (question) {
      await ctx.db.patch(question._id, { replyCount: (question.replyCount ?? 0) + 1 });
      if (question.authorClerkId !== identity.subject) {
        const asker = await ctx.db.query("users").withIndex("by_clerkId", (q) => q.eq("clerkId", question.authorClerkId)).unique();
        if (asker?.email && asker.emailReplies !== false) {
          const mail = replyEmail(identity.name?.trim() || "A student", question.reference, trimmed, question._id);
          await ctx.scheduler.runAfter(0, internal.emails.send, { to: asker.email, ...mail });
        }
      }
    }
    return postId;
  },
});

/** Only the author can delete their own post. Deleting a board reply also takes it off the question's reply count. */
export const hidePost = mutation({
  args: { postId: v.id("discussionPosts") },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("You must be signed in to do that.");

    const post = await ctx.db.get(args.postId);
    if (!post || post.hidden) return;
    if (post.authorClerkId !== identity.subject) throw new Error("You can only delete your own posts.");

    await ctx.db.patch(args.postId, { hidden: true });

    if (post.classId === "discussion-replies") {
      const qid = ctx.db.normalizeId("discussionPosts", post.lessonId);
      const question = qid ? await ctx.db.get(qid) : null;
      if (question) {
        await ctx.db.patch(question._id, {
          replyCount: Math.max(0, (question.replyCount ?? 1) - 1),
          // Deleting the accepted answer takes the accepted mark with it
          ...(question.acceptedReplyId === post._id ? { acceptedReplyId: undefined } : {}),
        });
      }
    }
  },
});

/** Any signed-in student can report a post. It stays visible until someone with moderation access decides. */
export const reportPost = mutation({
  args: { postId: v.id("discussionPosts") },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("You must be signed in to do that.");

    const post = await ctx.db.get(args.postId);
    if (!post || post.hidden) return;
    await ctx.db.patch(args.postId, { reported: true });
  },
});

/** The community feed on /discussion: top-level posts live under classId "discussion", lessonId = community id. */
export const listFeed = query({
  args: {},
  handler: async (ctx) => {
    const posts = await ctx.db
      .query("discussionPosts")
      .withIndex("by_lesson", (q) => q.eq("classId", "discussion"))
      .order("desc")
      .filter((q) => q.neq(q.field("hidden"), true))
      .take(200);

    return posts;
  },
});

/** The asker marks one reply as the answer. Only the person who asked can do this. */
export const acceptAnswer = mutation({
  args: { questionId: v.id("discussionPosts"), replyId: v.id("discussionPosts") },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("You must be signed in to do that.");

    const question = await ctx.db.get(args.questionId);
    if (!question || question.hidden || question.classId !== "discussion") throw new Error("Question not found.");
    if (question.authorClerkId !== identity.subject) throw new Error("Only the person who asked can accept an answer.");

    const reply = await ctx.db.get(args.replyId);
    if (!reply || reply.hidden || reply.classId !== "discussion-replies" || reply.lessonId !== args.questionId) {
      throw new Error("Reply not found.");
    }

    await ctx.db.patch(args.questionId, { acceptedReplyId: args.replyId });
  },
});

/** The asker takes the accepted mark back off. */
export const clearAccepted = mutation({
  args: { questionId: v.id("discussionPosts") },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("You must be signed in to do that.");

    const question = await ctx.db.get(args.questionId);
    if (!question || question.classId !== "discussion") throw new Error("Question not found.");
    if (question.authorClerkId !== identity.subject) throw new Error("Only the person who asked can change this.");

    await ctx.db.patch(args.questionId, { acceptedReplyId: undefined });
  },
});

/** For moderators, from the Convex dashboard or `npx convex run discussions:reportedPosts`. Not callable by students. */
export const reportedPosts = internalQuery({
  args: {},
  handler: async (ctx) => {
    const all = await ctx.db.query("discussionPosts").order("desc").take(500);
    return all.filter((p) => p.reported && !p.hidden).map((p) => ({ id: p._id, classId: p.classId, author: p.authorName, body: p.body, created: p._creationTime }));
  },
});

/** Moderator decision on a reported post: hide it, or clear the report. `npx convex run discussions:resolveReport '{"postId":"...","hide":true}'` */
export const resolveReport = internalMutation({
  args: { postId: v.id("discussionPosts"), hide: v.boolean() },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.postId, args.hide ? { hidden: true, reported: false } : { reported: false });
  },
});
