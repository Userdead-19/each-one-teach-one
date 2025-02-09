import { connectToDatabase } from "@/lib/mongoose";
import { NextRequest } from "next/server";
import Resource from "@/lib/models/Resource";
// app/api/resources/[id]/route.ts
import { deleteFromGridFS } from "@/lib/gridfs";

// Define RouteContext type for dynamic route params
type RouteContext = {
    params: {
        id: string;
    };
};

export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        await connectToDatabase();
        const resource = await Resource.findById(id);

        if (!resource) {
            return Response.json(
                { error: "Resource not found" },
                { status: 404 }
            );
        }

        return Response.json(resource);
    } catch (error) {
        console.error("Error fetching resource:", error);
        return Response.json(
            { error: "Failed to fetch resource" },
            { status: 500 }
        );
    }
}

export async function DELETE(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        await connectToDatabase();
        const resource = await Resource.findById(id);

        if (!resource) {
            return Response.json(
                { error: "Resource not found" },
                { status: 404 }
            );
        }

        // Delete file from GridFS
        await deleteFromGridFS(resource.fileId);

        // Delete resource record
        await Resource.findByIdAndDelete(id);

        return Response.json({
            message: "Resource deleted successfully",
            resourceId: id
        });
    } catch (error) {
        console.error("Error deleting resource:", error);
        return Response.json(
            { error: "Failed to delete resource" },
            { status: 500 }
        );
    }
}
