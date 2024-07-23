const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ProductSchema = new Schema({
  game: { type: Schema.Types.ObjectId, ref: "Game", required: true },
  platform: { type: Schema.Types.ObjectId, ref: "Platform", required: true },
  launchDate: { type: Date, required: true },
  currentPrice: { type: Number, required: true },
});

ProductSchema.virtual("url").get(function () {
  return `/produto/${this._id}`;
});

module.exports = mongoose.model("Product", ProductSchema);
