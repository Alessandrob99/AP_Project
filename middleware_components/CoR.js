"use strict";
exports.__esModule = true;
exports.newTokenBalanceVal = exports.adminJWT = exports.userJWT = void 0;
var JWTValidation = require("./user_validation");
var GameValidation = require("./requestValidation");
exports.userJWT = [
    JWTValidation.checkHeader,
    JWTValidation.checkJWToken,
    JWTValidation.verifyAndAuthenticate,
    JWTValidation.checkJwtPayload,
    JWTValidation.checkUserEmail,
    GameValidation.checkUserTokenBalance,
    //messageLogger
];
exports.adminJWT = [
    JWTValidation.checkHeader,
    JWTValidation.checkJWToken,
    JWTValidation.verifyAndAuthenticate,
    JWTValidation.checkJwtPayload,
    JWTValidation.checkAdminEmail,
    //messageLogger
];
exports.newTokenBalanceVal = [
    GameValidation.checkReqBody,
    GameValidation.checkReqTokenBalance
];
