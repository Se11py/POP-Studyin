# POP Studying – Project Context

## Project Overview

**Project Name:** POP Studying

**Purpose:** An all-in-one educational platform for secondary students at ANS, a bilingual Thai-UK curriculum school in Bangkok, Thailand, to prepare for IGCSE and A-level exams.

**Target Audience:** Year 9–13 students (~100 active users), primarily studying mathematics and science.

**Description:** POP Studying provides structured "Classes" (course-like modules), subject-specific resources (e.g., equation sheets for math, periodic table for chemistry), mini mock exams using past papers, and detailed feedback with grades based on the latest exam boundaries. The platform is student-led and funded, prioritizing cost-effectiveness and community collaboration.

## Design System

### Color Palette

#### Primary Colors
- **Primary:** `#4a148c` (Deep Purple)
- **Primary Light:** `#7b1fa2` (Lighter Purple)
- **Accent:** `#e1bee7` (Light Purple)

#### Background & Surface
- **Background Dark:** `#121212` (Almost Black)
- **Surface:** `#1e1e1e` (Dark Gray)
- **Background Light:** `#ffffff` (White - for light mode if needed)

#### Text
- **Text Light:** `#f5f5f5` (Off White)
- **Text Dark:** `#212121` (Near Black)
- **Text Muted:** `rgba(255, 255, 255, 0.6)` (60% White)

#### Status Colors
- **Success:** `#4caf50` (Green)
- **Warning:** `#ff9800` (Amber)
- **Error:** `#cf6679` (Light Red)
- **Info:** `#2196f3` (Blue)

### Typography
- **Primary Font:** 'Poppins', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif
- **Base Font Size:** 16px
- **Line Height:** 1.6
- **Font Weights:** 400 (Regular), 500 (Medium), 600 (Semi-bold), 700 (Bold)

### Spacing
- **Base Unit:** 1rem (16px)
- **Spacing Scale:** 0.25rem, 0.5rem, 0.75rem, 1rem, 1.5rem, 2rem, 3rem, 4rem, 6rem

### Border Radius
- **Small:** 4px
- **Medium:** 8px
- **Large:** 16px
- **Pill:** 9999px

### Shadows
- **Default:** `0 4px 6px rgba(0, 0, 0, 0.1)`
- **Elevated:** `0 8px 16px rgba(0, 0, 0, 0.15)`
- **Floating:** `0 12px 24px rgba(0, 0, 0, 0.2)`

### Breakpoints
- **Mobile:** 0px - 767px
- **Tablet:** 768px - 1023px
- **Desktop:** 1024px and up

### Animation
- **Duration:** 200ms (fast), 300ms (normal), 500ms (slow)
- **Easing:** cubic-bezier(0.4, 0, 0.2, 1)

---

## Business Plan Summary

### Executive Summary

POP Studying is a student-developed platform designed to enhance exam preparation for ANS students through interactive classes, tailored resources, and mock exams. Built with a tight budget, it aims to break even while serving ~100 active users, focusing on math and science for IGCSE and A-levels.

### Aims

- Achieve financial sustainability by covering operational costs.
- Deliver a structured, student-centric learning experience via the "Classes" feature.

### Objectives

- Provide subject-specific classes organized by topics and sub-topics.
- Supply tailored resources (e.g., equation sheets, periodic tables) for study and revision.
- Offer mini mock exams with past papers, graded using current boundaries.
- Deliver detailed feedback on answers and improvement strategies.
- Ensure accessibility and usability for ~100 students.

### Target Market

ANS secondary students (Year 9–13), focusing on math and science, seeking exam-focused resources and collaborative tools.

---

## Product Details

- **Classes:** Course-like modules per subject (e.g., Math, Chemistry), split into topics (e.g., Algebra) and sub-topics (e.g., Quadratic Equations).
- **Difficulty Levels:** Three-tiered difficulty system to organize content and provide clear learning progression:
  - **Foundation Level:** Fundamental concepts and basic skills (e.g., in Mathematics: Grade 1-3 content covering numbers, basic operations, shapes, and introduction to fractions).
  - **Intermediate Level:** More complex applications building on foundations (e.g., in Mathematics: Grade 4-6 content covering decimals, percentages, basic algebra, and data handling).
  - **Advanced Level:** Complex concepts for exam preparation (e.g., in Mathematics: Grade 7-9 content covering trigonometry, iteration, probability, and other IGCSE/A-Level topics).
- **Resources:** Subject-specific materials (e.g., math equation sheets, chemistry periodic table), accessible during study and exams.
- **Mini Mock Exams:** Topic-based assessments from past papers, timed to simulate exams.
- **Grading & Feedback:** Grades based on latest IGCSE/A-level boundaries, with text or video explanations and improvement tips.
- **Collaboration:** User-generated notes via rich text editor, fostering peer sharing.
- **Progress Tracking:** Monitor topic completion and exam performance across difficulty levels.

