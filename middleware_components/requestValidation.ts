
import { UserDao } from "../Model/UserDAO";

import { MessEnum } from '../Logging_Factory/MessFactory';
import { GameDao } from "../Model/GameDAO";

//Checks whether the user has enought credits to operate or not
export const checkUserTokenBalance = async (req: any, res: any, next: any) => {
    
    var dao = new UserDao();

    var user = await dao.readUser(req.user.email)
    if(user.token_balance<=0.0){
        next(MessEnum.UnauthorizedError);
    }else{
        next();
    }
    
};

//Checks if the given opponent's email matches a record in the users table
export const checkUserEmailOpponent = async (req: any, res: any, next: any) => {    
    var dao = new UserDao();
    var user = await dao.readUser(req.body.opponent);
    if(!user){
        next(MessEnum.UserNotFound);
    }else{
        next();
    } 
};

//Checks if the user has enough tokens to start a new game
export const checkNewGameBalance = async (req: any, res: any, next: any) => {
    var dao = new UserDao();

    var user = await dao.readUser(req.user.email)
    if(user.token_balance<0.35){
        next(MessEnum.NotEnoughTokens);
    }else{
        next();
    }  
};


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
export const checkReqBodyNewGame = async (req: any, res: any, next: any) => {
    var validator = require("email-validator");
    if((typeof req.body.opponent === "string") 
    && (validator.validate(req.body.opponent) 
    && (typeof req.body.dimension === 'number'))){
            if(req.body.opponent === req.user.email){
                next(MessEnum.CantPlayAgainstUrself);
            }else{
                next();
            }
    }else{
        next(MessEnum.BadlyFormattedBody);
    }
}


//Checks if the "new token balance" request as a properly formatted body
export const checkReqTokenBalance = async (req: any, res: any, next: any) => {
    var validator = require("email-validator");
    if((typeof req.body.email === "string") 
    && (validator.validate(req.body.email) 
    && (typeof req.body.token === 'number'))){
            next();
    }else{
        next(MessEnum.BadlyFormattedBody);
    }
}




//Checks if at least one of the the users is already in game
export const checkUsersAlreadyInGame = async (req: any, res: any, next: any) => {
    var gameDao = new GameDao()
    var foundGame = await gameDao.checkUserGame(req.user.email);
    if(foundGame){
        next(MessEnum.CreatorAlreadyInGame);
    }else{ 
        foundGame = await gameDao.checkUserGame(req.body.opponent)
        if(foundGame){
            next(MessEnum.OpponentAlreadyInGame);
        }else{
            next();
        }
    }
}

//Checks if the user is playing in a given game (by id)
export const checkUserInGame = async (req: any, res: any, next: any) => {
    var gameDao = new GameDao()
    var foundGame = await gameDao.readGame(req.params.id);
    if(foundGame){
        if((foundGame.creator === req.user.email)||(foundGame.opponent === req.user.email)){
            if(foundGame.state === "started"){
                req.game = foundGame;
                next();
            }else{
                next(MessEnum.GameTerminated);
            }
        }else{
            next(MessEnum.UnauthorizedError);
        }
    }else{ 
        next(MessEnum.GameNotFound);
    }
}

//Checks if the given grid dimension is valid
export const checkGridDimension = async (req: any, res: any, next: any) => {
    if(req.body.dimension<5){
        next(MessEnum.NotValidDimension);
    }else{
        next();
    }
}

//Checks if the user is in game and if so if it's his turn
export const checkInGameAndTurn = async (req: any, res: any, next: any) => {
    var gameDao = new GameDao();
    var foundGame = await gameDao.checkUserGame(req.user.email);
    req.game = foundGame;
    if(foundGame){
        if(foundGame.turn==req.user.email){
            next();
        }else{
            next(MessEnum.NotYourTurn);
        }
    }else{
        next(MessEnum.NotInGame)
    }
}



