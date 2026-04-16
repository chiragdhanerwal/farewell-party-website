import { NextResponse } from "next/server";
import crypto from "crypto";
import fs from "fs";
import path from "path";
import Razorpay from "razorpay";
import ExcelJS from "exceljs";

const DATA_FILE = path.join(process.cwd(), "data", "participant-count.json");
const EXCEL_FILE = path.join(process.cwd(), "data", "participants.xlsx");

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID as string,
  key_secret: process.env.RAZORPAY_KEY_SECRET as string,
});

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      formData,
    } = body;

    const sign = razorpay_order_id + "|" + razorpay_payment_id;

    const expectedSign = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET as string)
      .update(sign)
      .digest("hex");

    if (expectedSign === razorpay_signature) {
      // 1. Fetch exact payment amount from Razorpay
      let amountPaid = 0;
      try {
        const order = await razorpay.orders.fetch(razorpay_order_id);
        amountPaid = (order.amount as number) / 100;
      } catch (err) {
        console.error("Failed to fetch razorpay order details:", err);
      }

      // 2. Save participant data to Excel
      try {
        const workbook = new ExcelJS.Workbook();
        let worksheet;
        
        if (fs.existsSync(EXCEL_FILE)) {
          await workbook.xlsx.readFile(EXCEL_FILE);
          worksheet = workbook.getWorksheet("Participants");
        } else {
          worksheet = workbook.addWorksheet("Participants");
          worksheet.columns = [
            { header: "Name", key: "name", width: 25 },
            { header: "Gender", key: "gender", width: 10 },
            { header: "Branch", key: "branch", width: 15 },
            { header: "Roll No", key: "rollNo", width: 15 },
            { header: "NSUT Email", key: "nsutEmail", width: 30 },
            { header: "Personal Email", key: "personalEmail", width: 30 },
            { header: "Phone", key: "phoneNumber", width: 15 },
            { header: "Placement", key: "placementStatus", width: 15 },
            { header: "Relationship", key: "relationshipStatus", width: 20 },
            { header: "Expectations", key: "expectations", width: 30 },
            { header: "Coupon Code", key: "couponCode", width: 15 },
            { header: "Amount Paid", key: "amountPaid", width: 15 },
            { header: "Payment ID", key: "paymentId", width: 25 },
            { header: "Order ID", key: "orderId", width: 25 },
          ];
        }

        if (worksheet) {
          worksheet.addRow({
            ...(formData || {}),
            amountPaid: amountPaid ? `₹${amountPaid}` : "Unknown",
            paymentId: razorpay_payment_id,
            orderId: razorpay_order_id,
          });
          await workbook.xlsx.writeFile(EXCEL_FILE);
        }
      } catch (err) {
        console.error("Failed to save participant data to Excel:", err);
      }

      // 3. Increment the participant count
      try {
        let count = 16;
        if (fs.existsSync(DATA_FILE)) {
          const fileData = fs.readFileSync(DATA_FILE, "utf-8");
          const parsed = JSON.parse(fileData);
          if (typeof parsed.count === "number") {
            count = parsed.count;
          }
        }
        count += 1;
        fs.writeFileSync(DATA_FILE, JSON.stringify({ count }, null, 2));
      } catch (err) {
        console.error("Failed to increment participant count:", err);
      }

      return NextResponse.json({ success: true });
    }

    return NextResponse.json(
      { success: false, message: "Invalid signature" },
      { status: 400 }
    );

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}