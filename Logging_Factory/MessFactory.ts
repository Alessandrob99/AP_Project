import {MessageInt} from "./messageInt";

export enum MessEnum {
    NoHeaderError = 1,
    NoHJWTError,
    InvalidJWDError,
    JwtClaimsError,
    UserCreated,
    UnauthorizedError,
    UserNotFound,
    NoBodyError,
    BadlyFormattedBody,
    TokenBalanceUpdated
}


//Message telling the user that the request has no authentication header
class GenericError implements MessageInt {
    public getMess():string {
        return "Something didn't work as supposed to...";
    }
    public getCode():number{
        return 400;
    }
}

//Message telling the user that the request has no authentication header
class NoHeaderError implements MessageInt {
    public getMess():string {
        return "Bad request - No authentication header found";
    }
    public getCode():number{
        return 400;
    }
}

//Message telling the user that the request is missing the JWT token
class NoHJWTError implements MessageInt {
    public getMess():string {
        return "Bad request - No JWT Token found";
    }
    public getCode():number{
        return 400;
    }
}

//Message telling the user that the given token is not valid for authentication
class InvalidJWDError implements MessageInt {
    public getMess():string {
        return "Invalid Token";
    }
    public getCode():number{
        return 403;
    }
}


//Message telling the user that the claims contained in the JWT were improperly formatted
class JwtClaimsError implements MessageInt {
    public getMess():string {
        return "Bad token - some JWT token claims have been badly formatted";
    }
    public getCode():number{
        return 400;
    }
}

//Message telling the user that his/her profile was succesfully created
class UserCreated implements MessageInt {
    public getMess():string {
        return "New User profile created";
    }
    public getCode():number{
        return 200;
    }
}

//Message telling the user that the given JWT has not the admin role
//Or that the user credits are over
class UnauthorizedError implements MessageInt {
    public getMess(): string {
        return "Unauthorized!";
    }
    public getCode(): number {
        return 401;
    }
}


//Message to tell the admin/user that the specified user was not found in the db
class UserNotFound implements MessageInt {
    public getMess(): string {
        return "User not found";
    }
    public getCode(): number {
        return 400;
    }
}

//The request doesn't have a body
class NoBodyError implements MessageInt {
    public getMess(): string {
        return "Missing request body";
    }
    public getCode(): number {
        return 400;
    }
}

//The request body is badly formatted
class BadlyFormattedBody implements MessageInt {
    public getMess(): string {
        return "Request body contains errors";
    }
    public getCode(): number {
        return 400;
    }
}

//Token balance updated succesfully
class TokenBalanceUpdated implements MessageInt {
    public getMess(): string {
        return "Token balance updated succesfully";
    }
    public getCode(): number {
        return 200;
    }
}


//Concrete factory class - getMessage() allows to return different message objects depending on the given parameters
export class MessFactory{
    constructor(){}
    public getMessage(mess : MessEnum){
        var message : MessageInt;
        switch(mess){
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
            default :
                message = new GenericError();
                break;
        }
        return message;
    }
}
