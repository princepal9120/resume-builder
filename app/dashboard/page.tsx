"use client";

import { useState } from "react";
import Link from "next/link";
import {
  PlusIcon,
  Grid3X3Icon,
  ListIcon,
  BriefcaseIcon,
  GraduationCapIcon,
  FileTextIcon,
  SettingsIcon,
  UserIcon,
  LineChartIcon,
  ArrowRightIcon,
  MoreVerticalIcon,
  ChevronsUpDown,
  Clock4Icon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";


import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Switch } from "@/components/ui/switch";
import { motion } from "framer-motion";
import { DashboardShell } from "@/components/dashboard/content";
import { DashboardHeader } from "@/components/dashboard/header";

export default function DashboardPage() {
  const [view, setView] = useState<"grid" | "list">("grid");

  return (
    <DashboardShell>
      <DashboardHeader
        heading="My Dashboard"
        text="Manage your resumes and job applications"
      >
        <Link href="/resume/new">
          <Button className="bg-emerald-600 hover:bg-emerald-700">
            <PlusIcon className="mr-2 h-4 w-4" />
            Create New Resume
          </Button>
        </Link>
      </DashboardHeader>
      <Tabs defaultValue="resumes" className="space-y-4">
        <div className="flex items-center justify-between">
          <TabsList>
            <TabsTrigger value="resumes">
              <FileTextIcon className="mr-2 h-4 w-4" />
              Resumes
            </TabsTrigger>
            <TabsTrigger value="applications">
              <BriefcaseIcon className="mr-2 h-4 w-4" />
              Applications
            </TabsTrigger>
            <TabsTrigger value="analytics">
              <LineChartIcon className="mr-2 h-4 w-4" />
              Analytics
            </TabsTrigger>
          </TabsList>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="icon"
              aria-label="Grid view"
              className={view === "grid" ? "bg-muted" : ""}
              onClick={() => setView("grid")}
            >
              <Grid3X3Icon className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              aria-label="List view"
              className={view === "list" ? "bg-muted" : ""}
              onClick={() => setView("list")}
            >
              <ListIcon className="h-4 w-4" />
            </Button>
          </div>
        </div>
        <TabsContent value="resumes" className="space-y-4">
          <div className="flex justify-between">
            <div className="space-y-1">
              <h2 className="text-2xl font-bold tracking-tight">
                Your Resumes
              </h2>
              <p className="text-muted-foreground">
                Create, manage, and customize your resumes.
              </p>
            </div>
          </div>
          {view === "grid" ? (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
              >
                <Card className="border-dashed bg-muted/50 flex h-[220px] items-center justify-center">
                  <CardContent className="flex flex-col items-center justify-center space-y-2 p-6">
                    <div className="rounded-full bg-muted p-3">
                      <PlusIcon className="h-6 w-6" />
                    </div>
                    <h3 className="text-xl font-medium">Create new resume</h3>
                    <Link href="/resume/new">
                      <Button className="mt-2 bg-emerald-600 hover:bg-emerald-700">
                        Get Started
                        <ArrowRightIcon className="ml-2 h-4 w-4" />
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              </motion.div>
              {[1, 2].map((resume, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  <Card className="overflow-hidden">
                    <div className="aspect-[3/4] bg-muted relative">
                      <div className="absolute inset-0 flex items-center justify-center text-lg font-medium">
                        Resume Preview
                      </div>
                      <div className="absolute top-2 right-2">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreVerticalIcon className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>Edit</DropdownMenuItem>
                            <DropdownMenuItem>Duplicate</DropdownMenuItem>
                            <DropdownMenuItem>Download</DropdownMenuItem>
                            <DropdownMenuItem className="text-destructive">
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </div>
                    <CardHeader className="p-4">
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-lg">
                          Resume {index + 1}
                        </CardTitle>
                      </div>
                      <CardDescription className="flex items-center text-xs">
                        <Clock4Icon className="mr-1 h-3 w-3" />
                        Last edited 2 days ago
                      </CardDescription>
                    </CardHeader>
                  </Card>
                </motion.div>
              ))}
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              <Card>
                <CardContent className="p-0">
                  <div className="divide-y">
                    <div className="flex items-center justify-between p-4">
                      <div className="flex items-center space-x-4">
                        <div className="h-10 w-10 rounded bg-muted flex items-center justify-center">
                          <FileTextIcon className="h-5 w-5" />
                        </div>
                        <div>
                          <div className="font-medium">
                            Senior Developer Resume
                          </div>
                          <div className="text-sm text-muted-foreground">
                            Last edited 2 days ago
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Button variant="outline" size="sm">
                          Edit
                        </Button>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreVerticalIcon className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>Duplicate</DropdownMenuItem>
                            <DropdownMenuItem>Download</DropdownMenuItem>
                            <DropdownMenuItem className="text-destructive">
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </div>
                    <div className="flex items-center justify-between p-4">
                      <div className="flex items-center space-x-4">
                        <div className="h-10 w-10 rounded bg-muted flex items-center justify-center">
                          <FileTextIcon className="h-5 w-5" />
                        </div>
                        <div>
                          <div className="font-medium">
                            Product Manager Resume
                          </div>
                          <div className="text-sm text-muted-foreground">
                            Last edited 5 days ago
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Button variant="outline" size="sm">
                          Edit
                        </Button>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreVerticalIcon className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>Duplicate</DropdownMenuItem>
                            <DropdownMenuItem>Download</DropdownMenuItem>
                            <DropdownMenuItem className="text-destructive">
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </div>
                    <div className="flex items-center justify-between p-4">
                      <div className="flex items-center space-x-4">
                        <div className="h-10 w-10 rounded bg-muted flex items-center justify-center">
                          <FileTextIcon className="h-5 w-5" />
                        </div>
                        <div>
                          <div className="font-medium">UX Designer Resume</div>
                          <div className="text-sm text-muted-foreground">
                            Last edited 1 week ago
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Button variant="outline" size="sm">
                          Edit
                        </Button>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreVerticalIcon className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>Duplicate</DropdownMenuItem>
                            <DropdownMenuItem>Download</DropdownMenuItem>
                            <DropdownMenuItem className="text-destructive">
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </TabsContent>
      </Tabs>
    </DashboardShell>
  );
}
