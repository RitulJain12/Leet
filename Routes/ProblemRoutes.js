const express=require('express');
const ProblemRouter=express.Router();
const {adminAuth}=require('../MiddleWare/AdminReg');
const {problemCreate}=require('../Controlers/ProblemControler');
ProblemRouter.post('/create',adminAuth,problemCreate);
// ProblemRouter.patch('/:id', problemUpdate);
//  ProblemRouter.delete('/:id',problemDelete);
//    /*Below Apis Can be Hit By User Also*/
//  ProblemRouter.get('/:id',problemFetch);
//  ProblemRouter.get('/',getAllProblem);
// ProblemRouter.get('/user',problemSolved);

module.exports=ProblemRouter;