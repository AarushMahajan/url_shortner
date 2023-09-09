const express = require("express");
const bodyParser = require("body-parser");
const urlRouter = require("./router/router");
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(urlRouter);

module.exports = app;
