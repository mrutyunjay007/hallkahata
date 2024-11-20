import dbConnection from "@/lib/dbConnect";
import ConnectionModel from "@/models/Connection";
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
    const sellerNumber = url.searchParams.get("sellerNumber");
    const customerNumber = url.searchParams.get("customerNumber");

    //check in users
    const user = await UserModel.aggregate([
      {
        $match: {
          phoneNumber: customerNumber!,
        },
      },
    ]);

    if (user[0]) {
      const connected = await ConnectionModel.findOne({
        sellerNumber,
        customerNumber,
      });

      if (connected) {
        return NextResponse.json(
          {
            success: false,
            message: "users already connected!",
            data: {
              userName: user[0].userName,
              phoneNumber: user[0].phoneNumber,
            },
          },
          {
            status: 200,
          }
        );
      }

      return NextResponse.json(
        {
          success: true,
          message: "user already present!",
          data: {
            userName: user[0].userName,
            phoneNumber: user[0].phoneNumber,
          },
        },
        {
          status: 200,
        }
      );
    }

    return NextResponse.json(
      {
        success: false,
        message: "user not available!",
      },
      { status: 404 }
    );
  } catch (error) {
    return ResponseServerError("numer code missmatched!");
  }
}
