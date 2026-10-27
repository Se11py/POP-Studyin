export interface KeyConceptBox {
  label: string;
  body: string;
}

export interface WorkedExampleStep {
  label: string;
  math: string;
}

export interface WorkedExample {
  title: string;
  question: string;
  steps: WorkedExampleStep[];
}

export interface ComparisonRow {
  feature: string;
  meaning: string;
  calculation: string;
}

export interface NotesContent {
  metaTags: string[];
  heading: string;
  intro: string;
  sectionTitle: string;
  sectionIntro: string;
  keyConcept: KeyConceptBox;
  diagramCaption: string;
  diagramNote: string;
  tableTitle: string;
  tableRows: ComparisonRow[];
  examTip: string;
  workedExample: WorkedExample;
  nextLessonTitle: string;
}

export interface MarkSchemeLine {
  text: string;
  tag: string;
}

export interface MarkSchemePart {
  partLabel: string;
  lines: MarkSchemeLine[];
}

export interface QuestionPart {
  label: string;
  text: string;
  marks: number;
}

export interface McqOption {
  key: string;
  text: string;
  correct: boolean;
}

export interface QuestionCard {
  id: string;
  paperCode: string;
  questionNumber: string;
  difficulty: "easy" | "medium" | "hard";
  marks: number;
  type: "structured" | "mcq";
  bodyParagraphs: string[];
  parts?: QuestionPart[];
  markScheme?: {
    totalMarks: number;
    parts: MarkSchemePart[];
    examinerNote?: string;
  };
  mcqOptions?: McqOption[];
  mcqCorrectExplanation?: string;
  mcqIncorrectExplanation?: string;
}

export interface PastPaperRow {
  code: string;
  description: string;
  duration: string;
}

export interface VideoChapter {
  time: string;
  percent: number;
  title: string;
  description: string;
}

export interface VideoLessonContent {
  title: string;
  instructor: string;
  objective: string;
  totalDuration: string;
  chapters: VideoChapter[];
}

export interface Flashcard {
  front: string;
  prompt: string;
  back: string;
}

export interface LessonContent {
  notes: NotesContent;
  questions: QuestionCard[];
  pastPapers: PastPaperRow[];
  video: VideoLessonContent;
  flashcards: Flashcard[];
}

/** Keyed by "<classId>:<lessonId>". Only lessons with a full study experience appear here —
 *  everything else in the syllabus tree falls back to a "coming soon" placeholder. */
