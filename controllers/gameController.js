const asyncHandler = require("express-async-handler");

const Game = require("../models/Game");
const Developer = require("../models/Developer");
const Genre = require("../models/Genre");
const { body, validationResult } = require("express-validator");

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
    title: "",
    selectedDev: "",
    checkedGenres: [],
    description: "",
    errors: null,
  });
});

exports.create_post = [
  (req, res, next) => {
    if (!Array.isArray(req.body.genre)) {
      req.body.genre =
        typeof req.body.genre === "undefined" ? [] : [req.body.genre];
    }
    next();
  },

  body("title", "O título não pode estar vazio.")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body("developer", "Um dos desenvolvedores precisa ser selecionado.")
    .isLength({ min: 1 })
    .escape(),
  body("genre.*").escape(),
  body("genre", "Escolha pelo menos 1 ou até 3 gêneros.").custom((array) => {
    return array.length >= 1 && array.length <= 3;
  }),
  body("description", "A descrição não pode estar vazia.")
    .isLength({ min: 1 })
    .escape(),

  asyncHandler(async (req, res, next) => {
    const [allDevelopers, allGenres] = await Promise.all([
      await Developer.find().exec(),
      await Genre.find().exec(),
    ]);

    const errors = validationResult(req);
    const newGame = new Game({
      title: req.body.title,
      developer: req.body.developer,
      genre: req.body.genre,
      description: req.body.description,
    });

    if (!errors.isEmpty()) {
      res.render("createGame", {
        allDevelopers: allDevelopers,
        allGenres: allGenres,
        title: req.body.title,
        selectedDev: req.body.developer,
        checkedGenres: req.body.genre,
        description: req.body.description,
        errors: errors.array(),
      });
    } else {
      // Developer cannot have duplicated titles
      const gameExists = await Game.findOne({
        title: req.body.title,
        developer: req.body.developer,
      }).exec();

      if (gameExists) {
        res.render("createGame", {
          allDevelopers: allDevelopers,
          allGenres: allGenres,
          title: req.body.title,
          selectedDev: req.body.developer,
          checkedGenres: req.body.genre,
          description: req.body.description,
          errors: [
            ...errors.array(),
            {
              msg: "Um desenvolvedor não pode ter títulos duplicados.",
            },
          ],
        });
      } else {
        await newGame.save();
        res.redirect(newGame.url);
      }
    }
  }),
];
