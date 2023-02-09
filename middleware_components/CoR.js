"use strict";
exports.__esModule = true;
exports.moveCheck = exports.newGameVal = exports.newTokenBalanceVal = exports.adminCheck = exports.userAccountAndBalanceCheck = exports.JWTCheck = void 0;
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
    RequestValidation.checkReqTokenBalance
];
exports.newGameVal = [
    RequestValidation.checkReqBodyNewGame,
    RequestValidation.checkUserEmailOpponent,
    RequestValidation.checkGridDimension,
    RequestValidation.checkUsersAlreadyInGame,
    RequestValidation.checkNewGameBalance
];
exports.moveCheck = [
    RequestValidation.checkInGameAndTurn,
    RequestValidation.checkReqMove,
    RequestValidation.checkGridLimits,
    RequestValidation.checkCellFree,
    RequestValidation.checkMoveReachability
    // limiti mappa
    //Gameover?
];
