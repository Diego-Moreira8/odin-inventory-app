const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");

const Genre = require("../models/Genre");
const Game = require("../models/Game");

const GENRE_CREATION_PAGE_PARAMS = {
  title: "Adicionar gênero",
  label: "Nome do gênero: *",
  placeholder: "Estratégia",
  errors: null,
};

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

exports.create_get = asyncHandler(async (req, res, next) => {
  res.render("createSimpleObject", GENRE_CREATION_PAGE_PARAMS);
});

exports.create_post = [
  body("name", "Este campo não pode ficar vazio.").trim().notEmpty().escape(),

  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);
    const newGenre = new Genre({ name: req.body.name });

    if (!errors.isEmpty()) {
    } else {
      const genreExists = await Genre.findOne({
        name: req.body.name,
      }).exec();

      if (genreExists) {
        res.render("createSimpleObject", {
          ...GENRE_CREATION_PAGE_PARAMS,
          errors: [
            ...errors.array(),
            { msg: `O gênero ${req.body.name} já existe.` },
          ],
        });
      } else {
        await newGenre.save();
        res.redirect(newGenre.url);
      }
    }
  }),
];
