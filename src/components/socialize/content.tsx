"use client";

import { useState } from "react";
import { Search, UserPlus, Users, MessageSquare } from "lucide-react";

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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface User {
  id: number;
  name: string;
  avatar: string;
  course: string;
  bio: string;
}

interface StudyGroup {
  id: number;
  name: string;
  members: number;
  course: string;
  description: string;
}

export function SocializeContent() {
  const [users] = useState<User[]>([
    {
      id: 1,
      name: "Alice Smith",
      avatar: "/placeholder.svg?height=40&width=40",
      course: "Computer Science",
      bio: "Passionate about AI and machine learning",
    },
    {
      id: 2,
      name: "Bob Johnson",
      avatar: "/placeholder.svg?height=40&width=40",
      course: "Biology",
      bio: "Aspiring genetic engineer",
    },
    {
      id: 3,
      name: "Charlie Brown",
      avatar: "/placeholder.svg?height=40&width=40",
      course: "Literature",
      bio: "Love reading classic novels",
    },
    {
      id: 4,
      name: "Diana Taylor",
      avatar: "/placeholder.svg?height=40&width=40",
      course: "Physics",
      bio: "Fascinated by quantum mechanics",
    },
  ]);

  const [studyGroups] = useState<StudyGroup[]>([
    {
      id: 1,
      name: "CS101 Study Group",
      members: 15,
      course: "Computer Science",
      description: "Weekly meetings to discuss CS fundamentals",
    },
    {
      id: 2,
      name: "Biology Research Club",
      members: 10,
      course: "Biology",
      description: "Collaborative research projects and discussions",
    },
    {
      id: 3,
      name: "Shakespeare Reading Group",
      members: 8,
      course: "Literature",
      description: "Analyzing Shakespeare's plays and sonnets",
    },
    {
      id: 4,
      name: "Quantum Physics Explorers",
      members: 12,
      course: "Physics",
      description: "Deep dive into quantum physics concepts",
    },
  ]);

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Socialize</h1>
        <p className="text-gray-500">
          Connect with fellow students and join study groups
        </p>
      </div>

      <div className="relative">
        <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-400" />
        <Input placeholder="Search users or study groups" className="pl-8" />
      </div>

      <Tabs defaultValue="users">
        <TabsList>
          <TabsTrigger value="users">Users</TabsTrigger>
          <TabsTrigger value="groups">Study Groups</TabsTrigger>
        </TabsList>
        <TabsContent value="users">
          <ScrollArea className="h-[600px]">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {users.map((user) => (
                <Card key={user.id}>
                  <CardHeader>
                    <div className="flex items-center space-x-4">
                      <Avatar>
                        <AvatarImage src={user.avatar} />
                        <AvatarFallback>
                          {user.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <CardTitle>{user.name}</CardTitle>
                        <CardDescription>{user.course}</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm">{user.bio}</p>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" className="w-full">
                      <UserPlus className="mr-2 h-4 w-4" />
                      Connect
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </ScrollArea>
        </TabsContent>
        <TabsContent value="groups">
          <ScrollArea className="h-[600px]">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {studyGroups.map((group) => (
                <Card key={group.id}>
                  <CardHeader>
                    <CardTitle>{group.name}</CardTitle>
                    <CardDescription>{group.course}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm">{group.description}</p>
                    <p className="text-sm mt-2">
                      <Users className="inline mr-2 h-4 w-4" />
                      {group.members} members
                    </p>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" className="w-full">
                      <MessageSquare className="mr-2 h-4 w-4" />
                      Join Group
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </ScrollArea>
        </TabsContent>
      </Tabs>
    </div>
  );
}
