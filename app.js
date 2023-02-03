"use strict";
exports.__esModule = true;
var CoR = require("./middleware_components/CoR");
var express = require('express');
require('dotenv').config();
var app = express();
app.get('/', CoR.userJWT, function (req, res) {
    res.send("Bella so rriato");
});
app.get('/admin', CoR.adminJWT, function (req, res) {
    res.send("Bella so rriato pero admin");
});
app.listen(process.env.PORT);
