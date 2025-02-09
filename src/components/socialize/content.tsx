"use client";

import { useState } from "react";
import { Search, UserPlus, Users, MessageSquare } from "lucide-react";
import { useQuery } from "@tanstack/react-query";

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

async function getSocialData(type: "users" | "groups" | "all") {
  const res = await fetch(`/api/social?type=${type}`);
  if (!res.ok) throw new Error("Failed to fetch social data");
  return res.json();
}

export function SocializeContent() {
  const [searchTerm, setSearchTerm] = useState("");
  const { data, isLoading, error } = useQuery({
    queryKey: ["social"],
    queryFn: () => getSocialData("all"),
  });

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

  const { users, studyGroups } = data;

  const filteredUsers = users.filter(
    (user: any) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.course.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredGroups = studyGroups.filter(
    (group: any) =>
      group.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      group.course.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6 space-y-6 bg-gray-50 min-h-screen">
      <div>
        <h1 className="text-3xl font-bold text-gray-800">Socialize</h1>
        <p className="text-gray-600">
          Connect with fellow students and join study groups
        </p>
      </div>

      <div className="relative">
        <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-400" />
        <Input
          placeholder="Search users or study groups"
          className="pl-8 bg-white"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <Tabs defaultValue="users" className="space-y-4">
        <TabsList className="bg-white">
          <TabsTrigger value="users">Users</TabsTrigger>
          <TabsTrigger value="groups">Study Groups</TabsTrigger>
        </TabsList>
        <TabsContent value="users">
          <ScrollArea className="h-[600px]">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredUsers.map((user: any) => (
                <Card key={user._id} className="bg-white shadow-lg">
                  <CardHeader>
                    <div className="flex items-center space-x-4">
                      <Avatar>
                        <AvatarImage src={user.avatar} />
                        <AvatarFallback>
                          {user.name
                            .split(" ")
                            .map((n: any) => n[0])
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
                    <p className="text-sm text-gray-600">{user.bio}</p>
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
              {filteredGroups.map((group: any) => (
                <Card key={group._id} className="bg-white shadow-lg">
                  <CardHeader>
                    <CardTitle>{group.name}</CardTitle>
                    <CardDescription>{group.course}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-600">{group.description}</p>
                    <p className="text-sm mt-2 text-gray-600">
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
