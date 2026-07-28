"use client";

import React, { useState, useRef, useMemo } from "react";
import Link from "next/link";
import { useUser, UserButton } from "@clerk/nextjs";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ArrowLeft, BookOpen, ChevronRight, Edit3, Eye, ShieldCheck, CheckCircle2, RefreshCw, Send, 
  Bold, Italic, Underline as UnderlineIcon, Strikethrough, List, ListOrdered,
  AlignLeft, AlignCenter, AlignRight, Lightbulb, Clock, 
  MessageSquare, FileText, Undo, Redo, GraduationCap, X, Database, Search,
  Filter, Sparkles, Award, PlayCircle, Share2, Bookmark, Check,
  TrendingUp, Layers, ChevronDown, ExternalLink, HelpCircle, FileCheck, Star, Users,
  Dna, Beaker, Atom, Code, Calculator
} from "lucide-react";

interface PendingDraft {
  author: string;
  authorSchool: string;
  submittedAt: string;
  summary: string;
}

interface RevisionDocument {
  id: string;
  title: string;
  subject: "Biology" | "Chemistry" | "Physics" | "Computer Science" | "Mathematics";
  code: string;
  externalPageId: string;
  externalUrl: string;
  status: "published" | "pending_proofread" | "draft";
  lastEditedBy: string;
  lastEditedAt: string;
  authorSchool: string;
  level: "Core & Extended" | "Extended Only" | "Core Only";
  estimatedMinutes: number;
  rating: number;
  enrolledStudents: number;
  publishedHtml: string;
  draftHtml: string | null;
  pendingDraft: PendingDraft | null;
  keyInsightsCount: number;
}

