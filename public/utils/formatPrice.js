/**
 * Formats a number as a price in Brazilian Real (BRL) with two decimal places,
 * using a comma as the decimal separator.
 *
 * @param {number} value - The numeric value to be formatted.
 * @returns {string} The formatted price string in the format "R$ xx,xx".
 *
 * @example
 * formatPrice(1234.56);
 * //"R$ 1234,56"
 */

function formatPrice(value) {
  return `R$ ${value.toFixed(2)}`.replace(".", ",");
}

module.exports = formatPrice;
