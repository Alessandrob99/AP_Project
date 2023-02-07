"use strict";
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
exports.checkInGameAndTurn = exports.checkGridDimension = exports.checkUserInGame = exports.checkUsersAlreadyInGame = exports.checkReqTokenBalance = exports.checkReqBodyNewGame = exports.checkNewGameBalance = exports.checkUserEmailOpponent = exports.checkUserTokenBalance = void 0;
var UserDAO_1 = require("../Model/UserDAO");
var MessFactory_1 = require("../Logging_Factory/MessFactory");
var GameDAO_1 = require("../Model/GameDAO");
//Checks whether the user has enought credits to operate or not
var checkUserTokenBalance = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var dao, user;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                dao = new UserDAO_1.UserDao();
                return [4 /*yield*/, dao.readUser(req.user.email)];
            case 1:
                user = _a.sent();
                if (user.token_balance <= 0.0) {
                    next(MessFactory_1.MessEnum.UnauthorizedError);
                }
                else {
                    next();
                }
                return [2 /*return*/];
        }
    });
}); };
exports.checkUserTokenBalance = checkUserTokenBalance;
//Checks if the given opponent's email matches a record in the users table
var checkUserEmailOpponent = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var dao, user;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                dao = new UserDAO_1.UserDao();
                return [4 /*yield*/, dao.readUser(req.body.opponent)];
            case 1:
                user = _a.sent();
                if (!user) {
                    next(MessFactory_1.MessEnum.UserNotFound);
                }
                else {
                    next();
                }
                return [2 /*return*/];
        }
    });
}); };
exports.checkUserEmailOpponent = checkUserEmailOpponent;
//Checks if the user has enough tokens to start a new game
var checkNewGameBalance = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var dao, user;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                dao = new UserDAO_1.UserDao();
                return [4 /*yield*/, dao.readUser(req.user.email)];
            case 1:
                user = _a.sent();
                if (user.token_balance < 0.35) {
                    next(MessFactory_1.MessEnum.NotEnoughTokens);
                }
                else {
                    next();
                }
                return [2 /*return*/];
        }
    });
}); };
exports.checkNewGameBalance = checkNewGameBalance;
/*
Deleted because if we put the json format controll check at the beginning through the
'use' express method this trigger is never activated. This is due to the fact that
if we don't have a req body, the format check (at the beginning of app.ts)
triggers the error anyways...

export const checkReqBody = async (req: any, res: any, next: any) => {
    
    const postBody = req.body;
    if(Object.keys(req.body).length === 0) {
        next(MessEnum.NoBodyError);
    }else{
        next();
    }
    
};

*/
//Checks the correct type and format of the information contained in the "/game" route request
var checkReqBodyNewGame = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var validator;
    return __generator(this, function (_a) {
        validator = require("email-validator");
        if ((typeof req.body.opponent === "string")
            && (validator.validate(req.body.opponent)
                && (typeof req.body.dimension === 'number'))) {
            if (req.body.opponent === req.user.email) {
                next(MessFactory_1.MessEnum.CantPlayAgainstUrself);
            }
            else {
                next();
            }
        }
        else {
            next(MessFactory_1.MessEnum.BadlyFormattedBody);
        }
        return [2 /*return*/];
    });
}); };
exports.checkReqBodyNewGame = checkReqBodyNewGame;
//Checks if the "new token balance" request as a properly formatted body
var checkReqTokenBalance = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var validator;
    return __generator(this, function (_a) {
        validator = require("email-validator");
        if ((typeof req.body.email === "string")
            && (validator.validate(req.body.email)
                && (typeof req.body.token === 'number'))) {
            next();
        }
        else {
            next(MessFactory_1.MessEnum.BadlyFormattedBody);
        }
        return [2 /*return*/];
    });
}); };
exports.checkReqTokenBalance = checkReqTokenBalance;
//Checks if at least one of the the users is already in game
var checkUsersAlreadyInGame = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var gameDao, foundGame;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                gameDao = new GameDAO_1.GameDao();
                return [4 /*yield*/, gameDao.checkUserGame(req.user.email)];
            case 1:
                foundGame = _a.sent();
                if (!foundGame) return [3 /*break*/, 2];
                next(MessFactory_1.MessEnum.CreatorAlreadyInGame);
                return [3 /*break*/, 4];
            case 2: return [4 /*yield*/, gameDao.checkUserGame(req.body.opponent)];
            case 3:
                foundGame = _a.sent();
                if (foundGame) {
                    next(MessFactory_1.MessEnum.OpponentAlreadyInGame);
                }
                else {
                    next();
                }
                _a.label = 4;
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.checkUsersAlreadyInGame = checkUsersAlreadyInGame;
//Checks if the user is playing in a given game (by id)
var checkUserInGame = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var gameDao, foundGame;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                gameDao = new GameDAO_1.GameDao();
                return [4 /*yield*/, gameDao.readGame(req.params.id)];
            case 1:
                foundGame = _a.sent();
                if (foundGame) {
                    if ((foundGame.creator === req.user.email) || (foundGame.opponent === req.user.email)) {
                        if (foundGame.state === "started") {
                            req.game = foundGame;
                            next();
                        }
                        else {
                            next(MessFactory_1.MessEnum.GameTerminated);
                        }
                    }
                    else {
                        next(MessFactory_1.MessEnum.UnauthorizedError);
                    }
                }
                else {
                    next(MessFactory_1.MessEnum.GameNotFound);
                }
                return [2 /*return*/];
        }
    });
}); };
exports.checkUserInGame = checkUserInGame;
//Checks if the given grid dimension is valid
var checkGridDimension = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        if (req.body.dimension < 5) {
            next(MessFactory_1.MessEnum.NotValidDimension);
        }
        else {
            next();
        }
        return [2 /*return*/];
    });
}); };
exports.checkGridDimension = checkGridDimension;
//Checks if the user is in game and if so if it's his turn
var checkInGameAndTurn = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var gameDao, foundGame;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                gameDao = new GameDAO_1.GameDao();
                return [4 /*yield*/, gameDao.checkUserGame(req.user.email)];
            case 1:
                foundGame = _a.sent();
                req.game = foundGame;
                if (foundGame) {
                    if (foundGame.turn == req.user.email) {
                        next();
                    }
                    else {
                        next(MessFactory_1.MessEnum.NotYourTurn);
                    }
                }
                else {
                    next(MessFactory_1.MessEnum.NotInGame);
                }
                return [2 /*return*/];
        }
    });
}); };
exports.checkInGameAndTurn = checkInGameAndTurn;
