const _ = require("lodash");
const {USD_TO_EURO_RATE, APP_CURRENCY_TYPE} = require("../config/AppConfig");

/**
 * Init data table
 */
exports.initDataTable = () => {
    window.$(".order-listing").dataTable({
        iDisplayLength: 10,
        retrieve: true,
    });
};

/**
 * Toast Notification
 *
 * @param toast
 * @param type
 * @param error
 * @returns {ToastId | void | never | *|*}
 */
exports.toastNotify = (toast, type, error) => {
    let message = "";
    if (!_.isUndefined(error.data) && !_.isUndefined(error.data.message)) {
        // Success Message
        message = error.data.message;
    } else if (!_.isUndefined(error.response) && !_.isUndefined(error.response.data)) {
        // Error Message
        message = error.response.data.message;
    } else {
        // Error Message
        message = error.message;
    }

    if (type === 'success') {
        return toast.success(message, {
            position: toast.POSITION.BOTTOM_RIGHT
        });
    } else if (type === 'info') {
        return toast.info(message, {
            position: toast.POSITION.BOTTOM_RIGHT
        });
    } else if (type === 'warning') {
        return toast.warn(message, {
            position: toast.POSITION.BOTTOM_RIGHT
        });
    } else if (type === 'error') {
        return toast.error(message, {
            position: toast.POSITION.BOTTOM_RIGHT
        });
    }
};

/**
 * Making title from slug
 *
 * @param slug
 * @returns {*}
 */
function makeTitle(slug) {
    let words = slug.split('-');
    for (let i = 0; i < words.length; i++) {
        let word = words[i];
        words[i] = word.charAt(0).toUpperCase() + word.slice(1);
    }
    return words.join(' ');
}

/**
 * Set page title
 *
 * @param title
 */
exports.setPageTitle = title => {
    if (!_.isEmpty(title)) {
        document.title = title + ' | Yummy Pizza';
    } else {
        let path = window.location.pathname;
        let page = path.split("/").pop();
        document.title = makeTitle(page) + ' | Yummy Pizza';
    }
};

/**
 * Currency Converter
 *
 * @param amount
 * @returns {string}
 */
exports.makeCurrency = (amount) => {
    if (APP_CURRENCY_TYPE === 'euro') {
        let amountCalc = parseFloat(amount) * parseFloat(USD_TO_EURO_RATE);
        return `€${amountCalc.toFixed(2)}`;
    } else {
        let amountCalc = parseFloat(amount);
        return `$${amountCalc.toFixed(2)}`;
    }
};
