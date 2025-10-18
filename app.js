const cookieParser = require('cookie-parser');
const express=require('express');
const app=express();
app.use(express.json());
app.use(cookieParser());
const Router=require('./Routes/userAuth');
app.use('/user',Router);
module.exports=app;