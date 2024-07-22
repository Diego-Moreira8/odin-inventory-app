const formatPrice = require("./formatPrice");

/** Maps an array of products to be used in the products list view */
function formatProducts(productsArray) {
  return productsArray.map((p) => {
    return {
      title: p.game.title,
      platform: p.platform.name,
      currentPrice: formatPrice(p.currentPrice),
    };
  });
}

module.exports = formatProducts;
