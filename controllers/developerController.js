const asyncHandler = require("express-async-handler");

const Developer = require("../models/Developer");
const Game = require("../models/Game");

exports.all_developers = asyncHandler(async (req, res, next) => {
  const allDevelopers = await Developer.find().exec();

  res.render("developers", { allDevelopers: allDevelopers });
});

exports.developer_page = asyncHandler(async (req, res, next) => {
  const [developer, allGames] = await Promise.all([
    await Developer.findById(req.params.id).exec(),
    await Game.find({ developer: req.params.id }).populate("genre").exec(),
  ]);

  res.render("developerPage", { developer: developer, allGames: allGames });
});
