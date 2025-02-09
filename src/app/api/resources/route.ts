// app/api/resources/route.ts
import { NextRequest } from "next/server";
import { connectToDatabase } from "@/lib/mongoose";
import Resource from "@/lib/models/Resource";
import { uploadToGridFS } from "@/lib/gridfs";

export async function GET(request: NextRequest) {
    try {
        await connectToDatabase();
        const searchParams = request.nextUrl.searchParams;
        const filter = searchParams.get("filter") || "all";
        const userId = searchParams.get("userId");

        let query = {};
        if (filter === "my-uploads" && userId) {
            query = { userId };
        }

        const resources = await Resource.find(query)
            .sort({ createdAt: -1 });

        return Response.json(resources);
    } catch (error) {
        console.error("Error fetching resources:", error);
        return Response.json(
            { error: "Failed to fetch resources" },
            { status: 500 }
        );
    }
}

export async function POST(request: NextRequest) {
    try {
        await connectToDatabase();
        const formData = await request.formData();

        const file = formData.get("file") as File;
        const userId = formData.get("userId");

        if (!file) {
            return Response.json(
                { error: "No file provided" },
                { status: 400 }
            );
        }

        if (!userId) {
            return Response.json(
                { error: "User ID is required" },
                { status: 400 }
            );
        }

        // Convert File to Buffer
        const buffer = Buffer.from(await file.arrayBuffer());

        // Upload to GridFS
        const fileId = await uploadToGridFS(
            buffer,
            file.name,
            file.type
        );

        const resourceData = {
            title: formData.get("title"),
            description: formData.get("description"),
            type: formData.get("type"),
            fileId: fileId,
            userId: userId,
            downloads: 0,
        };

        const resource = await Resource.create(resourceData);
        return Response.json(resource, { status: 201 });
    } catch (error) {
        console.error("Error creating resource:", error);
        return Response.json(
            { error: "Failed to create resource" },
            { status: 500 }
        );
    }
}
