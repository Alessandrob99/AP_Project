import * as CoR from './middleware_components/CoR';
import { messageLogger } from './middleware_components/MessLog';
import * as adminController from './Controllers/adminController';
import * as userController from './Controllers/userController';


var express = require('express');

require('dotenv').config();

var bodyParser = require('body-parser');


var app = express();  
app.use(bodyParser.json());
app.use(CoR.JWTCheck);

app.post('/createGame', [CoR.userAccountAndBalanceCheck,CoR.newGameVal],
    async (req,res,next) => {
        userController.newGame(req,res,next);
    }
);

app.get('/admin', CoR.adminCheck , (req,res)=>{
    res.send("Sono admin")
})

//route that only the admin can use in order to update a specific user token balance
app.post('/token', [CoR.adminCheck,CoR.newTokenBalanceVal], 
    async (req,res,next) => {
        adminController.newTokenBalance(req,res,next);
    }
);

app.use(messageLogger);

app.listen(process.env.PORT);