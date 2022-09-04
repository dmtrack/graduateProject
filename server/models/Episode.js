const { Schema, model } = require("mongoose");

const schema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
      brief: {
          type: String,
          required: true,
      },
    date: {
      type: String,
      required: true,
    },
    integrators: {
      type: Array,
      required: true,
    },
    youtubeURL: {
      type: String,
      required: true,
    },
    vkURL: {
      type: String,
      required: true,
    },
    timecodes: {
      type: String,
      required: true,
    },
    image: { type: String },
  },
  {
    timestamps: true,
  }
);

module.exports = model("Episode", schema);
