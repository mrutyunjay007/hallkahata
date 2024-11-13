import { auth, getAuth } from "@clerk/nextjs/server";
import { log } from "console";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import { NextRequest } from "next/server";

export async function getDataFromToken(request: NextRequest) {
  try {
    const { sessionClaims, getToken } = await auth();

    const fullName = sessionClaims?.fullName;

    const phoneNumber = sessionClaims?.phoneNumber as string;

    // const template = "hallkhata";

    // const token = await getToken({ template });

    // console.log(phoneNumber);

    // const decodedToken: any = jwt.verify(
    //   token as string,
    //   process.env.CLERK_PEM_PUBLIC_KEY!,
    //   {
    //     algorithms: ["RS256"], // Specify the expected algorithm(s)
    //   }
    // );

    // log("token: ", decodedToken);

    return {
      userName: fullName,
      phoneNumber: phoneNumber.slice(3),
    };
  } catch (error: any) {
    throw new Error(error.message);
  }
}
