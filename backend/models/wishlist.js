const mongoose = require("mongoose");

const wishlistSchema = mongoose.Schema({
  location : {type: String},
  startDate: {type: String},
  endDate: {type: String},
  who: {type: String},
  visited: {type: Boolean},
  creator: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }
});


module.exports = mongoose.model("Wishlist", wishlistSchema);
