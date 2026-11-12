import { internalMutation, query } from "./_generated/server";
import { v } from "convex/values";
import { internal } from "./_generated/api";
import { examReminder } from "./emailTemplates";

/** `npx convex run exams:add '{"label":"Physics Paper 4","date":"2027-05-12","subjects":["Physics"]}'` */
export const add = internalMutation({
  args: { label: v.string(), date: v.string(), subjects: v.array(v.string()) },
  handler: async (ctx, args) => {
    if (!/^\d{4}-\d{2}-\d{2}$/.test(args.date)) throw new Error("date must be YYYY-MM-DD");
    return ctx.db.insert("examSessions", args);
  },
});

/** Real exam dates only: the list is empty until a maintainer adds them. */
export const upcoming = query({
  args: {},
  handler: async (ctx) => ctx.db.query("examSessions").withIndex("by_date", (q) => q.gte("date", bangkokDate(0))).take(50),
});

const DAYS = [7, 1];

function bangkokDate(offsetDays: number) {
  return new Date(Date.now() + 7 * 3600_000 + offsetDays * 86_400_000).toISOString().slice(0, 10);
}

/** Runs daily from crons.ts. Emails opted-in students whose subjects match, once per exam and interval. */
export const sendDueReminders = internalMutation({
  args: {},
  handler: async (ctx) => {
    for (const days of DAYS) {
      const exams = await ctx.db.query("examSessions").withIndex("by_date", (q) => q.eq("date", bangkokDate(days))).collect();
      if (exams.length === 0) continue;
      const users = await ctx.db.query("users").collect();
      for (const exam of exams) {
        const wanted = exam.subjects.map((s) => s.toLowerCase());
        for (const user of users) {
          if (!user.email || user.emailReminders !== true) continue;
          if (!(user.subjects ?? []).some((s) => wanted.includes(s.toLowerCase()))) continue;
          const sent = await ctx.db.query("reminderSends").withIndex("by_user_exam", (q) => q.eq("userId", user._id).eq("examId", exam._id).eq("daysBefore", days)).first();
          if (sent) continue;
          await ctx.db.insert("reminderSends", { userId: user._id, examId: exam._id, daysBefore: days });
          await ctx.scheduler.runAfter(0, internal.emails.send, { to: user.email, ...examReminder(exam.label, exam.date, days) });
        }
      }
    }
  },
});
