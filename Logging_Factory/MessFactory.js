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
        return "Invalid Token";
    };
    InvalidJWDError.prototype.getCode = function () {
        return 401;
    };
    return InvalidJWDError;
}());
//Message telling the user that the claims contained in the JWT were improperly formatted
var JwtClaimsError = /** @class */ (function () {
    function JwtClaimsError() {
    }
    JwtClaimsError.prototype.getMess = function () {
        return "Bad token - some JWT token claims have been badly formatted";
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
        return "New User profile created";
    };
    UserCreated.prototype.getCode = function () {
        return 200;
    };
    return UserCreated;
}());
//Message telling the user that the given JWT has not the admin role
var UnauthorizedError = /** @class */ (function () {
    function UnauthorizedError() {
    }
    UnauthorizedError.prototype.getMess = function () {
        return "Unauthorized!";
    };
    UnauthorizedError.prototype.getCode = function () {
        return 403;
    };
    return UnauthorizedError;
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
            default:
                message = new GenericError();
                break;
        }
        return message;
    };
    return MessFactory;
}());
exports.MessFactory = MessFactory;
