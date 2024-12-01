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
    const color = url.searchParams.get("color");
    const date = url.searchParams.get("date");

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

    //get all bills in give date
    if (date !== "") {
      // Get current date
      const currentDate = new Date(date as string);

      // Get next day's midnight
      let nextDayMidNight = new Date(currentDate);

      nextDayMidNight.setDate(currentDate.getDate() + 1);

      // aggregation pipeline for getting all bills with negative amount of given date
      const transectionHistory = await BillModel.aggregate([
        {
          $match: {
            sellerNumber: seller,
            customerNumber: customer,
            $expr: {
              $cond: {
                if: { $eq: [color, "red"] }, // If the color is 'red'
                then: { $lt: ["$amount", 0] }, // amount < 0 for 'red'
                else: {
                  $cond: {
                    if: { $eq: [color, "green"] }, // If the color is 'green'
                    then: { $gt: ["$amount", 0] }, // amount > 0 for 'green'
                    else: { $gt: ["$amount", -Infinity] }, // For 'white' (or any other), return all values of 'amount'
                  },
                },
              },
            },
            createdAt: {
              $gte: currentDate,
              $lt: nextDayMidNight,
            },
          },
        },
        {
          $sort: { createdAt: -1 }, // Sort by createdAt in descending order (-1 for descending, 1 for ascending)
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
            aprooved: 1,
            paid: 1,
            paymentType: 1,
            createdBy: 1,
            cancelled: 1,
          },
        },
      ]);

      return NextResponse.json(
        {
          success: true,
          data: {
            connection: connection[0],
            transectionHistory,
          },
          message: "getting data successfull!",
        },
        {
          status: 200,
        }
      );
    }

    // aggregation pipeline for getting all bills data
    const transectionHistory = await BillModel.aggregate([
      {
        $match: {
          sellerNumber: seller,
          customerNumber: customer,
          $expr: {
            $cond: {
              if: { $eq: [color, "red"] }, // If the color is 'red'
              then: { $lt: ["$amount", 0] }, // amount < 0 for 'red'
              else: {
                $cond: {
                  if: { $eq: [color, "green"] }, // If the color is 'green'
                  then: { $gt: ["$amount", 0] }, // amount > 0 for 'green'
                  else: { $gt: ["$amount", -Infinity] }, // For 'white' (or any other), return all values of 'amount'
                },
              },
            },
          },
        },
      },
      {
        $sort: { createdAt: -1 }, // Sort by createdAt in descending order (-1 for descending, 1 for ascending)
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
          aprooved: 1,
          paid: 1,
          paymentType: 1,
          createdBy: 1,
          cancelled: 1,
        },
      },
    ]);

    return NextResponse.json(
      {
        success: true,
        data: {
          connection: connection[0],
          transectionHistory,
        },
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
