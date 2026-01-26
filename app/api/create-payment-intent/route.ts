import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import Stripe from "stripe";
import { auth } from "@/lib/auth"; // If using auth
import { headers } from "next/headers";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-12-15.clover", // Use the latest version suggested by your IDE
});

export async function POST(req: Request) {
  try {
    const { items } = await req.json(); // Items from the cart

    if (!items || items.length === 0) {
      return NextResponse.json({ error: "No items in cart" }, { status: 400 });
    }

    // 1. Get User (Optional: Attach order to user if logged in)
    const session = await auth.api.getSession({
        headers: await headers()
    });

    // 2. Calculate Total Price Securely
    // We fetch real prices from DB to prevent users from hacking localstorage prices
    let total = 0;
    const orderItemsData = [];

    for (const item of items) {
      const product = await prisma.product.findUnique({
        where: { id: item.id },
      });
      if (product) {
        total += product.price * item.quantity;
        orderItemsData.push({
          productId: product.id,
          quantity: item.quantity,
          price: product.price, // Save the price at time of purchase
        });
      }
    }

    // 3. Create Order in Database (Status: Pending)
    const order = await prisma.order.create({
      data: {
        userId: session?.user?.id || null, // Link to user if logged in
        total: total,
        status: "pending",
        items: {
          create: orderItemsData,
        },
      },
    });

    // 4. Create Stripe PaymentIntent
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(total * 100), // Stripe works in cents (e.g. $10.00 = 1000)
      currency: "usd",
      automatic_payment_methods: { enabled: true },
      metadata: {
        orderId: order.id, // We attach our internal Order ID to Stripe so we can find it later
      },

      description: "Payment for Goods - Order #" + order.id, 
      shipping: {
        name: "Test Customer",
        address: {
          line1: "510 Townsend St",
          postal_code: "98140",
          city: "San Francisco",
          state: "CA",
          country: "US",
        },
      },

      
    });

    

    // 5. Return the Client Secret to the Frontend
    return NextResponse.json({ clientSecret: paymentIntent.client_secret });

  } catch (error) {
    console.error("Payment Error:", error);
    return NextResponse.json({ error: "Error creating payment intent" }, { status: 500 });
  }
}