
import { UserDao } from "../Model/UserDAO";

import { MessEnum } from '../Logging_Factory/MessFactory';

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


export const checkReqBody = async (req: any, res: any, next: any) => {
    
    const postBody = req.body;
    if(Object.keys(req.body).length === 0) {
        next(MessEnum.NoBodyError);
    }else{
        next();
    }
    
};

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


