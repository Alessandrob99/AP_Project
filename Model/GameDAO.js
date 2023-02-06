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
exports.GameDao = void 0;
var singletonDBConnection_1 = require("../DB_Connection/singletonDBConnection");
var sequelize_1 = require("sequelize");
var GameDao = /** @class */ (function () {
    function GameDao() {
        var seq = singletonDBConnection_1.DB_Singleton.getInstance().getConnection();
        this.game = seq.define('Game', {
            id: {
                type: sequelize_1.DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            creator: {
                type: sequelize_1.DataTypes.STRING(50),
                allowNull: false
            },
            opponent: {
                type: sequelize_1.DataTypes.STRING(50),
                allowNull: false
            },
            state: {
                type: sequelize_1.DataTypes.INTEGER,
                allowNull: false
            },
            positions: {
                type: sequelize_1.DataTypes.STRING(1000),
                allowNull: false
            },
            winner: {
                type: sequelize_1.DataTypes.STRING(50),
                allowNull: true,
                defaultValue: null
            },
            turn: {
                type: sequelize_1.DataTypes.STRING(50),
                allowNull: false
            }
        }, {
            tableName: 'games',
            timestamps: false
        });
    }
    //CRUD Methods----------
    //Creation methods
    GameDao.prototype.createGame = function (creator, opponent, dimension) {
        return __awaiter(this, void 0, void 0, function () {
            var whites, y, i, blacks, i, i, board, objJson, positions, newGame;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        whites = [];
                        y = 0;
                        for (i = 1; i <= dimension; i++) {
                            (i % 2) !== 0 ? y = 1 : y = 2;
                            whites.push({
                                name: "w" + i,
                                role: "pawn",
                                x: i,
                                y: y
                            });
                        }
                        blacks = [];
                        if ((dimension % 2) !== 0) {
                            for (i = 1; i <= dimension; i++) {
                                (i % 2) !== 0 ? y = dimension : y = dimension - 1;
                                blacks.push({
                                    name: "b" + i,
                                    role: "pawn",
                                    x: i,
                                    y: y
                                });
                            }
                        }
                        else {
                            for (i = 1; i <= dimension; i++) {
                                (i % 2) !== 0 ? y = dimension - 1 : y = dimension;
                                blacks.push({
                                    name: "b" + i,
                                    role: "pawn",
                                    x: i,
                                    y: y
                                });
                            }
                        }
                        board = new Map();
                        board.set("whites", whites);
                        board.set("blacks", blacks);
                        objJson = Object.fromEntries(board);
                        positions = JSON.stringify(objJson);
                        newGame = this.game.build({
                            creator: creator,
                            opponent: opponent,
                            state: 1,
                            positions: positions,
                            winner: null,
                            turn: creator
                        });
                        return [4 /*yield*/, newGame.save()];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    //Reading methods
    GameDao.prototype.checkUserGame = function (email) {
        return __awaiter(this, void 0, void 0, function () {
            var Op, game;
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        Op = require("sequelize").Op;
                        return [4 /*yield*/, this.game.findOne({ where: (_a = {},
                                    _a[Op.or] = [
                                        { creator: email },
                                        { opponent: email }
                                    ],
                                    _a) })];
                    case 1:
                        game = _b.sent();
                        return [2 /*return*/, game];
                }
            });
        });
    };
    return GameDao;
}());
exports.GameDao = GameDao;
