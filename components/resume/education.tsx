"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { GripVertical, Trash2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// Define form schema
const educationFormSchema = z.object({
  degree: z
    .string()
    .min(2, { message: "Degree/qualification must be at least 2 characters." }),
  institution: z.string().min(2, { message: "Institution name is required." }),
  location: z.string().optional(),
  startYear: z.string(),
  endYear: z.string().optional(),
  currentlyStudying: z.boolean().default(false),
  gpa: z.string().optional(),
  activities: z.string().optional(),
  description: z.string().optional(),
  showGPA: z.boolean().default(true),
});

// Sample years for dropdowns
const currentYear = new Date().getFullYear();
const years = Array.from({ length: 50 }, (_, i) =>
  (currentYear - i).toString()
);

export function ResumeEducationForm() {
  const [educations, setEducations] = useState<any[]>([]);
  const [currentEducation, setCurrentEducation] = useState<number | null>(null);

  const form = useForm<z.infer<typeof educationFormSchema>>({
    resolver: zodResolver(educationFormSchema),
    defaultValues: {
      degree: "",
      institution: "",
      location: "",
      startYear: "",
      endYear: "",
      currentlyStudying: false,
      gpa: "",
      activities: "",
      description: "",
      showGPA: true,
    },
  });

  function onSubmit(values: z.infer<typeof educationFormSchema>) {
    if (currentEducation !== null) {
      // Update existing education
      const updatedEducations = [...educations];
      updatedEducations[currentEducation] = values;
      setEducations(updatedEducations);
    } else {
      // Add new education
      setEducations([...educations, values]);
    }

    form.reset();
    setCurrentEducation(null);
  }

  function editEducation(index: number) {
    const education = educations[index];
    form.reset(education);
    setCurrentEducation(index);
  }

  function deleteEducation(index: number) {
    const updatedEducations = [...educations];
    updatedEducations.splice(index, 1);
    setEducations(updatedEducations);

    if (currentEducation === index) {
      form.reset();
      setCurrentEducation(null);
    } else if (currentEducation !== null && currentEducation > index) {
      setCurrentEducation(currentEducation - 1);
    }
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Education</CardTitle>
          <CardDescription>
            Add your educational background in reverse chronological order.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <AnimatePresence>
            {educations.length > 0 && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="mb-6 space-y-2"
              >
                <h3 className="text-sm font-medium mb-3">Your Education</h3>
                {educations.map((edu, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className={`flex items-center border rounded-md p-3 cursor-pointer hover:bg-accent/50 transition-colors ${
                      currentEducation === index
                        ? "border-emerald-500 bg-accent/50"
                        : ""
                    }`}
                    onClick={() => editEducation(index)}
                  >
                    <div className="p-1 mr-2 cursor-grab">
                      <GripVertical className="h-5 w-5 text-muted-foreground" />
                    </div>
                    <div className="flex-1">
                      <div className="font-medium">{edu.degree}</div>
                      <div className="text-sm text-muted-foreground">
                        {edu.institution}{" "}
                        {edu.location ? `• ${edu.location}` : ""} •{" "}
                        {edu.startYear} -{" "}
                        {edu.currentlyStudying ? "Present" : edu.endYear}
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-destructive hover:text-destructive hover:bg-destructive/10"
                      onClick={(e) => {
                        e.stopPropagation();
                        deleteEducation(index);
                      }}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="degree"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        Degree/Qualification{" "}
                        <span className="text-destructive">*</span>
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Bachelor of Science in Computer Science"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="institution"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        Institution <span className="text-destructive">*</span>
                      </FormLabel>
                      <FormControl>
                        <Input placeholder="University Name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="location"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Location</FormLabel>
                    <FormControl>
                      <Input placeholder="City, State, Country" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <FormLabel>Study Period</FormLabel>
                  <FormField
                    control={form.control}
                    name="currentlyStudying"
                    render={({ field }) => (
                      <FormItem className="flex items-center space-x-2">
                        <FormControl>
                          <Switch
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                        <FormLabel className="text-xs">
                          Currently studying
                        </FormLabel>
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="startYear"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-xs">Start Year</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Year" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {years.map((year) => (
                              <SelectItem key={year} value={year}>
                                {year}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="endYear"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-xs">
                          End Year/Expected Graduation
                        </FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                          disabled={form.watch("currentlyStudying")}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Year" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {[
                              ...years,
                              ...Array.from({ length: 5 }, (_, i) =>
                                (currentYear + i + 1).toString()
                              ),
                            ].map((year) => (
                              <SelectItem key={year} value={year}>
                                {year}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              <div className="flex items-center justify-between">
                <FormField
                  control={form.control}
                  name="gpa"
                  render={({ field }) => (
                    <FormItem className="flex-1 mr-4">
                      <FormLabel>GPA (if applicable)</FormLabel>
                      <FormControl>
                        <Input placeholder="3.8/4.0" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="showGPA"
                  render={({ field }) => (
                    <FormItem className="flex items-center space-x-2 pt-7">
                      <FormControl>
                        <Switch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <FormLabel className="text-xs">Show on resume</FormLabel>
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="activities"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Activities and Societies</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Relevant clubs, societies, or extracurricular activities"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Additional Information</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="• Relevant coursework, achievements, or projects
• Academic honors or awards
• Study abroad experiences"
                        className="min-h-[100px]"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      Add any additional relevant information about your
                      education.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="pt-4 flex justify-between items-center">
                <Button
                  type="button"
                  variant="ghost"
                  onClick={() => {
                    form.reset();
                    setCurrentEducation(null);
                  }}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className="bg-emerald-600 hover:bg-emerald-700"
                >
                  {currentEducation !== null
                    ? "Update Education"
                    : "Add Education"}
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
