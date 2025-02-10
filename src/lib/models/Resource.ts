import mongoose, { Schema, Document } from "mongoose"

export interface IResource extends Document {
    title: string
    type: string
    url: string
    uploadDate: Date
    downloads: number
}

const ResourceSchema = new Schema<IResource>({
    title: { type: String, required: true },
    type: { type: String, required: true },
    url: { type: String, required: true },
    uploadDate: { type: Date, default: Date.now },
    downloads: { type: Number, default: 0 }
})

export default mongoose.models.Resource || mongoose.model<IResource>("Resource", ResourceSchema)
