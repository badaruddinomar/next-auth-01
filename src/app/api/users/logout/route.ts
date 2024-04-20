import { connectToDb } from "@/utils/dbConfig";
import { NextResponse } from "next/server";

connectToDb();

export async function GET(req: NextResponse) {
  try {
    const response = NextResponse.json({
      message: "logout successfully",
      success: true,
    });
    response.cookies.set("token", "", {
      httpOnly: true,
      expires: Date.now(),
    });
    return response;
  } catch (err: any) {
    return NextResponse.json({ message: err.message }, { status: 500 });
  }
}
