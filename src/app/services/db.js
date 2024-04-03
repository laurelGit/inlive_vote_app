import { env } from "@/config/env";
import mongoose, { Mongoose } from "mongoose";

export async function dbConnect() {
  try {
    await mongoose.connect(env.DATABASE_URI);
    console.log("Newly connected");
  } catch (error) {
    console.error("Error connecting to the database:", error);
    throw new Error("Database connection failed");
  }
}

export const disconnect = () => {
  if (!global.mongoose.conn) {
    return;
  }
  global.mongoose.conn = null;
  mongoose.disconnect();
};
