import * as CoR from './middleware_components/CoR';
import { messageLogger } from './middleware_components/MessLog';
import * as adminController from './Controllers/adminController';
import * as userController from './Controllers/userController';
import { MessFactory , MessEnum } from "./Logging_Factory/MessFactory";
import { checkUserEmail } from './middleware_components/user_validation';
import { checkUserEmailNoCreate, checkUserInGame } from './middleware_components/requestValidation';


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


//Rotta quit in post e query string

app.use(CoR.JWTCheck);

app.post('/game', [CoR.userAccountAndBalanceCheck, CoR.newGameVal],
    async (req,res,next) => {
        userController.newGame(req,res,next);
    }
);

app.post('/:id/quit',checkUserInGame, 
    async (req,res,next) => {
        userController.quitGame(req,res,next);
    }
);

app.get('/stats/:email',checkUserEmailNoCreate,
    async (req,res,next) => {
        userController.getStats(req,res,next);
    }
);

//Here there is no Token balance check since the credit can go below 0 while playing a game
app.post('/move',[checkUserEmail, CoR.moveCheck] ,
    async (req,res,next) => {
        userController.move(req,res,next);
    }
);

//con query string
app.get('/gameInfo/:id',[CoR.userAccountAndBalanceCheck],
    async (req,res,next) => {
        userController.getGameInfo(req,res,next);
    }
);

//Con query string
app.get('/gameMoves/:id/:format?',[CoR.userAccountAndBalanceCheck],
    async (req,res,next) => {
        userController.getGameMoves(req,res,next);
    }
);

//route that only the admin can use in order to update a specific user token balance
app.post('/token', [CoR.adminCheck,CoR.newTokenBalanceVal], 
    async (req,res,next) => {
        adminController.newTokenBalance(req,res,next);
    }
);

app.get('/tokenBalance', [],
    async(req,res,next) => {
        userController.getTokenBalance(req,res,next);
    }
);


//Route not found
app.get('*', function(req, res,next){
    next(MessEnum.RouteNotFound);
  });

app.use(messageLogger);

app.listen(process.env.PORT);