import mongoose, { Schema, model, models } from "mongoose";

const CourseSchema = new Schema(
    {
        name: { type: String, required: true },
        grade: { type: String, required: true },
        credits: { type: Number, required: true },
        userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    },
    { timestamps: true }
);

const Course = models.Course || model("Course", CourseSchema);
export default Course;
