"use strict";
exports.__esModule = true;
exports.newGameVal = exports.newTokenBalanceVal = exports.adminCheck = exports.userAccountAndBalanceCheck = exports.JWTCheck = void 0;
var JWTValidation = require("./user_validation");
var RequestValidation = require("./requestValidation");
exports.JWTCheck = [
    JWTValidation.checkHeader,
    JWTValidation.checkJWToken,
    JWTValidation.verifyAndAuthenticate,
    JWTValidation.checkJwtPayload
];
exports.userAccountAndBalanceCheck = [
    JWTValidation.checkUserEmail,
    RequestValidation.checkUserTokenBalance,
];
exports.adminCheck = [
    JWTValidation.checkAdminEmail,
];
exports.newTokenBalanceVal = [
    RequestValidation.checkReqBody,
    RequestValidation.checkReqTokenBalance
];
exports.newGameVal = [
    RequestValidation.checkReqBody,
    RequestValidation.checkReqBodyNewGame,
    RequestValidation.checkAlreadyInGame,
    RequestValidation.checkNewGameBalance
];
