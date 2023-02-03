"use strict";
exports.__esModule = true;
exports.MessFactory = exports.MessEnum = void 0;
var MessEnum;
(function (MessEnum) {
    MessEnum[MessEnum["NoHeaderError"] = 1] = "NoHeaderError";
    MessEnum[MessEnum["NoHJWTError"] = 2] = "NoHJWTError";
    MessEnum[MessEnum["InvalidJWDError"] = 3] = "InvalidJWDError";
    MessEnum[MessEnum["JwtClaimsError"] = 4] = "JwtClaimsError";
    MessEnum[MessEnum["UserCreated"] = 5] = "UserCreated";
    MessEnum[MessEnum["UnauthorizedError"] = 6] = "UnauthorizedError";
    MessEnum[MessEnum["UserNotFound"] = 7] = "UserNotFound";
    MessEnum[MessEnum["NoBodyError"] = 8] = "NoBodyError";
    MessEnum[MessEnum["BadlyFormattedBody"] = 9] = "BadlyFormattedBody";
    MessEnum[MessEnum["TokenBalanceUpdated"] = 10] = "TokenBalanceUpdated";
    MessEnum[MessEnum["NotEnoughTokens"] = 11] = "NotEnoughTokens";
})(MessEnum = exports.MessEnum || (exports.MessEnum = {}));
//Message telling the user that the request has no authentication header
var GenericError = /** @class */ (function () {
    function GenericError() {
    }
    GenericError.prototype.getMess = function () {
        return "Something didn't work as supposed to...";
    };
    GenericError.prototype.getCode = function () {
        return 400;
    };
    return GenericError;
}());
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
//Message telling the user that his/her profile was succesfully created
var UserCreated = /** @class */ (function () {
    function UserCreated() {
    }
    UserCreated.prototype.getMess = function () {
        return "Operation completed - New User profile created";
    };
    UserCreated.prototype.getCode = function () {
        return 200;
    };
    return UserCreated;
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
//The request doesn't have a body
var NoBodyError = /** @class */ (function () {
    function NoBodyError() {
    }
    NoBodyError.prototype.getMess = function () {
        return "Bad request - Missing request body";
    };
    NoBodyError.prototype.getCode = function () {
        return 400;
    };
    return NoBodyError;
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
//Message to tell the user that his tokens are not sufficient for the operarion
var NotEnoughTokens = /** @class */ (function () {
    function NotEnoughTokens() {
    }
    NotEnoughTokens.prototype.getMess = function () {
        return "Forbidden - Not enough tokens to proceed";
    };
    NotEnoughTokens.prototype.getCode = function () {
        return 403;
    };
    return NotEnoughTokens;
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
            case MessEnum.UserCreated:
                message = new UserCreated();
                break;
            case MessEnum.UserNotFound:
                message = new UserNotFound();
                break;
            case MessEnum.NoBodyError:
                message = new NoBodyError();
                break;
            case MessEnum.BadlyFormattedBody:
                message = new BadlyFormattedBody();
                break;
            case MessEnum.TokenBalanceUpdated:
                message = new TokenBalanceUpdated();
                break;
            case MessEnum.NotEnoughTokens:
                message = new NotEnoughTokens();
                break;
            default:
                message = new GenericError();
                break;
        }
        return message;
    };
    return MessFactory;
}());
exports.MessFactory = MessFactory;
