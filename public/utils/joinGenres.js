/**
 * Joins an array of genre objects into a single string with genre names separated by commas.
 *
 * @param {Array} genresArray - An array of objects where each object has a `name` property.
 * @returns {string} A string of genre names separated by commas.
 *
 * @example
 * const genres = [
 *   { name: "Action" },
 *   { name: "Adventure" },
 *   { name: "RPG" }
 * ];
 *
 * joinGenres(genres);
 * // "Action, Adventure, RPG"
 */

function joinGenres(genresArray) {
  return genresArray.reduce((a, c) => a + (a ? ", " : "") + c.name, "");
}

module.exports = joinGenres;
