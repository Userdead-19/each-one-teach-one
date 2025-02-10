"use client";

import { useState } from "react";
import { Upload, Search, Download, Share2, Trash2 } from "lucide-react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

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
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";

const resourceSchema = z.object({
  title: z
    .string()
    .min(1, "Title is required")
    .max(100, "Title must be 100 characters or less"),
  description: z
    .string()
    .max(500, "Description must be 500 characters or less"),
  type: z.enum(["PDF", "Video", "Interactive", "Flashcards", "eBook"]),
  url: z.string().url("Invalid URL"),
});

type Resource = z.infer<typeof resourceSchema> & {
  _id: string;
  uploadedBy: string;
  uploadDate: string;
  downloads: number;
};

async function getResources(type = "all") {
  const res = await fetch(
    `/api/resources${type !== "all" ? `?type=${type}` : ""}`
  );
  if (!res.ok) throw new Error("Failed to fetch resources");
  return res.json();
}

async function createResource(resource: z.infer<typeof resourceSchema>) {
  const res = await fetch("/api/resources", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(resource),
  });
  if (!res.ok) throw new Error("Failed to create resource");
  return res.json();
}

async function deleteResource(id: string) {
  const res = await fetch(`/api/resources/${id}`, {
    method: "DELETE",
  });
  if (!res.ok) throw new Error("Failed to delete resource");
  return res.json();
}

export function ResourceSharingContent() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("all");
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const {
    data: resources,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["resources", filterType],
    queryFn: () => getResources(filterType),
  });

  const createResourceMutation = useMutation({
    mutationFn: createResource,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["resources"] });
      setIsDialogOpen(false);
      toast({
        title: "Resource Created",
        description: "Your resource has been successfully created.",
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: "Failed to create resource. Please try again.",
        variant: "destructive",
      });
    },
  });

  const deleteResourceMutation = useMutation({
    mutationFn: deleteResource,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["resources"] });
      toast({
        title: "Resource Deleted",
        description: "The resource has been successfully deleted.",
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: "Failed to delete resource. Please try again.",
        variant: "destructive",
      });
    },
  });

  const form = useForm<z.infer<typeof resourceSchema>>({
    resolver: zodResolver(resourceSchema),
    defaultValues: {
      title: "",
      description: "",
      type: "PDF",
      url: "",
    },
  });

  function onSubmit(values: z.infer<typeof resourceSchema>) {
    createResourceMutation.mutate(values);
  }

  const filteredResources =
    resources?.filter(
      (resource: any) =>
        resource.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
        (filterType === "all" ||
          resource.type.toLowerCase() === filterType.toLowerCase())
    ) || [];

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
          <h1 className="text-3xl font-bold text-gray-800">Resource Sharing</h1>
          <p className="text-gray-600">
            Share and access educational resources
          </p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-blue-500 hover:bg-blue-600">
              <Upload className="mr-2 h-4 w-4" /> Upload Resource
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Upload New Resource</DialogTitle>
              <DialogDescription>
                Share your educational materials with others
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
                        <Input placeholder="Enter resource title" {...field} />
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
                        <Input
                          placeholder="Enter resource description"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="type"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Type</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select resource type" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="PDF">PDF</SelectItem>
                          <SelectItem value="Video">Video</SelectItem>
                          <SelectItem value="Interactive">
                            Interactive
                          </SelectItem>
                          <SelectItem value="Flashcards">Flashcards</SelectItem>
                          <SelectItem value="eBook">eBook</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="url"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>URL</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter resource URL" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" className="w-full">
                  Upload
                </Button>
              </form>
            </Form>
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
            <SelectItem value="PDF">PDF</SelectItem>
            <SelectItem value="Video">Video</SelectItem>
            <SelectItem value="Interactive">Interactive</SelectItem>
            <SelectItem value="Flashcards">Flashcards</SelectItem>
            <SelectItem value="eBook">eBook</SelectItem>
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
              {filteredResources.map((resource: any) => (
                <ResourceCard
                  key={resource._id}
                  resource={resource}
                  onDelete={() => deleteResourceMutation.mutate(resource._id)}
                />
              ))}
            </div>
          </ScrollArea>
        </TabsContent>

        <TabsContent value="my-uploads">
          <ScrollArea className="h-[600px]">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredResources
                .filter((r: any) => r.uploadedBy === "John Doe")
                .map((resource: any) => (
                  <ResourceCard
                    key={resource._id}
                    resource={resource}
                    isOwnUpload
                    onDelete={() => deleteResourceMutation.mutate(resource._id)}
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
  onDelete,
}: {
  resource: Resource;
  isOwnUpload?: boolean;
  onDelete: () => void;
}) {
  return (
    <Card className="bg-white shadow-lg">
      <CardHeader>
        <CardTitle>{resource.title}</CardTitle>
        <CardDescription>
          {resource.type} • Uploaded by {resource.uploadedBy}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-gray-600">{resource.description}</p>
        <p className="text-sm text-gray-600 mt-2">
          Uploaded on {new Date(resource.uploadDate).toLocaleDateString()}
        </p>
        <p className="text-sm text-gray-600">{resource.downloads} downloads</p>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline" asChild>
          <a href={resource.url} target="_blank" rel="noopener noreferrer">
            <Download className="mr-2 h-4 w-4" /> Download
          </a>
        </Button>
        {isOwnUpload ? (
          <Button
            variant="outline"
            className="text-red-500 hover:text-red-700"
            onClick={onDelete}
          >
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
