const express=require('express');
const ProblemRouter=express.Router();
const {adminAuth}=require('../MiddleWare/AdminReg');
const {UserPro}=require('../MiddleWare/userMiddleware')
const {problemCreate,problemUpdate,problemDelete,problemFetch,getAllProblem,problemSolved}=require('../Controlers/ProblemControler');
ProblemRouter.post('/create',adminAuth,problemCreate);
 ProblemRouter.put('/update/:id',adminAuth, problemUpdate);
  ProblemRouter.delete('/delete/:id',adminAuth,problemDelete);
//    /*Below Apis Can be Hit By User Also*/
  ProblemRouter.get('/getProblembyID/:id',UserPro,problemFetch);
  ProblemRouter.get('/getAllProblem',UserPro,getAllProblem);
  ProblemRouter.get('/getSolvedProblems',UserPro,problemSolved);

module.exports=ProblemRouter;