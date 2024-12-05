import dbConnection from "@/lib/dbConnect";
import UserModel from "@/models/User";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

export async function POST(req: Request) {
  try {
    //connect db
    await dbConnection();

    const { userName, phoneNumber, userId } = await req.json();
    console.log(req.json());

    if (!userName || !phoneNumber) {
      return NextResponse.json(
        {
          success: false,
          message: "send full information!",
        },
        { status: 401 }
      );
    }

    //check user already present or not
    const existedUser = await UserModel.findOne({ phoneNumber });

    if (existedUser) {
      return NextResponse.json(
        {
          success: false,
          message: "User Already present",
        },
        {
          status: 400,
        }
      );
    }

    //create new user
    const user = await UserModel.create({
      userId,
      userName,
      phoneNumber,
      notification: false,
    });
    await user.save();

    return NextResponse.json(
      {
        success: true,
        message: "sing up successfull!",
      },
      {
        status: 201,
      }
    );
  } catch (error: any) {
    console.log("signUp Error", error.message);
    return NextResponse.json(
      {
        success: false,
        message: "sugn up failed!",
      },
      {
        status: 500,
      }
    );
  }
}
