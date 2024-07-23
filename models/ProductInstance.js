const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ProductInstanceSchema = new Schema({
  numberInStock: { type: Number, required: true },
  isAvailable: { type: Boolean, required: true },
  product: { type: Schema.Types.ObjectId, ref: "Product", required: true },
});

ProductInstanceSchema.virtual("url").get(function () {
  return `/instancia/${this._id}`;
});

module.exports = mongoose.model("ProductInstance", ProductInstanceSchema);
