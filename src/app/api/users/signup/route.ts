import User from "@/models/userModel";
import { connectToDb } from "@/utils/dbConfig";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import { sendEmail } from "@/utils/sendEmail";

export async function POST(req: NextRequest) {
  await connectToDb();

  try {
    const reqBody = await req.json();
    const { username, email, password } = reqBody;
    // CHECK BODY DATA EXISTS?
    if (!username || !email || !password) {
      return NextResponse.json(
        { error: "Please provide a username, email, and password" },
        { status: 400 }
      );
    }
    // CHECK USER EXISTS?
    const user = await User.findOne({ username });
    if (user) {
      return NextResponse.json(
        { error: "Username must be unique" },
        { status: 400 }
      );
    }
    // HASH THE PASSWORD
    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);
    // CREATE NEW USER
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });
    await newUser.save();
    // SEND VERIFICATION MAIL--
    await sendEmail({
      email: newUser.email,
      emailType: "VERIFY",
      userId: newUser._id.toString(),
    });

    return NextResponse.json(
      { message: "User registered successfully", success: true, newUser },
      { status: 201 }
    );
  } catch (err: any) {
    return NextResponse.json({ message: err.message }, { status: 500 });
  }
}
