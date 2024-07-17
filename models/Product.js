const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ProductSchema = new Schema({
  game: { type: Schema.Types.ObjectId, ref: "Game", required: true },
  platform: { type: Schema.Types.ObjectId, ref: "Platform", required: true },
  launchDate: { type: Date, required: true },
  currentPrice: { type: Number, required: true },
});

module.exports = mongoose.model("Product", ProductSchema);
