import { NextResponse } from "next/server"
import clientPromise from "@/lib/mongodb"

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url)
    const type = searchParams.get("type")

    const client = await clientPromise
    const db = client.db("edulearn")

    if (type === "users") {
        const users = await db.collection("users").find({}).toArray()
        return NextResponse.json(users)
    } else if (type === "groups") {
        const groups = await db.collection("studyGroups").find({}).toArray()
        return NextResponse.json(groups)
    } else {
        const users = await db.collection("users").find({}).toArray()
        const groups = await db.collection("studyGroups").find({}).toArray()
        return NextResponse.json({ users, studyGroups: groups })
    }
}

