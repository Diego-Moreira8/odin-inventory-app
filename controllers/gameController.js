const asyncHandler = require("express-async-handler");

const Game = require("../models/Game");

exports.all_games = asyncHandler(async (req, res, next) => {
  const allGames = await Game.find()
    .populate([{ path: "developer" }, { path: "genre" }])
    .exec();

  res.render("games", { allGames: allGames });
});
