import dbConnection from "@/lib/dbConnect";
import Response, { ResponseServerError } from "@/util/Response";
import { getDataFromToken } from "@/util/getDataFromToken";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  //db connected
  dbConnection();

  try {
    const userData = await getDataFromToken(request);
    console.log(userData);

    if (userData.phoneNumber !== "") {
      return Response(false, "user is not logged in or session expired", 401);
    }

    return NextResponse.json(
      {
        success: true,
        message: " getting user data successfully!",
        data: userData,
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    return ResponseServerError(" code creation failed!");
  }
}
