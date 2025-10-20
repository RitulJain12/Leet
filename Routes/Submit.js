const express=require('express');
const SubRouter=express.Router();
const {UserPro}=require('../MiddleWare/userMiddleware')
const {SubmitProblem,RunProblem}=require('../Controlers/Sub');
SubRouter.post('/submit/:id',UserPro,SubmitProblem);
SubRouter.post('/run/:id',UserPro,RunProblem);
module.exports=SubRouter;