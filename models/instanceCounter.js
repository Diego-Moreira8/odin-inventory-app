const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const CounterSchema = new Schema({
  count: { type: Number, default: 1 },
});

module.exports = mongoose.model("InstanceCounter", CounterSchema);
