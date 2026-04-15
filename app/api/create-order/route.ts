import { NextResponse } from "next/server";
import Razorpay from "razorpay";

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID as string,
  key_secret: process.env.RAZORPAY_KEY_SECRET as string,
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email } = body;

    // ✅ validation
    if (!name || !email) {
      return NextResponse.json(
        { success: false, message: "Name and Email required" },
        { status: 400 }
      );
    }

    const order = await razorpay.orders.create({
      amount: 200000, // ₹2000 in paise
      currency: "INR",
      receipt: `receipt_${Date.now()}`,
      notes: {
        customerName: name,
        customerEmail: email,
      },
    });

    return NextResponse.json({
      success: true,
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
    });

  } catch (error: any) {
    console.error("Order creation error:", error);

    return NextResponse.json(
      {
        success: false,
        message: error?.error?.description || error.message,
      },
      { status: 500 }
    );
  }
}