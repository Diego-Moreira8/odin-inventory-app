/** Maps an array of products to be used in the products list view */
function formatProducts(productsArray) {
  return productsArray.map((p) => {
    return {
      title: p.game.title,
      platform: p.platform.name,
      currentPrice: p.price_BRL,
    };
  });
}

module.exports = formatProducts;
