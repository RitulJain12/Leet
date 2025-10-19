const express=require('express');
const SubRouter=express.Router();
const {UserPro}=require('../MiddleWare/userMiddleware')
const {SubmitProblem}=require('../Controlers/Sub');
SubRouter.post('/submit/:id',UserPro,SubmitProblem);

module.exports=SubRouter;