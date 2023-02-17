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
exports.checkMoveReachability = exports.checkCellFree = exports.checkGridLimits = exports.checkReqMove = exports.checkInGameAndTurn = exports.checkUserEmailNoCreate = exports.checkGridDimension = exports.checkUserInGame = exports.checkUsersAlreadyInGame = exports.checkReqTokenBalance = exports.checkReqBodyNewGame = exports.checkNewGameBalance = exports.checkUserEmailOpponent = exports.checkUserTokenBalance = void 0;
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
                    next(MessFactory_1.MessEnum.UnauthorizedError);
                }
                else {
                    next();
                }
                return [2 /*return*/];
        }
    });
}); };
exports.checkNewGameBalance = checkNewGameBalance;
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
var checkUserEmailNoCreate = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var userDao, foundUser;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                userDao = new UserDAO_1.UserDao();
                return [4 /*yield*/, userDao.readUser(req.params.email)];
            case 1:
                foundUser = _a.sent();
                if (foundUser) {
                    next();
                }
                else {
                    next(MessFactory_1.MessEnum.UserNotFound);
                }
                return [2 /*return*/];
        }
    });
}); };
exports.checkUserEmailNoCreate = checkUserEmailNoCreate;
//MOVES VALIDATIONS--------------------------------------
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
                if (foundGame) {
                    if (foundGame.turn == req.user.email) {
                        req.game = foundGame;
                        req.grid = JSON.parse(foundGame.positions);
                        req.game.dimension = req.grid.whites.length;
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
//Used to divide the pawn name string (es. "w" + "5")
function split(str, index) {
    var result = [str.slice(0, index), str.slice(index)];
    return result;
}
//Checks if the "move" request body is correctly formatted
var checkReqMove = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, wb, num, _b, wb, num, m;
    return __generator(this, function (_c) {
        ((typeof req.body.pawn === "string") && (req.body.pawn.length >= 2)) ? {} : next(MessFactory_1.MessEnum.BadlyFormattedBody);
        //Check that specified pawn exists and it can be moved by the user
        if (req.game.creator === req.user.email) {
            _a = split(req.body.pawn, 1), wb = _a[0], num = _a[1];
            //The second part of the string is not a number
            (isNaN(Number(num))) ? next(MessFactory_1.MessEnum.BadlyFormattedBody) : {};
            //This number is referring to an existing pawn
            (parseInt(num) > req.game.dimension) ? next(MessFactory_1.MessEnum.BadlyFormattedBody) : {};
            //First part of the string is either "w" or "b"
            if (wb !== "w") {
                //If "b" the creator cant move it (he can only move white pawns)
                (wb === "b") ? next(MessFactory_1.MessEnum.InvalidMove) : next(MessFactory_1.MessEnum.BadlyFormattedBody);
            }
        }
        if (req.game.opponent === req.user.email) {
            _b = split(req.body.pawn, 1), wb = _b[0], num = _b[1];
            //The second part of the string is a number
            (isNaN(Number(num))) ? next(MessFactory_1.MessEnum.BadlyFormattedBody) : {};
            //This number is referring to an existing pawn
            (parseInt(num) > req.game.dimension) ? next(MessFactory_1.MessEnum.BadlyFormattedBody) : {};
            //First part of the string is either "w" or "b"
            if (wb !== "b") {
                //If "w" the opponent cant move it (he can only move black pawns)
                (wb === "w") ? next(MessFactory_1.MessEnum.InvalidMove) : next(MessFactory_1.MessEnum.BadlyFormattedBody);
            }
        }
        for (m = 0; m < req.body.moves.length; m++) {
            if ((typeof req.body.moves[m].x !== "number") || (typeof req.body.moves[m].y !== 'number')) {
                next(MessFactory_1.MessEnum.BadlyFormattedBody);
            }
        }
        next();
        return [2 /*return*/];
    });
}); };
exports.checkReqMove = checkReqMove;
//Makes sure that the move doesn't make the pawn fall out of the grid
var checkGridLimits = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var m;
    return __generator(this, function (_a) {
        for (m = 0; m < req.body.moves.length; m++) {
            if ((parseInt(req.body.moves[m].x) < 1) || (parseInt(req.body.moves[m].y) < 1)
                || (parseInt(req.body.moves[m].x) > req.game.dimension) || (parseInt(req.body.moves[m].y) > req.game.dimension)) {
                next(MessFactory_1.MessEnum.BadlyFormattedBody);
            }
        }
        next();
        return [2 /*return*/];
    });
}); };
exports.checkGridLimits = checkGridLimits;
//Makes sure that the destination cell is free
//This check includes the fact that the pawn is not staying in the same place
var checkCellFree = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var m, i;
    return __generator(this, function (_a) {
        //If the user selected a dame it could be possible for it to go back to the initial spot
        for (m = 0; m < req.body.moves.length; m++) {
            for (i = 0; i < req.game.dimension; i++) {
                //We insert in the req the pawn object
                (req.grid.whites[i].name === req.body.pawn) ? req.pawn = req.grid.whites[i] : {};
                (req.grid.blacks[i].name === req.body.pawn) ? req.pawn = req.grid.blacks[i] : {};
                //The pawn must not be dead in order to cover the position
                if (((req.grid.whites[i].x === req.body.moves[m].x) && (req.grid.whites[i].y === req.body.moves[m].y) && (req.grid.whites[i].role !== "dead"))
                    || ((req.grid.blacks[i].x === req.body.moves[m].x) && (req.grid.blacks[i].y === req.body.moves[m].y) && (req.grid.blacks[i].role !== "dead"))) {
                    if (!((req.pawn.role === "dame") && (m !== 0) && ((req.grid.blacks[i].name === req.pawn.name) || (req.grid.whites[i].name === req.pawn.name)))) { //A dame could possibily go back to the initial spot... but not with the first move (it cant stand still)
                        next(MessFactory_1.MessEnum.InvalidMove);
                    }
                }
            }
        }
        next();
        return [2 /*return*/];
    });
}); };
exports.checkCellFree = checkCellFree;
//Checks if the destination can be reached withoud infringing any game rules
var checkMoveReachability = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, wb, num, killed_pawn, moved_pawn, became_dame, m, p, p, m, p, p;
    return __generator(this, function (_b) {
        //Check that the pawn is alive
        (req.pawn.role === "dead") ? next(MessFactory_1.MessEnum.InvalidMove) : {};
        req.xfrom = req.pawn.x;
        req.yfrom = req.pawn.y;
        _a = split(req.pawn.name, 1), wb = _a[0], num = _a[1];
        killed_pawn = null;
        moved_pawn = false;
        became_dame = false;
        if (req.pawn.role === "pawn") {
            //Cell is unrachable (moving diagonally)
            for (m = 0; m < req.body.moves.length; m++) {
                (((req.body.moves[m].x + req.body.moves[m].y) % 2) !== 0) ? next(MessFactory_1.MessEnum.BadlyFormattedBody) : {};
                //Since we are already scanning the array we use this loop to check if the sequence of moves is valid
                //Cant eat a dame, can eat only if the destination is 2 away diagonally with an opponent pawn in the middle   
                //For the pawn is easy cz Δy = 2 = 1 eaten, Δy=4 = 2 eaten pawns
                if (wb === "w") {
                    if (((req.body.moves[m].y !== req.pawn.y + 1) && (req.body.moves[m].y !== req.pawn.y + 2))
                        || ((req.body.moves[m].x !== req.pawn.x + 1) && (req.body.moves[m].x !== req.pawn.x - 1)
                            && (req.body.moves[m].x !== req.pawn.x + 2) && (req.body.moves[m].x !== req.pawn.x - 2))) {
                        console.log("Out of the allowed range");
                        next(MessFactory_1.MessEnum.InvalidMove);
                        break;
                    }
                    else {
                        //It means that we are trying to eat
                        if (req.body.moves[m].y === req.pawn.y + 2) {
                            //To the left or to the right?
                            if (moved_pawn) {
                                console.log("Can't move again after eating a pawn or moving");
                                next(MessFactory_1.MessEnum.InvalidMove);
                                break;
                            } //Can't eat after moving
                            for (p = 0; p < req.grid.blacks.length; p++) {
                                killed_pawn = null;
                                if ((req.grid.blacks[p].x === ((req.pawn.x + req.body.moves[m].x) / 2)) && (req.grid.blacks[p].y === ((req.pawn.y + req.body.moves[m].y) / 2)) && (req.grid.blacks[p].role === "pawn")) {
                                    console.log(req.pawn);
                                    killed_pawn = req.grid.blacks[p];
                                    req.grid.blacks[p].role = "dead"; //GRID IS GOING TO BE USED TO UPDATE THE DB
                                    req.grid.whites[parseInt(num) - 1].x = req.body.moves[m].x; //Update of the pawn's position in the grid
                                    req.grid.whites[parseInt(num) - 1].y = req.body.moves[m].y;
                                    req.pawn.x = req.body.moves[m].x; //Update our variable position
                                    req.pawn.y = req.body.moves[m].y;
                                    console.log("Moved to");
                                    console.log(req.pawn);
                                    console.log("+ Killing +");
                                    console.log(killed_pawn);
                                    console.log("----------------------");
                                    break; //Break bc if we dont stop all the pawns aligned diagonally are going to die :(
                                }
                            }
                            (killed_pawn) ? {} : next(MessFactory_1.MessEnum.InvalidMove);
                        }
                        else { //It means we are not trying to eat with the next move
                            if ((killed_pawn !== null) || (moved_pawn)) {
                                console.log("Can't move again after eating a pawn or moving");
                                next(MessFactory_1.MessEnum.InvalidMove);
                            }
                            else {
                                //Move one to right or left
                                moved_pawn = true;
                                if (req.body.moves[m].x === req.pawn.x + 1) { //RIGHT
                                    console.log(req.pawn);
                                    req.grid.whites[parseInt(num) - 1].x = req.pawn.x + 1; //Update of the pawn's position in the grid
                                    req.grid.whites[parseInt(num) - 1].y = req.pawn.y + 1;
                                    req.pawn.x = req.body.moves[m].x; //Update our variable position
                                    req.pawn.y = req.body.moves[m].y;
                                    console.log("Moved to");
                                    console.log(req.pawn);
                                    console.log("----------------------");
                                }
                                else { //LEFT
                                    console.log(req.pawn);
                                    req.grid.whites[parseInt(num) - 1].x = req.pawn.x - 1; //Update of the pawn's position in the grid
                                    req.grid.whites[parseInt(num) - 1].y = req.pawn.y + 1;
                                    req.pawn.x = req.body.moves[m].x; //Update our variable position
                                    req.pawn.y = req.body.moves[m].y;
                                    console.log("Moved to");
                                    console.log(req.pawn);
                                    console.log("----------------------");
                                }
                            }
                        }
                    }
                    if (req.pawn.y == req.game.dimension) {
                        req.grid.whites[parseInt(num) - 1].role = "dame";
                        console.log("w" + num + " became a dame!");
                        became_dame = true;
                        break;
                    }
                }
                else { //BLACK PAWNS CONTROLLS
                    if (((req.body.moves[m].y !== req.pawn.y - 1) && (req.body.moves[m].y !== req.pawn.y - 2))
                        || ((req.body.moves[m].x !== req.pawn.x + 1) && (req.body.moves[m].x !== req.pawn.x - 1)
                            && (req.body.moves[m].x !== req.pawn.x + 2) && (req.body.moves[m].x !== req.pawn.x - 2))) {
                        console.log("Out of the allowed range");
                        next(MessFactory_1.MessEnum.InvalidMove);
                        break;
                    }
                    else {
                        //It means that we are trying to eat
                        if (req.body.moves[m].y === req.pawn.y - 2) {
                            //To the left or to the right?
                            if (moved_pawn) {
                                console.log("Can't move again after eating a pawn or moving");
                                next(MessFactory_1.MessEnum.InvalidMove);
                                break;
                            } //Can't eat after moving
                            for (p = 0; p < req.grid.whites.length; p++) {
                                killed_pawn = null;
                                if ((req.grid.whites[p].x === ((req.pawn.x + req.body.moves[m].x) / 2)) && (req.grid.whites[p].y === ((req.pawn.y + req.body.moves[m].y) / 2)) && (req.grid.whites[p].role === "pawn")) {
                                    console.log(req.pawn);
                                    killed_pawn = req.grid.whites[p];
                                    req.grid.whites[p].role = "dead"; //GRID IS GOING TO BE USED TO UPDATE THE DB
                                    req.grid.blacks[parseInt(num) - 1].x = req.body.moves[m].x; //Update of the pawn's position in the grid
                                    req.grid.blacks[parseInt(num) - 1].y = req.body.moves[m].y;
                                    req.pawn.x = req.body.moves[m].x; //Update our variable position
                                    req.pawn.y = req.body.moves[m].y;
                                    console.log("Moved to");
                                    console.log(req.pawn);
                                    console.log("+ Killing +");
                                    console.log(killed_pawn);
                                    console.log("----------------------");
                                    break; //Break bc if we dont stop all the pawns aligned diagonally are going to die :(
                                }
                            }
                            (killed_pawn) ? {} : next(MessFactory_1.MessEnum.InvalidMove);
                        }
                        else { //It means we are not trying to eat with the next move
                            if ((killed_pawn !== null) || (moved_pawn)) {
                                console.log("Can't move again after eating a pawn or moving");
                                next(MessFactory_1.MessEnum.InvalidMove);
                            }
                            else {
                                //Move one to right or left
                                moved_pawn = true;
                                if (req.body.moves[m].x === req.pawn.x + 1) { //RIGHT
                                    console.log(req.pawn);
                                    req.grid.blacks[parseInt(num) - 1].x = req.pawn.x + 1; //Update of the pawn's position in the grid
                                    req.grid.blacks[parseInt(num) - 1].y = req.pawn.y - 1;
                                    req.pawn.x = req.body.moves[m].x; //Update our variable position
                                    req.pawn.y = req.body.moves[m].y;
                                    console.log("Moved to");
                                    console.log(req.pawn);
                                    console.log("----------------------");
                                }
                                else { //LEFT
                                    console.log(req.pawn);
                                    req.grid.blacks[parseInt(num) - 1].x = req.pawn.x - 1; //Update of the pawn's position in the grid
                                    req.grid.blacks[parseInt(num) - 1].y = req.pawn.y - 1;
                                    req.pawn.x = req.body.moves[m].x; //Update our variable position
                                    req.pawn.y = req.body.moves[m].y;
                                    console.log("Moved to");
                                    console.log(req.pawn);
                                    console.log("----------------------");
                                }
                            }
                        }
                    }
                    if (req.pawn.y == 1) {
                        req.grid.blacks[parseInt(num) - 1].role = "dame";
                        console.log("b" + num + " became a dame!");
                        became_dame = true;
                        break;
                    }
                }
            }
        }
        if ((req.pawn.role === "dame") && (!became_dame)) {
            for (m = 0; m < req.body.moves.length; m++) {
                (((req.body.moves[m].x + req.body.moves[m].y) % 2) !== 0) ? next(MessFactory_1.MessEnum.BadlyFormattedBody) : {};
                if (((req.body.moves[m].y !== req.pawn.y + 1) && (req.body.moves[m].y !== req.pawn.y - 1)
                    && (req.body.moves[m].y !== req.pawn.y + 2) && (req.body.moves[m].y !== req.pawn.y - 2))
                    || ((req.body.moves[m].x !== req.pawn.x + 1) && (req.body.moves[m].x !== req.pawn.x - 1)
                        && (req.body.moves[m].x !== req.pawn.x + 2) && (req.body.moves[m].x !== req.pawn.x - 2))) {
                    console.log("Out of the allowed range");
                    next(MessFactory_1.MessEnum.InvalidMove);
                    break;
                }
                if (wb === "w") { //WHITE DAME
                    //It means that we are trying to eat
                    if (Math.abs(req.body.moves[m].y - req.pawn.y) === 2) {
                        //To the left or to the right?
                        if (moved_pawn) {
                            console.log("Can't move again after eating a pawn or moving");
                            next(MessFactory_1.MessEnum.InvalidMove);
                            break;
                        } //Can't eat after moving
                        for (p = 0; p < req.grid.blacks.length; p++) {
                            killed_pawn = null;
                            if ((req.grid.blacks[p].x === ((req.pawn.x + req.body.moves[m].x) / 2)) && (req.grid.blacks[p].y === ((req.pawn.y + req.body.moves[m].y) / 2)) && ((req.grid.blacks[p].role === "pawn") || (req.grid.blacks[p].role === "dame"))) {
                                console.log(req.pawn);
                                killed_pawn = req.grid.blacks[p];
                                req.grid.blacks[p].role = "dead"; //GRID IS GOING TO BE USED TO UPDATE THE DB
                                req.grid.whites[parseInt(num) - 1].x = req.body.moves[m].x; //Update of the pawn's position in the grid
                                req.grid.whites[parseInt(num) - 1].y = req.body.moves[m].y;
                                req.pawn.x = req.body.moves[m].x; //Update our variable position
                                req.pawn.y = req.body.moves[m].y;
                                console.log("Moved to");
                                console.log(req.pawn);
                                console.log("+ Killing +");
                                console.log(killed_pawn);
                                console.log("----------------------");
                                break; //Break bc if we dont stop all the pawns aligned diagonally are going to die :(
                            }
                            //eating backwards
                        }
                        (killed_pawn) ? {} : next(MessFactory_1.MessEnum.InvalidMove);
                    }
                    else { //It means we are not trying to eat with the next move
                        if ((killed_pawn !== null) || (moved_pawn)) {
                            console.log("Can't move again after eating a pawn or moving");
                            next(MessFactory_1.MessEnum.InvalidMove);
                        }
                        else {
                            //Move one to right or left
                            moved_pawn = true;
                            if (req.body.moves[m].y === req.pawn.y + 1) { //Moving upward
                                if (req.body.moves[m].x === req.pawn.x + 1) { //RIGHT
                                    console.log(req.pawn);
                                    req.grid.whites[parseInt(num) - 1].x = req.pawn.x + 1; //Update of the pawn's position in the grid
                                    req.grid.whites[parseInt(num) - 1].y = req.pawn.y + 1;
                                    req.pawn.x = req.body.moves[m].x; //Update our variable position
                                    req.pawn.y = req.body.moves[m].y;
                                    console.log("Moved to");
                                    console.log(req.pawn);
                                    console.log("----------------------");
                                }
                                else { //LEFT
                                    console.log(req.pawn);
                                    req.grid.whites[parseInt(num) - 1].x = req.pawn.x - 1; //Update of the pawn's position in the grid
                                    req.grid.whites[parseInt(num) - 1].y = req.pawn.y + 1;
                                    req.pawn.x = req.body.moves[m].x; //Update our variable position
                                    req.pawn.y = req.body.moves[m].y;
                                    console.log("Moved to");
                                    console.log(req.pawn);
                                    console.log("----------------------");
                                }
                            }
                            if (req.body.moves[m].y === req.pawn.y - 1) { //moving downward
                                if (req.body.moves[m].x === req.pawn.x + 1) { //RIGHT
                                    console.log(req.pawn);
                                    req.grid.whites[parseInt(num) - 1].x = req.pawn.x + 1; //Update of the pawn's position in the grid
                                    req.grid.whites[parseInt(num) - 1].y = req.pawn.y - 1;
                                    req.pawn.x = req.body.moves[m].x; //Update our variable position
                                    req.pawn.y = req.body.moves[m].y;
                                    console.log("Moved to");
                                    console.log(req.pawn);
                                    console.log("----------------------");
                                }
                                else { //LEFT
                                    console.log(req.pawn);
                                    req.grid.whites[parseInt(num) - 1].x = req.pawn.x - 1; //Update of the pawn's position in the grid
                                    req.grid.whites[parseInt(num) - 1].y = req.pawn.y - 1;
                                    req.pawn.x = req.body.moves[m].x; //Update our variable position
                                    req.pawn.y = req.body.moves[m].y;
                                    console.log("Moved to");
                                    console.log(req.pawn);
                                    console.log("----------------------");
                                }
                            }
                        }
                    }
                }
                else { //BLACK DAME
                    //It means that we are trying to eat
                    if (Math.abs(req.body.moves[m].y - req.pawn.y) === 2) {
                        //To the left or to the right?
                        if (moved_pawn) {
                            console.log("Can't move again after eating a pawn or moving");
                            next(MessFactory_1.MessEnum.InvalidMove);
                            break;
                        } //Can't eat after moving
                        for (p = 0; p < req.grid.whites.length; p++) {
                            killed_pawn = null;
                            if ((req.grid.whites[p].x === ((req.pawn.x + req.body.moves[m].x) / 2)) && (req.grid.whites[p].y === ((req.pawn.y + req.body.moves[m].y) / 2)) && ((req.grid.whites[p].role === "pawn") || (req.grid.whites[p].role === "dame"))) {
                                console.log(req.pawn);
                                killed_pawn = req.grid.whites[p];
                                req.grid.whites[p].role = "dead"; //GRID IS GOING TO BE USED TO UPDATE THE DB
                                req.grid.blacks[parseInt(num) - 1].x = req.body.moves[m].x; //Update of the pawn's position in the grid
                                req.grid.blacks[parseInt(num) - 1].y = req.body.moves[m].y;
                                req.pawn.x = req.body.moves[m].x; //Update our variable position
                                req.pawn.y = req.body.moves[m].y;
                                console.log("Moved to");
                                console.log(req.pawn);
                                console.log("+ Killing +");
                                console.log(killed_pawn);
                                console.log("----------------------");
                                break; //Break bc if we dont stop all the pawns aligned diagonally are going to die :(
                            }
                        }
                        (killed_pawn) ? {} : next(MessFactory_1.MessEnum.InvalidMove);
                    }
                    else { //It means we are not trying to eat with the next move
                        if ((killed_pawn !== null) || (moved_pawn)) {
                            console.log("Can't move again after eating a pawn or moving");
                            next(MessFactory_1.MessEnum.InvalidMove);
                        }
                        else {
                            //Move one to right or left
                            moved_pawn = true;
                            if (req.body.moves[m].y === req.pawn.y + 1) { //Moving upward
                                if (req.body.moves[m].x === req.pawn.x + 1) { //RIGHT
                                    console.log(req.pawn);
                                    req.grid.blacks[parseInt(num) - 1].x = req.pawn.x + 1; //Update of the pawn's position in the grid
                                    req.grid.blacks[parseInt(num) - 1].y = req.pawn.y + 1;
                                    req.pawn.x = req.body.moves[m].x; //Update our variable position
                                    req.pawn.y = req.body.moves[m].y;
                                    console.log("Moved to");
                                    console.log(req.pawn);
                                    console.log("----------------------");
                                }
                                else { //LEFT
                                    console.log(req.pawn);
                                    req.grid.blacks[parseInt(num) - 1].x = req.pawn.x - 1; //Update of the pawn's position in the grid
                                    req.grid.blacks[parseInt(num) - 1].y = req.pawn.y + 1;
                                    req.pawn.x = req.body.moves[m].x; //Update our variable position
                                    req.pawn.y = req.body.moves[m].y;
                                    console.log("Moved to");
                                    console.log(req.pawn);
                                    console.log("----------------------");
                                }
                            }
                            if (req.body.moves[m].y === req.pawn.y - 1) { //moving downward
                                if (req.body.moves[m].x === req.pawn.x + 1) { //RIGHT
                                    console.log(req.pawn);
                                    req.grid.blacks[parseInt(num) - 1].x = req.pawn.x + 1; //Update of the pawn's position in the grid
                                    req.grid.blacks[parseInt(num) - 1].y = req.pawn.y - 1;
                                    req.pawn.x = req.body.moves[m].x; //Update our variable position
                                    req.pawn.y = req.body.moves[m].y;
                                    console.log("Moved to");
                                    console.log(req.pawn);
                                    console.log("----------------------");
                                }
                                else { //LEFT
                                    console.log(req.pawn);
                                    req.grid.blacks[parseInt(num) - 1].x = req.pawn.x - 1; //Update of the pawn's position in the grid
                                    req.grid.blacks[parseInt(num) - 1].y = req.pawn.y - 1;
                                    req.pawn.x = req.body.moves[m].x; //Update our variable position
                                    req.pawn.y = req.body.moves[m].y;
                                    console.log("Moved to");
                                    console.log(req.pawn);
                                    console.log("----------------------");
                                }
                            }
                        }
                    }
                }
            }
        }
        next();
        return [2 /*return*/];
    });
}); };
exports.checkMoveReachability = checkMoveReachability;
