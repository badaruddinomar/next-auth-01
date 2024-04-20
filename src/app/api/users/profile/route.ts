import User from "@/models/userModel";
import { connectToDb } from "@/utils/dbConfig";
import { getTokenData } from "@/utils/getTokenData";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    await connectToDb();
    const userId = await getTokenData(req);
    const user = await User.findOne({ _id: userId }).select("-password");
    // check if there is no user--
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }
    return NextResponse.json(
      { user, success: true, message: "user found" },
      { status: 200 }
    );
  } catch (err: any) {
    return NextResponse.json({ message: err.message }, { status: 500 });
  }
}
