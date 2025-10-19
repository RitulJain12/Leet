const ProblemModel=require('../Models/Problem');
const Submission=require('../Models/Submission');
const {getLanguageId,SubmitBatch,SubmitToken}=require('../Utility/LanguageId');
module.exports.SubmitProblem=async(req,res)=>{

try{
 const userId=req.user._id;
 const  problemId=req.params.id;
const {code,language}=req.body;

if(!userId||!code||!problemId||!language) return res.status(400).send("Some Field Missing");
   const Problem=await ProblemModel.findById(problemId);
   if(!Problem) return  res.status(404).send("Problem Not FOund");
   const Submit=Submission.create({
         userId,
         problemId,
         code,
         language,
         testCasesPassed:0,
         status:'Pending',
         totalTestCases:  Problem.invisibleTestCases.length+Problem.visibleTestCases.length

   });
   const languageid=getLanguageId(language);
   const submissions=Problem.invisibleTestCases.map((testcase)=>({

    source_code:code,
    language_id: languageid,
    stdin: testcase.input,
    expected_output: testcase.output
   }))

   
   const Submitresult= await SubmitBatch(submissions);
   //console.log(Submitresult);
  const Resulttoken = Submitresult.map((val) => val.token);
// console.log(Resulttoken);
const TestResult=  await SubmitToken(Resulttoken);
const testCasesPassed=0;
const runtime=0,memory=0,status="Accepted",errorMessage=null;
for(const test of TestResult){

    if(test.status._id==3){
    testCasesPassed++;
    runtime+=parseFloat(time);
    memory=Math.max(memory,test.memory); 
}
else{
 if(test.status_id==4) {status='error'; errorMessage=test.stderr}
 else {status='wrong'; errorMessage=test.stderr}

}

} 
(await Submit).errorMessage=errorMessage;
(await Submit).status=status;
(await Submit).testCasesPassed=testCasesPassed;
  await Submit.save();
res.status(201).send(Submit);

}
catch(err){
    console.log(err);
    res.status(500).send(err);
}

}