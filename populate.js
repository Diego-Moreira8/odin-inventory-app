#! /usr/bin/env node

require("dotenv").config();

const ProductInstance = require("./models/ProductInstance");
const Product = require("./models/Product");
const Game = require("./models/Game");
const Developer = require("./models/Developer");
const Genre = require("./models/Genre");
const Platform = require("./models/Platform");

const productInstances = [];
const products = [];
const games = [];
const developers = [];
const genres = [];
const platforms = [];

const mongoose = require("mongoose");
mongoose.set("strictQuery", false);

const mongoDB = process.env.MONGODB_URI;

main().catch((err) => console.log(err));

async function main() {
  console.log("Debug: About to connect");
  await mongoose.connect(mongoDB);

  console.log("Debug: Should be connected?");

  await createPlatforms();
  await createGenres();
  await createDevelopers();
  await createGames();
  await createProducts();
  await createProductInstances();

  console.log("Debug: Closing mongoose");
  mongoose.connection.close();
}

async function platformCreate(index, name) {
  const platform = new Platform({ name: name });
  await platform.save();
  platforms[index] = platform;
  console.log(`Added platform: ${name}`);
}

async function genreCreate(index, name) {
  const genre = new Genre({ name: name });
  await genre.save();
  genres[index] = genre;
  console.log(`Added genre: ${name}`);
}

async function developerCreate(index, name) {
  const developer = new Developer({ name: name });
  await developer.save();
  developers[index] = developer;
  console.log(`Added developer: ${name}`);
}

async function gameCreate(index, title, developer, genre, description) {
  const game = new Game({
    title: title,
    developer: developer,
    genre: genre,
    description: description,
  });
  await game.save();
  games[index] = game;
  console.log(`Added game: ${title}`);
}

async function productCreate(index, game, platform, launchDate, currentPrice) {
  const product = new Product({
    game: game,
    platform: platform,
    launchDate: launchDate,
    currentPrice: currentPrice,
  });
  await product.save();
  products[index] = product;
  console.log(`Added product: ${game.title} - ${platform.name}`);
}

async function productInstanceCreate(
  index,
  numberInStock,
  isAvailable,
  product
) {
  const productInstance = new ProductInstance({
    numberInStock: numberInStock,
    isAvailable: isAvailable,
    product: product,
  });
  await productInstance.save();
  productInstances[index] = productInstance;
  console.log(`Added productInstance: ${numberInStock}`);
}

async function createProductInstances() {
  console.log("Adding ProductInstances");
  await Promise.all([productInstanceCreate(0, 1, true, products[0])]);
}

async function createProducts() {
  console.log("Adding Products");
  await Promise.all([
    productCreate(0, games[0], platforms[0], new Date("2015-05-18"), 25),
  ]);
}

async function createGames() {
  console.log("Adding Games");
  await Promise.all([
    gameCreate(
      0,
      "The Wicher 3: Wild Hunt",
      developers[0],
      [genres[0], genres[1], genres[2]],
      "Você é Geralt de Rívia, mercenário matador de monstros. O lugar é um continente devastado pela guerra e infestado de monstros que você pode explorar à vontade. Seu contrato atual? Encontrar Ciri, a Criança da Profecia — uma arma viva que pode alterar a forma do mundo."
    ),
  ]);
}

async function createDevelopers() {
  console.log("Adding Developers");
  await Promise.all([developerCreate(0, "CD Projekt RED")]);
}

async function createGenres() {
  console.log("Adding Genres");
  await Promise.all([
    genreCreate(0, "RPG"),
    genreCreate(1, "Fantasia"),
    genreCreate(2, "Aventura"),
  ]);
}

async function createPlatforms() {
  console.log("Adding Platforms");
  await Promise.all([platformCreate(0, "PC")]);
}
