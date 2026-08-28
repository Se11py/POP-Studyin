"use client";

import React, { useState } from "react";
import Sidebar from "@/components/Sidebar";
import { useUser } from "@clerk/nextjs";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ShieldCheck, CheckCircle2, Clock, MessageSquare, RefreshCw, Sparkles, 
  ExternalLink, User, ArrowRight, AlertCircle, FileText, Check, X, ThumbsUp
} from "lucide-react";

interface PendingItem {
  id: string;
  topicId: string;
  topicTitle: string;
  subject: string;
  code: string;
  notionPageId: string;
  author: string;
  authorSchool: string;
  submittedAt: string;
  summary: string;
  publishedContent: string;
  draftContent: string;
  status: "pending" | "approved" | "rejected";
}

const INITIAL_QUEUE: PendingItem[] = [
  {
    id: "queue_1",
    topicId: "biotech-6-3",
    topicTitle: "6.3 Biotechnology and Genetic Modification",
    subject: "Biology",
    code: "IGCSE Biology (0610)",
    notionPageId: "398c036c-c898-8125-b30a-e1f971e712cb",
    author: "Dominic H",
    authorSchool: "Harrow International School (Y13)",
    submittedAt: "Today, 10:15 AM",
    summary: "Added palindromic restriction endonuclease sticky ends, recombinant plasmids, and Examiner Insight mark scheme tips.",
    publishedContent: `### 1. Definition & Core Principles
**Biotechnology** is the application of biological organisms, systems, or processes to manufacturing and service industries. 
**Genetic modification (genetic engineering)** is taking a gene from one species and inserting it into another species so that the gene is expressed in the target organism.

### 2. Primary Methodology
- Bacteria are used extensively in biotechnology because:
  1. Microorganisms reproduce rapidly and make complex molecules quickly.
  2. No ethical concerns regarding their manipulation.
  3. Presence of plasmids (small circular DNA loops) which are easily manipulated.

### 3. Key Enzymes
- Restriction enzymes: Cut DNA molecules at specific base sequences.
- DNA ligase: Joins two pieces of DNA together at complementary sticky ends.`,
    draftContent: `### 1. Definition & Core Principles
**Biotechnology** is the application of biological organisms, systems, or processes to manufacturing and service industries. 
**Genetic modification (genetic engineering)** is taking a gene from one species and inserting it into another species so that the gene is expressed in the target organism.

### 2. Primary Methodology
- Bacteria are used extensively in biotechnology because:
  1. Microorganisms reproduce rapidly and make complex molecules quickly.
  2. No ethical concerns regarding their manipulation.
  3. Presence of **plasmids** (small circular DNA loops) which are easily transferred between cells.
  4. Shared genetic code (universal DNA) across all living organisms.

### 3. Key Enzymes & Vectors
- **Restriction Endonucleases**: Cut DNA molecules at specific palindromic base sequences creating 'sticky ends'.
- **DNA Ligase**: Joins two pieces of DNA together by forming phosphodiester bonds.
- **Recombinant Plasmid**: A plasmid vector containing foreign human genes (e.g. human insulin gene).

> 💡 **Examiner Insight**: Always specify that restriction enzymes cut DNA at *palindromic sequences* and DNA ligase forms *phosphodiester bonds*. Stating 'cuts DNA' only earns 1 of 2 marks.`,
    status: "pending"
  },
  {
    id: "queue_2",
    topicId: "chem-stoich-3-2",
    topicTitle: "3.2 Stoichiometry & The Mole Concept",
    subject: "Chemistry",
    code: "IGCSE Chemistry (0620)",
    notionPageId: "notion_chem_302",
    author: "Dominic H",
    authorSchool: "Harrow International School (Y13)",
    submittedAt: "Today, 09:30 AM",
    summary: "Added 3 fundamental molar equations (mass, gas volume, concentration) and Examiner Insight warning on cm3 to dm3 unit conversion.",
    publishedContent: `### 1. The Mole Concept
One mole of any substance contains 6.022 × 10²³ elementary particles (Avogadro's constant N_A).

### 2. Fundamental Molar Formulas
1. Mass to Moles: n = m / M_r
2. Gas Volume at r.t.p.: V = n × 24 dm³
3. Solution Concentration: c = n / V (where V is in dm³)`,
    draftContent: `### 1. The Mole Concept
One mole of any substance contains 6.022 × 10²³ elementary particles (Avogadro's constant N_A).

### 2. Fundamental Molar Formulas
1. Mass to Moles: n = m / M_r
2. Gas Volume at r.t.p.: V = n × 24 dm³
3. Solution Concentration: c = n / V (where V is in dm³)

> 💡 **Examiner Insight**: Always convert cm³ to dm³ by dividing by 1000 before calculating concentration! Common place to lose 1 mark in Paper 4.`,
    status: "pending"
  }
];

