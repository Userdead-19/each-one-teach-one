import mongoose, { Schema, model, models } from "mongoose";

const TaskSchema = new Schema(
    {
        title: { type: String, required: true },
        description: { type: String },
        status: { type: String, enum: ["pending", "in-progress", "completed"], default: "pending" },
        dueDate: { type: Date },
        userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    },
    { timestamps: true }
);

export default models.Task || model("Task", TaskSchema);
