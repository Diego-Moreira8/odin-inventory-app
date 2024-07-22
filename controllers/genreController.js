const asyncHandler = require("express-async-handler");

const Genre = require("../models/Genre");

exports.all_genres = asyncHandler(async (req, res, next) => {
  const allGenres = await Genre.find().exec();

  res.render("genres", { allGenres: allGenres });
});
