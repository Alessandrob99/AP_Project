"use strict";
exports.__esModule = true;
exports.adminJWT = exports.userJWT = void 0;
var JWTValidation = require("./user_validation");
exports.userJWT = [
    JWTValidation.checkHeader,
    JWTValidation.checkJWToken,
    JWTValidation.verifyAndAuthenticate,
    JWTValidation.checkJwtPayload,
    JWTValidation.checkUserEmail
];
exports.adminJWT = [
    JWTValidation.checkHeader,
    JWTValidation.checkJWToken,
    JWTValidation.verifyAndAuthenticate,
    JWTValidation.checkJwtPayload,
    JWTValidation.checkAdminEmail
];
