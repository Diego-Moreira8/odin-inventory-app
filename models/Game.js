const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const GameSchema = new Schema({
  title: { type: String, required: true },
  developer: {
    type: mongoose.Types.ObjectId,
    ref: "Developer",
    required: true,
  },
  genre: [{ type: mongoose.Types.ObjectId, ref: "Genre", required: true }],
  description: { type: String, required: true },
});

GameSchema.virtual("url").get(function () {
  return `/jogo/${this._id}`;
});

GameSchema.virtual("allGenres").get(function () {
  return this.genre.reduce((a, c) => a + (a ? ", " : "") + c.name, "");
});

module.exports = mongoose.model("Game", GameSchema);