export const lessonContent: Record<string, LessonContent> = {
  "igcse-physics:1.2.2": {
    notes: {
      metaTags: ["CAIE 0625 IGCSE", "Topic 1.2.2", "Reading Time: 6 mins", "Author: IGCSE Physics Tutor"],
      heading: "1.2.2 Distance-Time Graphs & Determining Speed",
      intro:
        "Learn to read the shape of a distance-time graph, pull a numerical speed out of its gradient, and tell constant speed apart from acceleration without needing a single equation of motion.",
      sectionTitle: "1. The Meaning of Gradient",
      sectionIntro:
        "A distance-time graph plots how far an object has travelled (vertical axis) against time elapsed (horizontal axis). Almost every question on this graph type is really asking you to read the slope correctly.",
      keyConcept: {
        label: "Fundamental Postulate",
        body:
          "The gradient of a distance-time graph at any point gives the speed of the object at that instant. A steeper line means a greater speed; a flat, horizontal section means the object is stationary ($\\text{speed} = 0$).",
      },
      diagramCaption: "FIGURE 1.2.2A: Three Phases of a Journey on a Distance-Time Graph",
      diagramNote:
        "Notice: Section A is flat (at rest), Section B is a straight incline (constant speed), and Section C curves upward and steepens — the tangent drawn at the end of C gives the instantaneous speed at that moment.",
      tableTitle: "2. Reading Graph Shape as Physical Motion",
      tableRows: [
        {
          feature: "Horizontal line",
          meaning: "Object is stationary",
          calculation: "$\\text{speed} = 0$",
        },
        {
          feature: "Straight sloped line",
          meaning: "Constant speed",
          calculation: "$\\text{speed} = \\dfrac{\\Delta d}{\\Delta t}$ using any two points on the line",
        },
        {
          feature: "Curve getting steeper",
          meaning: "Accelerating (speeding up)",
          calculation: "$\\text{speed} = $ gradient of the tangent at that instant",
        },
        {
          feature: "Curve getting less steep",
          meaning: "Decelerating (slowing down)",
          calculation: "gradient of the tangent, decreasing over time",
        },
      ],
      examTip:
        "Common IGCSE trap: students read off how high up the graph is at a point and think that is the speed. The height of the graph is the total distance travelled so far, NOT the speed. Speed always comes from the slope, never the height.",
      workedExample: {
        title: "Finding Average Speed from a Distance-Time Graph",
        question:
          "A cyclist's distance-time graph is a straight, uniformly sloped line from the origin. The cyclist travels from $0\\text{ m}$ to $240\\text{ m}$ between $t = 0\\text{ s}$ and $t = 30\\text{ s}$. Calculate the cyclist's speed.",
        steps: [
          { label: "Step 1 (Change in distance):", math: "\\Delta d = 240 - 0 = 240\\text{ m}" },
          { label: "Step 2 (Change in time):", math: "\\Delta t = 30 - 0 = 30\\text{ s}" },
          {
            label: "Step 3 (Speed = gradient):",
            math: "\\text{speed} = \\dfrac{\\Delta d}{\\Delta t} = \\dfrac{240}{30} = 8\\text{ m s}^{-1}",
          },
        ],
      },
      nextLessonTitle: "1.2.3 Graphical Analysis: Velocity-Time Graphs",
    },
    questions: [
      {
        id: "q1",
        paperCode: "CAIE 0625/21/M/J/23",
        questionNumber: "Question 4 (Multiple Choice)",
        difficulty: "easy",
        marks: 1,
        type: "mcq",
        bodyParagraphs: [
          "A distance-time graph for a moving object is a straight line sloping upward from the origin. What does this indicate about the object's motion?",
        ],
        mcqOptions: [
          { key: "A", text: "It is accelerating", correct: false },
          { key: "B", text: "It is moving at constant speed", correct: true },
          { key: "C", text: "It is stationary", correct: false },
          { key: "D", text: "It is decelerating", correct: false },
        ],
        mcqCorrectExplanation:
          "A straight line on a distance-time graph has a constant gradient throughout, and gradient equals speed — so the speed is not changing.",
        mcqIncorrectExplanation:
          "Remember: a straight (non-curved) line means the gradient is not changing. Since gradient = speed, a constant gradient means constant speed, not acceleration or rest.",
      },
      {
        id: "q2",
        paperCode: "CAIE 0625/32/O/N/22",
        questionNumber: "Question 2",
        difficulty: "medium",
        marks: 4,
        type: "structured",
        bodyParagraphs: [
          "The graph shows the distance travelled by a car during a $20\\text{ s}$ journey. Between $t = 0$ and $t = 8\\text{ s}$, the car travels $96\\text{ m}$ along a straight sloped section. Between $t = 8\\text{ s}$ and $t = 20\\text{ s}$, the graph line is horizontal.",
        ],
        parts: [
          { label: "(a)", text: "Calculate the speed of the car between $t = 0$ and $t = 8\\text{ s}$.", marks: 2 },
          {
            label: "(b)",
            text: "State what is happening to the car between $t = 8\\text{ s}$ and $t = 20\\text{ s}$, explaining your answer using a feature of the graph.",
            marks: 2,
          },
        ],
        markScheme: {
          totalMarks: 4,
          parts: [
            {
              partLabel: "(a) Speed between 0 s and 8 s:",
              lines: [
                { text: "$\\text{speed} = \\dfrac{\\Delta d}{\\Delta t} = \\dfrac{96}{8}$", tag: "C1" },
                { text: "$\\text{speed} = 12\\text{ m s}^{-1}$", tag: "A1" },
              ],
            },
            {
              partLabel: "(b) Motion from 8 s to 20 s:",
              lines: [
                { text: "The car is stationary / at rest", tag: "B1" },
                {
                  text: "Because the graph is horizontal (gradient = 0), so distance is not increasing over that interval",
                  tag: "B1",
                },
              ],
            },
          ],
          examinerNote:
            "Candidates frequently earned the B1 for 'stationary' but lost the second B1 for failing to link it explicitly to the flat/zero-gradient feature of the graph.",
        },
      },
      {
        id: "q3",
        paperCode: "CAIE 0625/42/M/J/21",
        questionNumber: "Question 5 (Extended)",
        difficulty: "hard",
        marks: 5,
        type: "structured",
        bodyParagraphs: [
          "A runner's distance-time graph is curved throughout a $12\\text{ s}$ sprint, becoming progressively steeper. A tangent to the curve is drawn at $t = 4\\text{ s}$, passing through the points $(2\\text{ s}, 8\\text{ m})$ and $(6\\text{ s}, 32\\text{ m})$.",
        ],
        parts: [
          { label: "(a)", text: "Use the tangent to calculate the instantaneous speed of the runner at $t = 4\\text{ s}$.", marks: 3 },
          {
            label: "(b)",
            text: "State and explain how the shape of the graph shows that the runner is accelerating throughout the sprint.",
            marks: 2,
          },
        ],
        markScheme: {
          totalMarks: 5,
          parts: [
            {
              partLabel: "(a) Instantaneous speed at t = 4 s:",
              lines: [
                { text: "$\\text{gradient} = \\dfrac{\\Delta d}{\\Delta t} = \\dfrac{32 - 8}{6 - 2} = \\dfrac{24}{4}$", tag: "C1" },
                { text: "$\\text{gradient} = 6\\text{ m s}^{-1}$", tag: "M1" },
                { text: "instantaneous speed at $t = 4\\text{ s} \\approx 6\\text{ m s}^{-1}$", tag: "A1" },
              ],
            },
            {
              partLabel: "(b) Explaining continuous acceleration:",
              lines: [
                { text: "The gradient of the curve continuously increases (the curve gets steeper over time)", tag: "B1" },
                { text: "Since gradient represents speed, an increasing gradient means increasing speed, i.e. the runner is accelerating", tag: "B1" },
              ],
            },
          ],
          examinerNote:
            "The strongest answers explicitly drew the tangent line rather than estimating the gradient by eye, and referenced 'gradient' rather than the vaguer 'steepness' when explaining part (b).",
        },
      },
    ],
    pastPapers: [
      { code: "0625 / 12", description: "Multiple Choice (Core)", duration: "45 min" },
      { code: "0625 / 22", description: "Multiple Choice (Extended)", duration: "45 min" },
      { code: "0625 / 32", description: "Theory (Core)", duration: "1h 15m" },
      { code: "0625 / 42", description: "Theory (Extended)", duration: "1h 15m" },
      { code: "0625 / 52", description: "Practical Test", duration: "1h 15m" },
      { code: "0625 / 62", description: "Alternative to Practical", duration: "1h 00m" },
    ],
    video: {
      title: "1.2.2 Reading Distance-Time Graphs",
      instructor: "Ms. Priya Nair (IGCSE Physics Tutor)",
      objective:
        "Master reading gradient as speed on distance-time graphs, and confidently distinguish constant-speed, stationary and accelerating sections in exam-style graphs.",
      totalDuration: "09:20",
      chapters: [
        { time: "00:00", percent: 0, title: "Introduction to Motion Graphs", description: "What the axes represent and how to read a point." },
        { time: "01:50", percent: 20, title: "Gradient = Speed", description: "Deriving speed from Δd / Δt on a straight section." },
        { time: "04:30", percent: 48, title: "Constant vs Changing Speed", description: "Straight lines versus curves, and what each means physically." },
        { time: "07:15", percent: 78, title: "Common Graph-Reading Mistakes", description: "Why height ≠ speed, and how examiners catch this error." },
      ],
    },
    flashcards: [
      {
        front: "Gradient of a Distance-Time Graph",
        prompt: "What physical quantity does the gradient of a distance-time graph represent?",
        back: "The speed of the object at that point. A steeper gradient means a greater speed.",
      },
      {
        front: "Horizontal Line on a Distance-Time Graph",
        prompt: "What is happening to an object when its distance-time graph is a horizontal line?",
        back: "The object is stationary (speed = 0), since distance travelled is not changing with time.",
      },
      {
        front: "Curved, Steepening Distance-Time Graph",
        prompt: "What does a distance-time graph that curves upward and gets steeper tell you?",
        back: "The object is accelerating — its gradient (speed) is increasing over time.",
      },
      {
        front: "Instantaneous Speed",
        prompt: "How do you find the instantaneous speed at one point on a curved distance-time graph?",
        back: "Draw a tangent to the curve at that point, then find the gradient of the tangent line.",
      },
      {
        front: "Average Speed Formula",
        prompt: "State the formula for average speed in terms of distance and time.",
        back: "average speed = total distance ÷ total time taken.",
      },
    ],
  },
};
