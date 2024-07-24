/** Maps an array of instances to be used in the table of instances view */
function formatInstances(instancesArray) {
  return instancesArray.map((i) => {
    return {
      url: i.url,
      numberInStock: i.numberInStock,
      isAvailable: i.isAvailable ? "Disponível" : "Vendido",
      title: i.product.game.title,
      developer: i.product.game.developer.name,
      genres: i.product.game.allGenres,
      platform: i.product.platform.name,
      launchDate: i.product.launchDateDisplay,
      currentPrice: i.product.price_BRL,
    };
  });
}

module.exports = formatInstances;