---

## Financial Plan

- **Development Costs:** $10–515 one-time (domain: $10–15, initial storage: ~$10, optional mentor: $0–500).
- **Maintenance Costs:** $15–22/month (hosting: $11, storage: $3–10, domain: ~$1).
- **Revenue Strategy:** Donations ($1–2/month from 10–20 users), optional freemium features (e.g., analytics for $1–2/month).
- **Assumptions:** ~100 GB storage (1 GB/user), 100–200 GB bandwidth/month, database <500 MB.

---

## Tech Stack

The tech stack is designed for modern development speed, real-time interactivity, cost-effectiveness, and ease of use for student developers, supporting ~100 active users.

### Frontend

- **Framework:** Next.js (v16.2.3) & React (v19.2.4)
    - **Purpose:** Builds a highly dynamic, componentized, and responsive web application using the App Router.
    - **Why Chosen:** Industry standard for React, offering optimized server-side rendering, API routes, and a clean file-system-based routing architecture.
    - **Routing structure:** App Router (`src/app/`) organizing various mini-apps and dashboards (e.g., Notion, Duolingo, Discord, Coursera, Vercel clones).
    - **Cost:** $0 (open-source).
    - **Implementation:** React Server Components (RSC) and Client Components with React 19 hooks. Integrates with Clerk for authentication and Convex for data sync.

### Styling

- **Library:** Tailwind CSS (v4)
    - **Purpose:** Rapid UI styling and styling consistency across all clones.
    - **Why Chosen:** Tailwind CSS v4 provides modernized builds, native CSS-based configuration, `@tailwindcss/postcss` support, and highly performant utility-first styling.
    - **Cost:** $0 (open-source).

### Backend & Database

- **Service:** Convex (v1.34.1)
    - **Purpose:** Real-time sync engine, document database, and serverless functions (queries, mutations, actions).
    - **Why Chosen:** Convex replaces traditional relational databases (like Supabase/PostgreSQL) with a fully managed, reactive JSON-like document store. It updates clients automatically whenever data changes, eliminating complex manual polling or web socket setup.
    - **Cost:** $0 (free tier accommodates up to 100 users, 500 million operations/month).
    - **Implementation:** Defined schemas (e.g., `schema.ts`) for users (linked to Clerk IDs), subjects, topics, and content sections. Reactive queries update study progress and glossary content instantly.

### User Authentication

- **Service:** Clerk (@clerk/nextjs v7.0.12)
    - **Purpose:** Manages secure user logins, sign-ups, and session management with pre-built UI components and hooks.
    - **Why Chosen:** Polished auth components save design and development effort. Free tier (10,000 monthly active users) easily covers the student body.
    - **Cost:** $0 (free tier).
    - **Implementation:** Next.js middleware handles routing guards. The Clerk user ID is mapped to Convex's `users` table to identify user profiles.

### Storage

- **Service:** Bunny.net
    - **Purpose:** Hosts static PDFs (e.g., equation sheets, past papers), image assets, and feedback files.
    - **Why Chosen:** Extremely cheap and predictable pricing, global CDN delivery, and straightforward API.
    - **Cost:** ~$1–3/month minimum charge.
    - **Implementation:** Resource URLs are stored in Convex. Embedded YouTube players are used to host explanations to offload bandwidth.
- **Video Hosting:** YouTube
    - **Purpose:** Explanations and feedback videos are embedded to avoid video hosting overhead.
    - **Cost:** $0 (free embeds).

### Collaboration & Whiteboard

- **Library:** Tldraw (v4.5.9)
    - **Purpose:** Interactive canvas/whiteboard for drawing, note-taking, and visual learning.
    - **Why Chosen:** Tldraw provides a complete, modern canvas experience out-of-the-box, supporting freehand drawing, shapes, and easy canvas states. Replaces basic text-only notes with rich spatial collaboration.
    - **Cost:** $0 (open-source).
    - **Implementation:** Embedded directly as a React component `<Tldraw />` (e.g., in `src/app/duolingo/jamboard/page.tsx`).

### Hosting & Deployment

- **Platform:** Netlify
    - **Purpose:** Production deployments, continuous integration via GitHub, and global CDN hosting.
    - **Why Chosen:** Simple setup with next-generation plugin support (`@netlify/plugin-nextjs`) for Next.js App Router. Replaces traditional VMs or VPS hosts (like Cloudways/DigitalOcean) for serverless operations.
    - **Cost:** $0 (free starter tier).

---

## React Component Structure (Next.js App Router)

