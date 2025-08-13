// models/Review.ts
import mongoose, { Document, Model, Schema } from 'mongoose'

export interface IReview extends Document {
  productId: string
  customerName?: string
  rating: number
  comment?: string
  createdAt: Date
}

const ReviewSchema: Schema = new mongoose.Schema<IReview>({
  productId: { type: String, required: true },
  customerName: { type: String },
  rating: { type: Number, required: true, min: 1, max: 5 },
  comment: { type: String },
  createdAt: { type: Date, default: Date.now }
})

export default (mongoose.models.Review as Model<IReview>) ||
  mongoose.model<IReview>('Review', ReviewSchema)
