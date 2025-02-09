"use client";

import { useState } from "react";
import { PlusCircle, TrendingUp, TrendingDown, Minus } from "lucide-react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

const courseSchema = z.object({
  name: z
    .string()
    .min(1, "Course name is required")
    .max(100, "Course name must be 100 characters or less"),
  grade: z
    .number()
    .min(0, "Grade must be at least 0")
    .max(100, "Grade must be 100 or less"),
  credits: z
    .number()
    .min(1, "Credits must be at least 1")
    .max(6, "Credits must be 6 or less"),
});

type Course = z.infer<typeof courseSchema>;

async function getCourses() {
  const res = await fetch("/api/grades");
  if (!res.ok) throw new Error("Failed to fetch courses");
  const data = await res.json();
  console.log("Fetched Courses:", data); // Debugging
  return Array.isArray(data) ? data : []; // Ensure it's always an array
}

async function createCourse(course: Course) {
  const res = await fetch("/api/grades", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(course),
  });
  if (!res.ok) throw new Error("Failed to create course");
  return res.json();
}

export function GradeTrackerContent() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const queryClient = useQueryClient();

  const {
    data: courses = [], // Ensure courses is at least an empty array
    isLoading,
    error,
  } = useQuery({
    queryKey: ["courses"],
    queryFn: getCourses,
  });

  const createCourseMutation = useMutation({
    mutationFn: createCourse,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["courses"] });
      setIsDialogOpen(false);
    },
  });

  const form = useForm<Course>({
    resolver: zodResolver(courseSchema),
    defaultValues: {
      name: "",
      grade: 0,
      credits: 1,
    },
  });

  function onSubmit(values: Course) {
    createCourseMutation.mutate(values);
  }

  const calculateGPA = () => {
    if (!courses || courses.length === 0) return 0;
    const totalCredits = courses.reduce(
      (sum: any, course: any) => sum + course.credits,
      0
    );
    const weightedSum = courses.reduce(
      (sum: any, course: any) => sum + course.grade * course.credits,
      0
    );
    return (weightedSum / totalCredits / 20).toFixed(2); // Assuming grades are out of 100, divide by 20 to get 4.0 scale
  };

  if (isLoading)
    return (
      <div className="flex items-center justify-center h-screen">
        Loading...
      </div>
    );
  if (error)
    return (
      <div className="flex items-center justify-center h-screen text-red-500">
        An error occurred: {error.message}
      </div>
    );

  return (
    <div className="p-6 space-y-6 bg-gray-50 min-h-screen">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Grade Tracker</h1>
          <p className="text-gray-600">Monitor your academic performance</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-blue-500 hover:bg-blue-600">
              <PlusCircle className="mr-2 h-4 w-4" /> Add Course
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Add New Course</DialogTitle>
              <DialogDescription>
                Enter the details of your new course
              </DialogDescription>
            </DialogHeader>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-8"
              >
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Course Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter course name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="grade"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Grade</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          placeholder="Enter grade (0-100)"
                          {...field}
                          onChange={(e) => field.onChange(+e.target.value)}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="credits"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Credits</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          placeholder="Enter credits"
                          {...field}
                          onChange={(e) => field.onChange(+e.target.value)}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" className="w-full">
                  Submit
                </Button>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </div>

      <Card className="bg-white shadow-lg">
        <CardHeader>
          <CardTitle>Overall GPA</CardTitle>
          <CardDescription>Based on your current grades</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-4xl font-bold text-blue-600">
            {calculateGPA()}
          </div>
        </CardContent>
      </Card>

      <Card className="bg-white shadow-lg">
        <CardHeader>
          <CardTitle>Course Grades</CardTitle>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[400px]">
            <div className="space-y-4">
              {courses.map((course: any) => (
                <Card key={course._id} className="bg-gray-50">
                  <CardHeader>
                    <CardTitle className="text-lg">{course.name}</CardTitle>
                    <CardDescription>{course.credits} credits</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between">
                      <div className="text-2xl font-bold text-gray-800">
                        {course.grade}%
                      </div>
                      <div className="flex items-center">
                        {course.grade >= 90 ? (
                          <TrendingUp className="text-green-500 mr-2" />
                        ) : course.grade >= 70 ? (
                          <Minus className="text-yellow-500 mr-2" />
                        ) : (
                          <TrendingDown className="text-red-500 mr-2" />
                        )}
                        <span className="text-sm font-medium">
                          {course.grade >= 90
                            ? "Excellent"
                            : course.grade >= 70
                            ? "Good"
                            : "Needs Improvement"}
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  );
}
