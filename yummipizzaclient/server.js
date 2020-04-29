const express = require("express");
const path = require("path");
const cors = require("cors");
const app = express();
require('dotenv').config();

/**
 * Define PORT & HOST
 *
 * @type {string}
 */
const PORT = process.env.PORT;
const HOST = process.env.REACT_APP_HOST;

/**
 * Cross Access
 */
app.use(cors());

/**
 * Run Build Application
 */
if (process.env.REACT_APP_NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "build")));

    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, "build", "index.html"));
    });
} else {
    app.get('/', (req, res) => {
        res.send("Website is running on development mood.<br>" +
            "Please build your website and set environment development to production.");
    });
}

/**
 * Start Application Server
 */
app.listen(PORT, HOST, () => {
    console.log(`Server is running at http://${HOST}:${PORT}`);
});
