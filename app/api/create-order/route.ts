import { NextResponse } from "next/server";
import Razorpay from "razorpay";

const razorpay = new Razorpay({
  key_id: "ps6M4BhTbOlpp1nKTIyzC5yj",
  key_secret: "ps6M4BhTbOlpp1nKTIyzC5yj",
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email } = body;

    const order = await razorpay.orders.create({
      amount: 200000, // ₹2000 in paise
      currency: "INR",
      receipt: `receipt_${Date.now()}`,
      notes: {
        customerName: name || "",
        customerEmail: email || "",
      },
    });

    return NextResponse.json({
      success: true,
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
    });
  } catch (error: unknown) {
    console.error("Razorpay order creation failed — full error:", JSON.stringify(error, null, 2));
    const errObj = error as Record<string, unknown>;
    const message =
      errObj?.error
        ? JSON.stringify(errObj.error)
        : error instanceof Error
        ? error.message
        : "Order creation failed";
    return NextResponse.json({ success: false, message, raw: errObj }, { status: 500 });
  }
}
