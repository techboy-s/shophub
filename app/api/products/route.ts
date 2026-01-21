import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma'; 

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