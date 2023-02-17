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
var CoR = require("./Middleware_Components/CoR");
var MessLog_1 = require("./Middleware_Components/MessLog");
var adminController = require("./Controllers/adminController");
var userController = require("./Controllers/userController");
var MessFactory_1 = require("./Logging_Factory/MessFactory");
var user_validation_1 = require("./Middleware_Components/user_validation");
var requestValidation_1 = require("./Middleware_Components/requestValidation");
var express = require('express');
require('dotenv').config();
var bodyParser = require('body-parser');
var app = express();
//Docker network
var PORT = process.env.EXT_PORT || 8080;
var HOST = process.env.HOST || '0.0.0.0';
//Checks if the json passed in the request body has the correct json format
//Note: doesn't check the type and format of the several fields in the json!
app.use(bodyParser.json({
    verify: function (req, res, buf, encoding) {
        try {
            JSON.parse(buf);
        }
        catch (e) {
            var concreteFactory = new MessFactory_1.MessFactory();
            var messageOb = concreteFactory.getMessage(MessFactory_1.MessEnum.BadlyFormattedBody);
            var message = messageOb.getMess();
            var status = messageOb.getCode();
            console.log(message);
            res.status(status).json({ Status: status, Description: message });
        }
    }
}));
//JWT Token authentication done for all routes, w/o a token it'll be impossible to use the app
app.use(CoR.JWTCheck);
//=================================ROUTES========================================//
//Creates a new game pointing out the opponent's email and the grid dimension(>=5)
app.post('/game', [CoR.userAccountAndBalanceCheck, CoR.newGameVal], function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        userController.newGame(req, res, next);
        return [2 /*return*/];
    });
}); });
//The user abandons the game he/her is playing in, resulting in a loss
app.post('/:id/quit', [requestValidation_1.checkUserInGame, CoR.userAccountAndBalanceCheck], function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        userController.quitGame(req, res, next);
        return [2 /*return*/];
    });
}); });
//Calculates the number of wins for each player and makes a list, order = 'asc' makes an ascending list
app.get('/ranking/:order?', [CoR.userAccountAndBalanceCheck], function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        userController.getRanking(req, res, next);
        return [2 /*return*/];
    });
}); });
//Get stats about a player (indicated by email)
app.get('/stats/:email', [requestValidation_1.checkUserEmailNoCreate, CoR.userAccountAndBalanceCheck], function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        userController.getStats(req, res, next);
        return [2 /*return*/];
    });
}); });
//Make a new move in the game the user is playing at the moment
//Here there is no Token balance check since the credit can go below 0 while playing a game
app.post('/move', [user_validation_1.checkUserEmail, CoR.moveCheck], function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        userController.move(req, res, next);
        return [2 /*return*/];
    });
}); });
//Get game general info (Game indicated by the numeric id) 
app.get('/gameInfo/:id', [CoR.userAccountAndBalanceCheck], function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        userController.getGameInfo(req, res, next);
        return [2 /*return*/];
    });
}); });
//Get the list of moves done in a game by both players (format = 'csv' returns a csv (string), anything else returns a json)
app.get('/gameMoves/:id/:format?', [CoR.userAccountAndBalanceCheck], function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        userController.getGameMoves(req, res, next);
        return [2 /*return*/];
    });
}); });
//Route that only the admin can use in order to update a specific user token balance
app.post('/token', [CoR.adminCheck, CoR.newTokenBalanceVal], function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        adminController.newTokenBalance(req, res, next);
        return [2 /*return*/];
    });
}); });
//Returns the user's token balance
app.get('/tokenBalance', [user_validation_1.checkUserEmail], function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        userController.getTokenBalance(req, res, next);
        return [2 /*return*/];
    });
}); });
//Route not found
app.get('*', function (req, res, next) {
    next(MessFactory_1.MessEnum.RouteNotFound);
});
//Route not found
app.post('*', function (req, res, next) {
    next(MessFactory_1.MessEnum.RouteNotFound);
});
//Prints the messages returned by the CoR methods
app.use(MessLog_1.messageLogger);
app.listen(PORT, HOST);
console.log("Ready on http://".concat(HOST, ":").concat(PORT));
