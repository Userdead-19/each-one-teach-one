"use client";

import { useState } from "react";
import { PlusCircle, TrendingUp, TrendingDown, Minus } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Course {
  id: number;
  name: string;
  grade: number;
  credits: number;
}

export function GradeTrackerContent() {
  const [courses, setCourses] = useState<Course[]>([
    { id: 1, name: "Mathematics", grade: 85, credits: 3 },
    { id: 2, name: "Physics", grade: 78, credits: 4 },
    { id: 3, name: "Computer Science", grade: 92, credits: 4 },
    { id: 4, name: "English Literature", grade: 88, credits: 3 },
  ]);

  const addCourse = (newCourse: Omit<Course, "id">) => {
    setCourses([...courses, { ...newCourse, id: courses.length + 1 }]);
  };

  const calculateGPA = () => {
    const totalCredits = courses.reduce(
      (sum, course) => sum + course.credits,
      0
    );
    const weightedSum = courses.reduce(
      (sum, course) => sum + course.grade * course.credits,
      0
    );
    return (weightedSum / totalCredits / 20).toFixed(2); // Assuming grades are out of 100, divide by 20 to get 4.0 scale
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Grade Tracker</h1>
          <p className="text-gray-500">Monitor your academic performance</p>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <PlusCircle className="mr-2 h-4 w-4" /> Add Course
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Course</DialogTitle>
              <DialogDescription>
                Enter the details of your new course
              </DialogDescription>
            </DialogHeader>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                const formData = new FormData(e.currentTarget);
                addCourse({
                  name: formData.get("name") as string,
                  grade: Number(formData.get("grade")),
                  credits: Number(formData.get("credits")),
                });
              }}
            >
              <div className="space-y-4">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Course Name
                  </label>
                  <Input
                    id="name"
                    name="name"
                    placeholder="Enter course name"
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="grade"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Grade
                  </label>
                  <Input
                    id="grade"
                    name="grade"
                    type="number"
                    min="0"
                    max="100"
                    placeholder="Enter grade (0-100)"
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="credits"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Credits
                  </label>
                  <Input
                    id="credits"
                    name="credits"
                    type="number"
                    min="1"
                    max="6"
                    placeholder="Enter credits"
                    required
                  />
                </div>
              </div>
              <DialogFooter className="mt-6">
                <Button type="submit">Add Course</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Overall GPA</CardTitle>
          <CardDescription>Based on your current grades</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-4xl font-bold">{calculateGPA()}</div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Course Grades</CardTitle>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[400px]">
            <div className="space-y-4">
              {courses.map((course) => (
                <Card key={course.id}>
                  <CardHeader>
                    <CardTitle>{course.name}</CardTitle>
                    <CardDescription>{course.credits} credits</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between">
                      <div className="text-2xl font-bold">{course.grade}%</div>
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
