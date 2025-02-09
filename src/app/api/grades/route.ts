import { NextResponse } from "next/server"
import clientPromise from "@/lib/mongodb"

export async function GET() {
    const client = await clientPromise
    const db = client.db("edulearn")
    const courses = await db.collection("courses").find({}).toArray()
    return NextResponse.json(courses)
}

export async function POST(request: Request) {
    const client = await clientPromise
    const db = client.db("edulearn")
    const course = await request.json()
    const result = await db.collection("courses").insertOne(course)
    return NextResponse.json({ ...course, _id: result.insertedId }, { status: 201 })
}

