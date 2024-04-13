import dbConnection from "@/lib/dbConnect";
import BillModel from "@/models/Bill";
import Response, { ResponseServerError } from "@/util/Response";
import mongoose from "mongoose";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: Request) {
  //connect db
  await dbConnection();
  try {
    const url = new URL(request.url);

    const bill = url.searchParams.get("bill");

    const billData = await BillModel.aggregate([
      // get all bills of same id
      {
        $match: {
          _id: new mongoose.Types.ObjectId(bill!),
        },
      },
      // lookup to get seller data
      {
        $lookup: {
          from: "users",
          localField: "seller",
          foreignField: "_id",
          as: "seller",
          pipeline: [
            {
              $project: {
                userName: 1,
                _id: 1,
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
      // lookup to get customer data
      {
        $lookup: {
          from: "users",
          localField: "customer",
          foreignField: "_id",
          as: "customer",
          pipeline: [
            {
              $project: {
                userName: 1,
                _id: 1,
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
    ]);

    if (!billData[0]) {
      return Response(false, "no such bill present", 404);
    }

    return NextResponse.json(
      {
        success: true,
        data: billData[0],
        message: "bill got successfully!",
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    return ResponseServerError("bill not present!");
  }
}
