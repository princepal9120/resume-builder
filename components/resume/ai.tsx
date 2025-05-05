"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  X,
  Sparkles,
  AlertTriangle,
  CheckCircle,
  RefreshCw,
  Copy,
  ThumbsUp,
  ThumbsDown,
} from "lucide-react";

interface AIEnhancementPanelProps {
  onClose: () => void;
  currentSection: string;
}

export function AIEnhancementPanel({
  onClose,
  currentSection,
}: AIEnhancementPanelProps) {
  const [analyzing, setAnalyzing] = useState(false);

  return (
    <div className="h-full flex flex-col">
      <div className="p-4 border-b flex justify-between items-center sticky top-0 bg-background">
        <div className="flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-emerald-500" />
          <h3 className="font-medium">AI Resume Enhancement</h3>
        </div>
        <Button variant="ghost" size="icon" onClick={onClose}>
          <X className="h-4 w-4" />
        </Button>
      </div>

      <div className="flex-1 overflow-y-auto p-4">
        <div className="space-y-6">
          <Tabs defaultValue="suggestions">
            <TabsList className="w-full">
              <TabsTrigger value="suggestions">Suggestions</TabsTrigger>
              <TabsTrigger value="keywords">Keywords</TabsTrigger>
              <TabsTrigger value="analysis">Analysis</TabsTrigger>
            </TabsList>

            <TabsContent value="suggestions" className="mt-4 space-y-4">
              <div className="space-y-1 mb-4">
                <h3 className="text-sm font-medium">Overall Score</h3>
                <div className="flex items-center gap-4">
                  <Progress value={65} className="flex-1 h-2" />
                  <span className="text-sm font-medium">65/100</span>
                </div>

                <p className="text-xs text-muted-foreground mt-1">
                  Your resume could use some improvements in the{" "}
                  {currentSection} section.
                </p>
              </div>

              <h3 className="text-sm font-medium mb-3">
                Improvement Suggestions
              </h3>

              <div className="space-y-3">
                <Card>
                  <CardHeader className="p-3 pb-0">
                    <CardTitle className="text-sm flex items-center">
                      <AlertTriangle className="h-4 w-4 text-amber-500 mr-2" />
                      Add more quantifiable achievements
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-3">
                    <p className="text-xs text-muted-foreground">
                      Your experience descriptions could be stronger by adding
                      specific metrics and results.
                    </p>
                    <div className="mt-2">
                      <div className="text-xs font-medium mb-1">
                        Suggestion:
                      </div>
                      <div className="text-xs bg-muted p-2 rounded-md">
                        "Increased website conversion rate by{" "}
                        <span className="text-emerald-500 font-medium">
                          37%
                        </span>{" "}
                        through A/B testing and UI optimizations"
                      </div>
                      <div className="flex items-center gap-2 mt-2">
                        <Button
                          variant="outline"
                          size="sm"
                          className="h-7 text-xs gap-1"
                        >
                          <Copy className="h-3 w-3" />
                          Copy
                        </Button>
                        <div className="flex items-center gap-1 ml-auto">
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-6 w-6"
                          >
                            <ThumbsUp className="h-3 w-3" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-6 w-6"
                          >
                            <ThumbsDown className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="p-3 pb-0">
                    <CardTitle className="text-sm flex items-center">
                      <AlertTriangle className="h-4 w-4 text-amber-500 mr-2" />
                      Use more powerful action verbs
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-3">
                    <p className="text-xs text-muted-foreground">
                      Replace generic verbs with stronger action verbs to make
                      your achievements stand out.
                    </p>
                    <div className="mt-2">
                      <div className="text-xs font-medium mb-1">
                        Instead of:
                      </div>
                      <div className="text-xs bg-muted p-2 rounded-md">
                        "Was responsible for managing the team's projects"
                      </div>
                      <div className="text-xs font-medium mt-2 mb-1">Try:</div>
                      <div className="text-xs bg-muted p-2 rounded-md">
                        "
                        <span className="text-emerald-500 font-medium">
                          Orchestrated
                        </span>{" "}
                        cross-functional team projects, ensuring on-time
                        delivery and 100% client satisfaction"
                      </div>
                      <div className="flex items-center gap-2 mt-2">
                        <Button
                          variant="outline"
                          size="sm"
                          className="h-7 text-xs gap-1"
                        >
                          <Copy className="h-3 w-3" />
                          Copy
                        </Button>
                        <div className="flex items-center gap-1 ml-auto">
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-6 w-6"
                          >
                            <ThumbsUp className="h-3 w-3" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-6 w-6"
                          >
                            <ThumbsDown className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="p-3 pb-0">
                    <CardTitle className="text-sm flex items-center">
                      <CheckCircle className="h-4 w-4 text-emerald-500 mr-2" />
                      Strong skills section
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-3">
                    <p className="text-xs text-muted-foreground">
                      Your skills section is well-organized and includes
                      relevant technical skills.
                    </p>
                  </CardContent>
                </Card>
              </div>

              <div className="flex justify-center mt-4">
                <Button variant="outline" size="sm" className="gap-1">
                  <RefreshCw className="h-3 w-3" />
                  Refresh Suggestions
                </Button>
              </div>
            </TabsContent>

            <TabsContent value="keywords" className="mt-4 space-y-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-medium">ATS Keyword Analysis</h3>
                <Button variant="outline" size="sm" className="gap-1">
                  <Sparkles className="h-3 w-3" />
                  Analyze Job Description
                </Button>
              </div>

              <Card>
                <CardHeader className="p-3 pb-0">
                  <CardTitle className="text-sm">Keyword Match</CardTitle>
                </CardHeader>
                <CardContent className="p-3">
                  <div className="flex items-center gap-4 mb-4">
                    <Progress value={70} className="flex-1 h-2" />
                    <span className="text-sm font-medium">70%</span>
                  </div>

                  <div className="space-y-3">
                    <div>
                      <h4 className="text-xs font-medium mb-2">
                        Found in your resume:
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        <Badge
                          variant="outline"
                          className="bg-emerald-100/30 text-xs"
                        >
                          React
                        </Badge>
                        <Badge
                          variant="outline"
                          className="bg-emerald-100/30 text-xs"
                        >
                          JavaScript
                        </Badge>
                        <Badge
                          variant="outline"
                          className="bg-emerald-100/30 text-xs"
                        >
                          TypeScript
                        </Badge>
                        <Badge
                          variant="outline"
                          className="bg-emerald-100/30 text-xs"
                        >
                          UI/UX
                        </Badge>
                        <Badge
                          variant="outline"
                          className="bg-emerald-100/30 text-xs"
                        >
                          HTML/CSS
                        </Badge>
                      </div>
                    </div>

                    <div>
                      <h4 className="text-xs font-medium mb-2 text-amber-500">
                        Missing keywords:
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        <Badge
                          variant="outline"
                          className="bg-amber-100/30 text-xs"
                        >
                          Next.js
                        </Badge>
                        <Badge
                          variant="outline"
                          className="bg-amber-100/30 text-xs"
                        >
                          Redux
                        </Badge>
                        <Badge
                          variant="outline"
                          className="bg-amber-100/30 text-xs"
                        >
                          Tailwind CSS
                        </Badge>
                        <Badge
                          variant="outline"
                          className="bg-amber-100/30 text-xs"
                        >
                          GraphQL
                        </Badge>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <div className="text-xs text-muted-foreground">
                <p className="mb-2">Recommendations:</p>
                <ul className="list-disc pl-4 space-y-1">
                  <li>
                    Add the missing keywords to your skills section if you have
                    experience with them
                  </li>
                  <li>
                    Include these technologies in your experience descriptions
                    where relevant
                  </li>
                  <li>
                    Ensure keywords appear naturally in context, not just as a
                    list
                  </li>
                </ul>
              </div>
            </TabsContent>

            <TabsContent value="analysis" className="mt-4 space-y-4">
              <div className="space-y-1 mb-4">
                <h3 className="text-sm font-medium">Resume Analysis</h3>
                <p className="text-xs text-muted-foreground">
                  Detailed analysis of your resume's strengths and areas for
                  improvement.
                </p>
              </div>

              <div className="space-y-3">
                <Card>
                  <CardHeader className="p-3">
                    <CardTitle className="text-sm">Content Quality</CardTitle>
                  </CardHeader>
                  <CardContent className="pt-0 p-3">
                    <div className="flex items-center gap-4 mb-4">
                      <Progress value={75} className="flex-1 h-2" />
                      <span className="text-sm font-medium">75/100</span>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Your content is clear and professional. Improve this score
                      by adding more specific achievements and metrics.
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="p-3">
                    <CardTitle className="text-sm">ATS Compatibility</CardTitle>
                  </CardHeader>
                  <CardContent className="pt-0 p-3">
                    <div className="flex items-center gap-4 mb-4">
                      <Progress value={90} className="flex-1 h-2" />
                      <span className="text-sm font-medium">90/100</span>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Your resume has good ATS compatibility with a clean format
                      and proper section headings.
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="p-3">
                    <CardTitle className="text-sm">
                      Industry Relevance
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-0 p-3">
                    <div className="flex items-center gap-4 mb-4">
                      <Progress value={65} className="flex-1 h-2" />
                      <span className="text-sm font-medium">65/100</span>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Your resume could be better aligned with industry
                      standards for frontend development roles. Consider adding
                      more technical projects and relevant technologies.
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="p-3">
                    <CardTitle className="text-sm">Impact Statements</CardTitle>
                  </CardHeader>
                  <CardContent className="pt-0 p-3">
                    <div className="flex items-center gap-4 mb-4">
                      <Progress value={60} className="flex-1 h-2" />
                      <span className="text-sm font-medium">60/100</span>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Your impact statements could be stronger. Focus on the
                      results of your work, not just responsibilities.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
