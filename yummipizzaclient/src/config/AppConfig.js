/**
 * API Server URL
 *
 * @type {string}
 */
exports.API_URL = process.env.REACT_APP_API_URL || "";

/**
 * Delivery Expense
 *
 * @type {*|string}
 */
exports.DELIVERY_EXPENSE = process.env.REACT_APP_DELIVERY_EXPENSE || 0.50;

/**
 * Application Currency
 *
 * @type {string}
 */
exports.APP_CURRENCY_TYPE = localStorage.getItem('APP_CURRENCY_TYPE') || 'usd';

/**
 * Delivery Expense
 *
 * @type {*|string}
 */
exports.USD_TO_EURO_RATE = process.env.REACT_APP_USD_TO_EURO_RATE || 0.92;
