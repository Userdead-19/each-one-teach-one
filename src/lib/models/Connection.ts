import mongoose, { Schema, Document } from "mongoose";

export interface IConnection extends Document {
    user1: string;
    user2: string;
    status: string;
    createdAt: Date;
}

const ConnectionSchema = new Schema<IConnection>({
    user1: { type: String, required: true },
    user2: { type: String, required: true },
    status: { type: String, default: "pending" },
    createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.Connection || mongoose.model<IConnection>("Connection", ConnectionSchema);
