import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import { NextRequest } from "next/server";

export async function getDataFromToken(request: NextRequest) {
  try {
    const token = request.cookies.get("token")?.value;

    // console.log(token);

    if (!token) {
      return null;
    }

    const decodedToken: any = jwt.verify(token, process.env.TOKEN_SECRET!);
    return {
      _id: decodedToken._id,
      userName: decodedToken.userName,
      phoneNumber: decodedToken.phoneNumber,
    };
  } catch (error: any) {
    throw new Error(error.message);
  }
}
