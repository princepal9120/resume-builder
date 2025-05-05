"use client";

import { useState, useRef, useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  DndContext,
  closestCenter,
  useSensor,
  useSensors,
  PointerSensor,
} from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
  useSortable,
} from "@dnd-kit/sortable";
import { restrictToVerticalAxis } from "@dnd-kit/modifiers";
import { CSS } from "@dnd-kit/utilities";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Progress } from "@/components/ui/progress";
import {
  ChevronDown,
  ChevronUp,
  Download,
  FileTextIcon,
  GripVertical,
  FlaskConical,
  Laptop,
  Smartphone,
  Save,
  Share2,
  FileOutput,
  Undo2,
  Redo2,
  RotateCcw,
  PanelLeftClose,
  ScanSearch,
  Sparkles,
  ExternalLink,
  Edit,
} from "lucide-react";
import { AIEnhancementPanel } from "@/components/resume/ai";
import { ResumeContactForm } from "@/components/resume/contact";
import { ResumeSkillsForm } from "@/components/resume/skills";
import { ResumeSummaryForm } from "@/components/resume/summary";
import { ResumeExperienceForm } from "@/components/resume/experience";
import { ResumeEducationForm } from "@/components/resume/education";
import { ResumePreview } from "@/components/resume/preview";


interface SectionItem {
  id: string;
  name: string;
  icon: React.ReactNode;
  component: React.ReactNode;
}

function SortableSection({ section }: { section: SectionItem }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: section.id,
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div ref={setNodeRef} style={style} className="mb-4">
      <div className="flex items-center border rounded-md p-2 bg-card hover:bg-accent/50 cursor-pointer transition-colors">
        <div className="p-2 mr-2 cursor-grab" {...attributes} {...listeners}>
          <GripVertical className="h-5 w-5 text-muted-foreground" />
        </div>
        <div className="mr-3">{section.icon}</div>
        <div className="flex-1 font-medium">{section.name}</div>
        <Button variant="ghost" size="icon" className="ml-auto">
          <ChevronDown className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}

