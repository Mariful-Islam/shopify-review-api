// app/api/reviews/route.ts
import { connectToDatabase } from '@/lib/db'
import Review, {IReview} from '@/models/Review'
import { NextRequest, NextResponse } from 'next/server'

// GET /api/reviews?productId=...
export async function GET(req: NextRequest, res: any) {
  await connectToDatabase()
  
    // Set CORS headers
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*'); // Or restrict to specific origin
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Content-Type, Authorization'
  );

  const secret = req.headers.get('x-api-secret');

  if (secret !== process.env.API_SECRET_KEY) {
    return NextResponse.json({ message: 'Unauthorized' }, {status: 401});
  }

  const productId = req.nextUrl.searchParams.get('productId')
  const query = productId ? { productId } : {}

  const reviews: IReview[] = await Review.find(query).sort({ createdAt: -1 })
  return NextResponse.json(reviews)
}

// POST /api/reviews
export async function POST(req: NextRequest, res: any) {
  await connectToDatabase()
  const data = await req.json()

    // Set CORS headers
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*'); // Or restrict to specific origin
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Content-Type, Authorization'
  );

  const secret = req.headers.get('x-api-secret');

  if (secret !== process.env.API_SECRET_KEY) {
    return NextResponse.json({ message: 'Unauthorized' }, {status: 401});
  }

  

  const { productId, rating, customerName, comment } = data

  if (!productId || !rating) {
    return NextResponse.json(
      { error: 'Missing required fields' },
      { status: 400 }
    )
  }


  console.log(productId, rating, customerName, comment, "----------------")

  const newReview = new Review({
    productId,
    rating,
    customerName,
    comment
  })

  await newReview.save()

  return NextResponse.json(newReview, { status: 201 })
}
