import { connectToDatabase } from "@/lib/mongoose";
import Resource from "@/lib/models/Resource";
import { NextRequest } from "next/server";
// app/api/resources/[id]/download/route.ts
import { getFileStream } from "@/lib/gridfs";

// Define RouteContext type for dynamic route params
type RouteContext = {
    params: Promise<{
        id: string;
    }>
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

        // Get file stream from GridFS
        const fileStream = await getFileStream(resource.fileId);

        // Increment download count
        await Resource.findByIdAndUpdate(id, {
            $inc: { downloads: 1 }
        });

        // Return file as stream
        return new Response(fileStream as any, {
            headers: {
                'Content-Type': resource.type,
                'Content-Disposition': `attachment; filename="${resource.title}"`,
            },
        });
    } catch (error) {
        console.error("Error processing download:", error);
        return Response.json(
            { error: "Failed to process download" },
            { status: 500 }
        );
    }
}