"use client";

import { useState } from "react";
import { PlusCircle, CheckCircle, Clock, AlertCircle } from "lucide-react";

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

interface Task {
  id: number;
  title: string;
  description: string;
  dueDate: string;
  status: "todo" | "in-progress" | "completed";
  priority: "low" | "medium" | "high";
}

export function TaskManagementContent() {
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: 1,
      title: "Complete Math Assignment",
      description: "Finish exercises 1-10 from Chapter 3",
      dueDate: "2023-07-15",
      status: "todo",
      priority: "high",
    },
    {
      id: 2,
      title: "Read History Chapter",
      description: "Read Chapter 5: The Renaissance",
      dueDate: "2023-07-18",
      status: "in-progress",
      priority: "medium",
    },
    {
      id: 3,
      title: "Prepare Science Presentation",
      description: "Create slides for the ecosystem presentation",
      dueDate: "2023-07-20",
      status: "todo",
      priority: "high",
    },
    {
      id: 4,
      title: "Submit English Essay",
      description: "Write a 1000-word essay on Shakespeare",
      dueDate: "2023-07-22",
      status: "completed",
      priority: "medium",
    },
  ]);

  const addTask = (newTask: Omit<Task, "id">) => {
    setTasks([...tasks, { ...newTask, id: tasks.length + 1 }]);
  };

  const updateTaskStatus = (id: number, newStatus: Task["status"]) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, status: newStatus } : task
      )
    );
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Task Management</h1>
          <p className="text-gray-500">Organize and track your assignments</p>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <PlusCircle className="mr-2 h-4 w-4" /> Add Task
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Task</DialogTitle>
              <DialogDescription>
                Create a new task to keep track of your assignments
              </DialogDescription>
            </DialogHeader>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                const formData = new FormData(e.currentTarget);
                addTask({
                  title: formData.get("title") as string,
                  description: formData.get("description") as string,
                  dueDate: formData.get("dueDate") as string,
                  status: "todo",
                  priority: formData.get("priority") as Task["priority"],
                });
              }}
            >
              <div className="space-y-4">
                <div>
                  <label
                    htmlFor="title"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Title
                  </label>
                  <Input
                    id="title"
                    name="title"
                    placeholder="Enter task title"
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="description"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Description
                  </label>
                  <Textarea
                    id="description"
                    name="description"
                    placeholder="Enter task description"
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="dueDate"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Due Date
                  </label>
                  <Input id="dueDate" name="dueDate" type="date" required />
                </div>
                <div>
                  <label
                    htmlFor="priority"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Priority
                  </label>
                  <Select name="priority">
                    <SelectTrigger>
                      <SelectValue placeholder="Select priority" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="low">Low</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="high">High</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <DialogFooter className="mt-6">
                <Button type="submit">Add Task</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {(["todo", "in-progress", "completed"] as const).map((status) => (
          <Card key={status}>
            <CardHeader>
              <CardTitle className="flex items-center">
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
            <CardContent>
              <ScrollArea className="h-[500px] pr-4">
                {tasks
                  .filter((task) => task.status === status)
                  .map((task) => (
                    <Card key={task.id} className="mb-4">
                      <CardHeader>
                        <CardTitle>{task.title}</CardTitle>
                        <CardDescription>Due: {task.dueDate}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm">{task.description}</p>
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
                            updateTaskStatus(
                              task.id,
                              newStatus as Task["status"]
                            )
                          }
                        >
                          <SelectTrigger>
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
