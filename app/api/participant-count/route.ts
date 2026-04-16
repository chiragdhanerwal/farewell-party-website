import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const DATA_FILE = path.join(process.cwd(), "data", "participant-count.json");

export async function GET() {
  try {
    let count = 16; // default
    if (fs.existsSync(DATA_FILE)) {
      const fileData = fs.readFileSync(DATA_FILE, "utf-8");
      try {
        const parsed = JSON.parse(fileData);
        if (parsed && typeof parsed.count === "number") {
          count = parsed.count;
        }
      } catch (parseError) {
        console.error("Invalid JSON in participant count file:", parseError);
        // Fallback to default
      }
    }
    return NextResponse.json({ success: true, count });
  } catch (error) {
    console.error("Error reading participant count:", error);
    return NextResponse.json({ success: false, count: 16 }, { status: 500 });
  }
}
