import dbConnection from "@/lib/dbConnect";
import UserModel from "@/models/User";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

export async function POST(req: Request) {
  try {
    //connect db
    await dbConnection();

    const { userName, phoneNumber, password } = await req.json();

    if (!password || !userName || !phoneNumber) {
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

    //bcrypt password
    const newsalt = await bcrypt.genSalt(10);
    const hashedPassword = bcrypt.hashSync(password, newsalt);

    //create new user
    const user = await UserModel.create({
      userName,
      phoneNumber,
      password: hashedPassword,
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
  } catch (error) {
    console.log("signUp Error", error);
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
