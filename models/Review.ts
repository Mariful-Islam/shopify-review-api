// models/Review.ts
import mongoose, { Document, Model, Schema } from 'mongoose'

export interface IReview extends Document {
  productId: string
  productName: string
  productImage?: string
  shopName: string
  shopId: string
  customerName?: string
  rating: number
  title: string
  comment?: string
  createdAt: Date
}

const ReviewSchema: Schema = new mongoose.Schema<IReview>({
  productId: { type: String, required: true },
  productName: { type: String, required: true },
  productImage: { type: String },
  shopName: { type: String, required: true },
  shopId: { type: String, required: true },
  customerName: { type: String },
  rating: { type: Number, required: true, min: 1, max: 5 },
  title: { type: String, required: true },
  comment: { type: String },
  createdAt: { type: Date, default: Date.now }
})

export default (mongoose.models.Review as Model<IReview>) ||
  mongoose.model<IReview>('Review', ReviewSchema)
