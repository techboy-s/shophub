import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma'; 


//GET - To get the products
export async function GET() {
  try {
    const products = await prisma.product.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });

    return NextResponse.json(products);
  } catch (error) {
    // ADD THIS LINE TO SEE THE REAL ERROR IN TERMINAL
    console.error("❌ DATABASE ERROR:", error); 

    return NextResponse.json(
      { error: 'Failed to fetch products', details: String(error) },
      { status: 500 }
    );
  }
}

//POST - (New Create Product)

export async function POST(req: Request) {
  try {
    const body = await req.json();
    
    // Basic validation
    if (!body.name || !body.price || !body.image) {
      return NextResponse.json({ error: 'Missing fields' }, { status: 400 });
    }

    const product = await prisma.product.create({
      data: {
        name: body.name,
        description: body.description,
        price: body.price,
        image: body.image,
        category: body.category || 'General',
        rating: 0, // Default for new products
        reviews: 0,
      },
    });

    return NextResponse.json(product, { status: 201 });
  } catch (error) {
    console.error("Create Error:", error);
    return NextResponse.json({ error: 'Failed to create product' }, { status: 500 });
  }
}