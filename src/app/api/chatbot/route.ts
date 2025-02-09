import { NextResponse } from "next/server"
import clientPromise from "@/lib/mongodb"

export async function POST(request: Request) {
    const { message } = await request.json()

    // This is a mock response. In a real application, you would integrate with an AI service.
    const botResponse = `I received your message: "${message}". As an AI study assistant, I'm here to help with your studies!`

    // Store the conversation in MongoDB
    const client = await clientPromise
    const db = client.db("edulearn")
    await db.collection("conversations").insertOne({
        userMessage: message,
        botResponse,
        timestamp: new Date(),
    })

    return NextResponse.json({ response: botResponse })
}

