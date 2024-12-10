import dbConnection from "@/lib/dbConnect";
import ConnectionModel from "@/models/Connection";
import { searchResult } from "@/schema/searchSchema";
import Response, { ResponseServerError } from "@/util/Response";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    await dbConnection();

    const url = new URL(request.url);
    const customer = url.searchParams.get("customer") as string;
    const seller = url.searchParams.get("seller") as string;
    const userName = url.searchParams.get("name") as string;
    const number = url.searchParams.get("number") as string;

    const limit = parseInt(url.searchParams.get("limit") as string);
    const page = parseInt(url.searchParams.get("page") as string);

    const skip = (page - 1) * limit;

    if (customer.length > 0) {
      const searchResult = await ConnectionModel.aggregate([
        {
          $match: {
            customerNumber: customer!,

            $expr: {
              $cond: {
                if: { $gt: [userName.length, 0] },
                then: {
                  $regexMatch: {
                    input: "$sellerName",
                    regex: userName,
                    options: "i",
                  },
                },
                else: {
                  $regexMatch: { input: "$sellerNumber", regex: "^" + number },
                },
              },
            },
          },
        },
        {
          $skip: skip,
        },
        {
          $limit: limit,
        },
        {
          $project: {
            _id: 1,
            userName: "$sellerName",
            phoneNumber: "$sellerNumber",
            amount: 1,
            userType: "seller",
          },
        },
      ]);

      if (searchResult.length === 0) {
        return Response(false, "No data found with this customer", 404);
      }

      return NextResponse.json(
        { success: true, data: searchResult },
        { status: 200 }
      );
    }

    const searchResult = await ConnectionModel.aggregate([
      {
        $match: {
          sellerNumber: seller!,

          $expr: {
            $cond: {
              if: { $gt: [userName.length, 0] },
              then: {
                $regexMatch: {
                  input: "$customerName",
                  regex: userName,
                  options: "i",
                },
              },
              else: {
                $regexMatch: { input: "$customerNumber", regex: "^" + number },
              },
            },
          },
        },
      },
      {
        $project: {
          _id: 1,
          userName: "$customerName",
          phoneNumber: "$customerNumber",
          amount: 1,
          userType: "customer",
        },
      },
    ]);

    if (searchResult.length === 0) {
      return Response(false, "No data found with this seller", 404);
    }

    return NextResponse.json(
      { success: true, data: searchResult },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return ResponseServerError(" search result retrieval failed!");
  }
}
