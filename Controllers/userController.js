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
exports.getStats = exports.quitGame = exports.getTokenBalance = exports.getGameMoves = exports.getGameInfo = exports.move = exports.newGame = void 0;
var MessFactory_1 = require("../Logging_Factory/MessFactory");
var GameDAO_1 = require("../Model/GameDAO");
var UserDAO_1 = require("../Model/UserDAO");
var parse = require('json2csv').parse;
var fields = ['pawn', 'xfrom', 'yfrom', 'xto', 'yto'];
var userDaoInst = new UserDAO_1.UserDao();
var gameDaoInst = new GameDAO_1.GameDao();
var newGame = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, gameDaoInst.createGame(req.user.email, req.body.opponent, req.body.dimension)];
            case 1:
                _a.sent();
                return [4 /*yield*/, userDaoInst.withdrawTokens(req.user.email, 0.35)];
            case 2:
                _a.sent();
                next(MessFactory_1.MessEnum.NewGameCreated);
                return [2 /*return*/];
        }
    });
}); };
exports.newGame = newGame;
var move = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        //TBD Check move validity
        console.log("mossa fatta");
        next();
        return [2 /*return*/];
    });
}); };
exports.move = move;
var getGameInfo = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var foundGame;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, gameDaoInst.readGame(parseInt(req.params.id))];
            case 1:
                foundGame = _a.sent();
                if (foundGame) {
                    res.status(200).send({
                        "creator": foundGame.creator,
                        "opponent": foundGame.opponent,
                        "state": foundGame.state,
                        "turn": foundGame.turn,
                        "winner": foundGame.winner,
                        "positions": foundGame.positions
                    });
                }
                else {
                    next(MessFactory_1.MessEnum.GameNotFound);
                }
                return [2 /*return*/];
        }
    });
}); };
exports.getGameInfo = getGameInfo;
var getGameMoves = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var foundGame, all_moves, csv_white, csv_black;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, gameDaoInst.readGame(parseInt(req.params.id))];
            case 1:
                foundGame = _a.sent();
                if (foundGame) {
                    all_moves = JSON.parse(foundGame.moves);
                    //FORMAT = 1 means CSV
                    if (req.params.format === "csv") {
                        console.log("CSV");
                        csv_white = parse(all_moves.white_moves, { fields: fields });
                        csv_black = parse(all_moves.black_moves, { fields: fields }).split("\n").slice(1).join("\n");
                        res.status(200).send(csv_white + "\n" + csv_black);
                    }
                    else {
                        console.log("JSON");
                        res.status(200).send(all_moves);
                    }
                }
                else {
                    next(MessFactory_1.MessEnum.GameNotFound);
                }
                return [2 /*return*/];
        }
    });
}); };
exports.getGameMoves = getGameMoves;
var getTokenBalance = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var foundUser;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, userDaoInst.readUser(req.user.email)];
            case 1:
                foundUser = _a.sent();
                res.status(200).send({
                    "token_balance": foundUser.token_balance
                });
                return [2 /*return*/];
        }
    });
}); };
exports.getTokenBalance = getTokenBalance;
//Methods that makes the user quit a game and updates all the game info in the db
var quitGame = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var winner;
    return __generator(this, function (_a) {
        //We know at this point that the user is wheter the creator or the opponent
        (req.user.email === req.game.creator) ? winner = req.game.opponent : winner = req.game.creator;
        gameDaoInst.updateGameInfo(parseInt(req.params.id), "abandoned", winner, req.game.moves, "", req.game.positions);
        res.status(200).json({ Status: 200, Description: "Operation completed - You abandoned the game" });
        return [2 /*return*/];
    });
}); };
exports.quitGame = quitGame;
//Methods that returns the specified user's statistics
var getStats = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var foundGames, games, tot_games, wins, losses, wins_abandon, losses_abandon, win_moves, loss_moves, i, moves;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, gameDaoInst.checkAllUserGames(req.params.email)];
            case 1:
                foundGames = _a.sent();
                if (foundGames) {
                    games = foundGames.filter(function (game) { return game.state !== "started"; });
                    tot_games = games.length;
                    wins = 0;
                    losses = 0;
                    wins_abandon = 0;
                    losses_abandon = 0;
                    win_moves = 0;
                    loss_moves = 0;
                    for (i = 0; i < tot_games; i++) {
                        moves = JSON.parse(games[i].moves);
                        if (games[i].winner === req.params.email) {
                            (req.params.email === games[i].creator) ? win_moves += moves.white_moves.length : win_moves += moves.black_moves.length;
                            wins += 1;
                            (games[i].state === "abandoned") ? wins_abandon += 1 : {};
                        }
                        else {
                            (req.params.email === games[i].creator) ? loss_moves += moves.white_moves.length : loss_moves += moves.black_moves.length;
                            losses += 1;
                            (games[i].state === "abandoned") ? losses_abandon += 1 : {};
                        }
                    }
                    res.status(200).json({
                        total_games: tot_games,
                        won_games: wins,
                        lost_games: losses,
                        won_abandoned_games: wins_abandon,
                        lost_abandoned_games: losses_abandon,
                        avg_n_moves_to_win: (win_moves / wins),
                        avg_n_moves_to_lose: (loss_moves / losses)
                    });
                }
                else {
                    res.status(200).json({ Status: 200, Description: "Operation completed - You abandoned the game" });
                }
                return [2 /*return*/];
        }
    });
}); };
exports.getStats = getStats;
