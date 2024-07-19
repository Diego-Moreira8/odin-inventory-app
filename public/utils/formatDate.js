/**
 * Formats a date to the "pt-BR" (Brazilian) locale in the UTC timezone.
 *
 * @param {Date} date - The date to be formatted.
 * @returns {string} The formatted date string in "dd/mm/yyyy" format.
 */

function formatDate(date) {
  return date.toLocaleDateString("pt-BR", {
    timeZone: "UTC",
  });
}

module.exports = formatDate;
