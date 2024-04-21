import dbConnection from "@/lib/dbConnect";
import ConnectionModel from "@/models/Connection";
import UserModel from "@/models/User";
import Response, { ResponseServerError } from "@/util/Response";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  //db connected
  await dbConnection();
  try {
    const url = new URL(request.url);

    const userId = url.searchParams.get("userId");
    console.log(userId);

    const user = await UserModel.aggregate([
      {
        $match: {
          _id: new mongoose.Types.ObjectId(userId!),
        },
      },

      //   // look up as seller to get
      {
        $lookup: {
          from: "connections",
          localField: "phoneNumber",
          foreignField: "sellerNumber",
          as: "amount",
        },
      },
      {
        $addFields: {
          you_will_get: {
            $reduce: {
              input: "$amount",
              initialValue: 0,
              in: {
                $add: ["$$value", "$$this.amount"],
              },
            },
          },
        },
      },

      // look up as customer to pay
      {
        $lookup: {
          localField: "phoneNumber",
          from: "connections",
          foreignField: "customerNumber",
          as: "amount",
        },
      },
      {
        $addFields: {
          you_will_give: {
            $reduce: {
              input: "$amount",
              initialValue: 0,
              in: {
                //add if amoutn < 0
                $add: ["$$value", "$$this.amount"],
              },
            },
          },
        },
      },

      // projection
      {
        $project: {
          userName: 1,
          phoneNumber: 1,
          youWillGet: {
            $cond: {
              if: { $gt: ["$you_will_get", 0] },
              then: 0,
              else: "$you_will_get",
            },
          },
          youWillGive: {
            $cond: {
              if: { $gt: ["$you_will_give", 0] },
              then: 0,
              else: "$you_will_give",
            },
          },
        },
      },
    ]);

    if (!user[0]) {
      return Response(false, "user not found!", 404);
    }

    return NextResponse.json(
      {
        success: true,
        message: "user data successfully got",
        data: user[0],
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    return ResponseServerError("user not able to get!");
  }
}
