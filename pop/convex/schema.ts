import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  users: defineTable({
    clerkId: v.string(),
    email: v.optional(v.string()),
    name: v.optional(v.string()),
    yearGroup: v.optional(v.string()),
    school: v.optional(v.string()),
    subjects: v.optional(v.array(v.string())),
    instagram: v.optional(v.string()),
    wantsToContribute: v.optional(v.boolean()),
    onboardingCompleted: v.optional(v.boolean()),
    /** Email when someone replies to your question. On unless the student turns it off. */
    emailReplies: v.optional(v.boolean()),
    /** Exam reminder emails. Off unless the student turns it on. */
    emailReminders: v.optional(v.boolean()),
    welcomeSentAt: v.optional(v.number()),
  }).index("by_clerkId", ["clerkId"]),

  /** One plan per student. Topic ticks live in the study page's own per-browser store, not here. */
  studyPlans: defineTable({
    clerkId: v.string(),
    classId: v.string(),
    tier: v.optional(v.string()),
    targetGrade: v.string(),
    /** Free text, e.g. "Imperial, Physics". Shown only to the student. */
    university: v.optional(v.string()),
    /** YYYY-MM-DD, entered by the student */
    examDate: v.string(),
  }).index("by_clerkId", ["clerkId"]),

  contributorApplications: defineTable({
    clerkId: v.string(),
    name: v.string(),
    email: v.optional(v.string()),
    yearGroup: v.string(),
    instagram: v.optional(v.string()),
    subjects: v.array(v.string()),
    types: v.array(v.string()),
    why: v.string(),
    sample: v.optional(v.string()),
  }).index("by_clerkId", ["clerkId"]),

  /** Added by a maintainer with `npx convex run exams:add`. Nothing is shown or emailed that isn't in here. */
  examSessions: defineTable({
    label: v.string(),
    /** YYYY-MM-DD, Bangkok date */
    date: v.string(),
    /** Matches the subject names students pick at onboarding */
    subjects: v.array(v.string()),
  }).index("by_date", ["date"]),

  reminderSends: defineTable({
    userId: v.id("users"),
    examId: v.id("examSessions"),
    daysBefore: v.number(),
  }).index("by_user_exam", ["userId", "examId", "daysBefore"]),
  
  subjects: defineTable({
    slug: v.string(),
    name: v.string(),
    description: v.optional(v.string()),
  }).index("by_slug", ["slug"]),

  topics: defineTable({
    slug: v.string(),
    subjectSlug: v.string(),
    title: v.string(),
    description: v.optional(v.string()),
    orderIndex: v.number(),
  })
  .index("by_slug", ["slug"])
  .index("by_subject", ["subjectSlug", "orderIndex"]),

  contentSections: defineTable({
    topicSlug: v.string(),
    sectionId: v.string(),
    subheading: v.string(),
    content: v.any(), // representing JSONB
    orderIndex: v.number(),
  })
  .index("by_topic", ["topicSlug", "orderIndex"])
  .index("by_topic_and_section", ["topicSlug", "sectionId"]),

  discussionPosts: defineTable({
    classId: v.string(),
    lessonId: v.string(),
    parentId: v.optional(v.id("discussionPosts")),
    authorClerkId: v.string(),
    authorName: v.string(),
    body: v.string(),
    hidden: v.optional(v.boolean()),
    /** Feed questions only: the paper question or syllabus point, e.g. "P42 Q3(b)" or "1.6 Momentum". */
    reference: v.optional(v.string()),
    /** Feed questions only: the reply the asker accepted as the answer. */
    acceptedReplyId: v.optional(v.id("discussionPosts")),
    /** Feed questions only: how many visible replies it has, kept up to date as replies come and go. */
    replyCount: v.optional(v.number()),
    /** Set when another student reports the post. A moderator decides; reporting never hides it. */
    reported: v.optional(v.boolean()),
  })
  .index("by_lesson", ["classId", "lessonId"])
  .index("by_parent", ["parentId"])
  .index("by_author", ["authorClerkId"]),
});
