const asyncHandler = require("express-async-handler");

const formatGames = require("../public/utils/formatGames");

const Game = require("../models/Game");

exports.all_games = asyncHandler(async (req, res, next) => {
  const allGames = await Game.find()
    .populate([{ path: "developer" }, { path: "genre" }])
    .exec();

  res.render("games", { allGames: formatGames(allGames) });
});
