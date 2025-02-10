import mongoose, { Schema, Document } from "mongoose";

export interface IGroup extends Document {
    name: string;
    description?: string;
    creator: string;
    members: string[];
    createdAt: Date;
}

const GroupSchema = new Schema<IGroup>({
    name: { type: String, required: true },
    description: { type: String },
    creator: { type: String, required: true },
    members: { type: [String], required: true },
    createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.Group || mongoose.model<IGroup>("Group", GroupSchema);
