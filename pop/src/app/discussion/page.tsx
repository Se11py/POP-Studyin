"use client";

import { Suspense, useEffect, useMemo, useRef, useState } from "react";
import Logo from "@/components/Logo";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { SignInButton, useUser } from "@clerk/nextjs";
import { useMutation, useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import type { Id } from "@/convex/_generated/dataModel";

const blue = "text-board-accent";
const muted = "text-board-muted";
const focus = "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-board-accent";
const field = `block w-full border border-board-edge bg-white px-3 text-[15px] placeholder:text-board-muted focus:border-board-ink ${focus}`;
const primaryBtn = `inline-flex min-h-11 shrink-0 items-center justify-center whitespace-nowrap bg-board-ink px-6 text-sm font-bold text-white disabled:cursor-not-allowed disabled:opacity-50 ${focus}`;
const quietBtn = `inline-flex min-h-11 items-center px-1 text-[13px] font-bold ${muted} hover:text-board-ink ${focus}`;

const subjects = [
  { id: "physics", name: "IGCSE Physics 0625" },
  { id: "chemistry", name: "IGCSE Chemistry 0620" },
  { id: "biology", name: "IGCSE Biology 0610" },
  { id: "maths", name: "IGCSE Maths 0580" },
  { id: "alevel-physics", name: "A-Level Physics 9702" },
  { id: "alevel-maths", name: "A-Level Maths 9709" },
  { id: "tips", name: "Study tips & planning" },
  { id: "examday", name: "Exam-day talk" },
];
const subjectName = (id: string) => subjects.find((s) => s.id === id)?.name ?? "Discussion";

type Question = {
  id: string;
  subject: string;
  reference: string;
  title: string;
  details: string;
  author: string;
  authorId: string;
  createdAt: number;
  replies: number;
  acceptedReplyId?: string;
};

type Filter = "all" | "open" | "answered";
const filters: { id: Filter; label: string }[] = [
  { id: "all", label: "All" },
  { id: "open", label: "Open" },
  { id: "answered", label: "Answered" },
];

const rules = ["Show your working.", "No leaked papers or live exam talk.", "Explain why, not just the answer.", "Be kind. Everyone here is revising."];

function ago(ms: number, now: number) {
  const min = Math.max(0, Math.floor((now - ms) / 60000));
  if (min < 1) return "just now";
  if (min < 60) return `${min}m ago`;
  const h = Math.floor(min / 60);
  if (h < 24) return `${h}h ago`;
  return `${Math.round(h / 24)}d ago`;
}

const headingFocus = "outline-none";

/* ---------- Thread (right pane) ---------- */

function ThreadPane({ q, now, userId, focusOnMount, onDeleted }: { q: Question; now: number; userId?: string; focusOnMount: boolean; onDeleted: () => void }) {
  const replies = useQuery(api.discussions.listByLesson, { classId: "discussion-replies", lessonId: q.id });
  const createPost = useMutation(api.discussions.createPost);
  const hidePost = useMutation(api.discussions.hidePost);
  const acceptAnswer = useMutation(api.discussions.acceptAnswer);
  const clearAccepted = useMutation(api.discussions.clearAccepted);
  const [draft, setDraft] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);
  const [announce, setAnnounce] = useState("");
  const [confirmDelete, setConfirmDelete] = useState(false);
  const headingRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (focusOnMount) headingRef.current?.focus();
  }, [focusOnMount]);

  const isAsker = !!userId && userId === q.authorId;
  const accepted = replies?.find((r) => r._id === q.acceptedReplyId);
  const others = replies?.filter((r) => r._id !== q.acceptedReplyId);

  const send = async () => {
    const body = draft.trim();
    if (!body || busy) return;
    setBusy(true);
    setError("");
    try {
      await createPost({ classId: "discussion-replies", lessonId: q.id, body });
      setDraft("");
    } catch {
      setError("Couldn't post your reply. Your text is still here. Try again.");
    } finally {
      setBusy(false);
    }
  };

  const mark = async (fn: () => Promise<unknown>) => {
    setError("");
    try {
      await fn();
      setAnnounce("Answer updated.");
    } catch {
      setError("Couldn't update the answer. Try again.");
    }
  };

  const deleteQuestion = async () => {
    try {
      await hidePost({ postId: q.id as Id<"discussionPosts"> });
      onDeleted();
    } catch {
      setError("Couldn't delete the question. Try again.");
    }
  };

  const share = async () => {
    try {
      await navigator.clipboard.writeText(`${window.location.origin}/discussion?t=${q.id}`);
      setCopied(true);
      setAnnounce("Link copied.");
      setTimeout(() => setCopied(false), 1500);
    } catch {
      setError("Couldn't copy the link. Copy it from the address bar instead.");
    }
  };

  const reply = (r: NonNullable<typeof replies>[number], isAccepted: boolean) => (
    <li key={r._id} className="py-4">
      <p className={`flex flex-wrap items-center gap-x-2 text-[13px] ${muted}`}>
        <span className="font-bold text-board-ink">{r.authorName}</span>
        <span aria-hidden>·</span>
        <span>{ago(r._creationTime, now)}</span>
        {userId === r.authorClerkId && (
          <button
            onClick={() => hidePost({ postId: r._id as Id<"discussionPosts"> })}
            aria-label={`Delete your reply from ${ago(r._creationTime, now)}`}
            className={`min-h-11 px-1 hover:text-board-danger ${focus}`}
          >
            Delete
          </button>
        )}
      </p>
      <p className="mt-1.5 whitespace-pre-wrap text-[16px] leading-relaxed">{r.body}</p>
      {isAsker && (
        <button
          onClick={() =>
            mark(() =>
              isAccepted
                ? clearAccepted({ questionId: q.id as Id<"discussionPosts"> })
                : acceptAnswer({ questionId: q.id as Id<"discussionPosts">, replyId: r._id }),
            )
          }
          aria-label={`${isAccepted ? "Remove accepted mark from" : "Accept as the answer:"} the reply by ${r.authorName}`}
          className={`mt-2 min-h-11 border px-4 text-[13px] font-bold ${
            isAccepted ? "border-board-ink hover:bg-white" : "border-board-accent text-board-accent hover:bg-board-tint"
          } ${focus}`}
        >
          {isAccepted ? "Remove accepted mark" : "This answered it"}
        </button>
      )}
    </li>
  );

  return (
    <article className="px-5 py-6 md:px-8">
      <p role="status" className="sr-only">
        {announce}
      </p>
      <p className="flex flex-wrap items-baseline gap-x-3 gap-y-1 text-[13px]">
        {q.reference && <span className={`font-bold ${blue}`}>{q.reference}</span>}
        <span className={muted}>{subjectName(q.subject)}</span>
      </p>
      <h2 ref={headingRef} tabIndex={-1} className={`${headingFocus} mt-2 max-w-[28ch] text-[clamp(26px,2.6vw,38px)] font-bold leading-[1.08] tracking-[-0.025em] text-balance`}>
        {q.title}
      </h2>
      {q.details && <p className="mt-4 max-w-[68ch] whitespace-pre-wrap text-[16px] leading-relaxed text-board-body">{q.details}</p>}
      <p className={`mt-4 flex flex-wrap items-center gap-x-2 text-[13px] ${muted}`}>
        <span>{q.author}</span>
        <span aria-hidden>·</span>
        <span>{ago(q.createdAt, now)}</span>
        <button onClick={share} className={`${quietBtn} ml-2`}>
          {copied ? "Link copied" : "Copy link"}
        </button>
        {isAsker &&
          (confirmDelete ? (
            <span className="ml-2 inline-flex items-center gap-1">
              <span className="font-bold text-board-ink">Delete this question and its replies?</span>
              <button onClick={deleteQuestion} className={`${quietBtn} text-board-danger hover:text-board-danger`}>
                Yes, delete
              </button>
              <button onClick={() => setConfirmDelete(false)} className={quietBtn}>
                Keep it
              </button>
            </span>
          ) : (
            <button onClick={() => setConfirmDelete(true)} className={`${quietBtn} hover:text-board-danger`}>
              Delete question
            </button>
          ))}
      </p>

      {accepted && (
        <section aria-labelledby="accepted-h" className="mt-8 bg-board-tint px-5 py-1">
          <h3 id="accepted-h" className={`pt-4 text-[13px] font-bold ${blue}`}>
            <span aria-hidden>✓ </span>Accepted answer
          </h3>
          <ul>{reply(accepted, true)}</ul>
        </section>
      )}

      <section aria-labelledby="replies-h" className="mt-8">
        <h3 id="replies-h" className="border-b-2 border-board-ink pb-2 text-[13px] font-bold">
          {accepted ? "Other replies" : "Replies"}
          {others && ` (${others.length})`}
        </h3>
        {replies === undefined && <p className={`py-4 text-[15px] ${muted}`}>Loading replies…</p>}
        {others?.length === 0 && (
          <p className={`py-4 text-[15px] ${muted}`}>{accepted ? "No other replies." : "No replies yet. If you know how the mark scheme words it, answer below."}</p>
        )}
        <ul className="divide-y divide-board-line">{others?.map((r) => reply(r, false))}</ul>
      </section>

      <div className="mt-6 border-t border-board-line pt-6">
        {userId ? (
          <>
            <label htmlFor="reply-box" className="text-[13px] font-bold">
              Your reply
            </label>
            <textarea
              id="reply-box"
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) send();
              }}
              rows={4}
              maxLength={2000}
              placeholder="Explain why, not just the answer."
              className={`${field} mt-2 py-3 leading-relaxed`}
            />
            <div className="mt-3 flex flex-wrap items-center gap-4">
              <button onClick={send} disabled={!draft.trim() || busy} className={primaryBtn}>
                {busy ? "Posting…" : "Post reply"}
              </button>
              <span className={`text-[12px] ${muted}`}>Ctrl or ⌘ + Enter to post</span>
            </div>
          </>
        ) : (
          <SignInButton mode="modal">
            <button className={primaryBtn}>Sign in to reply</button>
          </SignInButton>
        )}
        {error && (
          <p role="alert" className="mt-3 text-[13px] font-bold text-board-danger">
            {error}
          </p>
        )}
      </div>
    </article>
  );
}

