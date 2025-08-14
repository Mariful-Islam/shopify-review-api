// app/api/reviews/route.ts
import { connectToDatabase } from '@/lib/db'
import Review, { IReview } from '@/models/Review'
import { NextRequest, NextResponse } from 'next/server'

// Utility function to set CORS headers
function setCORSHeaders(response: NextResponse) {
  response.headers.set('Access-Control-Allow-Origin', '*') // Replace * with your frontend origin in production
  response.headers.set('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
  response.headers.set('Access-Control-Allow-Headers', 'Content-Type, x-api-secret')
  return response
}

// Handle OPTIONS preflight request
export async function OPTIONS(req: NextRequest) {
  const res = new NextResponse(null, { status: 204 }) // No content
  return setCORSHeaders(res)
}

// GET /api/reviews?productId=...
export async function GET(req: NextRequest) {
  await connectToDatabase()

  const secret = req.headers.get('x-api-secret')
  if (secret !== process.env.API_SECRET_KEY) {
    const res = NextResponse.json({ message: 'Unauthorized' }, { status: 401 })
    return setCORSHeaders(res)
  }

  const productId = req.nextUrl.searchParams.get('productId')
  const query = productId ? { productId } : {}

  const reviews: IReview[] = await Review.find(query).sort({ createdAt: -1 })
  const res = NextResponse.json(reviews)
  return setCORSHeaders(res)
}

// POST /api/reviews
export async function POST(req: NextRequest) {
  await connectToDatabase()
  const data = await req.json()

  const secret = req.headers.get('x-api-secret')
  if (secret !== process.env.API_SECRET_KEY) {
    const res = NextResponse.json({ message: 'Unauthorized' }, { status: 401 })
    return setCORSHeaders(res)
  }

  const { productId, rating, customerName, comment } = data
  if (!productId || !rating) {
    const res = NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    return setCORSHeaders(res)
  }

  const newReview = new Review({
    productId,
    rating,
    customerName,
    comment,
  })

  await newReview.save()

  const res = NextResponse.json(newReview, { status: 201 })
  return setCORSHeaders(res)
}
