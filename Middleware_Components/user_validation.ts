
//Importing all the libraries necessary to carry out validation tasks

require('dotenv').config();
import * as jwt from 'jsonwebtoken';
import { UserDao } from "../Model/UserDAO";

import { MessEnum } from '../Logging_Factory/MessFactory';

export const checkHeader = (req: any, res: any, next: any) => {    
    const authHeader = req.headers.authorization;
    if(authHeader){
        next();
    } else {
        next(MessEnum.NoHeaderError);
    }   
};

export const checkJWToken = (req: any, res: any, next: any) => {    
    try {
        const bearerHeader = req.headers.authorization;
        if (typeof bearerHeader !== 'undefined') {
            const bearerToken = bearerHeader.split(' ')[1];
            req.token = bearerToken;
            next();
        }
    } catch (err) {
        next(MessEnum.NoHJWTError);   
    } 
};

/*
Method aimed at verifying that the token is correct
This operation is carried out using the secret key (in the .env file) used to encode the token
*/
export const verifyAndAuthenticate = (req: any, res: any, next: any) => {
    try{
        let decoded = jwt.verify(req.token, process.env.SECR_KEY);
        if(decoded !== null){
            req.user = decoded;
            next();
        }
    }catch(error){
        next(MessEnum.InvalidJWDError);
    }
};


//Checks is all the information included in the request has the correct form
//and if the user exists in the database, if not a new user is registered
export const checkJwtPayload = (req: any, res: any, next: any) => {
    const validator = require("email-validator");
    if((req.user.role === 1 || req.user.role === 2) 
        && (typeof req.user.email === "string") && (validator.validate(req.user.email))){
            next();
    }else{
        next(MessEnum.JwtClaimsError);
    }
};



/*
This method was aimed at checking whether a user existed in the the db or not
If not a new record was created. This controll is done for every user route
So whenever someone is authenticated through a token a this user has never been seen before,
a new user profile is automatically created in the DB.
Edit: I had to remove the Message sent when a user was created because fsr it caused the 
CoR to be cut right after that
*/
export const checkUserEmail = async (req: any, res: any, next: any) => {
    var dao = new UserDao();
    //If the (now authenticated) user doesn't exist in the db, a new user record is created
    var user = await dao.readUser(req.user.email)
    if(!user){
        await dao.createUser(req.user.email)
        next();
    }else{
        next();
    }
    
};

//Checking if the user has the role of admin (2)
export const checkAdminEmail = (req: any, res: any, next: any) => {
    if(req.user.role!==2){
        next(MessEnum.UnauthorizedError);
    }else{
        next();
    }
}




