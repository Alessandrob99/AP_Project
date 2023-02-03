import * as CoR from './middleware_components/CoR';
import { messageLogger } from './middleware_components/MessLog';

var express = require('express');
require('dotenv').config();
var app = express();  



app.get('/', CoR.userJWT,(req,res)=>{
    res.send("Bella so rriato")
})

app.get('/admin', CoR.adminJWT , (req,res)=>{
    res.send("Bella so rriato pero admin")
})


app.listen(process.env.PORT);