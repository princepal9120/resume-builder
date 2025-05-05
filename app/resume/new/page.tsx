"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FileTextIcon, UploadIcon, ArrowRight, Templates, FileUp } from "lucide-react";
import { motion } from "framer-motion";

export default function NewResumePage() {
  const [resumeName, setResumeName] = useState("");
  
  const templates = [
    { id: 1, name: "Professional", description: "Clean, traditional layout for corporate roles", popular: true },
    { id: 2, name: "Modern", description: "Sleek design with creative touches", popular: false },
    { id: 3, name: "Minimalist", description: "Simple, focused layout with ample white space", popular: false },
    { id: 4, name: "Creative", description: "Bold design for creative industry roles", popular: false },
    { id: 5, name: "Executive", description: "Sophisticated design for senior positions", popular: false },
    { id: 6, name: "ATS Optimized", description: "Format specifically designed to pass ATS systems", popular: true },
  ];
  
  return (
    <div className="container max-w-5xl py-8">
      <div className="flex items-center mb-8">
        <Link href="/dashboard">
          <Button variant="ghost" size="sm">
            Dashboard
          </Button>
        </Link>
        <div className="mx-2 text-muted-foreground">/</div>
        <span className="text-muted-foreground">New Resume</span>
      </div>
      
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Create New Resume</h1>
          <p className="text-muted-foreground mt-2">
            Start with a blank template or upload an existing resume to enhance.
          </p>
        </div>
        
        <div className="space-y-6">
          <div className="grid gap-4">
            <Label htmlFor="resume-name">Resume Name</Label>
            <Input
              id="resume-name"
              placeholder="e.g., My Professional Resume"
              className="max-w-md"
              value={resumeName}
              onChange={(e) => setResumeName(e.target.value)}
            />
          </div>
          
          <Tabs defaultValue="template" className="w-full">
            <TabsList className="grid w-full grid-cols-3 max-w-md">
              <TabsTrigger value="template">Template</TabsTrigger>
              <TabsTrigger value="upload">Upload Resume</TabsTrigger>
              <TabsTrigger value="blank">Start from Scratch</TabsTrigger>
            </TabsList>
            
            <TabsContent value="template" className="space-y-4 mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {templates.map((template, index) => (
                  <motion.div
                    key={template.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                  >
                    <Link href={`/resume/${template.id}`}>
                      <Card className="overflow-hidden h-full cursor-pointer transition-all hover:shadow-md">
                        <div className="aspect-[3/4] bg-muted relative">
                          <div className="absolute inset-0 flex items-center justify-center">
                            <Templates className="h-12 w-12 text-muted-foreground/50" />
                          </div>
                          {template.popular && (
                            <div className="absolute top-2 right-2">
                              <div className="bg-emerald-500 text-white text-xs px-2 py-1 rounded-full">
                                Popular
                              </div>
                            </div>
                          )}
                        </div>
                        <CardContent className="p-4">
                          <div className="font-medium">{template.name}</div>
                          <div className="text-sm text-muted-foreground mt-1">
                            {template.description}
                          </div>
                        </CardContent>
                      </Card>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="upload" className="space-y-4 mt-6">
              <Card>
                <CardContent className="p-6 flex flex-col items-center justify-center text-center">
                  <div className="w-full max-w-md">
                    <div className="mb-8">
                      <div className="border-2 border-dashed rounded-lg p-12 flex flex-col items-center justify-center">
                        <FileUp className="h-12 w-12 text-muted-foreground/50 mb-4" />
                        <div className="space-y-2">
                          <p className="text-sm font-medium">
                            Drag and drop or click to upload
                          </p>
                          <p className="text-xs text-muted-foreground">
                            Supported formats: PDF, DOCX, TXT
                          </p>
                        </div>
                        <Button className="mt-4" size="sm">
                          <UploadIcon className="mr-2 h-4 w-4" />
                          Upload File
                        </Button>
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <h3 className="text-lg font-medium">How it works</h3>
                      <div className="grid grid-cols-1 gap-4 text-sm text-muted-foreground">
                        <div className="flex items-start gap-2">
                          <div className="bg-primary/10 text-primary rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0">
                            1
                          </div>
                          <div className="text-left">
                            Upload your existing resume in PDF, DOCX, or TXT format
                          </div>
                        </div>
                        <div className="flex items-start gap-2">
                          <div className="bg-primary/10 text-primary rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0">
                            2
                          </div>
                          <div className="text-left">
                            Our AI parses and extracts information from your document
                          </div>
                        </div>
                        <div className="flex items-start gap-2">
                          <div className="bg-primary/10 text-primary rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0">
                            3
                          </div>
                          <div className="text-left">
                            Review and edit the extracted information in our editor
                          </div>
                        </div>
                        <div className="flex items-start gap-2">
                          <div className="bg-primary/10 text-primary rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0">
                            4
                          </div>
                          <div className="text-left">
                            Enhance your resume with AI suggestions and templates
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="blank" className="space-y-4 mt-6">
              <Card>
                <CardContent className="p-6">
                  <div className="text-center max-w-lg mx-auto">
                    <FileTextIcon className="h-12 w-12 text-muted-foreground/50 mx-auto mb-4" />
                    <h3 className="text-lg font-medium mb-2">Start with a blank resume</h3>
                    <p className="text-sm text-muted-foreground mb-6">
                      Create your resume from scratch with our step-by-step builder and AI assistance.
                    </p>
                    
                    <Link href={resumeName ? `/resume/blank?name=${encodeURIComponent(resumeName)}` : "/resume/blank"}>
                      <Button className="gap-2 bg-emerald-600 hover:bg-emerald-700">
                        Create Blank Resume
                        <ArrowRight className="h-4 w-4" />
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}