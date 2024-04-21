import dbConnection from "@/lib/dbConnect";
import ConnectionModel from "@/models/Connection";
import { ResponseServerError } from "@/util/Response";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  //db connected
  dbConnection();

  try {
    const url = new URL(request.url);

    const userPhoneNumber = url.searchParams.get("number");

    const sellers = await ConnectionModel.find({
      customerNumber: userPhoneNumber,
    });

    return NextResponse.json(
      {
        success: true,
        message: "user data successfully got",
        data: sellers,
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    return ResponseServerError("connection not present!");
  }
}
