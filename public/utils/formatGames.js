const joinGenres = require("./joinGenres");

/** Maps an array of games to be used in the games list view */
function formatGames(gamesArray) {
  return gamesArray.map((g) => {
    return {
      title: g.title,
      developer: g.developer.name,
      genres: joinGenres(g.genre),
    };
  });
}

module.exports = formatGames;
