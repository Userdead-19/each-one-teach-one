"use client";

import { useState } from "react";
import { PlusCircle, CheckCircle, Clock, AlertCircle } from "lucide-react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
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
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

const taskSchema = z.object({
  title: z
    .string()
    .min(1, "Title is required")
    .max(100, "Title must be 100 characters or less"),
  description: z
    .string()
    .max(500, "Description must be 500 characters or less"),
  dueDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Invalid date format"),
  status: z.enum(["todo", "in-progress", "completed"]),
  priority: z.enum(["low", "medium", "high"]),
});

type Task = z.infer<typeof taskSchema>;

async function getTasks() {
  const res = await fetch("/api/tasks");
  if (!res.ok) throw new Error("Failed to fetch tasks");
  return res.json();
}

async function createTask(task: Task) {
  const res = await fetch("/api/tasks", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(task),
  });
  if (!res.ok) throw new Error("Failed to create task");
  return res.json();
}

async function updateTask(task: Task) {
  const res = await fetch("/api/tasks", {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(task),
  });
  if (!res.ok) throw new Error("Failed to update task");
  return res.json();
}

export function TaskManagementContent() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const queryClient = useQueryClient();

  const {
    data: tasks,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["tasks"],
    queryFn: getTasks,
  });

  const createTaskMutation = useMutation({
    mutationFn: createTask,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
      setIsDialogOpen(false);
    },
  });

  const updateTaskMutation = useMutation({
    mutationFn: updateTask,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
  });

  const form = useForm<Task>({
    resolver: zodResolver(taskSchema),
    defaultValues: {
      title: "",
      description: "",
      dueDate: "",
      status: "todo",
      priority: "medium",
    },
  });

  function onSubmit(values: Task) {
    createTaskMutation.mutate(values);
  }

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
          <h1 className="text-3xl font-bold text-gray-800">Task Management</h1>
          <p className="text-gray-600">Organize and track your assignments</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-blue-500 hover:bg-blue-600">
              <PlusCircle className="mr-2 h-4 w-4" /> Add Task
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Add New Task</DialogTitle>
              <DialogDescription>
                Create a new task to keep track of your assignments
              </DialogDescription>
            </DialogHeader>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-8"
              >
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Title</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter task title" {...field} />
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
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Enter task description"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="dueDate"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Due Date</FormLabel>
                      <FormControl>
                        <Input type="date" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="priority"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Priority</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select priority" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="low">Low</SelectItem>
                          <SelectItem value="medium">Medium</SelectItem>
                          <SelectItem value="high">High</SelectItem>
                        </SelectContent>
                      </Select>
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

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {(["todo", "in-progress", "completed"] as const).map((status) => (
          <Card key={status} className="bg-white shadow-lg">
            <CardHeader className="bg-gray-50 border-b">
              <CardTitle className="flex items-center text-lg">
                {status === "todo" && (
                  <Clock className="mr-2 h-5 w-5 text-blue-500" />
                )}
                {status === "in-progress" && (
                  <AlertCircle className="mr-2 h-5 w-5 text-yellow-500" />
                )}
                {status === "completed" && (
                  <CheckCircle className="mr-2 h-5 w-5 text-green-500" />
                )}
                {status.charAt(0).toUpperCase() +
                  status.slice(1).replace("-", " ")}
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <ScrollArea className="h-[500px]">
                {tasks
                  .filter((task: any) => task.status === status)
                  .map((task: any) => (
                    <Card key={task._id} className="m-4 bg-gray-50">
                      <CardHeader>
                        <CardTitle className="text-base">
                          {task.title}
                        </CardTitle>
                        <CardDescription>Due: {task.dueDate}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-gray-600">
                          {task.description}
                        </p>
                        <div className="mt-2">
                          <span
                            className={`inline-block px-2 py-1 text-xs font-semibold rounded-full ${
                              task.priority === "high"
                                ? "bg-red-100 text-red-800"
                                : task.priority === "medium"
                                ? "bg-yellow-100 text-yellow-800"
                                : "bg-green-100 text-green-800"
                            }`}
                          >
                            {task.priority.charAt(0).toUpperCase() +
                              task.priority.slice(1)}{" "}
                            Priority
                          </span>
                        </div>
                      </CardContent>
                      <CardFooter>
                        <Select
                          defaultValue={task.status}
                          onValueChange={(newStatus) =>
                            updateTaskMutation.mutate({
                              ...task,
                              status: newStatus as Task["status"],
                            })
                          }
                        >
                          <SelectTrigger className="w-full">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="todo">To Do</SelectItem>
                            <SelectItem value="in-progress">
                              In Progress
                            </SelectItem>
                            <SelectItem value="completed">Completed</SelectItem>
                          </SelectContent>
                        </Select>
                      </CardFooter>
                    </Card>
                  ))}
              </ScrollArea>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
