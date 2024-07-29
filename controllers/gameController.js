const asyncHandler = require("express-async-handler");

const Game = require("../models/Game");
const Developer = require("../models/Developer");
const Genre = require("../models/Genre");

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

exports.create_get = asyncHandler(async (req, res, next) => {
  const [allDevelopers, allGenres] = await Promise.all([
    await Developer.find().exec(),
    await Genre.find().exec(),
  ]);

  res.render("createGame", {
    allDevelopers: allDevelopers,
    allGenres: allGenres,
  });
});
