"use client";

import React, { useState } from "react";
import type { VideoLessonContent } from "../lessonContent";

export default function VideoTab({ video }: { video: VideoLessonContent }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [activeChapterIndex, setActiveChapterIndex] = useState(1);

  const activeChapter = video.chapters[activeChapterIndex];

  return (
    <div>
      <div className="border-b border-gray-200 pb-4 mb-4">
        <span className="text-[10px] bg-blue-900 text-white font-mono uppercase px-1.5 py-0.5">Video Lesson</span>
        <h2 className="text-xl font-bold text-blue-900 mt-1">{video.title}</h2>
        <p className="text-xs text-gray-500">Led by {video.instructor}</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Player Simulation */}
        <div className="lg:col-span-2 space-y-2">
          <div className="relative bg-black aspect-video flex flex-col justify-between p-4 border border-black rounded-lg overflow-hidden text-white select-none shadow-sm">
            <div className="flex justify-between items-center text-xs opacity-90">
              <span className="font-mono">{video.title}</span>
              <span className="bg-red-600 px-1.5 py-0.5 text-[10px] font-bold">1080p HD</span>
            </div>

            <div className="text-center py-8">
              <div className="font-mono text-cyan-300 text-sm tracking-widest uppercase mb-1">{activeChapter.title}</div>
              <div className="text-xs text-gray-400 mt-2 font-mono">
                Current Position: {activeChapter.time} / {video.totalDuration}
              </div>
            </div>

            <div className="space-y-1.5">
              <div className="w-full bg-gray-700 h-1.5 rounded-full overflow-hidden">
                <div className="bg-blue-700 h-1.5" style={{ width: `${activeChapter.percent}%` }} />
              </div>
              <div className="flex justify-between items-center text-xs pt-1">
                <div className="flex items-center space-x-3">
                  <button onClick={() => setIsPlaying((p) => !p)} className="font-bold text-white hover:text-blue-400">
                    {isPlaying ? "⏸ PAUSE" : "▶ PLAY"}
                  </button>
                  <span className="text-gray-400 font-mono text-[11px]">
                    {activeChapter.time} / {video.totalDuration}
                  </span>
                </div>
                <span className="border border-gray-600 px-1 font-mono text-[11px]">1.0x</span>
              </div>
            </div>
          </div>

          <div className="p-3 bg-gray-50 border border-gray-200 rounded-lg text-xs space-y-1">
            <span className="font-bold text-gray-900">Lecture Objective:</span>
            <p className="text-gray-500">{video.objective}</p>
          </div>
        </div>

        {/* Chapters */}
        <div className="border border-gray-200 rounded-lg overflow-hidden bg-white shadow-sm">
          <div className="p-3 bg-blue-900 text-white text-xs font-bold uppercase tracking-wider">Video Chapters</div>
          <div className="divide-y divide-gray-200 text-xs">
            {video.chapters.map((chapter, i) => (
              <button
                key={chapter.time}
                onClick={() => setActiveChapterIndex(i)}
                className={`w-full text-left p-3 flex items-start space-x-2 ${
                  i === activeChapterIndex ? "bg-blue-50/70 border-l-4 border-blue-700" : "hover:bg-blue-50"
                }`}
              >
                <span className="font-mono font-bold text-blue-700 text-[11px] shrink-0">{chapter.time}</span>
                <div>
                  <div className={`font-bold ${i === activeChapterIndex ? "text-blue-900" : "text-gray-900"}`}>{chapter.title}</div>
                  <div className="text-[11px] text-gray-500">{chapter.description}</div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
