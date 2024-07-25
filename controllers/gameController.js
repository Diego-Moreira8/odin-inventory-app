const asyncHandler = require("express-async-handler");

const Game = require("../models/Game");

exports.all_games = asyncHandler(async (req, res, next) => {
  const allGames = await Game.find()
    .populate([{ path: "developer" }, { path: "genre" }])
    .exec();

  res.render("games", { allGames: allGames });
});

exports.game_details = asyncHandler(async (req, res, next) => {
  const game = await Game.findById(req.params.id)
    .populate([{ path: "developer" }, { path: "genre" }])
    .exec();

  res.render("gameDetails", { game: game });
});
