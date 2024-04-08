import mongoose from "mongoose";

interface IConnection {
  isConnected?: number;
}

//connetion checker
const connerction: IConnection = {};

export default async function dbConnection() {
  // check db connected or not
  if (connerction.isConnected) {
    console.log("db already connected!");
    return;
  }

  try {
    //connect db if we don't have any connection
    const db = await mongoose.connect(
      `${process.env.MONGO_CONNECTION_STRING}` || ""
    );

    //set connectoion established
    connerction.isConnected = db.connections[0].readyState;

    console.log("db connected successfully!");
  } catch (error) {
    console.log("db connection failed!", error);
    process.exit(1);
  }
}
