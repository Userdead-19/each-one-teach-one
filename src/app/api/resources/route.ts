import { NextResponse } from 'next/server'
import { connectToDatabase } from '@/lib/mongoose'
import Resource from '@/lib/models/Resource'
import { ObjectId } from 'mongodb'

// GET: Fetch resources based on type (if provided)
export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url)
        const type = searchParams.get('type')

        await connectToDatabase()

        const query = type ? { type } : {}
        const resources = await Resource.find(query)

        return NextResponse.json(resources, { status: 200 })
    } catch (error) {
        console.error("Error fetching resources:", error)
        return NextResponse.json({ error: "Internal server error" }, { status: 500 })
    }
}

// POST: Add a new resource
export async function POST(request: Request) {
    try {
        await connectToDatabase()
        const resourceData = await request.json()

        const newResource = new Resource({
            ...resourceData,
            uploadDate: new Date(),
            downloads: 0
        })

        const savedResource = await newResource.save()

        return NextResponse.json(savedResource, { status: 201 })
    } catch (error) {
        console.error("Error saving resource:", error)
        return NextResponse.json({ error: "Internal server error" }, { status: 500 })
    }
}
