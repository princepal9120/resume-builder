"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { X, Plus, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// Skill categories
const skillCategories = [
  "Technical", "Soft Skills", "Languages", "Tools", "Certifications", "Other"
];

// Skill level options
const skillLevels = [
  { value: "beginner", label: "Beginner" },
  { value: "intermediate", label: "Intermediate" },
  { value: "advanced", label: "Advanced" },
  { value: "expert", label: "Expert" }
];

interface Skill {
  id: string;
  name: string;
  category: string;
  level?: string;
}

export function ResumeSkillsForm() {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [newSkill, setNewSkill] = useState("");
  const [category, setCategory] = useState("Technical");
  const [level, setLevel] = useState<string | undefined>(undefined);
  const [showSuggestions, setShowSuggestions] = useState(false);
  
  // Sample skill suggestions (in a real app, these could be API-driven)
  const suggestedSkills = {
    "Technical": ["JavaScript", "React", "Node.js", "TypeScript", "CSS", "HTML", "Python", "SQL", "AWS", "Docker"],
    "Soft Skills": ["Leadership", "Communication", "Problem Solving", "Teamwork", "Time Management", "Adaptability"],
    "Languages": ["English", "Spanish", "French", "German", "Mandarin", "Japanese"],
    "Tools": ["Git", "VS Code", "Figma", "Adobe XD", "Jira", "Slack", "Photoshop"],
    "Certifications": ["AWS Certified", "Google Cloud", "Microsoft Azure", "Scrum Master", "PMP"],
    "Other": ["Project Management", "Research", "Content Writing", "SEO", "Digital Marketing"]
  };
  
  function addSkill() {
    if (newSkill.trim()) {
      const skillToAdd: Skill = {
        id: Date.now().toString(),
        name: newSkill.trim(),
        category: category,
        level: level
      };
      
      setSkills([...skills, skillToAdd]);
      setNewSkill("");
      setLevel(undefined);
    }
  }
  
  function addSuggestedSkill(skill: string) {
    const skillToAdd: Skill = {
      id: Date.now().toString(),
      name: skill,
      category: category,
      level: undefined
    };
    
    setSkills([...skills, skillToAdd]);
  }
  
  function removeSkill(id: string) {
    setSkills(skills.filter(skill => skill.id !== id));
  }
  
  // Group skills by category
  const skillsByCategory = skills.reduce((acc, skill) => {
    if (!acc[skill.category]) {
      acc[skill.category] = [];
    }
    acc[skill.category].push(skill);
    return acc;
  }, {} as Record<string, Skill[]>);
  
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Skills</CardTitle>
          <CardDescription>
            Add your technical and soft skills to highlight your qualifications.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex flex-col space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4">
              <div className="flex-1">
                <Input
                  placeholder="Add a skill..."
                  value={newSkill}
                  onChange={(e) => setNewSkill(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      addSkill();
                    }
                  }}
                />
              </div>
              <Select value={category} onValueChange={setCategory}>
                <SelectTrigger className="w-full sm:w-[180px]">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  {skillCategories.map((cat) => (
                    <SelectItem key={cat} value={cat}>
                      {cat}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={level} onValueChange={setLevel}>
                <SelectTrigger className="w-full sm:w-[180px]">
                  <SelectValue placeholder="Proficiency (optional)" />
                </SelectTrigger>
                <SelectContent>
                  {skillLevels.map((lvl) => (
                    <SelectItem key={lvl.value} value={lvl.value}>
                      {lvl.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Button onClick={addSkill} type="button" className="bg-emerald-600 hover:bg-emerald-700">
                <Plus className="h-4 w-4 mr-1" />
                Add
              </Button>
            </div>
            
            <div className="text-sm text-muted-foreground pt-2">
              <Button 
                variant="ghost" 
                size="sm" 
                className="p-0 h-auto text-emerald-500 hover:text-emerald-600"
                onClick={() => setShowSuggestions(!showSuggestions)}
              >
                <Sparkles className="h-4 w-4 mr-1" />
                {showSuggestions ? "Hide suggestions" : "Show skill suggestions"}
              </Button>
            </div>
            
            <AnimatePresence>
              {showSuggestions && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <Card className="bg-muted/40 border-dashed">
                    <CardHeader className="p-3 pb-0">
                      <CardTitle className="text-sm">Suggested {category} Skills</CardTitle>
                    </CardHeader>
                    <CardContent className="p-3">
                      <div className="flex flex-wrap gap-2">
                        {suggestedSkills[category as keyof typeof suggestedSkills]?.map((skill, index) => (
                          <Badge 
                            key={index} 
                            variant="outline" 
                            className="cursor-pointer hover:bg-accent"
                            onClick={() => addSuggestedSkill(skill)}
                          >
                            {skill} <Plus className="h-3 w-3 ml-1" />
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              )}
            </AnimatePresence>
            
            <div className="space-y-4 pt-4">
              <Tabs defaultValue="all">
                <TabsList className="w-full overflow-x-auto">
                  <TabsTrigger value="all">All Skills ({skills.length})</TabsTrigger>
                  {Object.keys(skillsByCategory).map(cat => (
                    <TabsTrigger key={cat} value={cat}>
                      {cat} ({skillsByCategory[cat].length})
                    </TabsTrigger>
                  ))}
                </TabsList>
                
                <TabsContent value="all" className="mt-4">
                  <div className="flex flex-wrap gap-2">
                    <AnimatePresence>
                      {skills.map((skill) => (
                        <motion.div
                          key={skill.id}
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.8 }}
                          transition={{ duration: 0.2 }}
                        >
                          <Badge className="py-1 px-2 flex items-center gap-1 text-sm">
                            {skill.name}
                            {skill.level && (
                              <span className="text-xs opacity-70 ml-1">• {skill.level}</span>
                            )}
                            <button
                              className="ml-1 inline-flex items-center justify-center rounded-full hover:bg-accent hover:text-accent-foreground"
                              onClick={() => removeSkill(skill.id)}
                            >
                              <X className="h-3 w-3" />
                              <span className="sr-only">Remove</span>
                            </button>
                          </Badge>
                        </motion.div>
                      ))}
                    </AnimatePresence>
                  </div>
                </TabsContent>
                
                {Object.keys(skillsByCategory).map(cat => (
                  <TabsContent key={cat} value={cat} className="mt-4">
                    <div className="flex flex-wrap gap-2">
                      <AnimatePresence>
                        {skillsByCategory[cat].map((skill) => (
                          <motion.div
                            key={skill.id}
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.8 }}
                            transition={{ duration: 0.2 }}
                          >
                            <Badge className="py-1 px-2 flex items-center gap-1 text-sm">
                              {skill.name}
                              {skill.level && (
                                <span className="text-xs opacity-70 ml-1">• {skill.level}</span>
                              )}
                              <button
                                className="ml-1 inline-flex items-center justify-center rounded-full hover:bg-accent hover:text-accent-foreground"
                                onClick={() => removeSkill(skill.id)}
                              >
                                <X className="h-3 w-3" />
                                <span className="sr-only">Remove</span>
                              </button>
                            </Badge>
                          </motion.div>
                        ))}
                      </AnimatePresence>
                    </div>
                  </TabsContent>
                ))}
              </Tabs>
              
              {skills.length === 0 && (
                <div className="text-center p-6 border rounded-md border-dashed">
                  <p className="text-sm text-muted-foreground">
                    No skills added yet. Add your first skill above.
                  </p>
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}