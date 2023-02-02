import * as CoR from './middleware_components/CoR';

var express = require('express');
require('dotenv').config();
var app = express();  



app.get('/', CoR.userJWT,(req,res)=>{
    res.send("Hello world, im " + req.user.email)
})

app.get('/admin', CoR.adminJWT , (req,res)=>{
    res.send("Hello Lord commander " + req.user.email)
})

app.listen(process.env.PORT);