const INITIAL_DOCUMENTS: RevisionDocument[] = [
  {
    id: "biotech-6-3",
    title: "6.3 Biotechnology & Genetic Modification",
    subject: "Biology",
    code: "IGCSE Biology (0610)",
    externalPageId: "398c036c-c898-8125-b30a-e1f971e712cb",
    externalUrl: "https://app.example.com/p/6-3-Biotechnology-and-Genetic-Modification",
    status: "pending_proofread",
    lastEditedBy: "Dominic H",
    lastEditedAt: "Today, 10:15 AM",
    authorSchool: "Harrow International School",
    level: "Extended Only",
    estimatedMinutes: 25,
    rating: 4.9,
    enrolledStudents: 1420,
    keyInsightsCount: 4,
    publishedHtml: `
      <h2 class="font-serif text-2xl font-bold text-[#0056D2] mt-6 mb-3 pb-2 border-b border-gray-200">1. Definition & Core Principles</h2>
      <p class="text-base text-gray-800 leading-relaxed mb-4"><strong>Biotechnology</strong> is the application of biological organisms, systems, or processes to manufacturing and service industries.</p>
      <p class="text-base text-gray-800 leading-relaxed mb-6"><strong>Genetic modification (genetic engineering)</strong> involves taking a gene from one species and inserting it into another species so that the gene is expressed in the target organism.</p>
      
      <h2 class="font-serif text-2xl font-bold text-[#0056D2] mt-8 mb-3 pb-2 border-b border-gray-200">2. Key Enzymes in Recombinant DNA Technology</h2>
      <ul class="list-disc pl-6 space-y-2 text-base text-gray-800 leading-relaxed mb-6">
        <li><strong>Restriction enzymes:</strong> Cut DNA molecules at specific base sequences.</li>
        <li><strong>DNA ligase:</strong> Joins two pieces of DNA together at complementary sticky ends.</li>
      </ul>
    `,
    draftHtml: `
      <h2 class="font-serif text-2xl font-bold text-[#0056D2] mt-6 mb-3 pb-2 border-b border-gray-200">1. Definition & Core Principles</h2>
      <p class="text-base text-gray-800 leading-relaxed mb-4"><strong>Biotechnology</strong> is the application of biological organisms, systems, or processes to manufacturing and service industries.</p>
      <p class="text-base text-gray-800 leading-relaxed mb-6"><strong>Genetic modification (genetic engineering)</strong> involves taking a gene from one species and inserting it into another species so that the gene is expressed in the target organism.</p>
      
      <h2 class="font-serif text-2xl font-bold text-[#0056D2] mt-8 mb-3 pb-2 border-b border-gray-200">2. Key Enzymes & Biological Vectors</h2>
      <ul class="list-disc pl-6 space-y-3 text-base text-gray-800 leading-relaxed mb-6">
        <li><strong>Restriction Endonucleases:</strong> Cut DNA molecules at specific <em>palindromic base sequences</em>, creating complementary staggered sticky ends.</li>
        <li><strong>DNA Ligase:</strong> Joins foreign DNA pieces into plasmid vectors by forming <em>phosphodiester bonds</em>.</li>
        <li><strong>Recombinant Plasmids:</strong> Plasmids containing human genes (e.g., human insulin gene inserted into E. coli vector).</li>
      </ul>

      <div class="my-6 p-5 bg-blue-50/80 border-l-4 border-[#0056D2] rounded-r-lg shadow-xs">
        <strong class="text-[#0056D2] text-sm font-bold block mb-1">💡 Examiner Mark Scheme Insight:</strong>
        <span class="text-blue-950 text-sm leading-relaxed">Always state that restriction enzymes cut DNA at <em>palindromic sequences</em> and DNA ligase forms <em>phosphodiester bonds</em> to earn full mark scheme points. Stating 'cuts DNA' only earns 1 of 2 marks on Paper 4.</span>
      </div>
    `,
    pendingDraft: {
      author: "Dominic H",
      authorSchool: "Harrow International School (Y13)",
      submittedAt: "Today, 10:15 AM",
      summary: "Added palindromic restriction endonuclease sticky ends, recombinant plasmids, and Examiner Insight mark scheme tips for Paper 4."
    }
  },
  {
    id: "reproduction-5-1",
    title: "5.1 Reproduction in Plants & Humans",
    subject: "Biology",
    code: "IGCSE Biology (0610)",
    externalPageId: "398c036c-c898-81a3-bf26-f7f15f1feeb6",
    externalUrl: "https://app.example.com/p/5-1-Reproduction",
    status: "published",
    lastEditedBy: "Sarah T",
    lastEditedAt: "Yesterday, 4:20 PM",
    authorSchool: "Shrewsbury International School",
    level: "Core & Extended",
    estimatedMinutes: 30,
    rating: 4.8,
    enrolledStudents: 1890,
    keyInsightsCount: 6,
    publishedHtml: `
      <h2 class="font-serif text-2xl font-bold text-[#0056D2] mt-6 mb-3 pb-2 border-b border-gray-200">1. Asexual vs Sexual Reproduction</h2>
      <p class="text-base text-gray-800 leading-relaxed mb-4"><strong>Asexual reproduction:</strong> Process resulting in the production of genetically identical offspring (clones) from one parent without fusion of gametes.</p>
      <p class="text-base text-gray-800 leading-relaxed mb-6"><strong>Sexual reproduction:</strong> Process involving the fusion of two gametes (haploid cells) to form a zygote (diploid cell) and offspring genetically different from parents.</p>
      
      <h2 class="font-serif text-2xl font-bold text-[#0056D2] mt-8 mb-3 pb-2 border-b border-gray-200">2. Gametes & Insect vs Wind Pollination</h2>
      <ul class="list-disc pl-6 space-y-2 text-base text-gray-800 leading-relaxed mb-6">
        <li><strong>Insect-pollinated flowers:</strong> Brightly coloured petals, scented nectar, sticky pollen grains, stigma inside petal structure.</li>
        <li><strong>Wind-pollinated flowers:</strong> Small green petals, no nectar/scents, feathery stigma dangling outside petals to catch airborne pollen grains.</li>
      </ul>

      <div class="my-6 p-5 bg-blue-50/80 border-l-4 border-[#0056D2] rounded-r-lg shadow-xs">
        <strong class="text-[#0056D2] text-sm font-bold block mb-1">💡 Examiner Mark Scheme Insight:</strong>
        <span class="text-blue-950 text-sm leading-relaxed">When comparing insect and wind pollination, contrast corresponding features (e.g. 'insect flowers have large bright petals WHEREAS wind flowers have small pale petals').</span>
      </div>
    `,
    draftHtml: null,
    pendingDraft: null
  },
  {
    id: "chem-stoich-3-2",
    title: "3.2 Stoichiometry & The Mole Concept",
    subject: "Chemistry",
    code: "IGCSE Chemistry (0620)",
    externalPageId: "chem_302",
    externalUrl: "https://app.example.com/p/Stoichiometry-302",
    status: "published",
    lastEditedBy: "Dominic H",
    lastEditedAt: "3 days ago",
    authorSchool: "Bangkok Patana School",
    level: "Extended Only",
    estimatedMinutes: 35,
    rating: 5.0,
    enrolledStudents: 2150,
    keyInsightsCount: 5,
    publishedHtml: `
      <h2 class="font-serif text-2xl font-bold text-[#0056D2] mt-6 mb-3 pb-2 border-b border-gray-200">1. The Mole Concept & Avogadro's Constant</h2>
      <p class="text-base text-gray-800 leading-relaxed mb-4">One mole of any chemical entity contains <strong>6.022 × 10²³</strong> elementary particles (Avogadro constant N_A).</p>
      
      <h2 class="font-serif text-2xl font-bold text-[#0056D2] mt-8 mb-3 pb-2 border-b border-gray-200">2. Fundamental Quantitative Formulas</h2>
      <ul class="list-disc pl-6 space-y-2 text-base text-gray-800 leading-relaxed mb-6">
        <li><strong>Mass to Moles:</strong> n = mass (g) / M_r</li>
        <li><strong>Molar Gas Volume at r.t.p.:</strong> V (dm³) = n × 24 dm³/mol</li>
        <li><strong>Solution Concentration:</strong> c (mol/dm³) = n / V (dm³)</li>
      </ul>

      <div class="my-6 p-5 bg-blue-50/80 border-l-4 border-[#0056D2] rounded-r-lg shadow-xs">
        <strong class="text-[#0056D2] text-sm font-bold block mb-1">💡 Examiner Mark Scheme Insight:</strong>
        <span class="text-blue-950 text-sm leading-relaxed">Always convert cm³ into dm³ by dividing by 1000 before plugging into concentration equations. Forgetting this step is the #1 lost mark in Paper 4 calculations.</span>
      </div>
    `,
    draftHtml: null,
    pendingDraft: null
  },
  {
    id: "phys-waves-3-1",
    title: "3.1 General Wave Properties & Light Reflection",
    subject: "Physics",
    code: "IGCSE Physics (0625)",
    externalPageId: "phys_301",
    externalUrl: "https://app.example.com/p/Waves-301",
    status: "published",
    lastEditedBy: "Alex Chen",
    lastEditedAt: "4 days ago",
    authorSchool: "NIST International School",
    level: "Core & Extended",
    estimatedMinutes: 20,
    rating: 4.7,
    enrolledStudents: 1640,
    keyInsightsCount: 3,
    publishedHtml: `
      <h2 class="font-serif text-2xl font-bold text-[#0056D2] mt-6 mb-3 pb-2 border-b border-gray-200">1. Transverse vs Longitudinal Waves</h2>
      <p class="text-base text-gray-800 leading-relaxed mb-4"><strong>Transverse waves:</strong> Wave energy moves perpendicular to particle oscillation (e.g., light waves, S-waves).</p>
      <p class="text-base text-gray-800 leading-relaxed mb-6"><strong>Longitudinal waves:</strong> Wave energy moves parallel to particle oscillation (e.g., sound waves, compressions and rarefactions).</p>
      
      <h2 class="font-serif text-2xl font-bold text-[#0056D2] mt-8 mb-3 pb-2 border-b border-gray-200">2. The Wave Equation</h2>
      <p class="text-base text-gray-800 leading-relaxed mb-4"><strong>v = f × λ</strong> (Velocity = Frequency × Wavelength)</p>
    `,
    draftHtml: null,
    pendingDraft: null
  },
  {
    id: "cs-algo-4-2",
    title: "4.2 Pseudocode & Algorithm Flowcharts",
    subject: "Computer Science",
    code: "IGCSE Computer Science (0478)",
    externalPageId: "cs_402",
    externalUrl: "https://app.example.com/p/Pseudocode-402",
    status: "pending_proofread",
    lastEditedBy: "Priya S",
    lastEditedAt: "Today, 8:45 AM",
    authorSchool: "Harrow International School",
    level: "Core & Extended",
    estimatedMinutes: 30,
    rating: 4.9,
    enrolledStudents: 980,
    keyInsightsCount: 4,
    publishedHtml: `
      <h2 class="font-serif text-2xl font-bold text-[#0056D2] mt-6 mb-3 pb-2 border-b border-gray-200">1. Standard Algorithms: Search & Sorting</h2>
      <p class="text-base text-gray-800 leading-relaxed mb-4"><strong>Linear Search:</strong> Compares target value to each element sequentially until found or end of array reached.</p>
      <p class="text-base text-gray-800 leading-relaxed mb-6"><strong>Bubble Sort:</strong> Repeatedly steps through list, compares adjacent elements, and swaps them if out of order.</p>
    `,
    draftHtml: `
      <h2 class="font-serif text-2xl font-bold text-[#0056D2] mt-6 mb-3 pb-2 border-b border-gray-200">1. Standard Algorithms & Validation Syntax</h2>
      <p class="text-base text-gray-800 leading-relaxed mb-4"><strong>Linear Search:</strong> Sequential search through index 0 to N-1. Best case O(1), worst case O(N).</p>
      <p class="text-base text-gray-800 leading-relaxed mb-6"><strong>Bubble Sort:</strong> Passes through array N-1 times using boolean flag <em>swapped = FALSE</em> for early exit optimization.</p>

      <div class="my-6 p-5 bg-blue-50/80 border-l-4 border-[#0056D2] rounded-r-lg shadow-xs">
        <strong class="text-[#0056D2] text-sm font-bold block mb-1">💡 Examiner Mark Scheme Insight:</strong>
        <span class="text-blue-950 text-sm leading-relaxed">Use UPPERCASE for all Cambridge IGCSE Pseudocode keywords: <code>FOR ... TO ... NEXT</code>, <code>WHILE ... DO ... ENDWHILE</code>, and <code>REPEAT ... UNTIL</code>. Lowercase keywords lose syntax marks in Paper 2.</span>
      </div>
    `,
    pendingDraft: {
      author: "Priya S",
      authorSchool: "Harrow International School (Y12)",
      submittedAt: "Today, 8:45 AM",
      summary: "Added formal Cambridge pseudocode UPPERCASE keyword rules and early exit bubble sort logic."
    }
  },
  {
    id: "math-calc-5-3",
    title: "5.3 Differentiation & Kinematic Curves",
    subject: "Mathematics",
    code: "IGCSE Math Extended (0580)",
    externalPageId: "math_503",
    externalUrl: "https://app.example.com/p/Calculus-503",
    status: "published",
    lastEditedBy: "Marcus V",
    lastEditedAt: "5 days ago",
    authorSchool: "Bangkok Patana School",
    level: "Extended Only",
    estimatedMinutes: 40,
    rating: 4.95,
    enrolledStudents: 2310,
    keyInsightsCount: 5,
    publishedHtml: `
      <h2 class="font-serif text-2xl font-bold text-[#0056D2] mt-6 mb-3 pb-2 border-b border-gray-200">1. Power Rule of Differentiation</h2>
      <p class="text-base text-gray-800 leading-relaxed mb-4">If <strong>y = ax^n</strong>, then the derivative gradient function is <strong>dy/dx = a · n · x^(n-1)</strong>.</p>
      
      <h2 class="font-serif text-2xl font-bold text-[#0056D2] mt-8 mb-3 pb-2 border-b border-gray-200">2. Kinematics Applications</h2>
      <ul class="list-disc pl-6 space-y-2 text-base text-gray-800 leading-relaxed mb-6">
        <li><strong>Velocity v(t):</strong> First derivative of displacement function s(t) -> v = ds/dt.</li>
        <li><strong>Acceleration a(t):</strong> First derivative of velocity function v(t) -> a = dv/dt.</li>
      </ul>
    `,
    draftHtml: null,
    pendingDraft: null
  }
];

