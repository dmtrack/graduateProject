const { Schema, model } = require("mongoose");

const schema = new Schema(
  {
    name: { type: String },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    city: { type: Schema.Types.ObjectId, ref: "City" },
    image: String,
    segment: [{ type: Schema.Types.ObjectId, ref: "Segment" }],
    comments: Number,
    sex: { type: String, enum: ["male", "female"] },
  },
  { timestamps: true }
);

module.exports = model("User", schema);
