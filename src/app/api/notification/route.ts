import dbConnection from "@/lib/dbConnect";
import BillModel from "@/models/Bill";
import Response, { ResponseServerError } from "@/util/Response";
import mongoose from "mongoose";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: Request) {
  //connect db
  await dbConnection();
  try {
    //   const url = new URL(request.url);

    //   const bill = url.searchParams.get("bill");

    const billData = await BillModel.aggregate([
      // get all bills of same customer with no aprooval or with remainder
      {
        $match: {
          $or: [
            {
              customerNumber: "8777761381",
              $or: [
                { aprooved: false },
                {
                  $and: [{ aprooved: true }, { remainder: true }],
                },
              ],
            },
            {
              sellerNumber: "8777761380",
              paid: true,
            },
          ],
        },
      },
      // lookup to get seller data
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
              },
            },
          ],
        },
      },
      {
        // flatten array
        $addFields: {
          seller: {
            $arrayElemAt: ["$seller", 0],
          },
        },
      },

      {
        $project: {
          _id: 1,
          seller: 1,
          customer: 1,
          aprooved: 1,
          remainder: 1,
          amount: 1,
          createdAt: 1,
          paid: 1,
          paymentProcess: 1,
        },
      },
    ]);

    if (billData.length === 0) {
      return Response(false, "no such bill present", 404);
    }

    return NextResponse.json(
      {
        success: true,
        data: billData,
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

export async function POST(request: NextRequest) {
  //db connected
  await dbConnection();
  try {
    const { billId, type } = await request.json();
    console.log(billId);

    const bill = await BillModel.aggregate([
      {
        $match: {
          _id: new mongoose.Types.ObjectId(billId!),
        },
      },
    ]);

    if (!bill[0]) {
      return Response(false, "bill not present!", 404);
    }

    // if notification type is aprooval -> make aproove true
    // if notification type is remainder -> make remainder false
    // if notification type is payment -> delete bill and put in history

    if (type === "aprooval") {
      await BillModel.updateOne(
        { _id: billId },
        {
          aprooved: true,
        }
      );

      return Response(true, "bill aprooved successfully!", 200);
    } else if (type === "remainder") {
      await BillModel.findOneAndUpdate(billId, { remainder: false });
      return Response(true, "remainder updated successfully!", 200);
    } else {
      await BillModel.findByIdAndDelete(billId);
      //TODO:
      //create new bill in history
      // update connection amount
    }
  } catch (error: any) {
    console.log(error.message);

    return ResponseServerError("bill is not present!");
  }
}