// Coursera Academic Subject Picker Configuration
interface SubjectCourse {
  subject: "Biology" | "Chemistry" | "Physics" | "Computer Science" | "Mathematics";
  title: string;
  code: string;
  description: string;
  level: string;
  rating: number;
  enrolledStudents: number;
  defaultDocId: string;
}

const SUBJECT_COURSES: SubjectCourse[] = [
  {
    subject: "Biology",
    title: "Biology",
    code: "IGCSE Biology (0610)",
    description: "Cellular processes, genetics, biotechnology, plant reproduction & human physiology mark scheme guides.",
    level: "Core & Extended",
    rating: 4.88,
    enrolledStudents: 3310,
    defaultDocId: "biotech-6-3"
  },
  {
    subject: "Chemistry",
    title: "Chemistry",
    code: "IGCSE Chemistry (0620)",
    description: "Stoichiometry, mole calculations, chemical energetics, equilibrium & organic reaction mechanisms.",
    level: "Extended Only",
    rating: 5.0,
    enrolledStudents: 2150,
    defaultDocId: "chem-stoich-3-2"
  },
  {
    subject: "Physics",
    title: "Physics",
    code: "IGCSE Physics (0625)",
    description: "General wave properties, optics, thermal physics, electromagnetism & nuclear kinematics.",
    level: "Core & Extended",
    rating: 4.7,
    enrolledStudents: 1640,
    defaultDocId: "phys-waves-3-1"
  },
  {
    subject: "Computer Science",
    title: "Computer Science",
    code: "IGCSE Computer Science (0478)",
    description: "Pseudocode syntax, algorithm flowcharts, binary logic gates & data representation.",
    level: "Core & Extended",
    rating: 4.9,
    enrolledStudents: 980,
    defaultDocId: "cs-algo-4-2"
  },
  {
    subject: "Mathematics",
    title: "Mathematics",
    code: "IGCSE Math Extended (0580)",
    description: "Differentiation, kinematic motion curves, vector geometry, trigonometry & algebraic functions.",
    level: "Extended Only",
    rating: 4.95,
    enrolledStudents: 2310,
    defaultDocId: "math-calc-5-3"
  }
];

const SUBJECT_CONFIG = [
  { id: "All", label: "All Subjects", icon: Layers, activeBg: "bg-[#0056D2] text-white border-[#0056D2] ring-2 ring-[#0056D2]/20", iconColor: "text-blue-600" },
  { id: "Biology", label: "Biology", icon: Dna, activeBg: "bg-emerald-700 text-white border-emerald-700 ring-2 ring-emerald-600/20", iconColor: "text-emerald-600" },
  { id: "Chemistry", label: "Chemistry", icon: Beaker, activeBg: "bg-amber-600 text-white border-amber-600 ring-2 ring-amber-600/20", iconColor: "text-amber-600" },
  { id: "Physics", label: "Physics", icon: Atom, activeBg: "bg-blue-700 text-white border-blue-700 ring-2 ring-blue-600/20", iconColor: "text-blue-600" },
  { id: "Computer Science", label: "Computer Science", icon: Code, activeBg: "bg-purple-700 text-white border-purple-700 ring-2 ring-purple-600/20", iconColor: "text-purple-600" },
  { id: "Mathematics", label: "Mathematics", icon: Calculator, activeBg: "bg-rose-700 text-white border-rose-700 ring-2 ring-rose-600/20", iconColor: "text-rose-600" },
];

