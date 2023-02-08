
import { UserDao } from "../Model/UserDAO";

import { MessEnum } from '../Logging_Factory/MessFactory';
import { GameDao } from "../Model/GameDAO";
import { spliceStr } from "sequelize/types/utils";

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



export const checkUserEmailNoCreate = async (req: any, res: any, next: any) => {
    var userDao = new UserDao()
    var foundUser = await userDao.readUser(req.params.email);
    if(foundUser){
        next();
    }else{ 
        next(MessEnum.UserNotFound);
    }
}


//MOVES VALIDATIONS--------------------------------------

//Checks if the user is in game and if so if it's his turn
export const checkInGameAndTurn = async (req: any, res: any, next: any) => {
    var gameDao = new GameDao();
    var foundGame = await gameDao.checkUserGame(req.user.email);
    if(foundGame){
        if(foundGame.turn==req.user.email){
            req.game = foundGame;
            req.grid = JSON.parse(foundGame.positions);
            req.game.dimension = req.grid.whites.length
            next();
        }else{
            next(MessEnum.NotYourTurn);
        }
    }else{
        next(MessEnum.NotInGame)
    }
}

//Checks if the "move" request body is correctly formatted
export const checkReqMove = async (req: any, res: any, next: any) => {
    if((typeof req.body.pawn === "string") 
    && (typeof req.body.x === "number") 
    && (typeof req.body.y === 'number')){
            //Check that specified pawn exists and is not dead and it can be moved by the user
            if(req.game.creator === req.user.email){
                const [wb, num] = split(req.body.pawn, 1);   
                //The second part of the string is a number
                (isNaN(Number(num)))? next(MessEnum.BadlyFormattedBody): {};
                //This number is referring to an existing pawn
                (parseInt(num)>req.game.dimension)? next(MessEnum.BadlyFormattedBody) : {};
                //First part of the string is either "w" or "b"
                if(wb!=="w"){
                    //If "b" the creator cant move it (he can only move white pawns)
                    (wb==="b")? next(MessEnum.InvalidMove): next(MessEnum.BadlyFormattedBody);
                }
                next();
            }
            if(req.game.opponent === req.user.email){
                const [wb, num] = split(req.body.pawn, 1);   
                //The second part of the string is a number
                (isNaN(Number(num)))? next(MessEnum.BadlyFormattedBody): {};
                //This number is referring to an existing pawn
                (parseInt(num)>req.game.dimension)? next(MessEnum.BadlyFormattedBody) : {};
                //First part of the string is either "w" or "b"
                if(wb!=="b"){
                    //If "w" the opponent cant move it (he can only move black pawns)
                    (wb==="w")? next(MessEnum.InvalidMove): next(MessEnum.BadlyFormattedBody);
                }
                next();
            }
            next();
    }else{
        next(MessEnum.BadlyFormattedBody);
    }
}

//Makes sure that the move doesn't make the pawn fall out of the grid
export const checkGridLimits = async (req: any, res: any, next: any) => {
    if((parseInt(req.body.x)<1)||(parseInt(req.body.y)<1)){
        next(MessEnum.InvalidMove);
    }else{
        if((parseInt(req.body.x)>req.game.dimension)||(parseInt(req.body.y)>req.game.dimension)){
            next(MessEnum.InvalidMove);
        }else{
            next();
        }
    }
}

function split(str, index) {
    const result = [str.slice(0, index), str.slice(index)];
  
    return result;
  }
