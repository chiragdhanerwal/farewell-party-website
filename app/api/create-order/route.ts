import { NextResponse } from "next/server";

/**
 * POST /api/create-order
 *
 * PLACEHOLDER — Replace this with real Razorpay order creation.
 *
 * When integrating Razorpay:
 *   1. npm install razorpay
 *   2. const Razorpay = require("razorpay");
 *   3. const instance = new Razorpay({ key_id: process.env.RAZORPAY_KEY_ID, key_secret: process.env.RAZORPAY_KEY_SECRET });
 *   4. const order = await instance.orders.create({ amount, currency, receipt });
 *   5. return NextResponse.json({ orderId: order.id });
 */
export async function POST() {
  return NextResponse.json(
    {
      success: false,
      message: "Payment integration coming soon. Order creation not yet implemented.",
      // orderId: "order_placeholder_id",   // ← uncomment after Razorpay setup
    },
    { status: 501 }
  );
}
