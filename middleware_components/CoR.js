"use strict";
exports.__esModule = true;
exports.adminJWT = exports.userJWT = void 0;
var JWTValidation = require("./user_validation");
var MessLog_1 = require("./MessLog");
exports.userJWT = [
    JWTValidation.checkHeader,
    JWTValidation.checkJWToken,
    JWTValidation.verifyAndAuthenticate,
    JWTValidation.checkJwtPayload,
    JWTValidation.checkUserEmail,
    MessLog_1.messageLogger
];
exports.adminJWT = [
    JWTValidation.checkHeader,
    JWTValidation.checkJWToken,
    JWTValidation.verifyAndAuthenticate,
    JWTValidation.checkJwtPayload,
    JWTValidation.checkAdminEmail,
    MessLog_1.messageLogger
];
