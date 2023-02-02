"use strict";
exports.__esModule = true;
var CoR = require("./middleware_components/CoR");
var express = require('express');
require('dotenv').config();
var app = express();
app.get('/', CoR.userJWT, function (req, res) {
    res.send("Hello world, im " + req.user.email);
});
app.get('/admin', CoR.adminJWT, function (req, res) {
    res.send("Hello Lord commander " + req.user.email);
});
app.listen(process.env.PORT);
