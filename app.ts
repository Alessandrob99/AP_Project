import * as CoR from './middleware_components/CoR';
import { messageLogger } from './middleware_components/MessLog';
import * as adminController from './Controllers/adminController';

var express = require('express');

require('dotenv').config();

var bodyParser = require('body-parser');


var app = express();  
app.use(bodyParser.json());


app.get('/', CoR.userJWT,(req,res)=>{
    res.send("Bella so rriato")
})

app.get('/admin', CoR.adminJWT , (req,res)=>{
    res.send("Bella so rriato pero admin")
})

//route that only the admin can use in order to update a specific user token balance
app.post('/token', [CoR.adminJWT,CoR.newTokenBalanceVal] , async (req,res,next) => {adminController.newTokenBalance(req,res,next)});

app.use(messageLogger);

app.listen(process.env.PORT);