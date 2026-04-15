import { NextResponse } from "next/server";
import crypto from "crypto";
import path from "path";
import fs from "fs";
import ExcelJS from "exceljs";

const RAZORPAY_KEY_SECRET = "ps6M4BhTbOlpp1nKTIyzC5yj";
const EXCEL_PATH = path.join(process.cwd(), "registrations.xlsx");

// Column headers for the Excel sheet
const COLUMNS = [
  { header: "Timestamp", key: "timestamp", width: 22 },
  { header: "Name", key: "name", width: 25 },
  { header: "Gender", key: "gender", width: 10 },
  { header: "Branch", key: "branch", width: 12 },
  { header: "Roll No", key: "rollNo", width: 18 },
  { header: "NSUT Email", key: "nsutEmail", width: 30 },
  { header: "Personal Email", key: "personalEmail", width: 30 },
  { header: "Phone Number", key: "phoneNumber", width: 16 },
  { header: "Placement Status", key: "placementStatus", width: 18 },
  { header: "Relationship Status", key: "relationshipStatus", width: 22 },
  { header: "Expectations", key: "expectations", width: 40 },
  { header: "Payment ID", key: "paymentId", width: 28 },
  { header: "Order ID", key: "orderId", width: 28 },
  { header: "Amount (₹)", key: "amount", width: 12 },
];

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      formData,
    } = body;

    // 1. Verify the Razorpay signature
    const expectedSignature = crypto
      .createHmac("sha256", RAZORPAY_KEY_SECRET)
      .update(`${razorpay_order_id}|${razorpay_payment_id}`)
      .digest("hex");

    if (expectedSignature !== razorpay_signature) {
      return NextResponse.json(
        { success: false, message: "Payment verification failed — invalid signature." },
        { status: 400 }
      );
    }

    // 2. Save to Excel
    const workbook = new ExcelJS.Workbook();
    let worksheet: ExcelJS.Worksheet;

    if (fs.existsSync(EXCEL_PATH)) {
      await workbook.xlsx.readFile(EXCEL_PATH);
      worksheet = workbook.getWorksheet("Registrations") || workbook.addWorksheet("Registrations");
    } else {
      worksheet = workbook.addWorksheet("Registrations");
      worksheet.columns = COLUMNS;
      // Style header row
      worksheet.getRow(1).font = { bold: true };
      worksheet.getRow(1).fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "FF2D2D2D" },
      };
      worksheet.getRow(1).font = { bold: true, color: { argb: "FFFFFFFF" } };
    }

    worksheet.addRow({
      timestamp: new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" }),
      name: formData.name || "",
      gender: formData.gender || "",
      branch: formData.branch || "",
      rollNo: formData.rollNo || "",
      nsutEmail: formData.nsutEmail || "",
      personalEmail: formData.personalEmail || "",
      phoneNumber: formData.phoneNumber || "",
      placementStatus: formData.placementStatus || "",
      relationshipStatus: formData.relationshipStatus || "Not specified",
      expectations: formData.expectations || "Not specified",
      paymentId: razorpay_payment_id,
      orderId: razorpay_order_id,
      amount: 2000,
    });

    await workbook.xlsx.writeFile(EXCEL_PATH);

    // 3. Also submit to Formspree (keep the old integration as backup)
    try {
      await fetch("https://formspree.io/f/mwvapywv", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          Name: formData.name,
          Gender: formData.gender,
          Branch: formData.branch,
          "Roll No": formData.rollNo,
          "NSUT Email": formData.nsutEmail,
          "Personal Email": formData.personalEmail,
          "Phone Number": formData.phoneNumber,
          "Placement Status": formData.placementStatus,
          "Relationship Status": formData.relationshipStatus || "Not specified",
          "Expectations from the night": formData.expectations || "Not specified",
          "Payment ID": razorpay_payment_id,
          "Order ID": razorpay_order_id,
          "Amount Paid": "₹2000",
        }),
      });
    } catch {
      // Formspree backup is non-critical — don't fail the whole request
      console.warn("Formspree submission failed (non-critical).");
    }

    return NextResponse.json({ success: true, message: "Payment verified and registration saved!" });
  } catch (error: unknown) {
    console.error("Payment verification failed:", error);
    const message =
      error instanceof Error ? error.message : "Verification failed";
    return NextResponse.json({ success: false, message }, { status: 500 });
  }
}
