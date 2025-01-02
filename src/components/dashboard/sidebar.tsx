"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Bell,
  Home,
  Search,
  Settings,
  Users,
  ListTodo,
  UserPlus,
  GraduationCap,
  Bot,
} from "lucide-react";

import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

export function DashboardSidebar() {
  const [search, setSearch] = useState("");

  return (
    <div className="w-[280px] bg-black text-white min-h-screen p-4 flex flex-col">
      <div className="space-y-4">
        <div className="flex items-center space-x-2">
          <Image
            src="/placeholder.svg?height=40&width=40"
            alt="Profile"
            width={40}
            height={40}
            className="rounded-full"
          />
          <h2 className="text-xl font-semibold">Welcome, User</h2>
        </div>

        <div className="relative">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-400" />
          <Input
            type="search"
            placeholder="Search..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-8 bg-gray-800 border-gray-700 text-white placeholder:text-gray-400 w-full"
          />
        </div>

        <nav className="space-y-2">
          <NavItem href="/dashboard" icon={Home}>
            Home
          </NavItem>
          <NavItem href="/notifications" icon={Bell}>
            Notifications
          </NavItem>
          <NavItem href="/settings" icon={Settings}>
            Settings
          </NavItem>
          <NavItem href="/task-management" icon={ListTodo}>
            Tasks
          </NavItem>
          <NavItem href="/socialize" icon={UserPlus}>
            Socialize
          </NavItem>
          <NavItem href="/grade-tracker" icon={GraduationCap}>
            Grades
          </NavItem>
          <NavItem href="/chatbot" icon={Bot}>
            AI Assistant
          </NavItem>
        </nav>

        <div className="pt-4">
          <h3 className="text-lg font-semibold mb-2">Activity</h3>
          <p className="text-sm text-gray-400">
            Most recent notifications and updates...
          </p>
        </div>

        <div className="pt-4">
          <h3 className="text-lg font-semibold mb-2">Friends</h3>
          <p className="text-sm text-gray-400">
            Your friend list will appear here...
          </p>
        </div>
      </div>
    </div>
  );
}

function NavItem({
  href,
  icon: Icon,
  children,
}: {
  href: string;
  icon: React.ElementType;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className={cn(
        "flex items-center space-x-2 px-2 py-1.5 rounded-md",
        "hover:bg-gray-800 transition-colors"
      )}
    >
      <Icon className="h-5 w-5" />
      <span>{children}</span>
    </Link>
  );
}
