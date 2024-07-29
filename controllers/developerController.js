const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");

const Developer = require("../models/Developer");
const Game = require("../models/Game");

const DEVELOPER_CREATION_PAGE_PARAMS = {
  title: "Adicionar desenvolvedor",
  label: "Nome do desenvolvedor: *",
  placeholder: "Electronic Arts",
  errors: null,
};

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

exports.create_get = asyncHandler(async (req, res, next) => {
  res.render("createSimpleObject", DEVELOPER_CREATION_PAGE_PARAMS);
});

exports.create_post = [
  body("name", "Este campo não pode ficar vazio.").trim().notEmpty().escape(),

  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);
    const newDeveloper = new Developer({ name: req.body.name });

    if (!errors.isEmpty()) {
      res.render("createSimpleObject", {
        ...DEVELOPER_CREATION_PAGE_PARAMS,
        errors: errors.array(),
      });
      return;
    } else {
      const developerExists = await Developer.findOne({
        name: req.body.name,
      }).exec();

      if (developerExists) {
        res.render("createSimpleObject", {
          ...DEVELOPER_CREATION_PAGE_PARAMS,
          errors: [
            ...errors.array(),
            { msg: `O desenvolvedor ${req.body.name} já existe.` },
          ],
        });
      } else {
        await newDeveloper.save();
        res.redirect(newDeveloper.url);
      }
    }
  }),
];
