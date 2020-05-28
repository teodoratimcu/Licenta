const mongoose = require("mongoose");

const challengeSchema = mongoose.Schema({
  countries: { type: Number, required: true },
  creator: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }
});

module.exports = mongoose.model("Challenge", challengeSchema);
