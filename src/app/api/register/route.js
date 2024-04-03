import { dbConnect, disconnect } from "@/app/services/db";
import { NextResponse } from "next/server";
import { register } from "@/app/services/lib";
import { model } from "mongoose";
// import Code from "@/app/model/code";
import { Code, CodeSchema } from "@/app/model/code";

export async function POST(request) {
  await dbConnect();
  // const username = Math.random().toString(36).substring(2, 10);
  // const date = Date.now();
  // CodeSchema.add({ groupe: [{ type: String }] });
  // model("Code").schema.add({ groupe: { type: String } });
  // const groupe = "G3";
  // const code = await Code.create({
  //   username,
  //   date,
  //   groupe,
  // });
  // await Code.updateOne({ _id: code._id }, { $set: { groupe: groupe } });
  const code = await register();
  return NextResponse.json(
    { messsage: `User ${code.username} ${code.groupe}` },
    { status: 201 }
  );
}
