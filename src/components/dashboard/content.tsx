import Image from "next/image";
import {
  Bot,
  GraduationCap,
  MessageSquare,
  Share2,
  Users2,
} from "lucide-react";
import Link from "next/link";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function DashboardContent() {
  return (
    <div className="p-8 bg-gradient-to-r from-gray-50 to-gray-100 min-h-screen">
      <h1 className="text-5xl font-extrabold text-gray-800 mb-8">
        Each One Teach One
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {/* Communication Card */}
        <Card className="col-span-full lg:col-span-2 hover:shadow-xl transform hover:-translate-y-1 transition duration-300">
          <Link href="/communications">
            <CardHeader className="flex items-center space-x-4">
              <div className="bg-blue-100 p-2 rounded-full">
                <MessageSquare className="w-10 h-10 text-blue-600" />
              </div>
              <CardTitle className="text-xl font-bold">Communication</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                Engage in chats, forums, and video conferencing for better
                collaboration.
              </p>
            </CardContent>
          </Link>
        </Card>

        {/* Resource Sharing Card */}
        <Card className="hover:shadow-xl transform hover:-translate-y-1 transition duration-300">
          <Link href="/resource-sharing">
            <CardHeader className="flex items-center space-x-4">
              <div className="bg-green-100 p-2 rounded-full">
                <Share2 className="w-10 h-10 text-green-600" />
              </div>
              <CardTitle className="text-xl font-bold">
                Resource Sharing
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                Easily share, access, and organize learning resources.
              </p>
            </CardContent>
          </Link>
        </Card>

        {/* Task Management Card */}
        <Card className="lg:col-span-2 hover:shadow-xl transform hover:-translate-y-1 transition duration-300">
          <Link href="/task-management">
            <CardHeader className="flex items-center space-x-4">
              <div className="bg-yellow-100 p-2 rounded-full">
                <Image
                  src="/placeholder.svg?height=32&width=32"
                  width={32}
                  height={32}
                  alt="Task Management"
                  className="w-10 h-10"
                />
              </div>
              <CardTitle className="text-xl font-bold">
                Task Management
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                Track and manage tasks with personalized workflows.
              </p>
            </CardContent>
          </Link>
        </Card>

        {/* Socialize Card */}
        <Card className="hover:shadow-xl transform hover:-translate-y-1 transition duration-300">
          <Link href="/socialize">
            <CardHeader className="flex items-center space-x-4">
              <div className="bg-purple-100 p-2 rounded-full">
                <Users2 className="w-10 h-10 text-purple-600" />
              </div>
              <CardTitle className="text-xl font-bold">Socialize</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                Meet and connect with peers in study groups.
              </p>
            </CardContent>
          </Link>
        </Card>

        {/* Grade Tracker Card */}
        <Card className="hover:shadow-xl transform hover:-translate-y-1 transition duration-300">
          <Link href="/grade-tracker">
            <CardHeader className="flex items-center space-x-4">
              <div className="bg-yellow-100 p-2 rounded-full">
                <GraduationCap className="w-10 h-10 text-yellow-600" />
              </div>
              <CardTitle className="text-xl font-bold">Grade Tracker</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                Keep track of your academic performance and set goals.
              </p>
            </CardContent>
          </Link>
        </Card>

        {/* Chat bot Card */}
        <Card className="hover:shadow-xl transform hover:-translate-y-1 transition duration-300 lg:col-span-2">
          <Link href="/chatbot">
            <CardHeader className="flex items-center space-x-4 content-center">
              <div className="bg-red-100 p-2 rounded-full">
                <Bot className="w-10 h-10 text-red-600" />
              </div>
              <CardTitle className="text-xl font-bold">Chat Bot</CardTitle>
            </CardHeader>
            <CardContent className="flex items-center">
              <p className="text-gray-600">
                Improve and interact using AI-powered chat.
              </p>
            </CardContent>
          </Link>
        </Card>
      </div>
    </div>
  );
}
