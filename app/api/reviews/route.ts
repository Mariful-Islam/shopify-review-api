// app/api/reviews/route.ts
import { connectToDatabase } from '@/lib/db'
import Review, {IReview} from '@/models/Review'
import { NextRequest, NextResponse } from 'next/server'

// GET /api/reviews?productId=...
// export async function GET(req: NextRequest) {
//   await connectToDatabase()
  

//   const secret = req.headers.get('x-api-secret');

//   if (secret !== process.env.API_SECRET_KEY) {
//     return NextResponse.json({ message: 'Unauthorized' }, {status: 401});
//   }

//   const productId = req.nextUrl.searchParams.get('productId')
//   const query = productId ? { productId } : {}

//   const reviews: IReview[] = await Review.find(query).sort({ createdAt: -1 })
//   return NextResponse.json(reviews)
// }




export async function GET(req: NextRequest) {
  await connectToDatabase()

  const secret = req.headers.get('x-api-secret')
  if (secret !== process.env.API_SECRET_KEY) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 })
  }

  const searchParams = req.nextUrl.searchParams
  const productId = searchParams.get('productId')
  const page = parseInt(searchParams.get('page') || '1', 10)
  const limit = parseInt(searchParams.get('limit') || '10', 10)

  const query = productId ? { productId } : {}

  const skip = (page - 1) * limit

  const [reviews, total] = await Promise.all([
    Review.find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit),
    Review.countDocuments(query),
  ])

  return NextResponse.json({
    reviews,
    pagination: {
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    },
  })
}




// POST /api/reviews
export async function POST(req: NextRequest) {
  await connectToDatabase()
  const data = await req.json()

  const secret = req.headers.get('x-api-secret');

  if (secret !== process.env.API_SECRET_KEY) {
    return NextResponse.json({ message: 'Unauthorized' }, {status: 401});
  }  

  const { productId, shopName, shopId, rating, customerName, title, comment } = data

  if (!productId || !rating) {
    return NextResponse.json(
      { error: 'Missing required fields' },
      { status: 400 }
    )
  }



  const newReview = new Review({
    productId,
    shopName,
    shopId,
    rating,
    customerName,
    title,
    comment
  })

  await newReview.save()

  return NextResponse.json(newReview, { status: 201 })
}
