import dbConnection from "@/lib/dbConnect";
import BillModel from "@/models/Bill";
import Response, { ResponseServerError } from "@/util/Response";

export async function POST(request: Request) {
  try {
    //db connected
    await dbConnection();

    const { billId } = await request.json();

    // update bill remainder to true
    const bill = await BillModel.updateOne(
      { _id: billId },
      {
        remainder: true,
      }
    );

    if (!bill.acknowledged) {
      return Response(false, "bill not found!", 404);
    }

    return Response(true, "bill updated successfully!", 200);
  } catch (error) {
    return ResponseServerError("bill update failed!");
  }
}
