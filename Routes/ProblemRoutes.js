const express=require('express');
const ProblemRouter=express.Router();
ProblemRouter.post('/create',problemCreate);
ProblemRouter.patch('/:id', problemUpdate);
 ProblemRouter.delete('/:id',problemDelete);
   /*Below Apis Can be Hit By User Also*/
 ProblemRouter.get('/:id',problemFetch);
 ProblemRouter.get('/',getAllProblem);
ProblemRouter.get('/user',problemSolved);

module.exports=ProblemRouter;