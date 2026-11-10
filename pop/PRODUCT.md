# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users
Secondary students in Bangkok, Thailand, revising for IGCSE and A-Level exams (Cambridge CIE and Edexcel) in Mathematics, Physics, Chemistry, Biology and Computer Science. They revise alone, often on a phone, in short sessions before a timed written exam.

## Product Purpose
POP Studying is a zero-distraction revision platform: interactive simulations, curriculum-aligned classes in three difficulty tiers, a mock exam simulator, a technical dictionary with flashcards, and notes imported from Notion. Success is a student who gets exam answers right, using the wording examiners reward.

## Positioning
Built around exam specifics (syllabus codes, paper and question references, mark-scheme wording) rather than generic study content.

## Operating Context
Students sign in with Clerk. Data lives in Convex. The discussion board lets signed-in students post and reply; posts are stored with the author's Clerk id and display name. Notes and class content are authored by contributors (/contribute).

## Capabilities and Constraints
- Discussion posts are stored in the `discussionPosts` Convex table. Feed posts use classId "discussion" with the community id as lessonId. Replies use classId "discussion-replies" with the post id as lessonId.
- Discussion is answered by students helping students. There is no teacher or staff role on the board. Decided: 2026-11-10.
- Undecided: moderation beyond soft-hide, who can mark an answer accepted (post author vs. any trusted student), and the paper and spec-point taxonomy.

## Evidence on Hand
- Real posts and replies from signed-in students in Convex (dev deployment `kindred-mastiff-975`). The board currently has no sample content. Do not fabricate scores, counts, authors, or activity.

## Product Principles
- Every number shown to a student is real. No sample data presented as live.
- Correctness over popularity: an answer that matches the mark scheme outranks an answer that is liked.
- Discussion is tied to the exam: a paper question or a syllabus point, not free-floating chat.
- Zero distraction for people with limited revision time.
