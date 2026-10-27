"use client";

import React from "react";
import { X } from "lucide-react";

export interface PaperModalState {
  title: string;
  code: string;
}

export default function PaperPreviewModal({
  state,
  syllabusLabel,
  onClose,
}: {
  state: PaperModalState | null;
  syllabusLabel: string;
  onClose: () => void;
}) {
  if (!state) return null;

  return (
    <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div
        className="bg-white border-2 border-blue-900 rounded-xl overflow-hidden w-full max-w-3xl max-h-[85vh] flex flex-col shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Bar */}
        <div className="bg-blue-900 text-white p-3 flex justify-between items-center border-b border-blue-950">
          <div className="flex items-center space-x-2">
            <span className="bg-blue-700 text-[10px] font-mono rounded px-1.5 py-0.5 font-bold uppercase">SECURE VIEWER</span>
            <span className="text-xs font-bold">{state.title}</span>
          </div>
          <button onClick={onClose} className="text-white hover:text-gray-300 font-bold text-sm px-2">
            <X size={16} />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 overflow-y-auto space-y-4 text-xs text-gray-900">
          <div className="border border-gray-200 rounded-lg p-4 bg-gray-50 text-center font-mono space-y-2">
            <div className="font-bold text-sm text-blue-900">CAMBRIDGE ASSESSMENT INTERNATIONAL EDUCATION</div>
            <div className="text-xs text-gray-500">International General Certificate of Secondary Education</div>
            <div className="text-base font-black text-gray-900 mt-2">{syllabusLabel} &mdash; {state.code}</div>
            <div className="text-[11px] text-gray-500">Clean Revision Copy</div>
          </div>

          <div className="border-l-4 border-blue-700 rounded-r-lg p-3 bg-blue-50/50 text-gray-900">
            <strong>DOCUMENT STATUS:</strong> Instant open verified. No account creation required. You have full educational
            clearance for this syllabus component.
          </div>
        </div>

        {/* Footer */}
        <div className="p-3 bg-gray-50 border-t border-gray-200 flex justify-between items-center text-xs">
          <span className="text-gray-500">POP Studying Open Document Repository</span>
          <button onClick={onClose} className="border border-gray-200 rounded bg-white px-3 py-1.5 hover:bg-gray-100 font-medium">
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
