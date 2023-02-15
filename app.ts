import * as CoR from './Middleware_Components/CoR';
import { messageLogger } from './Middleware_Components/MessLog';
import * as adminController from './Controllers/adminController';
import * as userController from './Controllers/userController';
import { MessFactory , MessEnum } from "./Logging_Factory/MessFactory";
import { checkUserEmail } from './Middleware_Components/user_validation';
import { checkUserEmailNoCreate, checkUserInGame } from './Middleware_Components/requestValidation';


var express = require('express');

require('dotenv').config();

var bodyParser = require('body-parser');

var app = express(); 


//Checks if the json passed in the request body has the correct json format
//Note: doesn't check the type and format of the several fields in the json!
app.use(bodyParser.json({
    verify : (req, res, buf, encoding) => {
        try {
            JSON.parse(buf);
        } catch(e) {
            var concreteFactory : MessFactory = new MessFactory();
            var messageOb = concreteFactory.getMessage(MessEnum.BadlyFormattedBody);
            var message = messageOb.getMess();
            var status = messageOb.getCode();
            console.log(message)
            res.status(status).json({Status : status, Description: message});
        }
      }
}));


//JWT Token authentication done for all routes, w/o a token it'll be impossible to use the app
app.use(CoR.JWTCheck);

//=================================ROUTES========================================//

//Creates a new game pointing out the opponent's email and the grid dimension(>=5)
app.post('/game', [CoR.userAccountAndBalanceCheck, CoR.newGameVal],
    async (req,res,next) => {
        userController.newGame(req,res,next);
    }
);

//The user abandons the game he/her is playing in, resulting in a loss
app.post('/:id/quit',[checkUserInGame,CoR.userAccountAndBalanceCheck], 
    async (req,res,next) => {
        userController.quitGame(req,res,next);
    }
);

//Calculates the number of wins for each player and makes a list, order = 'asc' makes an ascending list
app.get('/ranking/:order?', [CoR.userAccountAndBalanceCheck],
    async (req,res,next) => {
        userController.getRanking(req,res,next);
    }
);

//Get stats about a player (indicated by email)
app.get('/stats/:email',[checkUserEmailNoCreate,CoR.userAccountAndBalanceCheck],
    async (req,res,next) => {
        userController.getStats(req,res,next);
    }
);

//Make a new move in the game the user is playing at the moment
//Here there is no Token balance check since the credit can go below 0 while playing a game
app.post('/move',[checkUserEmail, CoR.moveCheck] ,
    async (req,res,next) => {
        userController.move(req,res,next);
    }
);

//Get game general info (Game indicated by the numeric id) 
app.get('/gameInfo/:id',[CoR.userAccountAndBalanceCheck],
    async (req,res,next) => {
        userController.getGameInfo(req,res,next);
    }
);
//Get the list of moves done in a game by both players (format = 'csv' returns a csv (string), anything else returns a json)
app.get('/gameMoves/:id/:format?',[CoR.userAccountAndBalanceCheck],
    async (req,res,next) => {
        userController.getGameMoves(req,res,next);
    }
);
//Route that only the admin can use in order to update a specific user token balance
app.post('/token', [CoR.adminCheck,CoR.newTokenBalanceVal], 
    async (req,res,next) => {
        adminController.newTokenBalance(req,res,next);
    }
);
//Returns the user's token balance
app.get('/tokenBalance', [checkUserEmail],
    async(req,res,next) => {
        userController.getTokenBalance(req,res,next);
    }
);

//Route not found
app.get('*', function(req, res,next){
    next(MessEnum.RouteNotFound);
  });

//Prints the messages returned by the CoR methods
app.use(messageLogger);

app.listen(process.env.PORT);