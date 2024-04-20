import jwt from "jsonwebtoken";
import { NextRequest } from "next/server";

export const getTokenData = (req: NextRequest) => {
  try {
    const token = req.cookies.get("token")?.value || "";
    const decodedToken: any = jwt.verify(token, process.env.JWT_SECRET!);
    console.log(decodedToken);
    return decodedToken.id;
  } catch (err: any) {
    throw new Error(err.message);
  }
};