export default function ProofreadingQueuePage() {
  const { user } = useUser();
  const [queue, setQueue] = useState<PendingItem[]>(INITIAL_QUEUE);
  const [selectedId, setSelectedId] = useState<string>("queue_1");
  const [isSyncingNotion, setIsSyncingNotion] = useState<boolean>(false);
  const [syncResult, setSyncResult] = useState<string | null>(null);

  const selectedItem = queue.find((item) => item.id === selectedId) || queue[0];

  const handleApproveAndSync = async () => {
    if (!selectedItem) return;
    setIsSyncingNotion(true);

    try {
      // Call Notion API route to trigger sync
      const res = await fetch("/api/notion", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          topicId: selectedItem.topicId,
          title: selectedItem.topicTitle,
          content: selectedItem.draftContent,
          author: selectedItem.author,
          proofreader: user?.fullName || "Sarah T (Proofreader)",
          summary: selectedItem.summary
        })
      });
      const data = await res.json();

      setQueue((prev) =>
        prev.map((item) => (item.id === selectedId ? { ...item, status: "approved" } : item))
      );

      setSyncResult(
        `✅ Approved & Synced to Notion API! Live Notion Page updated for "${selectedItem.topicTitle}".`
      );
    } catch (err) {
      setSyncResult("Error syncing to Notion API.");
    } finally {
      setIsSyncingNotion(false);
      setTimeout(() => setSyncResult(null), 6000);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 font-sans selection:bg-blue-100 pb-24 pt-20 md:pt-10 md:pl-64">
      <Sidebar />

      <main className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-6">
        
        {/* Page Banner */}
        <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-50 border border-emerald-200 rounded text-[10px] font-black uppercase tracking-widest text-emerald-800">
              <ShieldCheck size={13} />
              <span>Proofreader Review Queue</span>
            </div>
            <h1 className="text-2xl font-bold text-gray-900 tracking-tight">
              Submitted Drafts & Proofreading Desk
            </h1>
            <p className="text-xs text-gray-500 max-w-xl">
              Review edits submitted by authorized student editors. Inspect side-by-side diffs, verify change logs, and click <strong>Approve & Sync to Notion</strong>.
            </p>
          </div>

          <div className="flex items-center gap-3 bg-emerald-50 border border-emerald-100 px-4 py-3 rounded-lg">
            <div className="w-9 h-9 rounded-full bg-emerald-700 text-white flex items-center justify-center font-bold text-sm">
              <ShieldCheck size={20} />
            </div>
            <div className="text-xs">
              <div className="font-bold text-gray-900">Proofreader Role Active</div>
              <span className="text-[10px] font-bold text-emerald-800 uppercase tracking-wider">
                {user?.fullName || "Sarah T"} • Authorized Verifier
              </span>
            </div>
          </div>
        </div>

        {/* Sync Result Alert */}
        {syncResult && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-emerald-900 text-white p-4 rounded-xl shadow-lg border border-emerald-700 flex items-center gap-3 text-xs font-bold"
          >
            <CheckCircle2 size={18} className="text-emerald-400 shrink-0" />
            <span>{syncResult}</span>
          </motion.div>
        )}

        {/* Main Review Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* Left List: Pending Queue Items */}
          <div className="lg:col-span-4 bg-white border border-gray-200 rounded-xl p-4 shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b pb-3 border-gray-100">
              <h2 className="text-xs font-bold text-gray-500 uppercase tracking-widest flex items-center gap-2">
                <Clock size={14} className="text-amber-600" />
                Pending Queue ({queue.filter((q) => q.status === "pending").length})
              </h2>
            </div>

            <div className="space-y-2">
              {queue.map((item) => {
                const isSelected = item.id === selectedId;
                return (
                  <button
                    key={item.id}
                    onClick={() => setSelectedId(item.id)}
                    className={`w-full text-left p-3.5 rounded-lg border transition-all flex flex-col gap-2 ${
                      isSelected
                        ? "border-emerald-600 bg-emerald-50/50 shadow-sm"
                        : "border-gray-100 hover:border-gray-300 hover:bg-gray-50"
                    }`}
                  >
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded bg-blue-50 text-blue-700">
                        {item.code}
                      </span>
                      {item.status === "approved" ? (
                        <span className="bg-emerald-100 text-emerald-800 text-[9px] font-extrabold px-2 py-0.5 rounded-full flex items-center gap-1">
                          <CheckCircle2 size={10} /> Synced to Notion
                        </span>
                      ) : (
                        <span className="bg-amber-100 text-amber-800 text-[9px] font-extrabold px-2 py-0.5 rounded-full flex items-center gap-1">
                          <Clock size={10} /> Needs Review
                        </span>
                      )}
                    </div>

                    <h3 className="text-xs font-bold text-gray-900 leading-snug">{item.topicTitle}</h3>

                    <div className="text-[10px] text-gray-500 font-medium">
                      👤 {item.author} ({item.authorSchool})
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right Panel: Side-by-Side Diff & Proofread Action Controls */}
          {selectedItem && (
            <div className="lg:col-span-8 space-y-4">
              
              {/* Header Info & Change Summary Card */}
              <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-gray-100 pb-3">
                  <div>
                    <span className="text-[10px] font-black text-blue-700 bg-blue-50 px-2 py-0.5 rounded uppercase">
                      {selectedItem.code}
                    </span>
                    <h2 className="text-xl font-bold text-gray-900 mt-1">{selectedItem.topicTitle}</h2>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      onClick={handleApproveAndSync}
                      disabled={isSyncingNotion || selectedItem.status === "approved"}
                      className="px-5 py-2.5 bg-emerald-700 hover:bg-emerald-800 disabled:opacity-50 text-white rounded-lg font-bold text-xs flex items-center gap-2 shadow-md transition-all"
                    >
                      {isSyncingNotion ? (
                        <span>Syncing to Notion API...</span>
                      ) : selectedItem.status === "approved" ? (
                        <>
                          <CheckCircle2 size={14} />
                          <span>Approved & Synced</span>
                        </>
                      ) : (
                        <>
                          <RefreshCw size={14} />
                          <span>Approve & Sync to Notion API</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>

                {/* Mandatory Change Log Display */}
                <div className="bg-blue-50/70 border border-blue-200 rounded-lg p-4 space-y-2">
                  <div className="flex items-center justify-between text-xs font-bold text-blue-900">
                    <div className="flex items-center gap-2">
                      <MessageSquare size={15} className="text-blue-700" />
                      <span>Author's Mandatory Change Log:</span>
                    </div>
                    <span className="text-[10px] text-blue-700 font-semibold">{selectedItem.submittedAt}</span>
                  </div>
                  <p className="text-xs text-blue-950 font-medium bg-white p-3 rounded border border-blue-100 italic">
                    "{selectedItem.summary}"
                  </p>
                  <div className="text-[11px] text-blue-800 font-medium">
                    Submitted by: <strong>{selectedItem.author}</strong> — <em>{selectedItem.authorSchool}</em>
                  </div>
                </div>

                {/* Side-by-Side Diff Comparison View */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs font-bold text-gray-500 uppercase tracking-widest px-1">
                    <span>Current Published Note</span>
                    <span className="text-emerald-700">Submitted Draft Revision</span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    
                    {/* Left: Published Content */}
                    <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 text-xs font-mono leading-relaxed space-y-2 max-h-96 overflow-y-auto">
                      <div className="text-[10px] font-bold text-gray-400 border-b pb-1 uppercase">Before</div>
                      <pre className="whitespace-pre-wrap font-sans text-gray-700">{selectedItem.publishedContent}</pre>
                    </div>

                    {/* Right: Submitted Draft with Highlighted Additions */}
                    <div className="bg-emerald-50/50 p-4 rounded-lg border border-emerald-300 text-xs font-mono leading-relaxed space-y-2 max-h-96 overflow-y-auto">
                      <div className="text-[10px] font-bold text-emerald-800 border-b border-emerald-200 pb-1 uppercase flex items-center justify-between">
                        <span>After (Draft)</span>
                        <span className="text-emerald-700 bg-emerald-100 px-1.5 py-0.2 rounded">+ Additions</span>
                      </div>
                      <pre className="whitespace-pre-wrap font-sans text-emerald-950">{selectedItem.draftContent}</pre>
                    </div>

                  </div>
                </div>

              </div>
            </div>
          )}

        </div>
      </main>
    </div>
  );
}
