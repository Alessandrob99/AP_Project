
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

export const checkNewGameBalance = async (req: any, res: any, next: any) => {
    
    var dao = new UserDao();

    var user = await dao.readUser(req.user.email)
    if(user.token_balance<0.35){
        next(MessEnum.NotEnoughTokens);
    }else{
        next();
    }
    
};



export const checkReqBody = async (req: any, res: any, next: any) => {
    
    const postBody = req.body;
    if(Object.keys(req.body).length === 0) {
        next(MessEnum.NoBodyError);
    }else{
        next();
    }
    
};


export const checkReqBodyNewGame = async (req: any, res: any, next: any) => {
    var validator = require("email-validator");
    if((typeof req.body.opponent === "string") 
    && (validator.validate(req.body.opponent) 
    && (typeof req.body.dimension === 'number'))){
            next();
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

//Checks if the user is already in game
export const checkAlreadyInGame = async (req: any, res: any, next: any) => {
    var gameDao = new GameDao()
    var foundGame = await gameDao.checkUserGame(req.user.email);
    console.log(foundGame);
    if(foundGame){
        console.log("creator in uso")
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