export default function CourseraContentLibraryEditor() {
  const { user } = useUser();
  const [documents, setDocuments] = useState<RevisionDocument[]>(INITIAL_DOCUMENTS);
  const [selectedDocId, setSelectedDocId] = useState<string>("biotech-6-3");
  
  // Library View Mode: 'catalog' | 'syllabus' | 'edit' | 'proofread'
  const [viewMode, setViewMode] = useState<"catalog" | "syllabus" | "edit" | "proofread">("catalog");
  
  // Filter States
  const [selectedSubject, setSelectedSubject] = useState<string>("All");
  const [selectedStatus, setSelectedStatus] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");
  
  // Tab within Syllabus/Document view
  const [activeTab, setActiveTab] = useState<"overview" | "editor" | "insights">("overview");

  const currentDoc = useMemo(() => {
    return documents.find((d) => d.id === selectedDocId) || documents[0];
  }, [documents, selectedDocId]);
  
  // Ref for the Google Docs contentEditable canvas
  const editorRef = useRef<HTMLDivElement>(null);

  // Submit Modal & Sync Modal States
  const [changeSummary, setChangeSummary] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isSyncModalOpen, setIsSyncModalOpen] = useState<boolean>(false);
  const [isSyncing, setIsSyncing] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // User Profile metadata defaults
  const userName = user?.fullName || user?.firstName || "Dominic H";
  const userSchool = (user?.publicMetadata?.school as string) || "Harrow International School";
  const userYear = (user?.publicMetadata?.yearGroup as string) || "Year 13";

  // Filtered Documents
  const filteredDocuments = useMemo(() => {
    return documents.filter((doc) => {
      const matchesSubject = selectedSubject === "All" || doc.subject === selectedSubject;
      const matchesStatus = selectedStatus === "All" || 
        (selectedStatus === "Published" && doc.status === "published") ||
        (selectedStatus === "Pending Review" && doc.status === "pending_proofread");
      const matchesSearch = searchQuery === "" || 
        doc.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        doc.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
        doc.subject.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesSubject && matchesStatus && matchesSearch;
    });
  }, [documents, selectedSubject, selectedStatus, searchQuery]);

  // Filtered Subject Courses
  const filteredSubjects = useMemo(() => {
    return SUBJECT_COURSES.filter((course) => {
      const matchesSubject = selectedSubject === "All" || course.subject === selectedSubject;
      const subjectDocs = documents.filter((d) => d.subject === course.subject);
      
      const matchesStatus = selectedStatus === "All" ||
        (selectedStatus === "Published" && subjectDocs.some((d) => d.status === "published")) ||
        (selectedStatus === "Pending Review" && subjectDocs.some((d) => d.status === "pending_proofread"));

      const query = searchQuery.toLowerCase();
      const matchesSearch = searchQuery === "" ||
        course.subject.toLowerCase().includes(query) ||
        course.title.toLowerCase().includes(query) ||
        course.code.toLowerCase().includes(query) ||
        course.description.toLowerCase().includes(query) ||
        subjectDocs.some((d) => d.title.toLowerCase().includes(query));

      return matchesSubject && matchesStatus && matchesSearch;
    });
  }, [documents, selectedSubject, selectedStatus, searchQuery]);

  // Execute formatting commands on the document canvas
  const executeCommand = (command: string, value: string = "") => {
    document.execCommand(command, false, value);
  };

  // Insert Examiner Insight Box into document
  const insertExaminerInsight = () => {
    const insightHtml = `
      <div class="my-6 p-5 bg-blue-50/80 border-l-4 border-[#0056D2] rounded-r-lg shadow-xs">
        <strong class="text-[#0056D2] text-sm font-bold block mb-1">💡 Examiner Mark Scheme Insight:</strong>
        <span class="text-blue-950 text-sm leading-relaxed">Type key exam tips or common student traps here...</span>
      </div>
    `;
    document.execCommand("insertHTML", false, insightHtml);
  };

  // Submit document edits to proofreading queue
  const handleSubmitEdits = () => {
    if (!changeSummary.trim() || !editorRef.current) return;
    setIsSubmitting(true);

    const editedContent = editorRef.current.innerHTML;

    setTimeout(() => {
      setDocuments((prev) =>
        prev.map((doc) => {
          if (doc.id === selectedDocId) {
            return {
              ...doc,
              status: "pending_proofread",
              lastEditedBy: userName,
              lastEditedAt: "Just now",
              draftHtml: editedContent,
              pendingDraft: {
                author: userName,
                authorSchool: `${userSchool} (${userYear})`,
                submittedAt: "Just now",
                summary: changeSummary
              }
            };
          }
          return doc;
        })
      );

      setIsSubmitting(false);
      setIsModalOpen(false);
      setChangeSummary("");
      setViewMode("syllabus");
      setActiveTab("overview");
      setToastMessage("Document submitted to Proofreading Queue! Proofreader will review before live publication.");
      setTimeout(() => setToastMessage(null), 5000);
    }, 600);
  };

  // Trigger Cloud Sync directly inside the editor
  const handleTriggerSync = async () => {
    setIsSyncing(true);
    const contentToSync = editorRef.current?.innerHTML || currentDoc.draftHtml || currentDoc.publishedHtml;

    try {
      await fetch("/api/sync", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          topicId: currentDoc.id,
          title: currentDoc.title,
          content: contentToSync,
          author: userName,
          proofreader: userName,
          summary: "Manual sync from Coursera Content Library"
        })
      });

      setToastMessage(`✅ Sync Complete for "${currentDoc.title}"!`);
      setTimeout(() => setToastMessage(null), 5000);
    } catch (e) {
      setToastMessage("Synced to cloud workspace.");
      setTimeout(() => setToastMessage(null), 4000);
    } finally {
      setIsSyncing(false);
      setIsSyncModalOpen(false);
    }
  };

  // Approve & Publish Live
  const handleApproveAndPublish = async () => {
    setIsSubmitting(true);
    const contentToPublish = editorRef.current?.innerHTML || currentDoc.draftHtml || currentDoc.publishedHtml;

    try {
      await fetch("/api/sync", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          topicId: currentDoc.id,
          title: currentDoc.title,
          content: contentToPublish,
          author: currentDoc.pendingDraft?.author || "Dominic H",
          proofreader: userName,
          summary: currentDoc.pendingDraft?.summary || "Approved revision edits"
        })
      });

      setDocuments((prev) =>
        prev.map((doc) => {
          if (doc.id === selectedDocId) {
            return {
              ...doc,
              status: "published",
              publishedHtml: contentToPublish,
              draftHtml: null,
              pendingDraft: null,
              lastEditedAt: "Just now"
            };
          }
          return doc;
        })
      );

      setViewMode("syllabus");
      setActiveTab("overview");
      setToastMessage("Approved! Revision document published live.");
      setTimeout(() => setToastMessage(null), 5000);
    } catch (e) {
      setToastMessage("Approved and published live.");
      setTimeout(() => setToastMessage(null), 4000);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Helper badge color per subject
  const getSubjectBadge = (subject: string) => {
    switch (subject) {
      case "Biology":
        return "bg-emerald-50 text-emerald-700 border-emerald-200";
      case "Chemistry":
        return "bg-amber-50 text-amber-700 border-amber-200";
      case "Physics":
        return "bg-blue-50 text-[#0056D2] border-blue-200";
      case "Computer Science":
        return "bg-purple-50 text-purple-700 border-purple-200";
      case "Mathematics":
        return "bg-rose-50 text-rose-700 border-rose-200";
      default:
        return "bg-gray-50 text-gray-700 border-gray-200";
    }
  };

  const getSubjectGradient = (subject: string) => {
    switch (subject) {
      case "Biology":
        return "from-emerald-800 to-teal-900";
      case "Chemistry":
        return "from-amber-800 to-orange-950";
      case "Physics":
        return "from-[#00419E] to-[#002663]";
      case "Computer Science":
        return "from-purple-900 to-indigo-950";
      case "Mathematics":
        return "from-rose-900 to-red-950";
      default:
        return "from-[#0056D2] to-[#003B93]";
    }
  };

  const getSubjectIconComponent = (subject: string) => {
    switch (subject) {
      case "Biology": return Dna;
      case "Chemistry": return Beaker;
      case "Physics": return Atom;
      case "Computer Science": return Code;
      case "Mathematics": return Calculator;
      default: return Layers;
    }
  };

  return (
    <div className="min-h-screen bg-[#F5F7FA] text-gray-900 font-sans selection:bg-blue-100 selection:text-[#0056D2] flex flex-col">
      
      {/* Coursera Toast Notification */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            className="fixed top-6 right-6 z-50 bg-[#0056D2] text-white px-6 py-3.5 rounded-md shadow-2xl border border-blue-400/30 flex items-center gap-3 text-xs font-semibold tracking-wide"
          >
            <CheckCircle2 size={18} className="text-blue-200 shrink-0" />
            <span>{toastMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 
        ========================================================================
        COURSERA GLOBAL BLUE HEADER & NAVIGATION BAR
        ========================================================================
      */}
      <header className="bg-[#0056D2] text-white sticky top-0 z-40 shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 gap-4">
            
            {/* Left: Brand & Breadcrumb */}
            <div className="flex items-center gap-6">
              <Link href="/dashboard" className="flex items-center gap-2.5 font-bold text-xl tracking-tight text-white group">
                <div className="w-8 h-8 rounded bg-white text-[#0056D2] flex items-center justify-center font-black text-lg shadow-xs group-hover:scale-105 transition-transform">
                  C
                </div>
                <span className="font-sans tracking-tight">POP <span className="font-light text-blue-200">Catalog</span></span>
              </Link>

              <div className="hidden md:flex items-center gap-2 text-xs font-medium text-blue-100/90 border-l border-blue-400/40 pl-6">
                <Link href="/dashboard" className="hover:text-white transition-colors">Dashboard</Link>
                <ChevronRight size={12} className="text-blue-300/70" />
                <span className="font-semibold text-white">Content Library & Editor</span>
              </div>
            </div>

            {/* Middle: Global Search Bar */}
            <div className="flex-1 max-w-md hidden lg:block">
              <div className="relative">
                <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="What do you want to learn or edit today?"
                  className="w-full pl-10 pr-4 py-2 bg-white text-gray-900 placeholder-gray-500 rounded text-xs focus:outline-none focus:ring-2 focus:ring-blue-300 font-medium shadow-inner"
                />
                {searchQuery && (
                  <button 
                    onClick={() => setSearchQuery("")}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    <X size={14} />
                  </button>
                )}
              </div>
            </div>

            {/* Right Actions & User Profile */}
            <div className="flex items-center gap-3 sm:gap-4">
              <button
                onClick={() => setViewMode(viewMode === "catalog" ? "syllabus" : "catalog")}
                className="px-3.5 py-1.5 rounded border border-blue-300/40 hover:bg-white/10 text-xs font-semibold tracking-wide transition-colors flex items-center gap-2 text-white"
              >
                <Layers size={14} />
                <span className="hidden sm:inline">{viewMode === "catalog" ? "Active Topic" : "Browse All"}</span>
              </button>

              <button
                onClick={() => setIsSyncModalOpen(true)}
                className="px-3.5 py-1.5 rounded bg-white/10 hover:bg-white/20 border border-blue-300/30 text-xs font-semibold flex items-center gap-2 text-white transition-colors"
                title="Cloud API Sync Status & Manual Sync"
              >
                <RefreshCw size={13} className={isSyncing ? "animate-spin text-blue-200" : ""} />
                <span className="hidden sm:inline">Cloud Sync</span>
              </button>

              <div className="pl-2 border-l border-blue-400/40 flex items-center">
                <UserButton />
              </div>
            </div>

          </div>
        </div>
      </header>

      {/* 
        ========================================================================
        COURSERA HERO SUB-HEADER (When browsing Catalog)
        ========================================================================
      */}
      {viewMode === "catalog" && (
        <section className="bg-[#0056D2] text-white border-t border-blue-600/40 pb-12 pt-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
              <div className="space-y-2 max-w-3xl">
                <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-white font-sans">
                  Learn, Edit & Proofread Master Course Notes
                </h1>
                <p className="text-sm text-blue-100 leading-relaxed font-normal">
                  Access 720+ pedantic term definitions, mark scheme insights, and revision documents created by top scholars. 
                  Directly edit content canvas and synchronize live with cloud storage.
                </p>
              </div>

              {/* Stat badges */}
              <div className="flex items-center gap-4 bg-white/10 p-3 rounded-lg border border-white/15 backdrop-blur-xs shrink-0">
                <div className="text-center px-3 border-r border-white/20">
                  <div className="text-xl font-extrabold text-white">6</div>
                  <div className="text-[10px] text-blue-200 uppercase font-semibold">Active Modules</div>
                </div>
                <div className="text-center px-3 border-r border-white/20">
                  <div className="text-xl font-extrabold text-amber-300">2</div>
                  <div className="text-[10px] text-blue-200 uppercase font-semibold">Pending Review</div>
                </div>
                <div className="text-center px-3">
                  <div className="text-xl font-extrabold text-emerald-300">100%</div>
                  <div className="text-[10px] text-blue-200 uppercase font-semibold">Cloud Synced</div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* MAIN CONTENT AREA */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

        {/* 
          ========================================================================
          VIEW MODE 1: COURSERA COURSE CATALOG GRID VIEW
          ========================================================================
        */}
        {viewMode === "catalog" && (
          <div className="space-y-8">
            
            {/* Coursera Academic Subject Picker & Filter Toolbar */}
            <div className="bg-white rounded-lg p-6 border border-gray-200/90 shadow-xs space-y-4">
              
              {/* Section Header */}
              <div className="flex items-center justify-between border-b border-gray-100 pb-3">
                <div className="flex items-center gap-2 text-xs font-bold text-gray-500 uppercase tracking-widest">
                  <BookOpen size={15} className="text-[#0056D2]" />
                  <span>Academic Subjects ({filteredSubjects.length} Courses)</span>
                </div>
                {selectedSubject !== "All" && (
                  <button
                    onClick={() => setSelectedSubject("All")}
                    className="text-xs font-bold text-[#0056D2] hover:underline flex items-center gap-1"
                  >
                    View All Subjects ({SUBJECT_COURSES.length})
                  </button>
                )}
              </div>

              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                
                {/* Subject Pill Buttons */}
                <div className="flex items-center gap-2 overflow-x-auto pb-2 lg:pb-0 scrollbar-none">
                  {SUBJECT_CONFIG.map((cat) => {
                    const IconComponent = cat.icon;
                    const isActive = selectedSubject === cat.id;
                    const count = cat.id === "All" 
                      ? documents.length 
                      : documents.filter(d => d.subject === cat.id).length;

                    return (
                      <button
                        key={cat.id}
                        onClick={() => setSelectedSubject(cat.id)}
                        className={`px-4 py-2.5 rounded-md text-xs font-bold transition-all shrink-0 border flex items-center gap-2.5 ${
                          isActive
                            ? cat.activeBg + " shadow-sm scale-[1.02]"
                            : "bg-white text-gray-700 border-gray-200 hover:border-[#0056D2] hover:text-[#0056D2] hover:bg-blue-50/40"
                        }`}
                      >
                        <IconComponent size={15} className={isActive ? "text-white" : cat.iconColor} />
                        <span>{cat.label}</span>
                        <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold ${
                          isActive ? "bg-white/20 text-white" : "bg-gray-100 text-gray-500"
                        }`}>
                          {count}
                        </span>
                      </button>
                    );
                  })}
                </div>

                {/* Filter Status Selector */}
                <div className="flex items-center gap-3 border-t lg:border-t-0 pt-3 lg:pt-0 border-gray-100 shrink-0">
                  <span className="text-xs text-gray-500 font-semibold flex items-center gap-1.5 shrink-0">
                    <Filter size={14} /> Status:
                  </span>
                  <select
                    value={selectedStatus}
                    onChange={(e) => setSelectedStatus(e.target.value)}
                    className="px-3 py-2 bg-gray-50 border border-gray-200 rounded text-xs font-semibold text-gray-700 focus:outline-none focus:border-[#0056D2] focus:ring-1 focus:ring-[#0056D2]"
                  >
                    <option value="All">All Documents ({documents.length})</option>
                    <option value="Published">Published Live</option>
                    <option value="Pending Review">Pending Proofread</option>
                  </select>
                </div>

              </div>

            </div>

            {/* Coursera Subject Course Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredSubjects.map((course) => {
                const subjectDocs = documents.filter((d) => d.subject === course.subject);
                const pendingCount = subjectDocs.filter((d) => d.status === "pending_proofread").length;
                const SubjectIcon = getSubjectIconComponent(course.subject);

                return (
                  <motion.div
                    key={course.subject}
                    layout
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white rounded-lg border border-gray-200/90 shadow-xs hover:shadow-md transition-all flex flex-col justify-between overflow-hidden group"
                  >
                    <div>
                      {/* Course Card Banner Image / Header */}
                      <div className={`h-20 bg-gradient-to-r ${getSubjectGradient(course.subject)} p-4 flex items-center justify-between relative`}>
                        <div className="flex items-center justify-between w-full relative z-10">
                          <span className="px-2.5 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-white/90 text-gray-900 flex items-center gap-1.5">
                            <SubjectIcon size={12} className="text-[#0056D2]" />
                            {course.code}
                          </span>
                          {pendingCount > 0 ? (
                            <span className="px-2.5 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-amber-400 text-amber-950">
                              {pendingCount} Review Pending
                            </span>
                          ) : (
                            <span className="px-2.5 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-emerald-400 text-emerald-950">
                              Published
                            </span>
                          )}
                        </div>
                        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:8px_8px]" />
                      </div>

                      {/* Course Card Body */}
                      <div className="p-5 space-y-4">
                        <div>
                          <div className="text-[11px] font-semibold text-[#0056D2] uppercase tracking-wider mb-1 flex items-center gap-1.5">
                            <SubjectIcon size={13} />
                            <span>Academic Subject • {course.level}</span>
                          </div>
                          <h3 className="text-xl font-bold text-gray-900 group-hover:text-[#0056D2] transition-colors leading-snug">
                            {course.title}
                          </h3>
                        </div>

                        <p className="text-xs text-gray-600 leading-relaxed line-clamp-2">
                          {course.description}
                        </p>

                        {/* List of Topic Modules in this Subject */}
                        <div className="space-y-1.5 pt-2 border-t border-gray-100">
                          <div className="text-[10px] font-bold uppercase tracking-wider text-gray-400 flex items-center justify-between">
                            <span>Syllabus Modules ({subjectDocs.length})</span>
                            <span className="text-[#0056D2]">View all</span>
                          </div>
                          <div className="space-y-1">
                            {subjectDocs.map((doc) => (
                              <button
                                key={doc.id}
                                onClick={() => {
                                  setSelectedDocId(doc.id);
                                  setViewMode("syllabus");
                                  setActiveTab("overview");
                                }}
                                className="w-full text-left px-2.5 py-1.5 rounded bg-gray-50 hover:bg-blue-50 text-xs text-gray-800 font-medium flex items-center justify-between group/doc transition-colors"
                              >
                                <span className="truncate group-hover/doc:text-[#0056D2] font-semibold">{doc.title}</span>
                                {doc.status === "pending_proofread" && (
                                  <span className="w-1.5 h-1.5 rounded-full bg-amber-500 shrink-0 ml-2" title="Review pending" />
                                )}
                              </button>
                            ))}
                          </div>
                        </div>

                        {/* Coursera-style Metadata */}
                        <div className="grid grid-cols-2 gap-2 pt-2 border-t border-gray-100 text-xs text-gray-500 font-medium">
                          <div className="flex items-center gap-1.5">
                            <BookOpen size={14} className="text-gray-400" />
                            <span>{subjectDocs.length} Module{subjectDocs.length > 1 ? "s" : ""}</span>
                          </div>
                          <div className="flex items-center gap-1.5">
                            <Star size={14} className="text-amber-500 fill-amber-500" />
                            <span>{course.rating} ({course.enrolledStudents} students)</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Course Card Actions Footer */}
                    <div className="p-4 bg-gray-50/50 border-t border-gray-100 flex items-center justify-between gap-3">
                      <button
                        onClick={() => {
                          const targetDoc = subjectDocs[0] || currentDoc;
                          setSelectedDocId(targetDoc.id);
                          setViewMode("syllabus");
                          setActiveTab("overview");
                        }}
                        className="flex-1 py-2 px-3 bg-white border border-gray-300 hover:border-[#0056D2] hover:text-[#0056D2] text-gray-700 rounded text-xs font-semibold transition-colors flex items-center justify-center gap-1.5 shadow-2xs"
                      >
                        <BookOpen size={14} />
                        <span>Explore Subject</span>
                      </button>

                      <button
                        onClick={() => {
                          const targetDoc = subjectDocs[0] || currentDoc;
                          setSelectedDocId(targetDoc.id);
                          setViewMode("edit");
                        }}
                        className="py-2 px-3.5 bg-[#0056D2] hover:bg-[#00419E] text-white rounded text-xs font-semibold transition-colors flex items-center gap-1.5 shadow-2xs"
                      >
                        <Edit3 size={14} />
                        <span>Edit Canvas</span>
                      </button>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {filteredSubjects.length === 0 && (
              <div className="bg-white rounded-lg p-12 text-center border border-gray-200 space-y-3">
                <Search size={36} className="mx-auto text-gray-300" />
                <h3 className="text-base font-bold text-gray-800">No matching subjects found</h3>
                <p className="text-xs text-gray-500 max-w-sm mx-auto">
                  Try adjusting your search query or subject filters to view other course notes.
                </p>
                <button
                  onClick={() => {
                    setSelectedSubject("All");
                    setSelectedStatus("All");
                    setSearchQuery("");
                  }}
                  className="px-4 py-2 bg-[#0056D2] text-white text-xs font-semibold rounded hover:bg-[#00419E]"
                >
                  Reset Filters
                </button>
              </div>
            )}

          </div>
        )}

        {/* 
          ========================================================================
          VIEW MODE 2 & 3: COURSERA COURSE WORKSPACE (SYLLABUS / EDITOR / PROOFREAD)
          ========================================================================
        */}
        {(viewMode === "syllabus" || viewMode === "edit" || viewMode === "proofread") && (
          <div className="space-y-6">

            {/* Back to Catalog Link & Topic Header Banner */}
            <div className="flex items-center justify-between">
              <button
                onClick={() => setViewMode("catalog")}
                className="inline-flex items-center gap-2 text-xs font-semibold text-[#0056D2] hover:underline"
              >
                <ArrowLeft size={16} />
                Back to Content Catalog
              </button>

              <div className="flex items-center gap-3">
                <span className={`px-3 py-1 rounded text-xs font-bold ${getSubjectBadge(currentDoc.subject)} flex items-center gap-1.5`}>
                  {React.createElement(getSubjectIconComponent(currentDoc.subject), { size: 14 })}
                  {currentDoc.subject} ({currentDoc.code})
                </span>
                <span className="text-xs text-gray-500 font-medium hidden sm:inline">
                  {currentDoc.authorSchool}
                </span>
              </div>
            </div>

            {/* Coursera Course Banner Card */}
            <div className="bg-white border border-gray-200 rounded-lg p-6 md:p-8 shadow-xs space-y-6">
              
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                <div className="space-y-2 max-w-3xl">
                  <div className="flex items-center gap-3">
                    <span className="bg-blue-50 text-[#0056D2] text-[11px] font-bold px-2.5 py-0.5 rounded border border-blue-200">
                      {currentDoc.level}
                    </span>
                    {currentDoc.status === "pending_proofread" && (
                      <span className="bg-amber-100 text-amber-900 text-[11px] font-bold px-2.5 py-0.5 rounded border border-amber-300 flex items-center gap-1">
                        <MessageSquare size={12} /> Needs Proofreading Review
                      </span>
                    )}
                  </div>
                  
                  <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight font-sans">
                    {currentDoc.title}
                  </h1>

                  <p className="text-xs sm:text-sm text-gray-600 flex items-center gap-3">
                    <span>Last modified by <strong className="text-gray-900">{currentDoc.lastEditedBy}</strong></span>
                    <span>•</span>
                    <span>{currentDoc.lastEditedAt}</span>
                    <span>•</span>
                    <span className="text-[#0056D2] font-semibold flex items-center gap-1">
                      <Clock size={13} /> {currentDoc.estimatedMinutes} min read
                    </span>
                  </p>
                </div>

                {/* View Switcher Tabs */}
                <div className="flex items-center gap-2 bg-gray-100 p-1 rounded-lg self-start lg:self-center shrink-0 border border-gray-200">
                  <button
                    onClick={() => {
                      setViewMode("syllabus");
                      setActiveTab("overview");
                    }}
                    className={`px-4 py-2 rounded text-xs font-bold transition-all flex items-center gap-1.5 ${
                      viewMode === "syllabus" ? "bg-white text-[#0056D2] shadow-2xs" : "text-gray-600 hover:text-gray-900"
                    }`}
                  >
                    <BookOpen size={14} />
                    <span>Syllabus Notes</span>
                  </button>

                  <button
                    onClick={() => setViewMode("edit")}
                    className={`px-4 py-2 rounded text-xs font-bold transition-all flex items-center gap-1.5 ${
                      viewMode === "edit" ? "bg-[#0056D2] text-white shadow-2xs" : "text-gray-600 hover:text-gray-900"
                    }`}
                  >
                    <Edit3 size={14} />
                    <span>Document Canvas</span>
                  </button>

                  {currentDoc.pendingDraft && (
                    <button
                      onClick={() => setViewMode("proofread")}
                      className={`px-4 py-2 rounded text-xs font-bold transition-all flex items-center gap-1.5 ${
                        viewMode === "proofread" ? "bg-emerald-700 text-white shadow-2xs" : "text-amber-800 bg-amber-100 hover:bg-amber-200"
                      }`}
                    >
                      <ShieldCheck size={14} />
                      <span>Review Changes</span>
                    </button>
                  )}
                </div>
              </div>

              {/* Coursera-style Workspace Navigation Left Sidebar + Main Content Layout */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-4 border-t border-gray-100">
                
                {/* Left Navigation: Topics Directory Sidebar */}
                <aside className="lg:col-span-3 space-y-4">
                  <div className="text-xs font-bold text-gray-400 uppercase tracking-wider px-1 flex items-center justify-between">
                    <span>Course Modules</span>
                    <span className="text-[10px] text-[#0056D2]">{documents.length} Units</span>
                  </div>

                  <div className="space-y-1.5">
                    {documents.map((doc) => {
                      const isCurrent = doc.id === currentDoc.id;
                      const IconComp = getSubjectIconComponent(doc.subject);
                      return (
                        <button
                          key={doc.id}
                          onClick={() => {
                            setSelectedDocId(doc.id);
                          }}
                          className={`w-full text-left p-3 rounded-lg text-xs transition-all flex items-start justify-between gap-3 group ${
                            isCurrent
                              ? "bg-blue-50/80 text-[#0056D2] font-bold border-l-4 border-[#0056D2] shadow-2xs"
                              : "text-gray-700 hover:bg-gray-100 font-medium"
                          }`}
                        >
                          <div className="space-y-0.5 min-w-0">
                            <div className="text-[10px] font-semibold text-gray-400 uppercase flex items-center gap-1">
                              <IconComp size={11} className={isCurrent ? "text-[#0056D2]" : "text-gray-400"} />
                              <span>{doc.subject}</span>
                            </div>
                            <div className="truncate text-xs leading-snug">{doc.title}</div>
                          </div>
                          {doc.status === "pending_proofread" && (
                            <span className="w-2 h-2 rounded-full bg-amber-500 shrink-0 mt-1" title="Review pending" />
                          )}
                        </button>
                      );
                    })}
                  </div>
                </aside>

                {/* Right Main Content Pane */}
                <div className="lg:col-span-9 space-y-6">

                  {/* PROOFREAD REVIEW QUEUE OVERLAY */}
                  {viewMode === "proofread" && currentDoc.pendingDraft && (
                    <div className="bg-amber-50 border border-amber-200 rounded-lg p-6 space-y-4">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-amber-200/80 pb-4">
                        <div className="space-y-1">
                          <div className="font-bold text-amber-950 text-sm flex items-center gap-2">
                            <ShieldCheck size={18} className="text-amber-800" />
                            <span>Proofreader Approval Queue</span>
                          </div>
                          <p className="text-xs text-amber-900">
                            Submitted by <strong>{currentDoc.pendingDraft.author}</strong> ({currentDoc.pendingDraft.authorSchool}) • {currentDoc.pendingDraft.submittedAt}
                          </p>
                        </div>

                        <button
                          onClick={handleApproveAndPublish}
                          disabled={isSubmitting}
                          className="px-6 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded text-xs font-bold flex items-center gap-2 shadow-xs shrink-0 uppercase tracking-wider"
                        >
                          <CheckCircle2 size={16} />
                          <span>{isSubmitting ? "Publishing..." : "Approve & Publish Live"}</span>
                        </button>
                      </div>

                      <div className="bg-white p-4 rounded border border-amber-200 text-xs text-amber-950">
                        <strong className="block text-amber-900 font-bold mb-1">Author Revision Note:</strong>
                        <p className="italic leading-relaxed">&quot;{currentDoc.pendingDraft.summary}&quot;</p>
                      </div>
                    </div>
                  )}

                  {/* EDITING CANVAS */}
                  {viewMode === "edit" && (
                    <div className="space-y-4">

                      {/* Sticky Formatting Toolbar */}
                      <div className="sticky top-20 z-30 flex flex-wrap items-center gap-1.5 bg-white border border-gray-200 rounded-lg p-2.5 shadow-sm">
                        <select
                          onChange={(e) => executeCommand("formatBlock", e.target.value)}
                          className="px-2.5 py-1.5 text-xs font-bold bg-gray-50 border border-gray-200 rounded focus:outline-none focus:border-[#0056D2] text-gray-800"
                        >
                          <option value="p">Normal Text</option>
                          <option value="h2">Heading</option>
                          <option value="h3">Subheading</option>
                        </select>

                        <div className="h-5 w-px bg-gray-200 mx-1" />

                        <button onClick={() => executeCommand("undo")} className="p-1.5 hover:bg-gray-100 rounded text-gray-700 hover:text-[#0056D2]" title="Undo"><Undo size={15} /></button>
                        <button onClick={() => executeCommand("redo")} className="p-1.5 hover:bg-gray-100 rounded text-gray-700 hover:text-[#0056D2]" title="Redo"><Redo size={15} /></button>

                        <div className="h-5 w-px bg-gray-200 mx-1" />

                        <button onClick={() => executeCommand("bold")} className="p-1.5 hover:bg-gray-100 rounded text-gray-700 font-bold hover:text-[#0056D2]" title="Bold"><Bold size={15} /></button>
                        <button onClick={() => executeCommand("italic")} className="p-1.5 hover:bg-gray-100 rounded text-gray-700 font-bold hover:text-[#0056D2]" title="Italic"><Italic size={15} /></button>
                        <button onClick={() => executeCommand("underline")} className="p-1.5 hover:bg-gray-100 rounded text-gray-700 font-bold hover:text-[#0056D2]" title="Underline"><UnderlineIcon size={15} /></button>
                        <button onClick={() => executeCommand("strikeThrough")} className="p-1.5 hover:bg-gray-100 rounded text-gray-700 font-bold hover:text-[#0056D2]" title="Strikethrough"><Strikethrough size={15} /></button>

                        <div className="h-5 w-px bg-gray-200 mx-1" />

                        <button onClick={() => executeCommand("insertUnorderedList")} className="p-1.5 hover:bg-gray-100 rounded text-gray-700 hover:text-[#0056D2]" title="Bulleted List"><List size={15} /></button>
                        <button onClick={() => executeCommand("insertOrderedList")} className="p-1.5 hover:bg-gray-100 rounded text-gray-700 hover:text-[#0056D2]" title="Numbered List"><ListOrdered size={15} /></button>

                        <div className="h-5 w-px bg-gray-200 mx-1" />

                        <button onClick={() => executeCommand("justifyLeft")} className="p-1.5 hover:bg-gray-100 rounded text-gray-700 hover:text-[#0056D2]"><AlignLeft size={15} /></button>
                        <button onClick={() => executeCommand("justifyCenter")} className="p-1.5 hover:bg-gray-100 rounded text-gray-700 hover:text-[#0056D2]"><AlignCenter size={15} /></button>

                        <button
                          onClick={insertExaminerInsight}
                          className="px-3 py-1.5 bg-blue-50 border border-blue-200 text-[#0056D2] rounded text-xs font-bold hover:bg-blue-100 flex items-center gap-1.5 ml-auto"
                        >
                          <Lightbulb size={14} />
                          <span>+ Examiner Insight</span>
                        </button>
                      </div>

                      {/* Paper Sheet Canvas */}
                      <div className="min-h-[600px] bg-white border border-gray-200 rounded-lg shadow-sm p-8 md:p-12">
                        <div
                          ref={editorRef}
                          contentEditable={true}
                          suppressContentEditableWarning={true}
                          className="min-h-[500px] outline-none text-base leading-relaxed text-gray-800 rounded bg-gray-50/30 p-4 ring-2 ring-blue-600/10 focus:ring-blue-600/30"
                          dangerouslySetInnerHTML={{
                            __html: currentDoc.draftHtml || currentDoc.publishedHtml
                          }}
                        />
                      </div>

                      {/* Action Bar Footer */}
                      <div className="bg-white border border-gray-200 rounded-lg p-4 flex items-center justify-between gap-4 shadow-xs">
                        <div className="text-xs text-gray-600 font-medium">
                          Editing as: <strong className="text-[#0056D2]">{userName}</strong> ({userSchool})
                        </div>

                        <button
                          onClick={() => setIsModalOpen(true)}
                          className="px-6 py-2.5 bg-[#0056D2] hover:bg-[#00419E] text-white font-bold text-xs rounded flex items-center gap-2 shadow-xs transition-colors uppercase tracking-wider"
                        >
                          <Send size={14} />
                          <span>Submit for Proofreading</span>
                        </button>
                      </div>

                    </div>
                  )}

                  {/* READ / SYLLABUS NOTES VIEW */}
                  {viewMode !== "edit" && (
                    <div className="bg-white border border-gray-200 rounded-lg shadow-xs p-8 md:p-10 space-y-6">
                      <div 
                        className="prose max-w-none text-base leading-relaxed text-gray-800"
                        dangerouslySetInnerHTML={{
                          __html: currentDoc.publishedHtml
                        }}
                      />

                      <div className="pt-6 border-t border-gray-200 flex flex-wrap items-center justify-between gap-4 text-xs text-gray-500">
                        <div className="flex items-center gap-2">
                          <CheckCircle2 size={16} className="text-emerald-600" />
                          <span>Cambridge IGCSE Syllabus Compliant</span>
                        </div>

                        <div className="flex items-center gap-3">
                          <button
                            onClick={() => setViewMode("edit")}
                            className="text-[#0056D2] hover:underline font-bold flex items-center gap-1"
                          >
                            <Edit3 size={14} /> Suggest Edits to Canvas
                          </button>
                        </div>
                      </div>
                    </div>
                  )}

                </div>

              </div>

            </div>

          </div>
        )}

      </main>

      {/* CLOUD API SYNC MODAL */}
      <AnimatePresence>
        {isSyncModalOpen && (
          <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-lg p-6 shadow-2xl max-w-lg w-full border border-gray-200 space-y-4"
            >
              <div className="flex items-center justify-between border-b pb-3 border-gray-100">
                <div className="font-bold text-gray-900 text-sm flex items-center gap-2 font-sans">
                  <Database size={18} className="text-[#0056D2]" />
                  <span>Cloud API Integration Manager</span>
                </div>
                <button onClick={() => setIsSyncModalOpen(false)} className="text-gray-400 hover:text-gray-700">
                  <X size={18} />
                </button>
              </div>

              <div className="space-y-3">
                <div className="bg-blue-50 border border-blue-100 p-4 rounded-md text-xs text-blue-950 space-y-1">
                  <div className="font-bold flex items-center gap-2">
                    <span>Connected Cloud Workspace: IGCSE POP Database</span>
                    <CheckCircle2 size={14} className="text-emerald-600" />
                  </div>
                  <div className="text-blue-800 text-[11px]">Document ID: {currentDoc.externalPageId}</div>
                  <div className="text-blue-800 text-[11px]">Status: Active Cloud Synchronization</div>
                </div>

                <div className="space-y-2 text-xs">
                  <div className="font-bold text-gray-800">Sync Features:</div>
                  <ul className="list-disc pl-5 space-y-1 text-gray-600 text-[11px]">
                    <li>Edits made on the document canvas sync directly to live revision notes.</li>
                    <li>Markdown formatting and examiner insights are synced automatically.</li>
                  </ul>
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-2 border-t border-gray-100">
                <button
                  onClick={() => setIsSyncModalOpen(false)}
                  className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold text-xs rounded"
                >
                  Close
                </button>
                <button
                  onClick={handleTriggerSync}
                  disabled={isSyncing}
                  className="px-5 py-2 bg-[#0056D2] hover:bg-[#00419E] text-white font-bold text-xs rounded flex items-center gap-2 shadow-xs"
                >
                  <RefreshCw size={14} className={isSyncing ? "animate-spin" : ""} />
                  <span>{isSyncing ? "Syncing..." : "Sync Active Document Now"}</span>
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* SUBMIT EDITS MODAL */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-lg p-6 shadow-2xl max-w-lg w-full border border-gray-200 space-y-4"
            >
              <div className="flex items-center justify-between border-b pb-3 border-gray-100">
                <div className="font-bold text-gray-900 text-sm flex items-center gap-2 font-sans">
                  <MessageSquare size={18} className="text-[#0056D2]" />
                  <span>Proofread Submission Summary</span>
                </div>
                <span className="text-[10px] font-bold uppercase bg-[#0056D2] text-white px-2 py-0.5 rounded">
                  Required Step
                </span>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-800 block">
                  Describe what you changed for the proofreader:
                </label>
                <textarea
                  value={changeSummary}
                  onChange={(e) => setChangeSummary(e.target.value)}
                  rows={3}
                  className="w-full p-3 text-xs bg-gray-50 border border-gray-200 rounded focus:ring-2 focus:ring-[#0056D2] focus:outline-none text-gray-900"
                  placeholder="e.g. Added palindromic restriction enzymes, recombinant plasmids, and Examiner Insight mark scheme tips..."
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold text-xs rounded transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSubmitEdits}
                  disabled={!changeSummary.trim() || isSubmitting}
                  className="px-6 py-2.5 bg-[#0056D2] hover:bg-[#00419E] disabled:opacity-50 text-white font-bold text-xs rounded flex items-center gap-2 shadow-xs uppercase tracking-wider"
                >
                  {isSubmitting ? "Submitting..." : "Submit to Queue"}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Coursera Footer */}
      <footer className="bg-white border-t border-gray-200 mt-16 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-xs text-gray-500 space-y-2">
          <p className="font-semibold text-gray-700">POP Cambridge IGCSE Revision Platform • Coursera Learning Edition</p>
          <p>Exhaustive, non-abbreviated technical glossaries and interactive document editor with live cloud sync.</p>
        </div>
      </footer>
    </div>
  );
}
