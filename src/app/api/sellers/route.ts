import dbConnection from "@/lib/dbConnect";
import ConnectionModel from "@/models/Connection";
import { ResponseServerError } from "@/util/Response";
import { getDataFromToken } from "@/util/getDataFromToken";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  //db connected
  dbConnection();

  try {
    const tokenData = await getDataFromToken(request);

    if (!tokenData) {
      console.log(tokenData);
    }

    const url = new URL(request.url);
    const limit = parseInt(url.searchParams.get("limit") as string);
    const page = parseInt(url.searchParams.get("page") as string);

    const skip = (page - 1) * limit;

    const sellers = await ConnectionModel.aggregate([
      {
        $match: {
          customerNumber: tokenData?.phoneNumber,
          amount: { $ne: 0 },
        },
      },
      {
        $sort: { createdAt: -1 }, // Sort by createdAt in descending order (-1 for descending, 1 for ascending)
      },
      {
        $skip: skip,
      },
      {
        $limit: limit,
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
        currentUserData: tokenData,
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
