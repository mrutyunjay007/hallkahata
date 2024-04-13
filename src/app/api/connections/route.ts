import dbConnection from "@/lib/dbConnect";
import BillModel from "@/models/Bill";
import ConnectionModel from "@/models/Connection";
import Response from "@/util/Response";
import { match } from "assert";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

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
          seller: new mongoose.Types.ObjectId(seller!),
          customer: new mongoose.Types.ObjectId(customer!),
        },
      },
      //look for seller
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
                profilePic: 1,
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
          localField: "customer",
          foreignField: "_id",
          as: "customer",
          pipeline: [
            {
              $project: {
                userName: 1,
                _id: 1,
                profilePic: 1,
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

    if (!connection[0]) {
      return Response(false, "connection not present!", 404);
    }

    // aggregation pipeline for getting all bills data
    const transectionHistory = await BillModel.aggregate([
      {
        $match: {
          seller: new mongoose.Types.ObjectId(seller!),
          customer: new mongoose.Types.ObjectId(customer!),
        },
      },
      //look for seller
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
      //look for cutomer data
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
