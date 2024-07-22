const asyncHandler = require("express-async-handler");

const Developer = require("../models/Developer");

exports.all_developers = asyncHandler(async (req, res, next) => {
  const allDevelopers = await Developer.find().exec();

  res.render("developers", { allDevelopers: allDevelopers });
});
