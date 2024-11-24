import dbConnection from "@/lib/dbConnect";
import BillModel from "@/models/Bill";
import ConnectionModel from "@/models/Connection";
import Response, { ResponseServerError } from "@/util/Response";
import { getDataFromToken } from "@/util/getDataFromToken";
import mongoose from "mongoose";
import { NextRequest, NextResponse } from "next/server";

// ------------------------- Get all notifications ----------------------
export async function GET(request: NextRequest) {
  //connect db
  await dbConnection();
  try {
    const { phoneNumber } = await getDataFromToken(request);

    const billData = await BillModel.aggregate([
      // get all bills of same customer with no aprooval or same seller with paid bill and no aprooval
      {
        $match: {
          $or: [
            {
              // me as customer notification receved from seller to aproove
              customerNumber: phoneNumber!,
              aprooved: false,
            },
            // me as seller notification receved from customer of paid bill
            {
              sellerNumber: phoneNumber!,
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
          cancelled: 1,
          createdBy: 1,
        },
      },
    ]);

    // me as customer get all bills of same customer with remainder
    const remainderData = await ConnectionModel.aggregate([
      {
        $match: {
          customerNumber: phoneNumber!,
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
          remainder: 1,
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

// Responses of user for all notification types
// like aprooved , cancel , remainder and resend
export async function POST(request: NextRequest) {
  /*
    request :{
          aprooved,
          cancel,
          remainder,
        }

    aprooved -> true --> aprooval request of payment or loan
    cancle -> true --> canel request of aprooval
    remainder -> true --> remainder request of payment

    all false --> resend request of aprooval
*/

  //db connected
  await dbConnection();

  try {
    //id can be bill id or connection id
    const { id, aprooved, cancel, remainder } = await request.json();

    // Remainder notification
    // if notification type is remainder -> make remainder false
    if (remainder) {
      await ConnectionModel.findOneAndUpdate({ _id: id }, { remainder: false });

      return Response(true, "remainder updated successfully!", 200);
    }

    // Cancel notification
    // if notification type is cancel -> make aproove false ,cancelled true and update connection amount
    if (cancel) {
      const bill = await BillModel.findOne({ _id: id }).select([
        "amount",
        "customerNumber",
        "sellerNumber",
      ]);
      const connection = await ConnectionModel.findOne({
        sellerNumber: bill?.sellerNumber,
        customerNumber: bill?.customerNumber,
      }).select(["amount"]);

      if (!bill || !connection) {
        return Response(false, "bill or connection is not present!", 404);
      }

      // update connection amount
      await ConnectionModel.findOneAndUpdate(
        { _id: connection?._id },
        { amount: connection?.amount! + bill?.amount! }
      );

      // update aproove to false and cancelled to true in bill
      await BillModel.findOneAndUpdate(
        { _id: id },
        { aprooved: false, cancelled: true }
      );
    }

    // Aprooval notification
    // if notification type is aprooval -> make aproove true
    if (aprooved) {
      // update aproove to true in bill
      await BillModel.findOneAndUpdate({ _id: id }, { aprooved: true });

      return Response(true, "aprooved updated successfully!", 200);
    }

    // Resend notification
    // if notification type is resend -> make cancel false and update connection amount

    const bill = await BillModel.findOne({ _id: id }).select([
      "amount",
      "customerNumber",
      "sellerNumber",
    ]);
    const connection = await ConnectionModel.findOne({
      sellerNumber: bill?.sellerNumber,
      customerNumber: bill?.customerNumber,
    }).select(["amount"]);

    if (!bill || !connection) {
      return Response(false, "bill or connection is not present!", 404);
    }

    // update connection amount
    await ConnectionModel.findOneAndUpdate(
      { _id: connection?._id },
      { amount: connection?.amount! - bill?.amount! }
    );

    // update aproove to false and cancelled to false in bill
    await BillModel.findOneAndUpdate(
      { _id: id },
      { aprooved: false, cancelled: false }
    );

    return Response(true, "approoval request resended successfully!", 200);
  } catch (error: any) {
    console.log(error.message);

    return ResponseServerError("bill or connection is not present!");
  }
}
