import mongoose, { Schema, model, models } from "mongoose";

const StudyGroupSchema = new Schema(
    {
        groupName: { type: String, required: true },
        description: { type: String },
        members: [{ type: Schema.Types.ObjectId, ref: "User" }],
        createdAt: { type: Date, default: Date.now },
    },
    { timestamps: true }
);

export default models.StudyGroup || model("StudyGroup", StudyGroupSchema);
