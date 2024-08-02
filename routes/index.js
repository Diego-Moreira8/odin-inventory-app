const express = require("express");
const router = express.Router();

// Require controller modules
const product_instance_controller = require("../controllers/productInstanceController");
const product_controller = require("../controllers/productController");
const game_controller = require("../controllers/gameController");
const developer_controller = require("../controllers/developerController");
const genre_controller = require("../controllers/genreController");
const platform_controller = require("../controllers/platformController");
const { route } = require("express/lib/application");

/* GET home page. */
router.get("/", function (req, res, next) {
  res.redirect("/instancias");
});

/// INSTANCES ROUTES ///

// GET instances (inventory home page)
router.get("/instancias", product_instance_controller.all_instances);

// GET create instance
router.get("/instancia/criar", product_instance_controller.create_get);

// POST create instance
router.post("/instancia/criar", product_instance_controller.create_post);

// GET instance by id
router.get("/instancia/:id", product_instance_controller.instance_details);

/// PRODUCTS ROUTES ///

// GET products
router.get("/produtos", product_controller.all_products);

// GET create product
router.get("/produto/criar", product_controller.create_get);

// POST create product
router.post("/produto/criar", product_controller.create_post);

// GET product by id
router.get("/produto/:id", product_controller.product_details);

/// GAMES ROUTES ///

// GET games
router.get("/jogos", game_controller.all_games);

// GET create game
router.get("/jogo/criar", game_controller.create_get);

// POST create game
router.post("/jogo/criar", game_controller.create_post);

// GET game by id
router.get("/jogo/:id", game_controller.game_details);

/// DEVELOPERS ROUTES ///

// GET developers
router.get("/desenvolvedores", developer_controller.all_developers);

// GET create developer
router.get("/desenvolvedor/criar", developer_controller.create_get);

// POST create developer
router.post("/desenvolvedor/criar", developer_controller.create_post);

// GET developer by id
router.get("/desenvolvedor/:id", developer_controller.developer_page);

// GET update developer
router.get("/desenvolvedor/:id/editar", developer_controller.update_get);

// POST update developer
router.post("/desenvolvedor/:id/editar", developer_controller.update_post);

/// GENRES ROUTES ///

// GET genres
router.get("/generos", genre_controller.all_genres);

// GET create genre
router.get("/genero/criar", genre_controller.create_get);

// POST create genre
router.post("/genero/criar", genre_controller.create_post);

// GET genre by id
router.get("/genero/:id", genre_controller.genre_page);

// GET update genre
router.get("/genero/:id/editar", genre_controller.update_get);

// POST update genre
router.post("/genero/:id/editar", genre_controller.update_post);

/// PLATFORMS ROUTES ///

// GET platforms
router.get("/plataformas", platform_controller.all_platforms);

// GET create platform
router.get("/plataforma/criar", platform_controller.create_get);

// POST create platform
router.post("/plataforma/criar", platform_controller.create_post);

// GET platform by ID
router.get("/plataforma/:id", platform_controller.platform_page);

// GET update platform
router.get("/plataforma/:id/editar", platform_controller.update_get);

// POST update platform
router.post("/plataforma/:id/editar", platform_controller.update_post);

module.exports = router;
