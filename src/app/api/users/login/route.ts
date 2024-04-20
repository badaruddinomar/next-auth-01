import bcryptjs from "bcryptjs";
import User from "@/models/userModel";
import { connectToDb } from "@/utils/dbConfig";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

connectToDb();

export async function POST(req: NextRequest) {
  try {
    const reqBody = await req.json();
    const { email, password } = reqBody;

    const user = await User.findOne({ email: email });

    const validPassword = await bcryptjs.compare(password, user.password);
    if (!validPassword) {
      return NextResponse.json(
        { error: "Check your credintials" },
        { status: 400 }
      );
    }

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 400 });
    }

    const tokenData = {
      id: user.id,
      username: user.username,
      email: user.email,
    };
    const token = jwt.sign(tokenData, process.env.JWT_SECRET as string, {
      expiresIn: "1d",
    });
    const response = NextResponse.json(
      { messasge: "login success", success: true },
      { status: 200 }
    );
    response.cookies.set("token", token, {
      httpOnly: true,
    });
    return response;
  } catch (err: any) {
    return NextResponse.json({ message: err.message }, { status: 500 });
  }
}
