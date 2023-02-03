"use strict";
exports.__esModule = true;
exports.messageLogger = void 0;
var MessFactory_1 = require("../Logging_Factory/MessFactory");
var messageLogger = function (mess, req, res, next) {
    var concreteFactory = new MessFactory_1.MessFactory();
    var messageOb = concreteFactory.getMessage(mess);
    var message = messageOb.getMess();
    var status = messageOb.getCode();
    console.log(message);
    res.status(status).json({ Status: status, Description: message });
};
exports.messageLogger = messageLogger;