/* ---------- Ask form (right pane) ---------- */

function AskPane({ signedIn, onDone, defaultSubject, focusOnMount }: { signedIn: boolean; onDone: (id?: string) => void; defaultSubject: string; focusOnMount: boolean }) {
  const createPost = useMutation(api.discussions.createPost);
  const [subject, setSubject] = useState(defaultSubject);
  const [reference, setReference] = useState("");
  const [title, setTitle] = useState("");
  const [details, setDetails] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const headingRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (focusOnMount) headingRef.current?.focus();
  }, [focusOnMount]);

  const missing = [!subject && "a subject", !reference.trim() && "the paper question or topic", !title.trim() && "your question"].filter(Boolean) as string[];
  const ready = !!subject && !!reference.trim() && !!title.trim();

  const submit = async () => {
    if (!ready || busy) return;
    setBusy(true);
    setError("");
    const oneLine = title.trim().replace(/\n/g, " ");
    try {
      const id = await createPost({
        classId: "discussion",
        lessonId: subject,
        reference: reference.trim(),
        body: details.trim() ? `${oneLine}\n${details.trim()}` : oneLine,
      });
      onDone(id);
    } catch {
      setError("Couldn't post your question. Your text is still here. Try again.");
    } finally {
      setBusy(false);
    }
  };

  if (!signedIn) {
    return (
      <div className="px-5 py-10 md:px-8">
        <h2 ref={headingRef} tabIndex={-1} className={`${headingFocus} text-[clamp(24px,2.4vw,34px)] font-bold tracking-[-0.025em]`}>
          Ask a question
        </h2>
        <p className={`mt-2 max-w-[48ch] text-[16px] ${muted}`}>Sign in to ask. You can read every thread without an account.</p>
        <div className="mt-6 flex items-center gap-4">
          <SignInButton mode="modal">
            <button className={primaryBtn}>Sign in to ask</button>
          </SignInButton>
          <button type="button" onClick={() => onDone()} className={quietBtn}>
            Cancel
          </button>
        </div>
      </div>
    );
  }

  return (
    <form
      className="px-5 py-6 md:px-8"
      onSubmit={(e) => {
        e.preventDefault();
        submit();
      }}
    >
      <h2 ref={headingRef} tabIndex={-1} className={`${headingFocus} text-[clamp(24px,2.4vw,34px)] font-bold tracking-[-0.025em]`}>
          Ask a question
        </h2>
      <p className={`mt-1 text-[15px] ${muted}`}>Tie it to the exact question or topic, so the next student can find it.</p>

      <div className="mt-6 grid max-w-[640px] gap-5">
        <div>
          <label htmlFor="ask-subject" className="text-[13px] font-bold">
            Subject <span className={`font-normal ${muted}`}>(required)</span>
          </label>
          <select id="ask-subject" required value={subject} onChange={(e) => setSubject(e.target.value)} className={`${field} mt-2 h-11`}>
            <option value="">Choose a subject</option>
            {subjects.map((s) => (
              <option key={s.id} value={s.id}>
                {s.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="ask-ref" className="text-[13px] font-bold">
            Paper question or topic <span className={`font-normal ${muted}`}>(required)</span>
          </label>
          <input
            id="ask-ref"
            required
            value={reference}
            onChange={(e) => setReference(e.target.value)}
            maxLength={60}
            placeholder="e.g. P42 Q3(b), or 1.6 Momentum"
            className={`${field} mt-2 h-11`}
          />
        </div>
        <div>
          <label htmlFor="ask-title" className="text-[13px] font-bold">
            Your question <span className={`font-normal ${muted}`}>(required)</span>
          </label>
          <input
            id="ask-title"
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            maxLength={120}
            placeholder="One sentence. What did you lose a mark on?"
            className={`${field} mt-2 h-11`}
          />
        </div>
        <div>
          <label htmlFor="ask-details" className="text-[13px] font-bold">
            Details <span className={`font-normal ${muted}`}>(optional)</span>
          </label>
          <textarea
            id="ask-details"
            value={details}
            onChange={(e) => setDetails(e.target.value)}
            rows={5}
            maxLength={1800}
            placeholder="Show your working and what the mark scheme said."
            className={`${field} mt-2 py-3 leading-relaxed`}
          />
        </div>
      </div>

      <div className="mt-6 flex flex-wrap items-center gap-4">
        <button type="submit" disabled={!ready || busy} aria-describedby="ask-missing" className={primaryBtn}>
          {busy ? "Posting…" : "Post question"}
        </button>
        <button type="button" onClick={() => onDone()} className={quietBtn}>
          Cancel
        </button>
      </div>
      <p id="ask-missing" className={`mt-3 text-[13px] ${muted}`}>
        {missing.length > 0 ? `To post, add ${missing.join(", ")}.` : ""}
      </p>
      {error && (
        <p role="alert" className="mt-3 text-[13px] font-bold text-board-danger">
          {error}
        </p>
      )}
    </form>
  );
}

/* ---------- Page ---------- */

function Board() {
  const { user, isSignedIn } = useUser();
  const router = useRouter();
  const params = useSearchParams();
  const feed = useQuery(api.discussions.listFeed);
  const [now, setNow] = useState(() => Date.now());
  useEffect(() => {
    const t = setInterval(() => setNow(Date.now()), 60000);
    return () => clearInterval(t);
  }, []);

  const [subject, setSubject] = useState("");
  const [filter, setFilter] = useState<Filter>("all");
  const [search, setSearch] = useState("");

  // The open thread and the ask form both live in the URL, so Back and shared links behave.
  const selectedId = params.get("t");
  const asking = params.get("ask") === "1";

  // Move focus into the pane a student just opened, and back to the list when they leave it.
  const [interacted, setInteracted] = useState(false);
  const titleRef = useRef<HTMLHeadingElement>(null);

  const questions = useMemo<Question[]>(
    () =>
      (feed ?? []).map((d) => {
        const [first, ...rest] = d.body.split("\n");
        return {
          id: d._id,
          subject: d.lessonId,
          reference: d.reference ?? "",
          title: first,
          details: rest.join("\n").trim(),
          author: d.authorName,
          authorId: d.authorClerkId,
          createdAt: d._creationTime,
          replies: d.replyCount ?? 0,
          acceptedReplyId: d.acceptedReplyId,
        };
      }),
    [feed],
  );

  // "Q3 b" finds "P42 Q3(b)": compare letters and digits only
  const squash = (t: string) => t.toLowerCase().replace(/[^a-z0-9]/g, "");
  const needle = squash(search);
  const visible = useMemo(
    () =>
      questions.filter(
        (q) =>
          (!subject || q.subject === subject) &&
          (filter === "all" || (filter === "answered" ? !!q.acceptedReplyId : !q.acceptedReplyId)) &&
          (!needle || squash(`${q.reference} ${q.title} ${q.details} ${q.author}`).includes(needle)),
      ),
    [questions, subject, filter, needle],
  );

  const selected = questions.find((q) => q.id === selectedId);
  const loading = feed === undefined;
  const detailOpen = asking || !!selectedId;

  const wasOpen = useRef(false);
  useEffect(() => {
    if (wasOpen.current && !detailOpen && interacted) titleRef.current?.focus();
    wasOpen.current = detailOpen;
  }, [detailOpen, interacted]);

  const go = (href: string) => {
    setInteracted(true);
    router.push(href, { scroll: false });
  };

  const shownCount = visible.length;
  const status = loading ? "" : `${shownCount} ${shownCount === 1 ? "question" : "questions"} shown.`;

  return (
    <div className="min-h-dvh bg-white pb-[env(safe-area-inset-bottom)] pl-[env(safe-area-inset-left)] pr-[env(safe-area-inset-right)] text-board-ink lg:flex lg:h-dvh lg:flex-col" style={{ fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif' }}>
      <p role="status" className="sr-only">
        {status}
      </p>
      <header className="flex shrink-0 items-center justify-between gap-4 px-5 py-4 md:px-8">
        <Link href="/" className={`text-[clamp(26px,2.2vw,34px)] font-bold leading-none tracking-tight ${focus}`}>
          <Logo variant="black" className="h-12 w-auto" priority />
        </Link>
        <Link href="/contribute" className={`text-sm font-bold ${blue} ${focus}`}>
          Become a contributor →
        </Link>
      </header>

      <main className="block border-t border-board-line lg:grid lg:min-h-0 lg:flex-1 lg:grid-cols-[clamp(344px,32vw,440px)_minmax(0,1fr)]">
        {/* List pane */}
        <section aria-label="Questions" className={`${detailOpen ? "hidden lg:flex" : "flex"} min-h-0 flex-col lg:overflow-y-auto lg:border-r lg:border-board-line`}>
          <div className="border-b border-board-line px-5 py-5 md:px-8 lg:px-5">
            <div className="flex items-center justify-between gap-3">
              <h1 ref={titleRef} tabIndex={-1} className={`${headingFocus} text-[clamp(26px,2.4vw,32px)] font-bold leading-none tracking-[-0.03em]`}>
                Discussion
              </h1>
              <button
                onClick={() => go("/discussion?ask=1")}
                className={primaryBtn}
              >
                Ask a question
              </button>
            </div>
            <div className="mt-4 grid gap-3">
              <label htmlFor="board-search" className="sr-only">
                Search by paper question, topic or words
              </label>
              <input
                id="board-search"
                type="search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search, e.g. P42 Q3(b) or momentum"
                className={`${field} h-11`}
              />
              <label htmlFor="subject-filter" className="sr-only">
                Subject
              </label>
              <select id="subject-filter" value={subject} onChange={(e) => setSubject(e.target.value)} className={`${field} h-11`}>
                <option value="">All subjects</option>
                {subjects.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.name}
                  </option>
                ))}
              </select>
              <div role="group" aria-label="Show" className="flex">
                {filters.map((f) => (
                  <button
                    key={f.id}
                    onClick={() => setFilter(f.id)}
                    aria-pressed={filter === f.id}
                    className={`min-h-11 flex-1 border border-board-ink px-3.5 text-[13px] font-bold first:border-r-0 last:border-l-0 ${
                      filter === f.id ? "bg-board-ink text-white" : "bg-white hover:bg-board-hover"
                    } ${focus}`}
                  >
                    {f.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="flex-1">
            {loading && <p className={`px-5 py-8 text-[15px] ${muted}`}>Loading questions…</p>}

            {!loading && visible.length === 0 && (
              <div className="px-5 py-10 md:px-8 lg:px-5">
                <p className="text-[22px] font-bold tracking-[-0.02em]">{questions.length === 0 ? "No questions yet." : "Nothing matches."}</p>
                <p className={`mt-1 text-[15px] ${muted}`}>
                  {questions.length === 0 ? "Ask the first one. What did you lose a mark on?" : "Try different words, another subject, or show all questions."}
                </p>
              </div>
            )}

            <ul>
              {visible.map((q) => {
                const active = q.id === selectedId && !asking;
                return (
                  <li key={q.id} className="border-b border-board-line">
                    <Link
                      href={`/discussion?t=${q.id}`}
                      scroll={false}
                      onClick={() => setInteracted(true)}
                      aria-current={active ? "true" : undefined}
                      className={`block px-5 py-4 md:px-8 lg:px-5 ${active ? "bg-board-tint" : "hover:bg-board-hover"} ${focus} focus-visible:-outline-offset-2`}
                    >
                      <span className="flex items-baseline justify-between gap-3 text-[12px]">
                        <span className={`min-w-0 truncate font-bold ${blue}`}>{q.reference || subjectName(q.subject)}</span>
                        <span className={q.acceptedReplyId ? `shrink-0 font-bold ${blue}` : `shrink-0 ${muted}`}>{q.acceptedReplyId ? (
                            <>
                              <span aria-hidden>✓ </span>Answered
                            </>
                          ) : (
                            "Open"
                          )}</span>
                      </span>
                      <span className="mt-1 line-clamp-2 block text-[17px] font-bold leading-snug tracking-[-0.01em]">{q.title}</span>
                      <span className={`mt-1.5 block text-[12px] ${muted}`}>
                        {subjectName(q.subject)} · {q.author} · {ago(q.createdAt, now)} · {q.replies} {q.replies === 1 ? "reply" : "replies"}
                      </span>
                    </Link>
                  </li>
                );
              })}
            </ul>

            {/* Phones never show the detail pane's empty state, so the rules live under the list */}
            <div className="px-5 py-8 md:px-8 lg:hidden">
              <h2 className="border-b-2 border-board-ink pb-2 text-[13px] font-bold">House rules</h2>
              <ul>
                {rules.map((r) => (
                  <li key={r} className="border-b border-board-line py-3 text-[15px]">
                    {r}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* Detail pane */}
        <div className={`${detailOpen ? "block" : "hidden lg:block"} min-h-0 lg:overflow-y-auto`}>
          {detailOpen && (
            <div className="sticky top-0 z-10 border-b border-board-line bg-white px-5 md:px-8 lg:hidden">
              <button onClick={() => go("/discussion")} className={quietBtn}>
                ← All questions
              </button>
            </div>
          )}
          {detailOpen && <h1 className="sr-only lg:hidden">Discussion</h1>}
          {asking ? (
            <AskPane
              signedIn={!!isSignedIn}
              defaultSubject={subject}
              focusOnMount={interacted}
              onDone={(id) => go(id ? `/discussion?t=${id}` : "/discussion")}
            />
          ) : selected ? (
            <ThreadPane key={selected.id} q={selected} now={now} userId={user?.id} focusOnMount={interacted} onDeleted={() => go("/discussion")} />
          ) : selectedId ? (
            <div className="px-5 py-10 md:px-8">
              {loading ? (
                <p className={`text-[15px] ${muted}`}>Loading question…</p>
              ) : (
                <>
                  <h2 className="text-[clamp(24px,2.4vw,34px)] font-bold tracking-[-0.025em]">This question isn&apos;t available.</h2>
                  <p className={`mt-2 max-w-[48ch] text-[16px] ${muted}`}>It may have been deleted, or the link may be wrong.</p>
                  <Link href="/discussion" scroll={false} className={`mt-4 inline-flex min-h-11 items-center text-sm font-bold ${blue} ${focus}`}>
                    See all questions
                  </Link>
                </>
              )}
            </div>
          ) : (
            <div className="px-5 py-10 md:px-8">
              <h2 className="text-[clamp(28px,3vw,44px)] font-bold leading-[1.05] tracking-[-0.03em]">
                <span className="block">Ask it. Explain it.</span>
                <span className="block">Get it right.</span>
              </h2>
              <p className={`mt-3 max-w-[52ch] text-[16px] ${muted}`}>Pick a question on the left, or ask your own. The answer the asker accepts goes to the top.</p>
              <h3 className="mt-10 border-b-2 border-board-ink pb-2 text-[13px] font-bold">House rules</h3>
              <ul className="max-w-[52ch]">
                {rules.map((r) => (
                  <li key={r} className="border-b border-board-line py-3 text-[15px]">
                    {r}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

export default function DiscussionPage() {
  return (
    <Suspense fallback={null}>
      <Board />
    </Suspense>
  );
}
