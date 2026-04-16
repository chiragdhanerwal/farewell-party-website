import { NextResponse } from "next/server";
import Razorpay from "razorpay";

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID as string,
  key_secret: process.env.RAZORPAY_KEY_SECRET as string,
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, couponCode } = body;

    // ✅ validation
    if (!name || !email) {
      return NextResponse.json(
        { success: false, message: "Name and Email required" },
        { status: 400 }
      );
    }

    let finalAmount = 2000;
    const code = couponCode?.trim();

    if (code === "Rani@123") {
      finalAmount = 2000 * 0.01; // 99% off (pays 1%)
    } else if (code === "sakeofbtech") {
      finalAmount = 2000 * 0.50; // 50% off
    } else if (code === "forsakeoffriends") {
      finalAmount = 2000 * 0.90; // 10% off (pays 90%)
    }

    const order = await razorpay.orders.create({
      amount: Math.round(finalAmount * 100), // in paise
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

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
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