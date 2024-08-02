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
    await Game.find({ genre: req.params.id }).populate("genre").exec(),
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

exports.update_get = asyncHandler(async (req, res, next) => {
  const genre = await Genre.findById(req.params.id);

  if (genre === null) {
    const error = new Error("Gênero não encontrado.");
    error.status = 404;
    return next(error);
  }

  res.render("createSimpleObject", {
    ...GENRE_CREATION_PAGE_PARAMS,
    title: "Editar Gênero",
    value: genre.name,
  });
});

exports.update_post = [
  body("name", "Este campo não pode ficar vazio.").trim().notEmpty().escape(),

  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      res.render("createSimpleObject", {
        ...GENRE_CREATION_PAGE_PARAMS,
        errors: errors.array(),
      });

      return;
    }

    const genreExists = await Genre.findOne({
      name: req.body.name,
    }).exec();

    if (genreExists) {
      res.render("createSimpleObject", {
        ...GENRE_CREATION_PAGE_PARAMS,
        title: "Editar Gênero",
        value: req.body.name,
        errors: [
          ...errors.array(),
          { msg: `O gênero ${req.body.name} já existe.` },
        ],
      });

      return;
    }

    const updatedGenre = await Genre.findByIdAndUpdate(req.params.id, {
      name: req.body.name,
    });

    await updatedGenre.save();
    res.redirect(updatedGenre.url);
  }),
];
