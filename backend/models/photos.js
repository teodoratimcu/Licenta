const mongoose = require("mongoose");

const photosSchema = mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  imagePath: { type: String, required: true },
  creator: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }
});

module.exports = mongoose.model("Photos", photosSchema);
