import { NextResponse } from "next/server";
import Razorpay from "razorpay";

function getRazorpayClient() {
  const key_id = process.env.RAZORPAY_KEY_ID;
  const key_secret = process.env.RAZORPAY_KEY_SECRET;

  if (!key_id || !key_secret) {
    throw new Error("Razorpay credentials missing: set RAZORPAY_KEY_ID and RAZORPAY_KEY_SECRET");
  }

  return new Razorpay({ key_id, key_secret });
}

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

    const razorpay = getRazorpayClient();

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