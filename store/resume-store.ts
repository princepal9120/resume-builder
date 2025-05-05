"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";


export interface Contact {
  fullName: string;
  email: string;
  phone?: string;
  website?: string;
  linkedin?: string;
  city?: string;
  state?: string;
  country?: string;
  showLocation: boolean;
  showPhone: boolean;
}

export interface Experience {
  id: string;
  role: string;
  company: string;
  location?: string;
  startMonth: string;
  startYear: string;
  endMonth?: string;
  endYear?: string;
  currentlyWorking: boolean;
  description?: string;
}

export interface Education {
  id: string;
  degree: string;
  institution: string;
  location?: string;
  startYear: string;
  endYear?: string;
  currentlyStudying: boolean;
  gpa?: string;
  activities?: string;
  description?: string;
  showGPA: boolean;
}

export interface Skill {
  id: string;
  name: string;
  category: string;
  level?: string;
}

export interface Resume {
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  contact: Contact;
  summary?: string;
  experiences: Experience[];
  education: Education[];
  skills: Skill[];
  sectionOrder: string[];
  template: string;
  score?: number;
}

interface ResumeState {
  resumes: Resume[];
  currentResumeId: string | null;
  resumeHistory: Record<string, Resume[]>;

  // Actions
  createResume: (name: string, template: string) => string;
  updateResume: (id: string, data: Partial<Resume>) => void;
  deleteResume: (id: string) => void;
  setCurrentResume: (id: string | null) => void;
  updateContact: (id: string, contact: Contact) => void;
  updateSummary: (id: string, summary: string) => void;
  addExperience: (id: string, experience: Omit<Experience, "id">) => void;
  updateExperience: (
    resumeId: string,
    experienceId: string,
    experience: Partial<Experience>
  ) => void;
  deleteExperience: (resumeId: string, experienceId: string) => void;
  addEducation: (id: string, education: Omit<Education, "id">) => void;
  updateEducation: (
    resumeId: string,
    educationId: string,
    education: Partial<Education>
  ) => void;
  deleteEducation: (resumeId: string, educationId: string) => void;
  addSkill: (id: string, skill: Omit<Skill, "id">) => void;
  deleteSkill: (resumeId: string, skillId: string) => void;
  updateSectionOrder: (id: string, sectionOrder: string[]) => void;
  undo: (id: string) => void;
  getResumeScore: (id: string) => number;
}

