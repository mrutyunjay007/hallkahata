import dbConnection from "@/lib/dbConnect";
import UserModel from "@/models/User";
import bcrypt from "bcryptjs";
import Response from "@/util/Response";
import jwt from "jsonwebtoken";
import { NextRequest, NextResponse } from "next/server";

// Login controler
export async function POST(request: Request) {
  try {
    //connect db
    await dbConnection();

    const { phoneNumber, password } = await request.json();

    //get user
    const user = await UserModel.aggregate([
      {
        $match: {
          phoneNumber,
        },
      },
    ]);

    if (!user[0]) {
      return Response(false, "Unauthorized!", 401);
    }

    //match password
    const isPasswordMatched = bcrypt.compareSync(password, user[0].password);

    if (!isPasswordMatched) {
      return Response(false, "Unauthorized!", 401);
    }

    //create token data
    const tokenData = {
      id: user[0]._id,
      username: user[0].username,
      phoneNumber: user[0].phoneNumber,
    };

    const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET!, {
      expiresIn: "1d",
    });

    const response = NextResponse.json(
      {
        success: true,
        message: "Login successfull!",
      },
      {
        status: 200,
      }
    );

    // add token in cookies
    response.cookies.set("token", token, {
      httpOnly: true,
    });

    return response;
  } catch (error) {
    console.log(error);
    return Response(false, "Login failed!", 500);
  }
}
