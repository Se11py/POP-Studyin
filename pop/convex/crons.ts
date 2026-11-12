import { cronJobs } from "convex/server";
import { internal } from "./_generated/api";

const crons = cronJobs();
// 01:00 UTC = 08:00 in Bangkok
crons.daily("exam reminders", { hourUTC: 1, minuteUTC: 0 }, internal.exams.sendDueReminders);
export default crons;
