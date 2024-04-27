import dbConnection from "@/lib/dbConnect";
import ConnectionModel from "@/models/Connection";
import { ResponseServerError } from "@/util/Response";
import { getDataFromToken } from "@/util/getDataFromToken";
import { log } from "console";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  //db connected
  await dbConnection();

  try {
    const tokenData = await getDataFromToken(request);

    if (!tokenData) {
      console.log(tokenData);
    }

    const customers = await ConnectionModel.aggregate([
      {
        $match: {
          sellerNumber: tokenData?.phoneNumber,
          amount: { $ne: 0 },
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "customerNumber",
          foreignField: "phoneNumber",
          as: "customer",
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
          customer: {
            $arrayElemAt: ["$customer", 0],
          },
        },
      },
      {
        $addFields: {
          customer: {
            $ifNull: [
              "$customer",
              {
                userName: "$customerName",
                phoneNumber: "$customerNumber",
              },
            ],
          },
        },
      },

      {
        $project: {
          _id: 1,
          sellerNumber: 1,
          customer: 1,
          amount: 1,
        },
      },
    ]);

    return NextResponse.json(
      {
        success: true,
        message: "user data successfully got",
        data: customers,
      },
      {
        status: 200,
      }
    );
  } catch (error: any) {
    console.log(error.message);

    return ResponseServerError("connection not present!");
  }
}
