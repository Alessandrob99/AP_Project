import * as CoR from './middleware_components/CoR';

var express = require('express');
require('dotenv').config();
var app = express();  

app.use(CoR.checkJWT);

app.get('/',(req,res)=>{
    res.send("Hello world, im " + req.user.email)
})


app.listen(process.env.PORT);