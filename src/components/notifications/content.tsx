"use client";

import { useState } from "react";
import {
  Bell,
  Book,
  Calendar,
  MessageSquare,
  Star,
  UserPlus,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export function NotificationsContent() {
  const [selectedTab, setSelectedTab] = useState("all");

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Notifications</h1>
          <p className="text-gray-500">
            Stay updated with your learning journey
          </p>
        </div>
        <Button variant="outline" className="gap-2">
          <Bell className="h-4 w-4" />
          Mark all as read
        </Button>
      </div>

      <Tabs defaultValue="all" className="space-y-4">
        <TabsList>
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="unread">Unread</TabsTrigger>
          <TabsTrigger value="mentions">Mentions</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4">
          <NotificationCard
            icon={MessageSquare}
            color="text-blue-500"
            title="New Message"
            description="Sarah sent you a message about the Math assignment"
            time="5 minutes ago"
            isUnread
          />
          <NotificationCard
            icon={Calendar}
            color="text-purple-500"
            title="Upcoming Deadline"
            description="Physics project submission due in 2 days"
            time="2 hours ago"
            isUnread
          />
          <NotificationCard
            icon={Star}
            color="text-yellow-500"
            title="Achievement Unlocked"
            description="You've completed 5 consecutive days of learning!"
            time="1 day ago"
          />
          <NotificationCard
            icon={UserPlus}
            color="text-green-500"
            title="Study Group Invitation"
            description="John invited you to join Chemistry study group"
            time="2 days ago"
          />
          <NotificationCard
            icon={Book}
            color="text-red-500"
            title="New Course Material"
            description="New resources added to Biology course"
            time="3 days ago"
          />
        </TabsContent>

        <TabsContent value="unread" className="space-y-4">
          <NotificationCard
            icon={MessageSquare}
            color="text-blue-500"
            title="New Message"
            description="Sarah sent you a message about the Math assignment"
            time="5 minutes ago"
            isUnread
          />
          <NotificationCard
            icon={Calendar}
            color="text-purple-500"
            title="Upcoming Deadline"
            description="Physics project submission due in 2 days"
            time="2 hours ago"
            isUnread
          />
        </TabsContent>

        <TabsContent value="mentions" className="space-y-4">
          <NotificationCard
            icon={MessageSquare}
            color="text-blue-500"
            title="New Mention"
            description="Sarah mentioned you in a comment: '@user what do you think about...'"
            time="5 minutes ago"
            isUnread
          />
        </TabsContent>
      </Tabs>
    </div>
  );
}

interface NotificationCardProps {
  icon: React.ElementType;
  color: string;
  title: string;
  description: string;
  time: string;
  isUnread?: boolean;
}

function NotificationCard({
  icon: Icon,
  color,
  title,
  description,
  time,
  isUnread = false,
}: NotificationCardProps) {
  return (
    <Card className={isUnread ? "border-l-4 border-l-blue-500" : ""}>
      <CardHeader className="flex flex-row items-start space-y-0 pb-2">
        <div className="flex items-center space-x-4 flex-1">
          <div className={`rounded-full p-2 bg-gray-100 ${color}`}>
            <Icon className="h-4 w-4" />
          </div>
          <div>
            <CardTitle className="text-base font-semibold">{title}</CardTitle>
            <CardDescription>{description}</CardDescription>
          </div>
        </div>
        <time className="text-sm text-gray-500">{time}</time>
      </CardHeader>
      <CardContent>
        <div className="flex justify-end space-x-2">
          <Button variant="ghost" size="sm">
            Dismiss
          </Button>
          <Button variant="outline" size="sm">
            View
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
``;
