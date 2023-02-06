import * as CoR from './middleware_components/CoR';
import { messageLogger } from './middleware_components/MessLog';
import * as adminController from './Controllers/adminController';
import * as userController from './Controllers/userController';
import { MessFactory , MessEnum } from "./Logging_Factory/MessFactory";
import { checkUserEmail } from './middleware_components/user_validation';


var express = require('express');

require('dotenv').config();

var bodyParser = require('body-parser');


var app = express();  
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
app.use(CoR.JWTCheck);

app.post('/game', [CoR.userAccountAndBalanceCheck, CoR.newGameVal],
    async (req,res,next) => {
        userController.newGame(req,res,next);
    }
);

//Here there is no Token balance check since the credit can go below 0 while playing a game
app.post('/move',[checkUserEmail, CoR.moveCheck] ,
    async (req,res,next) => {
        userController.move(req,res,next);
    }
);

app.get('/gameInfo',[CoR.userAccountAndBalanceCheck],
    async (req,res,next) => {
        userController.getGameInfo(req,res,next);
    }
);

app.get('/gameMoves',[CoR.userAccountAndBalanceCheck],
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

app.use(messageLogger);

app.listen(process.env.PORT);