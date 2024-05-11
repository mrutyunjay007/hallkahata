import dbConnection from "@/lib/dbConnect";
import ConnectionModel from "@/models/Connection";
import Response, { ResponseServerError } from "@/util/Response";

export async function POST(request: Request) {
  try {
    //db connected
    await dbConnection();

    const { connectionId } = await request.json();

    // update remainder to true
    const remainderNotification = await ConnectionModel.updateOne(
      { _id: connectionId },
      {
        remainder: true,
      }
    );

    if (!remainderNotification.acknowledged) {
      return Response(false, "connection not found!", 404);
    }

    return Response(true, "remainder susessfully send!", 200);
  } catch (error) {
    return ResponseServerError("remainder update failed!");
  }
}