```plaintext
pop/
├── convex/                      # Convex schema and functions
│   ├── schema.ts                # Database table structures and indices
├── src/
│   ├── app/                     # Next.js App Router pages and layouts
│   │   ├── (auth)/              # Clerk login and signup authentication flows
│   │   ├── coursera/            # Coursera-themed learning platform (current work focus)
│   │   │   ├── classes/         # Course-like modules categorized by topic
│   │   │   ├── dictionary/      # Searchable glossary interfaces
│   │   │   ├── flashcards/      # Term revision tool
│   │   │   ├── learn/           # Rich content viewer
│   │   │   ├── physics-rush/    # Physics quick study tool
│   │   │   └── page.tsx         # Coursera landing page
│   │   ├── dashboard/           # Main progress tracking dashboard
│   │   ├── discord/             # Discord-themed student community clone
│   │   ├── duolingo/            # Gamified study tracker clone
│   │   │   ├── jamboard/        # Whiteboard feature using Tldraw
│   │   ├── notion/              # Clean documentation / wiki interface clone
│   │   ├── vercel/              # Administrative control clone
│   │   ├── layout.tsx           # Global HTML shell and providers
│   │   ├── page.tsx             # Root selector dashboard/landing page
│   │   └── globals.css          # Tailwind CSS v4 variables and custom styles
│   ├── components/              # Shared reusable components
│   │   ├── Layout/              # Navigation bars, footers, page containers
│   └── middleware.ts            # Clerk route-level auth middleware
├── netlify.toml                 # Netlify deployment configuration
├── package.json                 # Project dependencies and script aliases
```

---

## Additional Notes

- **Integration:**
    - Clerk user profiles map to the Convex database for progress metrics.
    - Whiteboard data from Tldraw and note content can be synced with Convex documents.
- **Development:**
    - Student-led, leveraging Next.js App Router and reactive Convex hooks (`useQuery`, `useMutation`).
- **Maintenance:**
    - Monitor Convex usage limits and Netlify bandwidth to ensure operation stays within free tiers.

---

## Context for Development

This context file aligns with POP Studying’s goal of delivering a cost-effective, student-driven platform. Developers should:

- Prioritize modern serverless patterns (Next.js, Convex, Clerk, Netlify).
- Leverage Convex queries and mutations for real-time reactivity without writing socket code.
- Utilize Tailwind CSS v4 utility classes and variables for styling.

---

## Whiteboard Canvas (Tldraw Integration)

### 1. Feature Overview

The interactive whiteboard enables:
- Drawing freehand (pen tool)
- Adding shapes, sticky notes, and text
- Resizing, coloring, and managing canvas assets
- Real-time collaborative canvas sessions (planned feature)

### 2. Tldraw Integration Details

- **File location:** `pop/src/app/duolingo/jamboard/page.tsx`
- Renders the full whiteboard canvas using `<Tldraw />` with styling loaded via `tldraw/tldraw.css`.
- Whiteboard states can be stored directly within Convex documents to persist canvas content.

---

## Automated Learning Page System

This system supports loading learning pages automatically.

### 1. Directory Structure

All learning content is organized by subject and stored. In Convex-based dynamic routing, sections are retrieved via `contentSections` querying the `topicSlug`.

### 2. URL Scheme

The application uses Next.js dynamic routing to retrieve files/documents based on slugs.
- **Example URL:** `http://localhost:3000/coursera/learn/[topic]`

---

## UI/UX Brainstorming

### Integrating Classes and Difficulty Levels

This outlines how to incorporate the platform's core learning structure (Classes with Foundation, Intermediate, and Advanced levels) into the user interface.

#### 1. On the Learning Dashboard

**Concept:** "Class Progress Cards"
- **Layout:** Grid of cards for each subject (e.g., Math, Chemistry).
- **Difficulty Breakdown:** Visual progression indicator for Foundation, Intermediate, and Advanced tiers.

#### 2. On the Learning Page (Class-Specific)

**Concept:** "Tabbed Topic Explorer"
- **Layout:** A subject overview displaying Foundation, Intermediate, and Advanced tabs.
- **Goal:** Keep cognitive load low by letting students tackle a single difficulty tier at a time.

---

## Potential Future Updates

### Upstash Integration

Upstash can provide serverless caching, task queuing, and streaming at zero cost under free tiers.

#### 1. Upstash Redis: Caching & Fast State
- **Use Cases:** Cache frequently accessed Convex data, rate-limit API calls, and maintain instantaneous scoreboard states for game-like modules.

#### 2. Upstash QStash: Serverless Task Queue
- **Use Cases:** Schedule automated emails, process exam score submissions asynchronously, and decouple expensive computations.

**Recommended Path:**
1.  **Start with Upstash Redis for Caching:** Provides an immediate performance boost with simple implementation.
2.  **Implement Upstash QStash for Mock Exams:** Improves user experience and reliability for a core feature.
3.  **Consider Kafka for Advanced Features:** A powerful option for future real-time collaborative tools.