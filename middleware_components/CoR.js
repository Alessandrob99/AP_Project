"use strict";
exports.__esModule = true;
exports.checkJWT = void 0;
var JWTValidation = require("./user_validation");
exports.checkJWT = [
    JWTValidation.checkHeader,
    JWTValidation.checkJWToken,
    JWTValidation.verifyAndAuthenticate,
    JWTValidation.checkJwtPayload,
    JWTValidation.checkUserEmail
];
