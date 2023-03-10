import {MessageInt} from "./messageInt";

export enum MessEnum {
    NoHeaderError = 1,
    NoHJWTError,
    InvalidJWDError,
    JwtClaimsError,
    UnauthorizedError,
    UserNotFound,
    BadlyFormattedBody,
    TokenBalanceUpdated,
    OpponentAlreadyInGame,
    CreatorAlreadyInGame,
    NotInGame,
    NewGameCreated,
    NotValidDimension,
    NotYourTurn,
    GameNotFound,
    GameTerminated,
    RouteNotFound,
    CantPlayAgainstUrself,
    NoGamesFound,
    InvalidMove
    //UnauthorizedAccessToGameInfo
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
        return "Unauthorized - Invalid Token";
    }
    public getCode():number{
        return 403;
    }
}


//Message telling the user that the claims contained in the JWT were improperly formatted
class JwtClaimsError implements MessageInt {
    public getMess():string {
        return "Bad request - some JWT token claims have been badly formatted";
    }
    public getCode():number{
        return 400;
    }
}

//Message telling the user that the given JWT has not the admin role
//Or that the user credits are over
class UnauthorizedError implements MessageInt {
    public getMess(): string {
        return "Unauthorized";
    }
    public getCode(): number {
        return 401;
    }
}


//Message to tell the admin/user that the specified user was not found in the db
class UserNotFound implements MessageInt {
    public getMess(): string {
        return "Bad request - User not found";
    }
    public getCode(): number {
        return 400;
    }
}

//The request body is badly formatted
class BadlyFormattedBody implements MessageInt {
    public getMess(): string {
        return "Bad request - Request body contains errors";
    }
    public getCode(): number {
        return 400;
    }
}

//Token balance updated succesfully
class TokenBalanceUpdated implements MessageInt {
    public getMess(): string {
        return "Operation completed - Token balance updated succesfully";
    }
    public getCode(): number {
        return 200;
    }
}


//Message to tell the user that a new game was created succesfully and 0.35 tokens have been withdrawn
class NewGameCreated implements MessageInt{
    public getMess(): string {
        return "Operation completed - 0.35 Tokens used - Game created";
    }
    public getCode(): number {
        return 201;
    }
}

//Opponent is already playing in a different game
class OpponentAlreadyInGame implements MessageInt {
    public getMess(): string {
        return "Forbidden - Opponent is already in game";
    }
    public getCode(): number {
        return 403;
    }
}

//Game creator is already playing in a different game
class CreatorAlreadyInGame implements MessageInt {
    public getMess(): string {
        return "Forbidden - You are already in game";
    }
    public getCode(): number {
        return 403;
    }
}


//Given grid dimension is not valid
class NotValidDimension implements MessageInt {
    public getMess(): string {
        return "Bad request - Grid dimension must be greater than 4X4";
    }
    public getCode(): number {
        return 400;
    }
}


//Message tells the user that he is not playing in any game
class NotInGame implements MessageInt {
    public getMess(): string {
        return "Bad request - You are not in game";
    }
    public getCode(): number {
        return 400;
    }
}


//Message tells the user that it's not his turn
class NotYourTurn implements MessageInt {
    public getMess(): string {
        return "Bad request - It is not your turn";
    }
    public getCode(): number {
        return 400;
    }
}

//Message tells the user that the game is terminated
class GameTerminated implements MessageInt {
    public getMess(): string {
        return "Bad request - Game is terminated";
    }
    public getCode(): number {
        return 400;
    }
}

//Message tells the user that the game was not found in the db
class GameNotFound implements MessageInt {
    public getMess(): string {
        return "Not found - Game id does not exist";
    }
    public getCode(): number {
        return 404;
    }
}

//Message tells the user that the route doesn't exist
class RouteNotFound implements MessageInt {
    public getMess(): string {
        return "Not found - Route does not exist";
    }
    public getCode(): number {
        return 404;
    }
}

//Message that tells the user that he cant play a game against him/her self
class CantPlayAgainstUrself implements MessageInt {
    public getMess(): string {
        return "Forbidden - You can not play against yourself";
    }
    public getCode(): number {
        return 403;
    }
}


//Message that tells the user that the given account has no recorded games yet
class NoGamesFound implements MessageInt {
    public getMess(): string {
        return "Not found - User has not played any games yet";
    }
    public getCode(): number {
        return 404;
    }
}

//Message that tells the user that the move is not valid
class InvalidMove implements MessageInt {
    public getMess(): string {
        return "Bad request - Move is not valid";
    }
    public getCode(): number {
        return 400;
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
    }
}
