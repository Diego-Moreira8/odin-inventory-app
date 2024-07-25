const asyncHandler = require("express-async-handler");

const Genre = require("../models/Genre");
const Game = require("../models/Game");

exports.all_genres = asyncHandler(async (req, res, next) => {
  const allGenres = await Genre.find().exec();

  res.render("genres", { allGenres: allGenres });
});

exports.genre_page = asyncHandler(async (req, res, next) => {
  const [genre, allGames] = await Promise.all([
    await Genre.findById(req.params.id).exec(),
    await Game.find({ genre: req.params.id }).populate("developer").exec(),
  ]);

  res.render("genresPage", { genre: genre, allGames, allGames });
});
