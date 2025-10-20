const ProblemModel=require('../Models/Problem');
const UserModel=require('../Models/Usermodel');
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
   const Submit= await Submission.create({
         userId,
         problemId,
         code,
         language,
         testCasesPassed:0,
         status:'Pending',
         totalTestCases:  Problem.invisibleTestCases.length+Problem.visibleTestCases.length

   });
   const languageid=getLanguageId(language);
   const submissions=Problem.visibleTestCases.map((testcase)=>({

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
let testCasesPassed=0;
let runtime=0,memory=0,status="Accepted",errorMessage=null;
for(const test of TestResult){
      console.log(test);
    if(test.status_id==3){
    testCasesPassed++;
    runtime+=parseFloat(test.time);
    memory=Math.max(memory,test.memory); 
}
else{
 if(test.status_id==4) {status='error'; errorMessage=test.stderr}
 else {status='wrong'; errorMessage=test.stderr}

}

} 
console.log("Saho he");
 Submit.errorMessage=errorMessage;
 Submit.status=status;
 Submit.testCasesPassed=testCasesPassed;
   await Submit.save();

const User=req.user;

if(!User.ProblemSolved.includes(problemId)) User.ProblemSolved.push(problemId);

await User.save();
console.log(User.ProblemSolved[0]
);

res.status(201).send(Submit);

}
catch(err){
    console.log(err);
    res.status(500).send(err);
}

}
module.exports.RunProblem=async(req,res)=>{

  try{
   const userId=req.user._id;
   const  problemId=req.params.id;
  const {code,language}=req.body;
  
  if(!userId||!code||!problemId||!language) return res.status(400).send("Some Field Missing");
     const Problem=await ProblemModel.findById(problemId);
     if(!Problem) return  res.status(404).send("Problem Not FOund");
     const Submit= await Submission.create({
           userId,
           problemId,
           code,
           language,
           testCasesPassed:0,
           status:'Pending',
           totalTestCases:  Problem.invisibleTestCases.length+Problem.visibleTestCases.length
  
     });
     const Testcases=[];
     const languageid=getLanguageId(language);
     const submissions=Problem.visibleTestCases.map((testcase)=>({
      source_code:code,
      language_id: languageid,
      stdin: testcase.input,
      expected_output: testcase.output
     }))
  
     
     const Submitresult= await SubmitBatch(submissions);
    const Resulttoken = Submitresult.map((val) => val.token);
  const TestResult=  await SubmitToken(Resulttoken);
     for( const test of TestResult ){
      const obj={};
      obj.input=test.stdin;
      obj.expected_output=test.expected_output;
      obj.stdout=test.stdout;
      obj.result=test.status.description
      obj.resultId=test.status.id;
      Testcases.push(obj);
     }
    
  res.status(201).send(Testcases);
  
  }
  catch(err){
      console.log(err);
      res.status(500).send(err);
  }
  
  }