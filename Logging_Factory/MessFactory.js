"use strict";
exports.__esModule = true;
exports.MessFactory = exports.MessEnum = void 0;
var MessEnum;
(function (MessEnum) {
    MessEnum[MessEnum["NoHeaderError"] = 1] = "NoHeaderError";
    MessEnum[MessEnum["NoHJWTError"] = 2] = "NoHJWTError";
    MessEnum[MessEnum["InvalidJWDError"] = 3] = "InvalidJWDError";
    MessEnum[MessEnum["JwtClaimsError"] = 4] = "JwtClaimsError";
    MessEnum[MessEnum["UnauthorizedError"] = 5] = "UnauthorizedError";
    MessEnum[MessEnum["UserNotFound"] = 6] = "UserNotFound";
    MessEnum[MessEnum["BadlyFormattedBody"] = 7] = "BadlyFormattedBody";
    MessEnum[MessEnum["TokenBalanceUpdated"] = 8] = "TokenBalanceUpdated";
    MessEnum[MessEnum["OpponentAlreadyInGame"] = 9] = "OpponentAlreadyInGame";
    MessEnum[MessEnum["CreatorAlreadyInGame"] = 10] = "CreatorAlreadyInGame";
    MessEnum[MessEnum["NotInGame"] = 11] = "NotInGame";
    MessEnum[MessEnum["NewGameCreated"] = 12] = "NewGameCreated";
    MessEnum[MessEnum["NotValidDimension"] = 13] = "NotValidDimension";
    MessEnum[MessEnum["NotYourTurn"] = 14] = "NotYourTurn";
    MessEnum[MessEnum["GameNotFound"] = 15] = "GameNotFound";
    MessEnum[MessEnum["GameTerminated"] = 16] = "GameTerminated";
    MessEnum[MessEnum["RouteNotFound"] = 17] = "RouteNotFound";
    MessEnum[MessEnum["CantPlayAgainstUrself"] = 18] = "CantPlayAgainstUrself";
    MessEnum[MessEnum["NoGamesFound"] = 19] = "NoGamesFound";
    MessEnum[MessEnum["InvalidMove"] = 20] = "InvalidMove";
    //UnauthorizedAccessToGameInfo
})(MessEnum = exports.MessEnum || (exports.MessEnum = {}));
//Message telling the user that the request has no authentication header
var NoHeaderError = /** @class */ (function () {
    function NoHeaderError() {
    }
    NoHeaderError.prototype.getMess = function () {
        return "Bad request - No authentication header found";
    };
    NoHeaderError.prototype.getCode = function () {
        return 400;
    };
    return NoHeaderError;
}());
//Message telling the user that the request is missing the JWT token
var NoHJWTError = /** @class */ (function () {
    function NoHJWTError() {
    }
    NoHJWTError.prototype.getMess = function () {
        return "Bad request - No JWT Token found";
    };
    NoHJWTError.prototype.getCode = function () {
        return 400;
    };
    return NoHJWTError;
}());
//Message telling the user that the given token is not valid for authentication
var InvalidJWDError = /** @class */ (function () {
    function InvalidJWDError() {
    }
    InvalidJWDError.prototype.getMess = function () {
        return "Unauthorized - Invalid Token";
    };
    InvalidJWDError.prototype.getCode = function () {
        return 403;
    };
    return InvalidJWDError;
}());
//Message telling the user that the claims contained in the JWT were improperly formatted
var JwtClaimsError = /** @class */ (function () {
    function JwtClaimsError() {
    }
    JwtClaimsError.prototype.getMess = function () {
        return "Bad request - some JWT token claims have been badly formatted";
    };
    JwtClaimsError.prototype.getCode = function () {
        return 400;
    };
    return JwtClaimsError;
}());
//Message telling the user that the given JWT has not the admin role
//Or that the user credits are over
var UnauthorizedError = /** @class */ (function () {
    function UnauthorizedError() {
    }
    UnauthorizedError.prototype.getMess = function () {
        return "Unauthorized";
    };
    UnauthorizedError.prototype.getCode = function () {
        return 401;
    };
    return UnauthorizedError;
}());
//Message to tell the admin/user that the specified user was not found in the db
var UserNotFound = /** @class */ (function () {
    function UserNotFound() {
    }
    UserNotFound.prototype.getMess = function () {
        return "Bad request - User not found";
    };
    UserNotFound.prototype.getCode = function () {
        return 400;
    };
    return UserNotFound;
}());
//The request body is badly formatted
var BadlyFormattedBody = /** @class */ (function () {
    function BadlyFormattedBody() {
    }
    BadlyFormattedBody.prototype.getMess = function () {
        return "Bad request - Request body contains errors";
    };
    BadlyFormattedBody.prototype.getCode = function () {
        return 400;
    };
    return BadlyFormattedBody;
}());
//Token balance updated succesfully
var TokenBalanceUpdated = /** @class */ (function () {
    function TokenBalanceUpdated() {
    }
    TokenBalanceUpdated.prototype.getMess = function () {
        return "Operation completed - Token balance updated succesfully";
    };
    TokenBalanceUpdated.prototype.getCode = function () {
        return 200;
    };
    return TokenBalanceUpdated;
}());
//Message to tell the user that a new game was created succesfully and 0.35 tokens have been withdrawn
var NewGameCreated = /** @class */ (function () {
    function NewGameCreated() {
    }
    NewGameCreated.prototype.getMess = function () {
        return "Operation completed - 0.35 Tokens used - Game created";
    };
    NewGameCreated.prototype.getCode = function () {
        return 201;
    };
    return NewGameCreated;
}());
//Opponent is already playing in a different game
var OpponentAlreadyInGame = /** @class */ (function () {
    function OpponentAlreadyInGame() {
    }
    OpponentAlreadyInGame.prototype.getMess = function () {
        return "Forbidden - Opponent is already in game";
    };
    OpponentAlreadyInGame.prototype.getCode = function () {
        return 403;
    };
    return OpponentAlreadyInGame;
}());
//Game creator is already playing in a different game
var CreatorAlreadyInGame = /** @class */ (function () {
    function CreatorAlreadyInGame() {
    }
    CreatorAlreadyInGame.prototype.getMess = function () {
        return "Forbidden - You are already in game";
    };
    CreatorAlreadyInGame.prototype.getCode = function () {
        return 403;
    };
    return CreatorAlreadyInGame;
}());
//Given grid dimension is not valid
var NotValidDimension = /** @class */ (function () {
    function NotValidDimension() {
    }
    NotValidDimension.prototype.getMess = function () {
        return "Bad request - Grid dimension must be greater than 4X4";
    };
    NotValidDimension.prototype.getCode = function () {
        return 400;
    };
    return NotValidDimension;
}());
//Message tells the user that he is not playing in any game
var NotInGame = /** @class */ (function () {
    function NotInGame() {
    }
    NotInGame.prototype.getMess = function () {
        return "Bad request - You are not in game";
    };
    NotInGame.prototype.getCode = function () {
        return 400;
    };
    return NotInGame;
}());
//Message tells the user that it's not his turn
var NotYourTurn = /** @class */ (function () {
    function NotYourTurn() {
    }
    NotYourTurn.prototype.getMess = function () {
        return "Bad request - It is not your turn";
    };
    NotYourTurn.prototype.getCode = function () {
        return 400;
    };
    return NotYourTurn;
}());
//Message tells the user that the game is terminated
var GameTerminated = /** @class */ (function () {
    function GameTerminated() {
    }
    GameTerminated.prototype.getMess = function () {
        return "Bad request - Game is terminated";
    };
    GameTerminated.prototype.getCode = function () {
        return 400;
    };
    return GameTerminated;
}());
//Message tells the user that the game was not found in the db
var GameNotFound = /** @class */ (function () {
    function GameNotFound() {
    }
    GameNotFound.prototype.getMess = function () {
        return "Not found - Game id does not exist";
    };
    GameNotFound.prototype.getCode = function () {
        return 404;
    };
    return GameNotFound;
}());
//Message tells the user that the route doesn't exist
var RouteNotFound = /** @class */ (function () {
    function RouteNotFound() {
    }
    RouteNotFound.prototype.getMess = function () {
        return "Not found - Route does not exist";
    };
    RouteNotFound.prototype.getCode = function () {
        return 404;
    };
    return RouteNotFound;
}());
//Message that tells the user that he cant play a game against him/her self
var CantPlayAgainstUrself = /** @class */ (function () {
    function CantPlayAgainstUrself() {
    }
    CantPlayAgainstUrself.prototype.getMess = function () {
        return "Forbidden - You can not play against yourself";
    };
    CantPlayAgainstUrself.prototype.getCode = function () {
        return 403;
    };
    return CantPlayAgainstUrself;
}());
//Message that tells the user that the given account has no recorded games yet
var NoGamesFound = /** @class */ (function () {
    function NoGamesFound() {
    }
    NoGamesFound.prototype.getMess = function () {
        return "Not found - User has not played any games yet";
    };
    NoGamesFound.prototype.getCode = function () {
        return 404;
    };
    return NoGamesFound;
}());
//Message that tells the user that the move is not valid
var InvalidMove = /** @class */ (function () {
    function InvalidMove() {
    }
    InvalidMove.prototype.getMess = function () {
        return "Bad request - Move is not valid";
    };
    InvalidMove.prototype.getCode = function () {
        return 400;
    };
    return InvalidMove;
}());
//Concrete factory class - getMessage() allows to return different message objects depending on the given parameters
var MessFactory = /** @class */ (function () {
    function MessFactory() {
    }
    MessFactory.prototype.getMessage = function (mess) {
        var message;
        switch (mess) {
            case MessEnum.UnauthorizedError:
                message = new UnauthorizedError();
                break;
            case MessEnum.InvalidJWDError:
                message = new InvalidJWDError();
                break;
            case MessEnum.NoHeaderError:
                message = new NoHeaderError();
                break;
            case MessEnum.NoHJWTError:
                message = new NoHJWTError();
                break;
            case MessEnum.JwtClaimsError:
                message = new JwtClaimsError();
                break;
            case MessEnum.UserNotFound:
                message = new UserNotFound();
                break;
            case MessEnum.BadlyFormattedBody:
                message = new BadlyFormattedBody();
                break;
            case MessEnum.TokenBalanceUpdated:
                message = new TokenBalanceUpdated();
                break;
            case MessEnum.NewGameCreated:
                message = new NewGameCreated();
                break;
            case MessEnum.CreatorAlreadyInGame:
                message = new CreatorAlreadyInGame();
                break;
            case MessEnum.OpponentAlreadyInGame:
                message = new OpponentAlreadyInGame();
                break;
            case MessEnum.NotValidDimension:
                message = new NotValidDimension();
                break;
            case MessEnum.NotInGame:
                message = new NotInGame();
                break;
            case MessEnum.NotYourTurn:
                message = new NotYourTurn();
                break;
            case MessEnum.GameNotFound:
                message = new GameNotFound();
                break;
            case MessEnum.RouteNotFound:
                message = new RouteNotFound();
                break;
            case MessEnum.GameTerminated:
                message = new GameTerminated();
                break;
            case MessEnum.CantPlayAgainstUrself:
                message = new CantPlayAgainstUrself();
                break;
            case MessEnum.NoGamesFound:
                message = new NoGamesFound();
                break;
            case MessEnum.InvalidMove:
                message = new InvalidMove();
                break;
        }
        return message;
    };
    return MessFactory;
}());
exports.MessFactory = MessFactory;
