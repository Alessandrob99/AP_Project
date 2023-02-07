"use strict";
//Importing all the libraries necessary to carry out validation tasks
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
exports.checkAdminEmail = exports.checkUserEmail = exports.checkJwtPayload = exports.verifyAndAuthenticate = exports.checkJWToken = exports.checkHeader = void 0;
require('dotenv').config();
var jwt = require("jsonwebtoken");
var UserDAO_1 = require("../Model/UserDAO");
var MessFactory_1 = require("../Logging_Factory/MessFactory");
var checkHeader = function (req, res, next) {
    var authHeader = req.headers.authorization;
    if (authHeader) {
        next();
    }
    else {
        next(MessFactory_1.MessEnum.NoHeaderError);
    }
};
exports.checkHeader = checkHeader;
var checkJWToken = function (req, res, next) {
    try {
        var bearerHeader = req.headers.authorization;
        if (typeof bearerHeader !== 'undefined') {
            var bearerToken = bearerHeader.split(' ')[1];
            req.token = bearerToken;
            next();
        }
    }
    catch (err) {
        next(MessFactory_1.MessEnum.NoHJWTError);
    }
};
exports.checkJWToken = checkJWToken;
/*
Method aimed at verifying that the token is correct
This operation is carried out using the secret key (in the .env file) used to encode the token
*/
var verifyAndAuthenticate = function (req, res, next) {
    try {
        var decoded = jwt.verify(req.token, process.env.SECR_KEY);
        if (decoded !== null) {
            req.user = decoded;
            next();
        }
    }
    catch (error) {
        next(MessFactory_1.MessEnum.InvalidJWDError);
    }
};
exports.verifyAndAuthenticate = verifyAndAuthenticate;
//Checks is all the information included in the request has the correct form
//and if the user exists in the database, if not a new user is registered
var checkJwtPayload = function (req, res, next) {
    var validator = require("email-validator");
    if ((req.user.role === 1 || req.user.role === 2)
        && (typeof req.user.email === "string") && (validator.validate(req.user.email))) {
        next();
    }
    else {
        next(MessFactory_1.MessEnum.JwtClaimsError);
    }
};
exports.checkJwtPayload = checkJwtPayload;
/*
This method was aimed at checking whether a user existed in the the db or not
If not a new record was created. This controll is done for every user route
So whenever someone is authenticated through a token a this user has never been seen before,
a new user profile is automatically created in the DB.
Edit: I had to remove the Message sent when a user was created because fsr it caused the
CoR to be cut right after that
*/
var checkUserEmail = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var dao, user;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                dao = new UserDAO_1.UserDao();
                return [4 /*yield*/, dao.readUser(req.user.email)];
            case 1:
                user = _a.sent();
                if (!!user) return [3 /*break*/, 3];
                return [4 /*yield*/, dao.createUser(req.user.email)];
            case 2:
                _a.sent();
                next();
                return [3 /*break*/, 4];
            case 3:
                next();
                _a.label = 4;
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.checkUserEmail = checkUserEmail;
var checkAdminEmail = function (req, res, next) {
    //checking if the user has the role of admin (2)
    if (req.user.role !== 2) {
        next(MessFactory_1.MessEnum.UnauthorizedError);
    }
    else {
        next();
    }
};
exports.checkAdminEmail = checkAdminEmail;
