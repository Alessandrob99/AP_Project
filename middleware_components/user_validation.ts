
//Importing all the libraries necessary to carry out validation tasks

require('dotenv').config();
import * as jwt from 'jsonwebtoken';
import { UserDao } from "../Model/UserDAO";



export const checkHeader = (req: any, res: any, next: any) => {    
    const authHeader = req.headers.authorization;
    if(authHeader){
        next();
    } else {
        //Da usare errori geenrati con factory§
        res.send("Errore, header non presente");
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
        //Da usare errori geenrati con factory§
        res.send("Errore, token non presente");    
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
        //Da usare errori geenrati con factory§
        res.send("Errore, token non valido");   
    }
};

//Checks is all the information included in the request has the correct form
//and if the user exists in the database, if not a new user is registered
export const checkJwtPayload = (req: any, res: any, next: any) => {
    var validator = require("email-validator");
    if(
        (req.user.role === 1 || req.user.role === 2) 
        && (typeof req.user.email === "string") && (validator.validate(req.user.email))){
            next();
    }else{
        res.send("Corpo della richiesta mal formato")
    }
};

export const checkUserEmail = async (req: any, res: any, next: any) => {
    
    var dao = new UserDao();
    //If the (now authenticated) user doesn't exist in the db, a new user record is created
    var user = await dao.readUser(req.user.email)
    if(!user){
        await dao.createUser(req.user.email)
        //TBD LOG USER CREATED MESSAGE
    }
    next();

};




