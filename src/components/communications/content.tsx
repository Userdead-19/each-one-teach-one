"use client";

import { useState } from "react";
import { MessageSquare, Users, PlusCircle } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export function CommunicationsContent() {
  const [chats, setChats] = useState([
    {
      id: 1,
      name: "John Doe",
      lastMessage: "Hey, how's your project going?",
      timestamp: "10:30 AM",
      unread: 2,
    },
    {
      id: 2,
      name: "Alice Smith",
      lastMessage: "Don't forget about our study session!",
      timestamp: "Yesterday",
      unread: 0,
    },
    {
      id: 3,
      name: "Bob Johnson",
      lastMessage: "Thanks for your help!",
      timestamp: "2 days ago",
      unread: 1,
    },
  ]);

  const [forumPosts, setForumPosts] = useState([
    {
      id: 1,
      author: "Alice Smith",
      title: "Tips for Effective Studying",
      content: "Here are some tips that have helped me...",
      timestamp: "2 hours ago",
      replies: 5,
    },
    {
      id: 2,
      author: "Bob Johnson",
      title: "Question about Math Assignment",
      content: "I'm stuck on problem 3, can anyone help?",
      timestamp: "1 day ago",
      replies: 12,
    },
    {
      id: 3,
      author: "Charlie Brown",
      title: "Group Study for Biology Exam",
      content:
        "Anyone interested in forming a study group for the upcoming Biology exam?",
      timestamp: "3 days ago",
      replies: 8,
    },
  ]);

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Communications</h1>
        <p className="text-gray-500">
          Connect with other learners and share knowledge
        </p>
      </div>

      <Tabs defaultValue="chat" className="space-y-4">
        <TabsList>
          <TabsTrigger value="chat">Chat</TabsTrigger>
          <TabsTrigger value="forum">Forum</TabsTrigger>
        </TabsList>

        <TabsContent value="chat">
          <Card>
            <CardHeader>
              <CardTitle>Chats</CardTitle>
              <CardDescription>Your recent conversations</CardDescription>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[400px] pr-4">
                {chats.map((chat) => (
                  <Link href={`/communications/chat/${chat.id}`} key={chat.id}>
                    <div className="flex items-center space-x-4 p-3 hover:bg-gray-100 rounded-lg cursor-pointer">
                      <Avatar>
                        <AvatarImage
                          src={`/placeholder.svg?height=40&width=40`}
                        />
                        <AvatarFallback>
                          {chat.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium truncate">{chat.name}</p>
                        <p className="text-sm text-gray-500 truncate">
                          {chat.lastMessage}
                        </p>
                      </div>
                      <div className="flex flex-col items-end">
                        <p className="text-xs text-gray-500">
                          {chat.timestamp}
                        </p>
                        {chat.unread > 0 && (
                          <span className="bg-blue-500 text-white text-xs font-medium px-2 py-1 rounded-full">
                            {chat.unread}
                          </span>
                        )}
                      </div>
                    </div>
                  </Link>
                ))}
              </ScrollArea>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="forum">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle>Forum</CardTitle>
                  <CardDescription>
                    Discuss and share knowledge with the community
                  </CardDescription>
                </div>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button>
                      <PlusCircle className="h-4 w-4 mr-2" />
                      New Post
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Create a New Post</DialogTitle>
                      <DialogDescription>
                        Share your thoughts or questions with the community
                      </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div>
                        <label
                          htmlFor="post-title"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Title
                        </label>
                        <Input
                          id="post-title"
                          placeholder="Enter your post title"
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="post-content"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Content
                        </label>
                        <Textarea
                          id="post-content"
                          placeholder="Write your post content here"
                          rows={5}
                        />
                      </div>
                    </div>
                    <DialogFooter>
                      <Button type="submit">Post</Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[400px] pr-4">
                {forumPosts.map((post) => (
                  <Card key={post.id} className="mb-4">
                    <CardHeader>
                      <div className="flex items-center space-x-4">
                        <Avatar>
                          <AvatarImage
                            src={`/placeholder.svg?height=40&width=40`}
                          />
                          <AvatarFallback>
                            {post.author
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <CardTitle className="text-lg">
                            {post.title}
                          </CardTitle>
                          <CardDescription>
                            Posted by {post.author} • {post.timestamp}
                          </CardDescription>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p>{post.content}</p>
                    </CardContent>
                    <CardFooter>
                      <Button variant="outline">
                        <MessageSquare className="h-4 w-4 mr-2" />
                        {post.replies} Replies
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </ScrollArea>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
