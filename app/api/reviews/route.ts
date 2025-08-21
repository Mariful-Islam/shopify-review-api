// app/api/reviews/route.ts
import { connectToDatabase } from '@/lib/db'
import Review, {IReview} from '@/models/Review'
import { NextRequest, NextResponse } from 'next/server'


// app/api/reviews/route.ts
export async function GET(req: NextRequest) {
  await connectToDatabase()

  const secret = req.headers.get('x-api-secret')
  if (secret !== process.env.API_SECRET_KEY) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 })
  }

  const searchParams = req.nextUrl.searchParams
  const productId = searchParams.get('productId')
  const shopId = searchParams.get('shopId')
  const all = searchParams.get('all') === 'true'
  const page = parseInt(searchParams.get('page') || '1', 10)
  const limit = parseInt(searchParams.get('limit') || '10', 10)

  const search = searchParams.get('search')

  const query: any = {}
  if (productId) query.productId = productId
  if (shopId) query.shopId = shopId

  if (search) {
    const searchRegex = new RegExp(search, 'i') // case-insensitive

    query.$or = [
      { shopName: { $regex: searchRegex } },
      { customerName: { $regex: searchRegex } },
      { title: { $regex: searchRegex } },
      { comment: { $regex: searchRegex } },
    ]
  }

  

  if (all) {
    const reviews = await Review.find(query).sort({ createdAt: -1 })
    return NextResponse.json({
      reviews,
      pagination: {
        total: reviews.length,
        page: 1,
        limit: reviews.length,
        totalPages: 1,
      },
    })
  }

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

  const { productId, productName, productImage, shopName, shopId, rating, customerName, title, comment } = data

  if (!productId || !rating) {
    return NextResponse.json(
      { error: 'Missing required fields' },
      { status: 400 }
    )
  }



  const newReview = new Review({
    productId,
    productName, 
    productImage,
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



// PUT /api/reviews (Update a review)
export async function PUT(req: NextRequest) {
  await connectToDatabase()
  const secret = req.headers.get('x-api-secret')
  if (secret !== process.env.API_SECRET_KEY) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 })
  }

  const data = await req.json()
  const { reviewId, ...updateData } = data

  if (!reviewId) {
    return NextResponse.json({ error: 'Missing reviewId' }, { status: 400 })
  }

  const updatedReview = await Review.findByIdAndUpdate(reviewId, updateData, {
    new: true,
  })

  if (!updatedReview) {
    return NextResponse.json({ error: 'Review not found' }, { status: 404 })
  }

  return NextResponse.json(updatedReview, { status: 200 })
}





// DELETE /api/reviews?reviewId=xxx
export async function DELETE(req: NextRequest) {
  await connectToDatabase()
  
  const secret = req.headers.get('x-api-secret')

  if (secret !== process.env.API_SECRET_KEY) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 })
  }

  const reviewId = req.nextUrl.searchParams.get('reviewId')

  if (!reviewId) {
    return NextResponse.json({ error: 'Missing reviewId' }, { status: 400 })
  }

  const deletedReview = await Review.findByIdAndDelete(reviewId)

  if (!deletedReview) {
    return NextResponse.json({ error: 'Review not found' }, { status: 404 })
  }

  return NextResponse.json({ message: 'Review deleted' }, { status: 200 })
}

