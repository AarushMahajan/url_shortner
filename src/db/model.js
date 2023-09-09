const Schema = require("mongoose").Schema;
const mongoose = require("mongoose");

const urlSchema = new Schema(
  {
    id: {
      type: String,
      required: true,
    },
    longUrl: {
      type: String,
      required: true,
      trim: true,
    },
    shortUrl: {
      type: String,
      required: true,
    },
  },
  { strict: false, timestamps: true }
);

let getModel = function (modelName, body) {
  switch (modelName) {
    case "url":
      let User = mongoose.model("url", urlSchema);
      return body ? new User(body) : User;
    default:
  }
};

module.exports = {
  getModel,
};
