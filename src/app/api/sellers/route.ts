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

    const sellers = await ConnectionModel.aggregate([
      {
        $match: {
          customerNumber: userPhoneNumber,
          amount: { $ne: 0 },
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "sellerNumber",
          foreignField: "phoneNumber",
          as: "seller",
          pipeline: [
            {
              $project: {
                userName: 1,
                phoneNumber: 1,
                // profilePic: 1,
              },
            },
          ],
        },
      },
      {
        //flatten array
        $addFields: {
          seller: {
            $arrayElemAt: ["$seller", 0],
          },
        },
      },

      {
        $project: {
          _id: 1,
          customerNumber: 1,
          seller: 1,
          amount: 1,
        },
      },
    ]);

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
