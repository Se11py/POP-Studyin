"use client";

import React, { useState } from "react";
import { useMutation, useQuery } from "convex/react";
import { useUser, SignInButton } from "@clerk/nextjs";
import { MessageSquare, Flag, Trash2, CornerDownRight } from "lucide-react";
import { api } from "@/convex/_generated/api";
import type { Id } from "@/convex/_generated/dataModel";

function formatRelativeTime(ms: number) {
  const diffSeconds = Math.round((Date.now() - ms) / 1000);
  if (diffSeconds < 60) return "just now";
  const diffMinutes = Math.round(diffSeconds / 60);
  if (diffMinutes < 60) return `${diffMinutes}m ago`;
  const diffHours = Math.round(diffMinutes / 60);
  if (diffHours < 24) return `${diffHours}h ago`;
  const diffDays = Math.round(diffHours / 24);
  if (diffDays < 7) return `${diffDays}d ago`;
  return new Date(ms).toLocaleDateString();
}

function initials(name: string) {
  return name
    .split(" ")
    .map((part) => part[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

interface Post {
  _id: Id<"discussionPosts">;
  _creationTime: number;
  parentId?: Id<"discussionPosts">;
  authorClerkId: string;
  authorName: string;
  body: string;
}

function PostRow({
  post,
  currentUserId,
  onHide,
  onReply,
  isReply,
}: {
  post: Post;
  currentUserId: string | undefined;
  onHide: (id: Id<"discussionPosts">) => void;
  onReply?: (post: Post) => void;
  isReply?: boolean;
}) {
  const isAuthor = currentUserId === post.authorClerkId;

  return (
    <div className={`flex gap-3 ${isReply ? "mt-3" : ""}`}>
      <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-800 flex items-center justify-center text-[11px] font-bold shrink-0">
        {initials(post.authorName)}
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 text-xs">
          <span className="font-bold text-gray-900">{post.authorName}</span>
          <span className="text-gray-400">&middot;</span>
          <span className="text-gray-400">{formatRelativeTime(post._creationTime)}</span>
        </div>
        <p className="text-sm text-gray-800 mt-0.5 whitespace-pre-wrap leading-relaxed">{post.body}</p>
        <div className="flex items-center gap-3 mt-1 text-[11px] font-semibold text-gray-400">
          {!isReply && onReply && (
            <button onClick={() => onReply(post)} className="flex items-center gap-1 hover:text-blue-700">
              <CornerDownRight size={12} /> Reply
            </button>
          )}
          {isAuthor ? (
            <button onClick={() => onHide(post._id)} className="flex items-center gap-1 hover:text-red-600">
              <Trash2 size={12} /> Delete
            </button>
          ) : (
            <button onClick={() => onHide(post._id)} className="flex items-center gap-1 hover:text-red-600">
              <Flag size={12} /> Report
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default function DiscussionTab({
  classId,
  lessonId,
  lessonTitle,
}: {
  classId: string;
  lessonId: string;
  lessonTitle: string;
}) {
  const { isSignedIn, user } = useUser();
  const posts = useQuery(api.discussions.listByLesson, { classId, lessonId });
  const createPost = useMutation(api.discussions.createPost);
  const hidePost = useMutation(api.discussions.hidePost);

  const [draft, setDraft] = useState("");
  const [replyTo, setReplyTo] = useState<Post | null>(null);
  const [replyDraft, setReplyDraft] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const topLevelPosts = (posts ?? []).filter((p) => !p.parentId);
  const repliesByParent = (posts ?? []).reduce<Record<string, Post[]>>((acc, p) => {
    if (p.parentId) {
      acc[p.parentId] = acc[p.parentId] ? [...acc[p.parentId], p] : [p];
    }
    return acc;
  }, {});

  const submitTopLevel = async () => {
    if (!draft.trim() || submitting) return;
    setSubmitting(true);
    try {
      await createPost({ classId, lessonId, body: draft });
      setDraft("");
    } finally {
      setSubmitting(false);
    }
  };

  const submitReply = async () => {
    if (!replyTo || !replyDraft.trim() || submitting) return;
    setSubmitting(true);
    try {
      await createPost({ classId, lessonId, body: replyDraft, parentId: replyTo._id });
      setReplyDraft("");
      setReplyTo(null);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div>
      <div className="border-b border-gray-200 pb-4 mb-6">
        <h2 className="text-xl font-bold font-serif text-blue-900">Discussion</h2>
        <p className="text-xs text-gray-500 mt-1">
          Ask questions and compare notes with other students on <span className="font-semibold">{lessonTitle}</span>.
        </p>
      </div>

      {/* Composer */}
      <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mb-6">
        {isSignedIn ? (
          <>
            <textarea
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              placeholder="Ask a question about this lesson..."
              className="w-full h-20 p-2.5 text-sm bg-white border border-gray-200 rounded-lg focus:outline-none focus:border-blue-700"
            />
            <div className="flex justify-end mt-2">
              <button
                onClick={submitTopLevel}
                disabled={!draft.trim() || submitting}
                className="bg-blue-700 hover:bg-blue-800 disabled:opacity-40 disabled:cursor-not-allowed text-white rounded-lg px-4 py-2 text-xs font-bold uppercase tracking-wider shadow-sm hover:shadow-md transition-shadow"
              >
                Post
              </button>
            </div>
          </>
        ) : (
          <div className="flex items-center justify-between gap-3 text-sm text-gray-600">
            <span>Sign in to join the discussion for this lesson.</span>
            <SignInButton mode="modal">
              <button className="bg-blue-700 hover:bg-blue-800 text-white rounded-lg px-4 py-2 text-xs font-bold uppercase tracking-wider shrink-0">
                Sign In
              </button>
            </SignInButton>
          </div>
        )}
      </div>

      {/* Posts */}
      {posts === undefined ? (
        <p className="text-sm text-gray-400">Loading discussion...</p>
      ) : topLevelPosts.length === 0 ? (
        <div className="py-16 text-center space-y-2">
          <MessageSquare size={32} className="text-gray-300 mx-auto" />
          <p className="text-sm text-gray-400">No discussion yet — be the first to ask a question.</p>
        </div>
      ) : (
        <div className="space-y-5">
          {topLevelPosts.map((post) => (
            <div key={post._id} className="border-b border-gray-100 pb-5">
              <PostRow
                post={post}
                currentUserId={user?.id}
                onHide={(id) => hidePost({ postId: id })}
                onReply={(p) => {
                  setReplyTo(p);
                  setReplyDraft("");
                }}
              />

              {(repliesByParent[post._id] ?? []).map((reply) => (
                <div key={reply._id} className="ml-11">
                  <PostRow post={reply} currentUserId={user?.id} onHide={(id) => hidePost({ postId: id })} isReply />
                </div>
              ))}

              {replyTo?._id === post._id && (
                <div className="ml-11 mt-3">
                  {isSignedIn ? (
                    <div className="flex gap-2">
                      <input
                        autoFocus
                        value={replyDraft}
                        onChange={(e) => setReplyDraft(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && submitReply()}
                        placeholder={`Reply to ${post.authorName}...`}
                        className="flex-1 p-2 text-sm bg-white border border-gray-200 rounded-lg focus:outline-none focus:border-blue-700"
                      />
                      <button
                        onClick={submitReply}
                        disabled={!replyDraft.trim() || submitting}
                        className="bg-blue-700 hover:bg-blue-800 disabled:opacity-40 disabled:cursor-not-allowed text-white rounded-lg px-3 py-2 text-xs font-bold uppercase tracking-wider"
                      >
                        Reply
                      </button>
                      <button
                        onClick={() => setReplyTo(null)}
                        className="text-xs font-semibold text-gray-400 hover:text-gray-600 px-2"
                      >
                        Cancel
                      </button>
                    </div>
                  ) : (
                    <SignInButton mode="modal">
                      <button className="text-xs font-bold text-blue-700 hover:underline">Sign in to reply</button>
                    </SignInButton>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
