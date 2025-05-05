"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Slider } from "@/components/ui/slider";
import { FileTextIcon, Sparkles, MessageSquare } from "lucide-react";

// Define form schema
const summaryFormSchema = z.object({
  summary: z
    .string()
    .min(50, {
      message: "Professional summary should be at least 50 characters.",
    })
    .max(500, {
      message: "Professional summary should not exceed 500 characters.",
    }),
});

export function ResumeSummaryForm() {
  const [summaryLength, setSummaryLength] = useState<number>(150);
  const [showAISuggestion, setShowAISuggestion] = useState(false);

  const form = useForm<z.infer<typeof summaryFormSchema>>({
    resolver: zodResolver(summaryFormSchema),
    defaultValues: {
      summary: "",
    },
  });

  function onSubmit(values: z.infer<typeof summaryFormSchema>) {
    console.log(values);
  }

  // Sample AI suggestions for professional summary
  const aiSuggestions = [
    "Results-driven Senior Frontend Developer with 7+ years of experience creating responsive, user-centered web applications. Specializing in React and modern JavaScript frameworks with a strong focus on performance optimization and accessibility. Proven track record of reducing load times by 40% and improving user engagement metrics through intuitive UI/UX design.",

    "Innovative Senior Frontend Developer with expertise in React, TypeScript, and state management libraries. Passionate about creating scalable component systems and implementing CI/CD pipelines that improve development efficiency. Experienced in mentoring junior developers and collaborating with cross-functional teams to deliver high-quality products.",

    "Detail-oriented Frontend Developer with extensive experience in building performant web applications using React and Next.js. Skilled in translating design mockups into responsive interfaces with pixel-perfect accuracy. Committed to writing clean, maintainable code and implementing best practices for web accessibility and SEO.",
  ];

  function useSuggestion(suggestion: string) {
    form.setValue("summary", suggestion);
    setShowAISuggestion(false);
  }

  const summaryValue = form.watch("summary");
  const characterCount = summaryValue?.length || 0;

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Professional Summary</CardTitle>
          <CardDescription>
            Add a compelling overview of your professional background and key
            strengths.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="summary"
                render={({ field }) => (
                  <FormItem>
                    <div className="flex justify-between items-center">
                      <FormLabel>Summary</FormLabel>
                      <div className="text-xs text-muted-foreground">
                        {characterCount}/{summaryLength} characters
                      </div>
                    </div>
                    <FormControl>
                      <Textarea
                        placeholder="Summarize your professional background, key skills, and what makes you stand out as a candidate. Focus on your most relevant achievements and expertise."
                        className="min-h-[180px] resize-none"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription className="flex justify-between items-center">
                      <span>
                        Write a concise, impactful summary that highlights your
                        value to employers.
                      </span>
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="space-y-4 pt-2">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Summary Length</label>
                  <div className="flex items-center gap-4">
                    <span className="text-xs text-muted-foreground">Short</span>
                    <Slider
                      defaultValue={[150]}
                      max={500}
                      min={50}
                      step={10}
                      className="flex-1"
                      onValueChange={(value) => setSummaryLength(value[0])}
                    />
                    <span className="text-xs text-muted-foreground">
                      Detailed
                    </span>
                  </div>
                </div>

                <Separator />

                <div className="space-y-2">
                  <Button
                    type="button"
                    variant="outline"
                    className="w-full gap-2"
                    onClick={() => setShowAISuggestion(!showAISuggestion)}
                  >
                    <Sparkles className="h-4 w-4 text-emerald-500" />
                    {showAISuggestion
                      ? "Hide AI Suggestions"
                      : "Get AI Suggestions"}
                  </Button>

                  {showAISuggestion && (
                    <div className="space-y-2 mt-4">
                      <p className="text-sm text-muted-foreground">
                        These AI-generated suggestions are based on frontend
                        developer profiles. Click one to use it as a starting
                        point:
                      </p>
                      <div className="space-y-2">
                        {aiSuggestions.map((suggestion, index) => (
                          <Card
                            key={index}
                            className="cursor-pointer hover:bg-accent/50 transition-colors"
                            onClick={() => useSuggestion(suggestion)}
                          >
                            <CardContent className="p-3">
                              <div className="flex items-start gap-2">
                                <MessageSquare className="h-5 w-5 text-emerald-500 mt-0.5 flex-shrink-0" />
                                <div>
                                  <p className="text-sm">{suggestion}</p>
                                  <p className="text-xs text-muted-foreground mt-1">
                                    Click to use this summary
                                  </p>
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div className="pt-4">
                <Button
                  type="submit"
                  className="bg-emerald-600 hover:bg-emerald-700"
                >
                  Save Summary
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
