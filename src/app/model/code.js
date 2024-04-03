import { Schema, models, model } from "mongoose";

const CodeSchema = new Schema({
  username: {
    type: String,
    unique: true,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
    required: true,
  },
});
const Code = models.Code || model("Code", CodeSchema);
module.exports = { Code, CodeSchema };
