import dbConnection from "@/lib/dbConnect";
import UserModel from "@/models/User";

import VerifyModel from "@/models/Verify";
import Response, { ResponseServerError } from "@/util/Response";
import { NextResponse } from "next/server";

//number availablity
export async function GET(request: Request) {
  //db connected
  dbConnection();
  try {
    const url = new URL(request.url);
    const phoneNumber = url.searchParams.get("phoneNumber");

    // check first in verifys
    const verify = await VerifyModel.findOne({ phoneNumber });

    if (verify) {
      return NextResponse.json(
        {
          success: false,
          message: "verify your number",
          data: {
            inVerification: true,
          },
        },
        { status: 200 }
      );
    }

    //check in users
    const user = await UserModel.aggregate([
      {
        $match: {
          phoneNumber,
        },
      },
    ]);

    if (user[0]) {
      return NextResponse.json(
        {
          success: false,
          message: "user already present!",
          data: { inVerification: false },
        },
        {
          status: 400,
        }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: "user available!",
        data: { inVerification: false },
      },
      { status: 200 }
    );
  } catch (error) {
    return ResponseServerError("numer code missmatched!");
  }
}

// verify code
export async function POST(request: Request) {
  //db connected
  dbConnection();

  try {
    const { phoneNumber, code } = await request.json();

    const verify = await VerifyModel.findOne({ phoneNumber });

    if (verify?.code !== code) {
      return Response(false, "code is matched!", 400);
    }

    return Response(true, "code matched successfully!", 200);
  } catch (error) {
    return ResponseServerError("not registered number!");
  }
}
