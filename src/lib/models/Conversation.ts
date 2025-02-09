import mongoose, { Schema, model, models } from "mongoose";

const ConversationSchema = new Schema(
    {
        userMessage: { type: String, required: true },
        botResponse: { type: String, required: true },
    },
    { timestamps: true }
);

const Conversation = models.Conversation || model("Conversation", ConversationSchema);
export default Conversation;
