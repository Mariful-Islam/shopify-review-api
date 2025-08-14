// app/api/reviews/route.ts
import { connectToDatabase } from '@/lib/db'
import Review, { IReview } from '@/models/Review'
import { NextRequest, NextResponse } from 'next/server'


const allowedOrigins = [
  'https://saad-1731.myshopify.com',
  'https://kadobeapparel.store',
  'https://humaira-haven.myshopify.com/',
  'https://innerabd.com/',
  'http://localhost:3000',
]

// 👇 Use local helper
function setCORSHeaders(req: NextRequest, res: NextResponse) {
  const origin = req.headers.get('origin')

  if (process.env.NODE_ENV === 'production') {
    res.headers.set('Access-Control-Allow-Origin', '*')
  } else {
    const allowedOrigins = ['http://localhost:3000']
    if (origin && allowedOrigins.includes(origin)) {
      res.headers.set('Access-Control-Allow-Origin', origin)
    }
  }

  res.headers.set('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
  res.headers.set('Access-Control-Allow-Headers', 'Content-Type, x-api-secret')
  return res
}

export async function OPTIONS(req: NextRequest) {
  const res = new NextResponse(null, { status: 204 })
  return setCORSHeaders(req, res)
}

export async function GET(req: NextRequest) {
  await connectToDatabase()

  const secret = req.headers.get('x-api-secret')
  if (secret !== process.env.API_SECRET_KEY) {
    const res = NextResponse.json({ message: 'Unauthorized' }, { status: 401 })
    return setCORSHeaders(req, res)
  }

  const productId = req.nextUrl.searchParams.get('productId')
  const query = productId ? { productId } : {}

  const reviews: IReview[] = await Review.find(query).sort({ createdAt: -1 })
  const res = NextResponse.json(reviews)
  return setCORSHeaders(req, res)
}

export async function POST(req: NextRequest) {
  await connectToDatabase()
  const data = await req.json()

  const secret = req.headers.get('x-api-secret')
  if (secret !== process.env.API_SECRET_KEY) {
    const res = NextResponse.json({ message: 'Unauthorized' }, { status: 401 })
    return setCORSHeaders(req, res)
  }

  const { productId, rating, customerName, comment } = data
  if (!productId || !rating) {
    const res = NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    return setCORSHeaders(req, res)
  }

  const newReview = new Review({
    productId,
    rating,
    customerName,
    comment,
  })

  await newReview.save()
  const res = NextResponse.json(newReview, { status: 201 })
  return setCORSHeaders(req, res)
}