export const useResumeStore = create<ResumeState>()(
  persist(
    (set, get) => ({
      resumes: [],
      currentResumeId: null,
      resumeHistory: {},

      createResume: (name, template) => {
        const id = Date.now().toString();
        const newResume: Resume = {
          id,
          name,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          contact: {
            fullName: "",
            email: "",
            showLocation: true,
            showPhone: true,
          },
          experiences: [],
          education: [],
          skills: [],
          sectionOrder: [
            "contact",
            "summary",
            "experience",
            "education",
            "skills",
          ],
          template,
        };

        set((state) => ({
          resumes: [...state.resumes, newResume],
          currentResumeId: id,
          resumeHistory: {
            ...state.resumeHistory,
            [id]: [newResume],
          },
        }));

        return id;
      },

      updateResume: (id, data) => {
        set((state) => {
          const resume = state.resumes.find((r) => r.id === id);
          if (!resume) return state;

          const updatedResume = {
            ...resume,
            ...data,
            updatedAt: new Date().toISOString(),
          };

          const history = state.resumeHistory[id] || [];

          return {
            resumes: state.resumes.map((r) =>
              r.id === id ? updatedResume : r
            ),
            resumeHistory: {
              ...state.resumeHistory,
              [id]: [...history, updatedResume],
            },
          };
        });
      },

      deleteResume: (id) => {
        set((state) => ({
          resumes: state.resumes.filter((r) => r.id !== id),
          currentResumeId:
            state.currentResumeId === id ? null : state.currentResumeId,
        }));
      },

      setCurrentResume: (id) => {
        set({ currentResumeId: id });
      },

      updateContact: (id, contact) => {
        set((state) => {
          const resume = state.resumes.find((r) => r.id === id);
          if (!resume) return state;

          const updatedResume = {
            ...resume,
            contact,
            updatedAt: new Date().toISOString(),
          };

          const history = state.resumeHistory[id] || [];

          return {
            resumes: state.resumes.map((r) =>
              r.id === id ? updatedResume : r
            ),
            resumeHistory: {
              ...state.resumeHistory,
              [id]: [...history, updatedResume],
            },
          };
        });
      },

      updateSummary: (id, summary) => {
        set((state) => {
          const resume = state.resumes.find((r) => r.id === id);
          if (!resume) return state;

          const updatedResume = {
            ...resume,
            summary,
            updatedAt: new Date().toISOString(),
          };

          const history = state.resumeHistory[id] || [];

          return {
            resumes: state.resumes.map((r) =>
              r.id === id ? updatedResume : r
            ),
            resumeHistory: {
              ...state.resumeHistory,
              [id]: [...history, updatedResume],
            },
          };
        });
      },

      addExperience: (id, experience) => {
        set((state) => {
          const resume = state.resumes.find((r) => r.id === id);
          if (!resume) return state;

          const newExperience = {
            ...experience,
            id: Date.now().toString(),
          };

          const updatedResume = {
            ...resume,
            experiences: [...resume.experiences, newExperience],
            updatedAt: new Date().toISOString(),
          };

          const history = state.resumeHistory[id] || [];

          return {
            resumes: state.resumes.map((r) =>
              r.id === id ? updatedResume : r
            ),
            resumeHistory: {
              ...state.resumeHistory,
              [id]: [...history, updatedResume],
            },
          };
        });
      },

      updateExperience: (resumeId, experienceId, experience) => {
        set((state) => {
          const resume = state.resumes.find((r) => r.id === resumeId);
          if (!resume) return state;

          const updatedExperiences = resume.experiences.map((exp) =>
            exp.id === experienceId ? { ...exp, ...experience } : exp
          );

          const updatedResume = {
            ...resume,
            experiences: updatedExperiences,
            updatedAt: new Date().toISOString(),
          };

          const history = state.resumeHistory[resumeId] || [];

          return {
            resumes: state.resumes.map((r) =>
              r.id === resumeId ? updatedResume : r
            ),
            resumeHistory: {
              ...state.resumeHistory,
              [resumeId]: [...history, updatedResume],
            },
          };
        });
      },

      deleteExperience: (resumeId, experienceId) => {
        set((state) => {
          const resume = state.resumes.find((r) => r.id === resumeId);
          if (!resume) return state;

          const updatedResume = {
            ...resume,
            experiences: resume.experiences.filter(
              (exp) => exp.id !== experienceId
            ),
            updatedAt: new Date().toISOString(),
          };

          const history = state.resumeHistory[resumeId] || [];

          return {
            resumes: state.resumes.map((r) =>
              r.id === resumeId ? updatedResume : r
            ),
            resumeHistory: {
              ...state.resumeHistory,
              [resumeId]: [...history, updatedResume],
            },
          };
        });
      },

      addEducation: (id, education) => {
        set((state) => {
          const resume = state.resumes.find((r) => r.id === id);
          if (!resume) return state;

          const newEducation = {
            ...education,
            id: Date.now().toString(),
          };

          const updatedResume = {
            ...resume,
            education: [...resume.education, newEducation],
            updatedAt: new Date().toISOString(),
          };

          const history = state.resumeHistory[id] || [];

          return {
            resumes: state.resumes.map((r) =>
              r.id === id ? updatedResume : r
            ),
            resumeHistory: {
              ...state.resumeHistory,
              [id]: [...history, updatedResume],
            },
          };
        });
      },

      updateEducation: (resumeId, educationId, education) => {
        set((state) => {
          const resume = state.resumes.find((r) => r.id === resumeId);
          if (!resume) return state;

          const updatedEducation = resume.education.map((edu) =>
            edu.id === educationId ? { ...edu, ...education } : edu
          );

          const updatedResume = {
            ...resume,
            education: updatedEducation,
            updatedAt: new Date().toISOString(),
          };

          const history = state.resumeHistory[resumeId] || [];

          return {
            resumes: state.resumes.map((r) =>
              r.id === resumeId ? updatedResume : r
            ),
            resumeHistory: {
              ...state.resumeHistory,
              [resumeId]: [...history, updatedResume],
            },
          };
        });
      },

      deleteEducation: (resumeId, educationId) => {
        set((state) => {
          const resume = state.resumes.find((r) => r.id === resumeId);
          if (!resume) return state;

          const updatedResume = {
            ...resume,
            education: resume.education.filter((edu) => edu.id !== educationId),
            updatedAt: new Date().toISOString(),
          };

          const history = state.resumeHistory[resumeId] || [];

          return {
            resumes: state.resumes.map((r) =>
              r.id === resumeId ? updatedResume : r
            ),
            resumeHistory: {
              ...state.resumeHistory,
              [resumeId]: [...history, updatedResume],
            },
          };
        });
      },

      addSkill: (id, skill) => {
        set((state) => {
          const resume = state.resumes.find((r) => r.id === id);
          if (!resume) return state;

          const newSkill = {
            ...skill,
            id: Date.now().toString(),
          };

          const updatedResume = {
            ...resume,
            skills: [...resume.skills, newSkill],
            updatedAt: new Date().toISOString(),
          };

          const history = state.resumeHistory[id] || [];

          return {
            resumes: state.resumes.map((r) =>
              r.id === id ? updatedResume : r
            ),
            resumeHistory: {
              ...state.resumeHistory,
              [id]: [...history, updatedResume],
            },
          };
        });
      },

      deleteSkill: (resumeId, skillId) => {
        set((state) => {
          const resume = state.resumes.find((r) => r.id === resumeId);
          if (!resume) return state;

          const updatedResume = {
            ...resume,
            skills: resume.skills.filter((skill) => skill.id !== skillId),
            updatedAt: new Date().toISOString(),
          };

          const history = state.resumeHistory[resumeId] || [];

          return {
            resumes: state.resumes.map((r) =>
              r.id === resumeId ? updatedResume : r
            ),
            resumeHistory: {
              ...state.resumeHistory,
              [resumeId]: [...history, updatedResume],
            },
          };
        });
      },

      updateSectionOrder: (id, sectionOrder) => {
        set((state) => {
          const resume = state.resumes.find((r) => r.id === id);
          if (!resume) return state;

          const updatedResume = {
            ...resume,
            sectionOrder,
            updatedAt: new Date().toISOString(),
          };

          const history = state.resumeHistory[id] || [];

          return {
            resumes: state.resumes.map((r) =>
              r.id === id ? updatedResume : r
            ),
            resumeHistory: {
              ...state.resumeHistory,
              [id]: [...history, updatedResume],
            },
          };
        });
      },

      undo: (id) => {
        set((state) => {
          const history = state.resumeHistory[id];
          if (!history || history.length <= 1) return state;

          const previousState = history[history.length - 2];

          return {
            resumes: state.resumes.map((r) =>
              r.id === id ? previousState : r
            ),
            resumeHistory: {
              ...state.resumeHistory,
              [id]: history.slice(0, history.length - 1),
            },
          };
        });
      },

      getResumeScore: (id) => {
        const resume = get().resumes.find((r) => r.id === id);
        if (!resume) return 0;

        // This is a simple scoring algorithm that could be improved
        let score = 0;

        // Contact score (max 20)
        if (resume.contact.fullName) score += 5;
        if (resume.contact.email) score += 5;
        if (resume.contact.phone) score += 3;
        if (resume.contact.linkedin) score += 4;
        if (resume.contact.city && resume.contact.state) score += 3;

        // Summary score (max 15)
        if (resume.summary) {
          if (resume.summary.length > 300) score += 15;
          else if (resume.summary.length > 200) score += 12;
          else if (resume.summary.length > 100) score += 8;
          else score += 5;
        }

        // Experience score (max 30)
        const expCount = resume.experiences.length;
        if (expCount >= 3) score += 15;
        else if (expCount >= 2) score += 10;
        else if (expCount >= 1) score += 5;

        // Add points for detailed experience descriptions
        resume.experiences.forEach((exp) => {
          if (exp.description && exp.description.length > 200) score += 5;
          else if (exp.description && exp.description.length > 100) score += 3;
          else if (exp.description) score += 1;
        });

        // Education score (max 15)
        const eduCount = resume.education.length;
        if (eduCount >= 2) score += 10;
        else if (eduCount >= 1) score += 8;

        resume.education.forEach((edu) => {
          if (edu.degree && edu.institution) score += 2;
          if (edu.gpa) score += 1;
          if (edu.activities) score += 2;
        });

        // Skills score (max 20)
        const skillCount = resume.skills.length;
        if (skillCount >= 15) score += 20;
        else if (skillCount >= 10) score += 15;
        else if (skillCount >= 5) score += 10;
        else if (skillCount >= 1) score += 5;

        return Math.min(score, 100);
      },
    }),
    {
      name: "resume-storage",
      skipHydration: true,
    }
  )
);