export default function ResumePage() {
  const { id } = useParams();
  const [showAIPanel, setShowAIPanel] = useState(false);
  const [previewMode, setPreviewMode] = useState<"desktop" | "mobile">(
    "desktop"
  );
  const [currentSection, setCurrentSection] = useState("contact");
  const [resumeScore, setResumeScore] = useState(65);

  // Sections for the resume
  const sections: SectionItem[] = [
    {
      id: "contact",
      name: "Contact Information",
      icon: <FileTextIcon className="h-5 w-5 text-emerald-500" />,
      component: <ResumeContactForm />,
    },
    {
      id: "experience",
      name: "Work Experience",
      icon: <FileTextIcon className="h-5 w-5 text-emerald-500" />,
      component: <ResumeExperienceForm />,
    },
    {
      id: "education",
      name: "Education",
      icon: <FileTextIcon className="h-5 w-5 text-emerald-500" />,
      component: <ResumeEducationForm />,
    },
    {
      id: "skills",
      name: "Skills",
      icon: <FileTextIcon className="h-5 w-5 text-emerald-500" />,
      component: <ResumeSkillsForm />,
    },
    {
      id: "summary",
      name: "Professional Summary",
      icon: <FileTextIcon className="h-5 w-5 text-emerald-500" />,
      component: <ResumeSummaryForm />,
    },
  ];

  const [sectionIds, setSectionIds] = useState(
    sections.map((section) => section.id)
  );

  // Setup DnD sensors
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 5,
      },
    })
  );

  const toggleAIPanel = () => {
    setShowAIPanel(!showAIPanel);
  };

  const handleDragEnd = (event: any) => {
    const { active, over } = event;

    if (active.id !== over.id) {
      setSectionIds((items) => {
        const oldIndex = items.indexOf(active.id);
        const newIndex = items.indexOf(over.id);

        const newItems = [...items];
        newItems.splice(oldIndex, 1);
        newItems.splice(newIndex, 0, active.id);

        return newItems;
      });
    }
  };

  // Get sorted sections
  const sortedSections = sectionIds.map(
    (id) => sections.find((section) => section.id === id)!
  );

  return (
    <div className="flex min-h-screen flex-col">
      <header className="border-b bg-background z-10">
        <div className="container flex h-14 items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/dashboard" className="flex items-center">
              <FileTextIcon className="h-6 w-6 text-emerald-500 mr-2" />
              <span className="font-bold">Rezi</span>
            </Link>
            <div className="border-l h-6" />
            <h1 className="text-sm font-medium">Untitled Resume</h1>
          </div>

          <div className="flex items-center gap-2">
            <div className="flex items-center bg-muted rounded-md p-1 mr-2">
              <Button
                variant="ghost"
                size="icon"
                className={`h-8 w-8 ${
                  previewMode === "desktop" ? "bg-background" : ""
                }`}
                onClick={() => setPreviewMode("desktop")}
              >
                <Laptop className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className={`h-8 w-8 ${
                  previewMode === "mobile" ? "bg-background" : ""
                }`}
                onClick={() => setPreviewMode("mobile")}
              >
                <Smartphone className="h-4 w-4" />
              </Button>
            </div>
            <Button variant="outline" size="sm" className="gap-1">
              <Undo2 className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="sm" className="gap-1">
              <Redo2 className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="sm" className="gap-1">
              <Save className="h-4 w-4" />
              Save
            </Button>
            <Button variant="outline" size="sm" className="gap-1">
              <Share2 className="h-4 w-4" />
              Share
            </Button>
            <Button
              size="sm"
              className="gap-1 bg-emerald-600 hover:bg-emerald-700"
            >
              <Download className="h-4 w-4" />
              Download
            </Button>
          </div>
        </div>
      </header>

      <div className="flex-1 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-[1fr_1fr_300px]">
        {/* Editor Panel */}
        <div className="p-4 border-r overflow-y-auto">
          <div className="space-y-4 max-w-lg mx-auto">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold">Resume Editor</h2>
              <div className="flex items-center gap-1">
                <div className="text-sm mr-2">
                  Score:{" "}
                  <span className="font-semibold">{resumeScore}/100</span>
                </div>
                <Progress value={resumeScore} className="w-20 h-2" />
              </div>
            </div>

            <Card>
              <CardHeader className="p-4">
                <CardTitle className="text-lg">Resume Sections</CardTitle>
                <CardDescription>Drag to reorder sections</CardDescription>
              </CardHeader>
              <CardContent className="p-4 pt-0">
                <DndContext
                  sensors={sensors}
                  collisionDetection={closestCenter}
                  onDragEnd={handleDragEnd}
                  modifiers={[restrictToVerticalAxis]}
                >
                  <SortableContext
                    items={sectionIds}
                    strategy={verticalListSortingStrategy}
                  >
                    {sortedSections.map((section) => (
                      <SortableSection key={section.id} section={section} />
                    ))}
                  </SortableContext>
                </DndContext>
              </CardContent>
            </Card>

            <Tabs
              defaultValue="contact"
              className="w-full"
              onValueChange={setCurrentSection}
            >
              <TabsList className="grid grid-cols-5">
                <TabsTrigger value="contact">Contact</TabsTrigger>
                <TabsTrigger value="experience">Experience</TabsTrigger>
                <TabsTrigger value="education">Education</TabsTrigger>
                <TabsTrigger value="skills">Skills</TabsTrigger>
                <TabsTrigger value="summary">Summary</TabsTrigger>
              </TabsList>

              <TabsContent value="contact">
                <ResumeContactForm />
              </TabsContent>

              <TabsContent value="experience">
                <ResumeExperienceForm />
              </TabsContent>

              <TabsContent value="education">
                <ResumeEducationForm />
              </TabsContent>

              <TabsContent value="skills">
                <ResumeSkillsForm />
              </TabsContent>

              <TabsContent value="summary">
                <ResumeSummaryForm />
              </TabsContent>
            </Tabs>
          </div>
        </div>

        {/* Preview Panel */}
        <div className="p-4 bg-muted/30 border-r overflow-y-auto flex flex-col">
          <div className="sticky top-0 z-10 bg-muted/30 pb-4">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold">Preview</h2>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={toggleAIPanel}
                  className="gap-1"
                >
                  <Sparkles className="h-4 w-4 text-emerald-500" />
                  AI Suggestions
                </Button>
              </div>
            </div>
          </div>

          <ResumePreview mode={previewMode} />
        </div>

        {/* AI Enhancement Panel (conditionally rendered) */}
        {showAIPanel && (
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 50 }}
            transition={{ duration: 0.3 }}
            className="border-l bg-background overflow-y-auto"
          >
            <AIEnhancementPanel
              onClose={toggleAIPanel}
              currentSection={currentSection}
            />
          </motion.div>
        )}
      </div>
    </div>
  );
}
