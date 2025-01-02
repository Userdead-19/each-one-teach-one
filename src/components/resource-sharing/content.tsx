"use client";

import { useState } from "react";
import {
  FileText,
  Upload,
  Search,
  Filter,
  Download,
  Share2,
  Trash2,
} from "lucide-react";

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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface Resource {
  id: number;
  title: string;
  description: string;
  type: string;
  uploadedBy: string;
  uploadDate: string;
  downloads: number;
}

export function ResourceSharingContent() {
  const [resources, setResources] = useState<Resource[]>([
    {
      id: 1,
      title: "Introduction to Calculus",
      description: "A comprehensive guide to basic calculus concepts",
      type: "PDF",
      uploadedBy: "John Doe",
      uploadDate: "2023-05-15",
      downloads: 120,
    },
    {
      id: 2,
      title: "World History Timeline",
      description: "Interactive timeline of major historical events",
      type: "Interactive",
      uploadedBy: "Alice Smith",
      uploadDate: "2023-06-02",
      downloads: 85,
    },
    {
      id: 3,
      title: "Chemistry Lab Safety",
      description: "Video tutorial on lab safety procedures",
      type: "Video",
      uploadedBy: "Bob Johnson",
      uploadDate: "2023-06-10",
      downloads: 200,
    },
    {
      id: 4,
      title: "Spanish Vocabulary Flashcards",
      description: "Digital flashcards for learning Spanish vocabulary",
      type: "Flashcards",
      uploadedBy: "Emma Wilson",
      uploadDate: "2023-06-15",
      downloads: 150,
    },
    {
      id: 5,
      title: "Programming in Python",
      description: "Beginner's guide to Python programming",
      type: "eBook",
      uploadedBy: "Charlie Brown",
      uploadDate: "2023-06-20",
      downloads: 180,
    },
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("all");

  const filteredResources = resources.filter(
    (resource) =>
      resource.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (filterType === "all" ||
        resource.type.toLowerCase() === filterType.toLowerCase())
  );

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Resource Sharing</h1>
          <p className="text-gray-500">
            Share and access educational resources
          </p>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <Upload className="mr-2 h-4 w-4" /> Upload Resource
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Upload New Resource</DialogTitle>
              <DialogDescription>
                Share your educational materials with others
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <label
                  htmlFor="resource-title"
                  className="block text-sm font-medium text-gray-700"
                >
                  Title
                </label>
                <Input id="resource-title" placeholder="Enter resource title" />
              </div>
              <div>
                <label
                  htmlFor="resource-description"
                  className="block text-sm font-medium text-gray-700"
                >
                  Description
                </label>
                <Input
                  id="resource-description"
                  placeholder="Enter resource description"
                />
              </div>
              <div>
                <label
                  htmlFor="resource-type"
                  className="block text-sm font-medium text-gray-700"
                >
                  Type
                </label>
                <Select>
                  <SelectTrigger id="resource-type">
                    <SelectValue placeholder="Select resource type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pdf">PDF</SelectItem>
                    <SelectItem value="video">Video</SelectItem>
                    <SelectItem value="interactive">Interactive</SelectItem>
                    <SelectItem value="flashcards">Flashcards</SelectItem>
                    <SelectItem value="ebook">eBook</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label
                  htmlFor="resource-file"
                  className="block text-sm font-medium text-gray-700"
                >
                  File
                </label>
                <Input id="resource-file" type="file" />
              </div>
            </div>
            <DialogFooter>
              <Button type="submit">Upload</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="flex space-x-4">
        <div className="relative flex-1">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search resources..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-8"
          />
        </div>
        <Select value={filterType} onValueChange={setFilterType}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter by type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Types</SelectItem>
            <SelectItem value="pdf">PDF</SelectItem>
            <SelectItem value="video">Video</SelectItem>
            <SelectItem value="interactive">Interactive</SelectItem>
            <SelectItem value="flashcards">Flashcards</SelectItem>
            <SelectItem value="ebook">eBook</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Tabs defaultValue="all" className="space-y-4">
        <TabsList>
          <TabsTrigger value="all">All Resources</TabsTrigger>
          <TabsTrigger value="my-uploads">My Uploads</TabsTrigger>
        </TabsList>

        <TabsContent value="all">
          <ScrollArea className="h-[600px]">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredResources.map((resource) => (
                <ResourceCard key={resource.id} resource={resource} />
              ))}
            </div>
          </ScrollArea>
        </TabsContent>

        <TabsContent value="my-uploads">
          <ScrollArea className="h-[600px]">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredResources
                .filter((r) => r.uploadedBy === "John Doe")
                .map((resource) => (
                  <ResourceCard
                    key={resource.id}
                    resource={resource}
                    isOwnUpload
                  />
                ))}
            </div>
          </ScrollArea>
        </TabsContent>
      </Tabs>
    </div>
  );
}

function ResourceCard({
  resource,
  isOwnUpload = false,
}: {
  resource: Resource;
  isOwnUpload?: boolean;
}) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{resource.title}</CardTitle>
        <CardDescription>
          {resource.type} • Uploaded by {resource.uploadedBy}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-gray-500">{resource.description}</p>
        <p className="text-sm text-gray-500 mt-2">
          Uploaded on {resource.uploadDate}
        </p>
        <p className="text-sm text-gray-500">{resource.downloads} downloads</p>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline">
          <Download className="mr-2 h-4 w-4" /> Download
        </Button>
        {isOwnUpload ? (
          <Button variant="outline" className="text-red-500 hover:text-red-700">
            <Trash2 className="mr-2 h-4 w-4" /> Delete
          </Button>
        ) : (
          <Button variant="outline">
            <Share2 className="mr-2 h-4 w-4" /> Share
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}
