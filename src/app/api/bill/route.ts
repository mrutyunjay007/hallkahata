import dbConnection from "@/lib/dbConnect";
import BillModel from "@/models/Bill";
import ConnectionModel from "@/models/Connection";
import UserModel from "@/models/User";
import Response, { ResponseServerError } from "@/util/Response";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

// ------------------------- Get all bills ----------------------

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
        //   //flatten array
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
          seller: 1,
          customer: 1,
          amount: 1,
          refBillId: 1,
          refCreatedAt: 1,
          paid: 1,
          createdAt: 1,
        },
      },
    ]);

    if (!billData[0]) {
      return Response(false, "no such bill present", 404);
    }

    //get connection id
    const connectionId = await ConnectionModel.findOne({
      customerNumber: billData[0].customer.phoneNumber,
      sellerNumber: billData[0].seller.phoneNumber,
    }).select("_id");

    return NextResponse.json(
      {
        success: true,
        data: { ...billData[0], connectionId: connectionId?._id },
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

// ----------------------- Create new bill ----------------------

export async function POST(request: Request) {
  await dbConnection();
  try {
    const {
      connectionId,
      amount,
      paymentType,
      paid,
      refBillId,
      refCreatedAt,
      bySeller,
    } = await request.json();

    const connection = await ConnectionModel.findById({ _id: connectionId });

    // check if customer is present or not by seller for given loan
    const customer =
      bySeller &&
      !paid &&
      (await UserModel.exists({ phoneNumber: connection?.customerNumber }));

    //create new Bill
    const newBill = await BillModel.create({
      sellerNumber: connection?.sellerNumber,
      customerName: connection?.customerName,
      customerNumber: connection?.customerNumber,
      aprooved: (bySeller && paid) || (bySeller && !customer) ? true : false,
      cancelled: false,
      amount,
      paid,
      refBillId,
      refCreatedAt,
      paymentType, // product/ online/ cash
      createdAt: Date.now(),
      createdBy: bySeller
        ? connection?.sellerNumber
        : connection?.customerNumber,
    });

    await newBill.save();

    //update connection amount
    await ConnectionModel.updateOne(
      { _id: connectionId },
      { amount: connection?.amount + amount }
    );

    // loan gien by seller and customer is present then update customer notification
    customer &&
      (await UserModel.findOneAndUpdate(
        { phoneNumber: connection?.customerNumber },
        { notification: true }
      ));

    // paid by customer then update seller notification
    !bySeller &&
      paid &&
      (await UserModel.findOneAndUpdate(
        { phoneNumber: connection?.sellerNumber },
        { notification: true }
      ));

    // if refBillId is present then update its paid status to true
    if (refBillId.length > 0) {
      await BillModel.updateOne({ _id: refBillId }, { paid: true });
    }

    return NextResponse.json(
      {
        success: true,
        message: "bill successfully created!",
        data: newBill,
      },
      {
        status: 201,
      }
    );
  } catch (error) {
    console.log(error);
    return ResponseServerError("bill creation failed!");
  }
}

// ----------------------- Delete bill ----------------------

export async function DELETE(request: Request) {
  await dbConnection();

  try {
    const url = new URL(request.url);

    const bill = url.searchParams.get("bill");
    const connection = url.searchParams.get("connection");

    const connectionAmount = await ConnectionModel.findOne({
      _id: connection,
    }).select("amount");

    const billAmount = await BillModel.findOne({ _id: bill }).select("amount");

    if (!connectionAmount || !billAmount) {
      return Response(false, "connection or bill not present", 404);
    }

    await ConnectionModel.updateOne(
      { _id: connection },
      { amount: connectionAmount?.amount! - billAmount?.amount! }
    );

    await BillModel.deleteOne({ _id: bill });

    return Response(true, "bill deleted successfully!", 200);
  } catch (error) {
    return ResponseServerError("bill deletion failed!");
  }
}
