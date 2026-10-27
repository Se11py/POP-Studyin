"use client";

import React, { useState } from "react";
import type { PastPaperRow } from "../lessonContent";
import PaperPreviewModal, { type PaperModalState } from "./PaperPreviewModal";

const years = ["2024", "2023", "2022", "2021"];
const series = ["May / June", "Oct / Nov", "Feb / March"];

export default function PastPapersTab({ papers, syllabusLabel }: { papers: PastPaperRow[]; syllabusLabel: string }) {
  const [year, setYear] = useState(years[0]);
  const [activeSeries, setActiveSeries] = useState(series[0]);
  const [modalState, setModalState] = useState<PaperModalState | null>(null);

  return (
    <div>
      <div className="border-b border-gray-200 pb-4 mb-4">
        <h2 className="text-xl font-bold text-blue-900">Official {syllabusLabel} Past Exam Papers</h2>
        <p className="text-xs text-gray-500 mt-1">
          Direct access to Question Papers (QP) and Mark Schemes (MS) without registration.
        </p>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-gray-50 border border-gray-200 rounded-lg p-3 mb-4 text-xs">
        <div className="flex items-center space-x-3">
          <span className="font-bold text-gray-500">EXAM YEAR:</span>
          <div className="flex border border-gray-200 bg-white rounded-lg overflow-hidden">
            {years.map((y, i) => (
              <button
                key={y}
                onClick={() => setYear(y)}
                className={`px-2.5 py-1 font-bold ${i > 0 ? "border-l border-gray-200" : ""} ${
                  year === y ? "bg-blue-700 text-white" : "hover:bg-gray-100"
                }`}
              >
                {y}
              </button>
            ))}
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <span className="font-bold text-gray-500">SERIES:</span>
          <div className="flex border border-gray-200 bg-white rounded-lg overflow-hidden">
            {series.map((s, i) => (
              <button
                key={s}
                onClick={() => setActiveSeries(s)}
                className={`px-2.5 py-1 font-medium ${i > 0 ? "border-l border-gray-200" : ""} ${
                  activeSeries === s ? "bg-blue-900 text-white" : "hover:bg-gray-100"
                }`}
              >
                {s}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Papers Table */}
      <div className="border border-gray-200 rounded-lg overflow-x-auto shadow-sm">
        <table className="w-full text-left text-xs border-collapse">
          <thead>
            <tr className="bg-blue-900 text-white uppercase text-[11px] tracking-wider">
              <th className="p-3 border-r border-blue-950">Paper Code</th>
              <th className="p-3 border-r border-blue-950">Component Description</th>
              <th className="p-3 border-r border-blue-950">Duration</th>
              <th className="p-3 border-r border-blue-950 text-center">Question Paper</th>
              <th className="p-3 text-center">Mark Scheme</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 bg-white font-mono">
            {papers.map((paper, i) => (
              <tr key={paper.code} className={`hover:bg-blue-50/30 ${i % 2 === 1 ? "bg-gray-50" : ""}`}>
                <td className="p-3 font-bold text-blue-700 border-r border-gray-200">{paper.code}</td>
                <td className="p-3 font-sans font-medium border-r border-gray-200">{paper.description}</td>
                <td className="p-3 font-sans text-gray-500 border-r border-gray-200">{paper.duration}</td>
                <td className="p-3 text-center border-r border-gray-200">
                  <button
                    onClick={() => setModalState({ title: `Question Paper ${paper.code}`, code: `${paper.code} ${year} ${activeSeries}` })}
                    className="bg-blue-700 hover:bg-blue-800 text-white rounded px-2.5 py-1 text-[11px] font-bold"
                  >
                    VIEW QP
                  </button>
                </td>
                <td className="p-3 text-center">
                  <button
                    onClick={() => setModalState({ title: `Mark Scheme ${paper.code}`, code: `${paper.code} ${year} ${activeSeries}` })}
                    className="bg-emerald-700 hover:bg-emerald-800 text-white rounded px-2.5 py-1 text-[11px] font-bold"
                  >
                    VIEW MS
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <PaperPreviewModal state={modalState} syllabusLabel={syllabusLabel} onClose={() => setModalState(null)} />
    </div>
  );
}
