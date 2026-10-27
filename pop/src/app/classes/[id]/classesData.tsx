import React from "react";
import { Atom, FlaskConical, Dna, Calculator, Briefcase, PenTool } from "lucide-react";

export type LessonStatus = "completed" | "in-progress" | "not-started";

export interface SubTopicLesson {
  id: string;
  title: string;
  status: LessonStatus;
}

export interface SubTopic {
  id: string;
  title: string;
  lessons: SubTopicLesson[];
}

export interface Topic {
  id: number;
  title: string;
  type: string;
  subTopics: SubTopic[];
}

export interface ClassData {
  name: string;
  subtitle: string;
  level: string;
  board: string;
  syllabusCode: string;
  syllabusInfo: string;
  icon: React.ReactNode;
  topics: Topic[];
}

export const classesData: Record<string, ClassData> = {
  "igcse-physics": {
    name: "Physics",
    subtitle: "Co-ordinated Sciences Specialization",
    level: "IGCSE",
    board: "Cambridge CAIE",
    syllabusCode: "Physics (0625)",
    syllabusInfo: "CIE Syllabus v2026.4",
    icon: <Atom size={20} />,
    topics: [
      {
        id: 1,
        title: "Module 1: Motion, Forces and Energy",
        type: "Core Module",
        subTopics: [
          {
            id: "1.1",
            title: "Physical Quantities & Measurement",
            lessons: [
              { id: "1.1.1", title: "Scalars and Vectors: Theoretical Framework", status: "completed" },
              { id: "1.1.2", title: "Precision Measurement of Length and Time", status: "completed" },
            ],
          },
          {
            id: "1.2",
            title: "Dynamics of Motion",
            lessons: [
              { id: "1.2.1", title: "Speed, Velocity and Acceleration Kinematics", status: "completed" },
              { id: "1.2.2", title: "Graphical Analysis: Distance-Time", status: "in-progress" },
              { id: "1.2.3", title: "Graphical Analysis: Velocity-Time", status: "not-started" },
            ],
          },
          {
            id: "1.3",
            title: "Mass, Weight and Density Principles",
            lessons: [
              { id: "1.3.1", title: "Calculating Density in Variable Geometry", status: "not-started" },
              { id: "1.3.2", title: "Determination of Center of Mass", status: "not-started" },
            ],
          },
        ],
      },
      {
        id: 2,
        title: "Module 2: Thermal Physics & Thermodynamics",
        type: "Theoretical Study",
        subTopics: [
          {
            id: "2.1",
            title: "Kinetic Particle Model",
            lessons: [
              { id: "2.1.1", title: "States of Matter: Molecular Perspective", status: "not-started" },
              { id: "2.1.2", title: "Gas Pressure & Boyle's Law", status: "not-started" },
            ],
          },
        ],
      },
      {
        id: 3,
        title: "Module 3: Wave Properties & Optics",
        type: "Laboratory Focus",
        subTopics: [],
      },
      {
        id: 4,
        title: "Module 4: Electricity and Magnetism",
        type: "Core Module",
        subTopics: [],
      },
    ],
  },
  "igcse-chemistry": {
    name: "Chemistry",
    subtitle: "Co-ordinated Sciences Specialization",
    level: "IGCSE",
    board: "Cambridge CAIE",
    syllabusCode: "Chemistry (0620)",
    syllabusInfo: "CIE Syllabus v2026.2",
    icon: <FlaskConical size={20} />,
    topics: [
      {
        id: 1,
        title: "Module 1: The Particulate Nature of Matter",
        type: "Theory Specialist",
        subTopics: [
          {
            id: "1.1",
            title: "Phase States: Solids, Liquids and Gases",
            lessons: [
              { id: "1.1.1", title: "Kinetic Molecular Theory", status: "completed" },
              { id: "1.1.2", title: "Enthalpy of Phase Transitions", status: "completed" },
            ],
          },
        ],
      },
      {
        id: 2,
        title: "Module 2: Experimental Techniques & Separation",
        type: "Laboratory Focus",
        subTopics: [],
      },
    ],
  },
  "igcse-math": {
    name: "Mathematics",
    subtitle: "Core/Extended Curriculum",
    level: "IGCSE",
    board: "Cambridge CAIE",
    syllabusCode: "Mathematics (0580)",
    syllabusInfo: "CIE Syllabus v2026.1",
    icon: <Calculator size={20} />,
    topics: [],
  },
  "igcse-biology": {
    name: "Biology",
    subtitle: "Co-ordinated Sciences Specialization",
    level: "IGCSE",
    board: "Cambridge CAIE",
    syllabusCode: "Biology (0610)",
    syllabusInfo: "CIE Syllabus v2026.3",
    icon: <Dna size={20} />,
    topics: [],
  },
  "igcse-business": {
    name: "Business Studies",
    subtitle: "Enterprise Modules",
    level: "IGCSE",
    board: "Cambridge CAIE",
    syllabusCode: "Business Studies (0450)",
    syllabusInfo: "CIE Syllabus v2025.2",
    icon: <Briefcase size={20} />,
    topics: [],
  },
  "igcse-english": {
    name: "English Language",
    subtitle: "Language Arts Specialization",
    level: "IGCSE",
    board: "Cambridge CAIE",
    syllabusCode: "English Language (0500)",
    syllabusInfo: "CIE Syllabus v2026.1",
    icon: <PenTool size={20} />,
    topics: [],
  },
};

/** Walks a class's syllabus tree and returns the chapter/subtopic/lesson currently "in-progress",
 *  falling back to the first available lesson so the page always has something to show. */
export function findDefaultLesson(classData: ClassData) {
  let fallback: { chapterId: number; subTopicId: string; lessonId: string } | null = null;

  for (const chapter of classData.topics) {
    for (const subTopic of chapter.subTopics) {
      for (const lesson of subTopic.lessons) {
        if (!fallback) {
          fallback = { chapterId: chapter.id, subTopicId: subTopic.id, lessonId: lesson.id };
        }
        if (lesson.status === "in-progress") {
          return { chapterId: chapter.id, subTopicId: subTopic.id, lessonId: lesson.id };
        }
      }
    }
  }

  return fallback;
}
