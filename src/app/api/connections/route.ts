import dbConnection from "@/lib/dbConnect";
import BillModel from "@/models/Bill";
import ConnectionModel from "@/models/Connection";

import Response, { ResponseServerError } from "@/util/Response";

import { NextResponse } from "next/server";

//----------------------- Get Connection Data with Bills -------------------------

export async function GET(request: Request) {
  try {
    //connect db
    await dbConnection();

    const url = new URL(request.url);

    const seller = url.searchParams.get("seller");
    const customer = url.searchParams.get("customer");

    // aggregation pipeline for getting connection data
    const connection = await ConnectionModel.aggregate([
      {
        $match: {
          sellerNumber: seller,
          customerNumber: customer,
        },
      },
      //look for seller
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
      //look for cutomer data
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
          seller: 1,
          customer: 1,
          amount: 1,
        },
      },
    ]);

    if (!connection[0]) {
      return Response(false, "connection not present!", 404);
    }

    // aggregation pipeline for getting all bills data
    const transectionHistory = await BillModel.aggregate([
      {
        $match: {
          sellerNumber: seller,
          customerNumber: customer,
        },
      },
      //look for seller
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
        //flatten array
        $addFields: {
          seller: {
            $arrayElemAt: ["$seller", 0],
          },
        },
      },
      //look for cutomer data
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

    return NextResponse.json(
      {
        success: true,
        data: { connection: connection[0], transectionHistory },
        message: "getting data successfull!",
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.log(error);
    return Response(false, "no such connection", 500);
  }
}

//----------------------- Create new Connection -------------------------

// Seller can only create connection
export async function POST(request: Request) {
  //connect db
  await dbConnection();
  try {
    const { customerNumber, sellerNumber, customerName } = await request.json();

    const connection = await ConnectionModel.findOne({
      $and: [{ customerNumber }, { sellerNumber }],
    });

    if (connection) {
      return Response(false, "connection already present", 400);
    }

    //create new connection
    const newConnection = await ConnectionModel.create({
      sellerNumber,
      customerNumber,
      customerName,
      amount: 0,
    });

    await newConnection.save();

    return NextResponse.json(
      {
        success: true,
        data: newConnection,
        message: "contection creation succesfull!",
      },
      {
        status: 201,
      }
    );
  } catch (error) {
    console.log(error);
    return ResponseServerError("connection creation failed!");
  }
}
