const joinGenres = require("./joinGenres");
const formatDate = require("./formatDate");
const formatPrice = require("./formatPrice");

/** Maps an array of instances to be used in the table of instances view */
function formatInstances(instancesArray) {
  return instancesArray.map((i) => {
    return {
      numberInStock: i.numberInStock,
      isAvailable: i.isAvailable ? "Disponível" : "Vendido",
      title: i.product.game.title,
      developer: i.product.game.developer.name,
      genres: joinGenres(i.product.game.genre),
      platform: i.product.platform.name,
      launchDate: formatDate(i.product.launchDate),
      currentPrice: formatPrice(i.product.currentPrice),
    };
  });
}

module.exports = formatInstances;
