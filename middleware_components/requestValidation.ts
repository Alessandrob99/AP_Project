
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


/*
DA FARE DOMANI
-ADATTARE I METODI DI CONTROLLO AL FATTO CHE ORA ABBIAMO UN ARRAY DI SPOSTAMENTI
-SOPRA BISOGNA AGGIUNGERE IL CONTROLLO DELLA SEQUENZA DI SPOSTAMENTI (SE SONO + DI UNO ALLORA CI SI DEVE SPOSTARE DI 2 IN 2)
*/


//Checks if the user is in game and if so if it's his turn
export const checkInGameAndTurn = async (req: any, res: any, next: any) => {
    console.log("checkInGameAndTurn");

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


function split(str, index) {
    const result = [str.slice(0, index), str.slice(index)];
  
    return result;
}

//Checks if the "move" request body is correctly formatted
export const checkReqMove = async (req: any, res: any, next: any) => {
    console.log("checkReqMove");

    ((typeof req.body.pawn === "string")&&(req.body.pawn.length>=2))? {}: next(MessEnum.BadlyFormattedBody);
    //Check that specified pawn exists and it can be moved by the user
    
    if(req.game.creator === req.user.email){
        const [wb, num] = split(req.body.pawn, 1);   
        //The second part of the string is not a number
        (isNaN(Number(num)))? next(MessEnum.BadlyFormattedBody): {};
        //This number is referring to an existing pawn
        (parseInt(num)>req.game.dimension)? next(MessEnum.BadlyFormattedBody) : {};
        //First part of the string is either "w" or "b"
        if(wb!=="w"){
            //If "b" the creator cant move it (he can only move white pawns)
            (wb==="b")? next(MessEnum.InvalidMove): next(MessEnum.BadlyFormattedBody);
        }
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
    }

    //var movesTypeIsOK = true;
    for(var m=0;m<req.body.moves.length;m++){
        if((typeof req.body.moves[m].x !== "number")||(typeof req.body.moves[m].y !== 'number')){
            next(MessEnum.BadlyFormattedBody);
        }
    }
    next();
//    (movesTypeIsOK)? next() : next(MessEnum.BadlyFormattedBody);
}

//Makes sure that the move doesn't make the pawn fall out of the grid
export const checkGridLimits = async (req: any, res: any, next: any) => {
    console.log("checkGridLimits");

 //   var areMovesInGrid = true;
    for(var m=0; m<req.body.moves.length;m++){
        if((parseInt(req.body.moves[m].x)<1)||(parseInt(req.body.moves[m].y)<1)
        ||(parseInt(req.body.moves[m].x)>req.game.dimension)||(parseInt(req.body.moves[m].y)>req.game.dimension))
        {
            next(MessEnum.BadlyFormattedBody);
        }
    }
    next();
//    (areMovesInGrid)? next(): next(MessEnum.BadlyFormattedBody);
}



//Makes sure that the destination cell is free
//This check includes the fact that the pawn is not staying in the same place
export const checkCellFree = async (req: any, res: any, next: any) => {
    console.log("checkCellFree");

   // var occupied : Boolean = false;
    //If the user selected a dame it could be possible for it to go back to the initial spot
    for(var m = 0; m<req.body.moves.length;m++){
        for(var i=0;i<req.game.dimension;i++){
            //We insert in the req the pawn object
            (req.grid.whites[i].name===req.body.pawn)? req.pawn = req.grid.whites[i]: {};
            (req.grid.blacks[i].name===req.body.pawn)? req.pawn = req.grid.blacks[i] : {};
            //The pawn must not be dead in order to cover the position
            if(((req.grid.whites[i].x===req.body.moves[m].x)&&(req.grid.whites[i].y===req.body.moves[m].y)&&(req.grid.whites[i].role!=="dead"))
            ||((req.grid.blacks[i].x===req.body.moves[m].x)&&(req.grid.blacks[i].y===req.body.moves[m].y)&&(req.grid.blacks[i].role!=="dead"))){
                if(!((req.pawn.role==="dame")&&(m!==0))){ //A dame could possibily go back to the initial spot... but not with the first move (it cant stand still)
                    next(MessEnum.InvalidMove);
                }
            }
        }
    }
    next();

}


//Checks if the destination can be reached withoud infringing any game rules
export const checkMoveReachability = async (req: any, res: any, next: any) => {
    //Check that the pawn is alive
    console.log("checkMoveReachability");
    (req.pawn.role==="dead")? next(MessEnum.InvalidMove): {};

    req.xfrom = req.pawn.x;
    req.yfrom = req.pawn.y;
    
    //Necessary to check if the pawn is white or black
    const [wb, num] = split(req.pawn.name, 1);
    var killed_pawn : any = null; //It also works as a flag to check if we already ate a pawn ( and so we cant move except for eating again)
    var moved_pawn = false;
    if(req.pawn.role==="pawn"){
        //Cell is unrachable (moving diagonally)
        for(var m=0;m<req.body.moves.length;m++){
            (((req.body.moves[m].x + req.body.moves[m].y)%2)!==0)? next(MessEnum.BadlyFormattedBody): {};
            //Since we are already scanning the array we use this loop to check if the sequence of moves is valid
                //Cant eat a dame, can eat only if the destination is 2 away diagonally with an opponent pawn in the middle   
                //For the pawn is easy cz Δy = 2 = 1 eaten, Δy=4 = 2 eaten pawns
            if(wb==="w"){
                if(((req.body.moves[m].y!==req.pawn.y+1)&&(req.body.moves[m].y!==req.pawn.y+2))
                ||((req.body.moves[m].x!==req.pawn.x+1)&&(req.body.moves[m].x!==req.pawn.x-1)
                &&(req.body.moves[m].x!==req.pawn.x+2)&&(req.body.moves[m].x!==req.pawn.x-2))){
                    console.log("Out of the allowed range");
                    next(MessEnum.InvalidMove);
                    break;
                }else{
                    //It means that we are trying to eat
                    if(req.body.moves[m].y===req.pawn.y+2){
                        //To the left or to the right?
                        if(moved_pawn){
                            console.log("Can't move again after eating a pawn or moving");
                            next(MessEnum.InvalidMove);
                            break;
                        } //Can't eat after moving
                        
                        for(var p=0;p<req.grid.blacks.length; p++){
                            killed_pawn = null;
                            if((req.grid.blacks[p].x===((req.pawn.x+req.body.moves[m].x)/2))&&(req.grid.blacks[p].y===((req.pawn.y+req.body.moves[m].y)/2))&&(req.grid.blacks[p].role==="pawn")){
                                console.log(req.pawn);
                                killed_pawn = req.grid.blacks[p];
                                req.grid.blacks[p].role="dead"; //GRID IS GOING TO BE USED TO UPDATE THE DB
                                req.grid.whites[parseInt(num)].x = req.pawn.x+2; //Update of the pawn's position in the grid
                                req.grid.whites[parseInt(num)].y = req.pawn.y+2;
                                req.pawn.x = req.body.moves[m].x; //Update our variable position
                                req.pawn.y = req.body.moves[m].y
                                console.log("Moved to");
                                console.log(req.pawn);
                                console.log("+ Killing +");
                                console.log(killed_pawn);
                                console.log("----------------------");
                                break; //Break bc if we dont stop all the pawns aligned diagonally are going to die :(
                            }
                        }
                        (killed_pawn)? {}:next(MessEnum.InvalidMove);
                    }else{//It means we are not trying to eat with the next move
                        if((killed_pawn!==null)||(moved_pawn)){
                            console.log("Can't move again after eating a pawn or moving");
                            next(MessEnum.InvalidMove)
                        }else{
                            //Move one to right or left
                            moved_pawn = true;
                            if(req.body.moves[m].x===req.pawn.x+1){//RIGHT
                                console.log(req.pawn);
                                req.grid.whites[parseInt(num)].x = req.pawn.x+1; //Update of the pawn's position in the grid
                                req.grid.whites[parseInt(num)].y = req.pawn.y+1;
                                req.pawn.x = req.body.moves[m].x; //Update our variable position
                                req.pawn.y = req.body.moves[m].y
                                console.log("Moved to");
                                console.log(req.pawn);
                                console.log("----------------------");
                            }else{//LEFT
                                console.log(req.pawn);
                                req.grid.whites[parseInt(num)].x = req.pawn.x-1; //Update of the pawn's position in the grid
                                req.grid.whites[parseInt(num)].y = req.pawn.y+1;
                                req.pawn.x = req.body.moves[m].x; //Update our variable position
                                req.pawn.y = req.body.moves[m].y
                                console.log("Moved to");
                                console.log(req.pawn);
                                console.log("----------------------");
                            }
                            
                            console.log("GAME GRID:")
                            console.log(req.grid);
                        }
                    }
                }
                if(req.pawn.y==req.game.dimension){
                    req.grid.whites[parseInt(num)-1].role = "dame";
                    console.log("w"+num+" became a dame!");
                }
            }else{ //BLACK PAWNS CONTROLLS
                
                if(((req.body.moves[m].y!==req.pawn.y-1)&&(req.body.moves[m].y!==req.pawn.y-2))
                ||((req.body.moves[m].x!==req.pawn.x+1)&&(req.body.moves[m].x!==req.pawn.x-1)
                &&(req.body.moves[m].x!==req.pawn.x+2)&&(req.body.moves[m].x!==req.pawn.x-2))){
                    console.log("Out of the allowed range");
                    next(MessEnum.InvalidMove);
                    break;
                }else{
                    //It means that we are trying to eat
                    if(req.body.moves[m].y===req.pawn.y-2){
                        //To the left or to the right?
                        if(moved_pawn){
                            console.log("Can't move again after eating a pawn or moving");
                            next(MessEnum.InvalidMove);
                            break;
                        } //Can't eat after moving
                        for(var p=0;p<req.grid.whites.length; p++){
                            killed_pawn = null;
                            if((req.grid.whites[p].x===((req.pawn.x+req.body.moves[m].x)/2))&&(req.grid.whites[p].y===((req.pawn.y+req.body.moves[m].y)/2))&&(req.grid.whites[p].role==="pawn")){
                                console.log(req.pawn);
                                killed_pawn = req.grid.whites[p];
                                req.grid.whites[p].role="dead"; //GRID IS GOING TO BE USED TO UPDATE THE DB
                                req.grid.blacks[parseInt(num)].x = req.pawn.x+2; //Update of the pawn's position in the grid
                                req.grid.blacks[parseInt(num)].y = req.pawn.y+2;
                                req.pawn.x = req.body.moves[m].x; //Update our variable position
                                req.pawn.y = req.body.moves[m].y
                                console.log("Moved to");
                                console.log(req.pawn);
                                console.log("+ Killing +");
                                console.log(killed_pawn);
                                console.log("----------------------");
                                break; //Break bc if we dont stop all the pawns aligned diagonally are going to die :(
                            }
                        }
                        (killed_pawn)? {}:next(MessEnum.InvalidMove);
                    }else{//It means we are not trying to eat with the next move
                        if((killed_pawn!==null)||(moved_pawn)){
                            console.log("Can't move again after eating a pawn or moving");
                            next(MessEnum.InvalidMove)
                        }else{
                            //Move one to right or left
                            moved_pawn = true;
                            if(req.body.moves[m].x===req.pawn.x+1){//RIGHT
                                console.log(req.pawn);
                                req.grid.blacks[parseInt(num)].x = req.pawn.x+1; //Update of the pawn's position in the grid
                                req.grid.blacks[parseInt(num)].y = req.pawn.y-1;
                                req.pawn.x = req.body.moves[m].x; //Update our variable position
                                req.pawn.y = req.body.moves[m].y
                                console.log("Moved to");
                                console.log(req.pawn);
                                console.log("----------------------");

                            }else{//LEFT
                                console.log(req.pawn);
                                req.grid.blacks[parseInt(num)].x = req.pawn.x-1; //Update of the pawn's position in the grid
                                req.grid.blacks[parseInt(num)].y = req.pawn.y-1;
                                req.pawn.x = req.body.moves[m].x; //Update our variable position
                                req.pawn.y = req.body.moves[m].y
                                console.log("Moved to");
                                console.log(req.pawn);
                                console.log("----------------------");
                            }
                            
                            console.log("GAME GRID:")
                            console.log(req.grid);
                        }
                    }
                }
                if(req.pawn.y==1){
                    req.grid.blacks[parseInt(num)-1].role = "dame";
                    console.log("b"+num+ " became a dame!")
                } 
            }
        }
    }
    if(req.pawn.role==="dame"){

        for(var m=0;m<req.body.moves.length;m++){
            (((req.body.moves[m].x + req.body.moves[m].y)%2)!==0)? next(MessEnum.BadlyFormattedBody): {};
            if(((req.body.moves[m].y!==req.pawn.y+1)&&(req.body.moves[m].y!==req.pawn.y-1)
                &&(req.body.moves[m].y!==req.pawn.y+2)&&(req.body.moves[m].y!==req.pawn.y-2))
                ||((req.body.moves[m].x!==req.pawn.x+1)&&(req.body.moves[m].x!==req.pawn.x-1)
                &&(req.body.moves[m].x!==req.pawn.x+2)&&(req.body.moves[m].x!==req.pawn.x-2))){
                    console.log("Out of the allowed range");
                    next(MessEnum.InvalidMove);
                    break;
            }
            if(wb==="w"){//WHITE DAME
            
                //It means that we are trying to eat
                if(Math.abs(req.body.moves[m].y-req.pawn.y)===2){
                    //To the left or to the right?
                    if(moved_pawn){
                        console.log("Can't move again after eating a pawn or moving");
                        next(MessEnum.InvalidMove);
                        break;
                    } //Can't eat after moving
                    
                    for(var p=0;p<req.grid.blacks.length; p++){
                        killed_pawn = null;
                        if((req.grid.blacks[p].x===((req.pawn.x+req.body.moves[m].x)/2))&&(req.grid.blacks[p].y===((req.pawn.y+req.body.moves[m].y)/2))&&((req.grid.blacks[p].role==="pawn")||(req.grid.blacks[p].role==="dame"))){
                            console.log(req.pawn);
                            killed_pawn = req.grid.blacks[p];
                            req.grid.blacks[p].role="dead"; //GRID IS GOING TO BE USED TO UPDATE THE DB
                            req.grid.whites[parseInt(num)].x = req.pawn.x+2; //Update of the pawn's position in the grid
                            req.grid.whites[parseInt(num)].y = req.pawn.y+2;
                            req.pawn.x = req.body.moves[m].x; //Update our variable position
                            req.pawn.y = req.body.moves[m].y
                            console.log("Moved to");
                            console.log(req.pawn);
                            console.log("+ Killing +");
                            console.log(killed_pawn);
                            console.log("----------------------");
                            break; //Break bc if we dont stop all the pawns aligned diagonally are going to die :(
                        }
                    }
                    (killed_pawn)? {}:next(MessEnum.InvalidMove);
                }else{//It means we are not trying to eat with the next move
                    if((killed_pawn!==null)||(moved_pawn)){
                        console.log("Can't move again after eating a pawn or moving");
                        next(MessEnum.InvalidMove)
                    }else{
                        //Move one to right or left
                        moved_pawn = true;
                        if(req.body.moves[m].y===req.pawn.y+1){//Moving upward
                            if(req.body.moves[m].x===req.pawn.x+1){//RIGHT
                                console.log(req.pawn);
                                req.grid.whites[parseInt(num)].x = req.pawn.x+1; //Update of the pawn's position in the grid
                                req.grid.whites[parseInt(num)].y = req.pawn.y+1;
                                req.pawn.x = req.body.moves[m].x; //Update our variable position
                                req.pawn.y = req.body.moves[m].y
                                console.log("Moved to");
                                console.log(req.pawn);
                                console.log("----------------------");
                            }else{//LEFT
                                console.log(req.pawn);
                                req.grid.whites[parseInt(num)].x = req.pawn.x-1; //Update of the pawn's position in the grid
                                req.grid.whites[parseInt(num)].y = req.pawn.y+1;
                                req.pawn.x = req.body.moves[m].x; //Update our variable position
                                req.pawn.y = req.body.moves[m].y
                                console.log("Moved to");
                                console.log(req.pawn);
                                console.log("----------------------");
                            }
    
                        }
                        if(req.body.moves[m].y===req.pawn.y-1){//moving downward
                            if(req.body.moves[m].x===req.pawn.x+1){//RIGHT
                                console.log(req.pawn);
                                req.grid.whites[parseInt(num)].x = req.pawn.x+1; //Update of the pawn's position in the grid
                                req.grid.whites[parseInt(num)].y = req.pawn.y-1;
                                req.pawn.x = req.body.moves[m].x; //Update our variable position
                                req.pawn.y = req.body.moves[m].y
                                console.log("Moved to");
                                console.log(req.pawn);
                                console.log("----------------------");
                            }else{//LEFT
                                console.log(req.pawn);
                                req.grid.whites[parseInt(num)].x = req.pawn.x-1; //Update of the pawn's position in the grid
                                req.grid.whites[parseInt(num)].y = req.pawn.y-1;
                                req.pawn.x = req.body.moves[m].x; //Update our variable position
                                req.pawn.y = req.body.moves[m].y
                                console.log("Moved to");
                                console.log(req.pawn);
                                console.log("----------------------");
                            }
    
                        }                        
                        console.log("GAME GRID:")
                        console.log(req.grid);
                    }
                }
            }else{//BLACK DAME
                //It means that we are trying to eat
                if(Math.abs(req.body.moves[m].y-req.pawn.y)===2){
                    //To the left or to the right?
                    if(moved_pawn){
                        console.log("Can't move again after eating a pawn or moving");
                        next(MessEnum.InvalidMove);
                        break;
                    } //Can't eat after moving
                    
                    for(var p=0;p<req.grid.whites.length; p++){
                        killed_pawn = null;
                        if((req.grid.whites[p].x===((req.pawn.x+req.body.moves[m].x)/2))&&(req.grid.whites[p].y===((req.pawn.y+req.body.moves[m].y)/2))&&((req.grid.whites[p].role==="pawn")||(req.grid.whites[p].role==="dame"))){
                            console.log(req.pawn);
                            killed_pawn = req.grid.whites[p];
                            req.grid.blacks[p].role="dead"; //GRID IS GOING TO BE USED TO UPDATE THE DB
                            req.grid.blacks[parseInt(num)].x = req.pawn.x+2; //Update of the pawn's position in the grid
                            req.grid.blacks[parseInt(num)].y = req.pawn.y+2;
                            req.pawn.x = req.body.moves[m].x; //Update our variable position
                            req.pawn.y = req.body.moves[m].y
                            console.log("Moved to");
                            console.log(req.pawn);
                            console.log("+ Killing +");
                            console.log(killed_pawn);
                            console.log("----------------------");
                            break; //Break bc if we dont stop all the pawns aligned diagonally are going to die :(
                        }
                    }
                    (killed_pawn)? {}:next(MessEnum.InvalidMove);
                }else{//It means we are not trying to eat with the next move
                    if((killed_pawn!==null)||(moved_pawn)){
                        console.log("Can't move again after eating a pawn or moving");
                        next(MessEnum.InvalidMove)
                    }else{
                        //Move one to right or left
                        moved_pawn = true;
                        if(req.body.moves[m].y===req.pawn.y+1){//Moving upward
                            if(req.body.moves[m].x===req.pawn.x+1){//RIGHT
                                console.log(req.pawn);
                                req.grid.blacks[parseInt(num)].x = req.pawn.x+1; //Update of the pawn's position in the grid
                                req.grid.blacks[parseInt(num)].y = req.pawn.y+1;
                                req.pawn.x = req.body.moves[m].x; //Update our variable position
                                req.pawn.y = req.body.moves[m].y
                                console.log("Moved to");
                                console.log(req.pawn);
                                console.log("----------------------");
                            }else{//LEFT
                                console.log(req.pawn);
                                req.grid.blacks[parseInt(num)].x = req.pawn.x-1; //Update of the pawn's position in the grid
                                req.grid.blacks[parseInt(num)].y = req.pawn.y+1;
                                req.pawn.x = req.body.moves[m].x; //Update our variable position
                                req.pawn.y = req.body.moves[m].y
                                console.log("Moved to");
                                console.log(req.pawn);
                                console.log("----------------------");
                            }
    
                        }
                        if(req.body.moves[m].y===req.pawn.y-1){//moving downward
                            if(req.body.moves[m].x===req.pawn.x+1){//RIGHT
                                console.log(req.pawn);
                                req.grid.blacks[parseInt(num)].x = req.pawn.x+1; //Update of the pawn's position in the grid
                                req.grid.blacks[parseInt(num)].y = req.pawn.y-1;
                                req.pawn.x = req.body.moves[m].x; //Update our variable position
                                req.pawn.y = req.body.moves[m].y
                                console.log("Moved to");
                                console.log(req.pawn);
                                console.log("----------------------");
                            }else{//LEFT
                                console.log(req.pawn);
                                req.grid.blacks[parseInt(num)].x = req.pawn.x-1; //Update of the pawn's position in the grid
                                req.grid.blacks[parseInt(num)].y = req.pawn.y-1;
                                req.pawn.x = req.body.moves[m].x; //Update our variable position
                                req.pawn.y = req.body.moves[m].y
                                console.log("Moved to");
                                console.log(req.pawn);
                                console.log("----------------------");
                            }
    
                        }                        
                        console.log("GAME GRID:")
                        console.log(req.grid);
                    }
                }
            }
        }
    }
    next();
}

