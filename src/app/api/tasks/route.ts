import { NextResponse } from "next/server"
import clientPromise from "@/lib/mongodb"
import { ObjectId } from "mongodb"

export async function GET() {
    const client = await clientPromise
    const db = client.db("edulearn")
    const tasks = await db.collection("tasks").find({}).toArray()
    return NextResponse.json(tasks)
}

export async function POST(request: Request) {
    const client = await clientPromise
    const db = client.db("edulearn")
    const task = await request.json()
    const result = await db.collection("tasks").insertOne(task)
    return NextResponse.json({ ...task, _id: result.insertedId }, { status: 201 })
}

export async function PUT(request: Request) {
    const client = await clientPromise
    const db = client.db("edulearn")
    const task = await request.json()
    const { _id, ...updateData } = task
    await db.collection("tasks").updateOne({ _id: new ObjectId(_id) }, { $set: updateData })
    return NextResponse.json(task)
}

