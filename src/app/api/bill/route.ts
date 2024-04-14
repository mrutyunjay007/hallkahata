import dbConnection from "@/lib/dbConnect";
import BillModel from "@/models/Bill";
import Response, { ResponseServerError } from "@/util/Response";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

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
          createdAt: 1,
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

export async function POST(request: Request) {
  await dbConnection();
  try {
    const { customerNumber, sellerNumber, customerName, amount } =
      await request.json();

    //create new Bill
    const newBill = await BillModel.create({
      sellerNumber,
      customerName,
      customerNumber,
      createdAt: Date.now(),
      amount,
    });

    await newBill.save();

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
