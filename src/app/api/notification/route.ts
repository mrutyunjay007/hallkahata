import Connection from "@/components/Connection";
import dbConnection from "@/lib/dbConnect";
import BillModel from "@/models/Bill";
import ConnectionModel from "@/models/Connection";
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
      // get all bills of same customer with no aprooval or same seller with paid bill and no aprooval
      {
        $match: {
          $or: [
            {
              // me as customer notification receved from seller to aproove
              customerNumber: "8777761381",
              aprooved: false,
            },
            // me as seller notification receved from customer of paid bill
            {
              sellerNumber: "8777761380",
              paid: true,
              aprooved: false,
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
      // lookup to get customer data
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
              },
            },
          ],
        },
      },
      {
        // flatten array
        $addFields: {
          customer: {
            $arrayElemAt: ["$customer", 0],
          },
        },
      },

      {
        $project: {
          _id: 1,
          seller: 1,
          customer: 1,
          aprooved: 1,
          amount: 1,
          createdAt: 1,
          paid: 1,
          paymentType: 1,
        },
      },
    ]);

    // me as customer get all bills of same customer with remainder
    const remainderData = await ConnectionModel.aggregate([
      {
        $match: {
          customerNumber: "8777761381",
          remainder: true,
        },
      },
      // get seller data
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
          customerNumber: 1,
          seller: 1,
          amount: 1,
        },
      },
    ]);

    if (billData.length === 0 && remainderData.length === 0) {
      return Response(false, "no such bill present", 404);
    }

    return NextResponse.json(
      {
        success: true,
        data: [...billData, ...remainderData],
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
    //id can be bill id or connection id
    const { id, type } = await request.json();

    const bill = await BillModel.aggregate([
      {
        $match: {
          _id: new mongoose.Types.ObjectId(id!),
        },
      },
    ]);

    if (!bill[0]) {
      return Response(false, "bill not present!", 404);
    }

    // if notification type is aprooval -> make aproove true
    // if notification type is remainder -> make remainder false
    // if notification type is payment ->  make aproove true

    if (type === "aprooval") {
      await BillModel.updateOne(
        { _id: id },
        {
          aprooved: true,
        }
      );

      return Response(true, "bill aprooved successfully!", 200);
    } else if (type === "remainder") {
      await ConnectionModel.findOneAndUpdate(id, { remainder: false });
      return Response(true, "remainder updated successfully!", 200);
    } else {
      await BillModel.updateOne({ _id: id }, { aprooved: true });
    }
  } catch (error: any) {
    console.log(error.message);

    return ResponseServerError("bill is not present!");
  }
}
