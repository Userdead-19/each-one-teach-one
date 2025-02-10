import mongoose, { Schema, Document } from "mongoose";

interface IMessage {
    sender: string;
    content: string;
    timestamp: Date;
}

export interface IChat extends Document {
    participants: string[];
    messages: IMessage[];
    createdAt: Date;
}

const ChatSchema = new Schema<IChat>({
    participants: { type: [String], required: true },
    messages: [
        {
            sender: { type: String, required: true },
            content: { type: String, required: true },
            timestamp: { type: Date, default: Date.now },
        },
    ],
    createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.Chat || mongoose.model<IChat>("Chat", ChatSchema);
