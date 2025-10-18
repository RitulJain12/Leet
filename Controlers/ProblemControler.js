const {getLanguageId,SubmitBatch,SubmitToken}=require('../Utility/LanguageId');
const ProblemModel=require('../Models/Problem');
module.exports.problemCreate= async(req,res)=>{
const {title, description,  BoilerPlate, ReffSolution,complexity,  visibleTestCases, invisibleTestCases}=req.body;
try{

  for(const { language, Fullcode} of ReffSolution){
    
    const languageid=getLanguageId(language);
   
     const Submission=visibleTestCases.map((testcases)=>({
            source_code:Fullcode,
            language_id: languageid,
            stdin: testcases.input,
            expected_output: testcases.output
     }));
  

    const Submitresult= await SubmitBatch(Submission);
     //console.log(Submitresult);
    const Resulttoken = Submitresult.map((val) => val.token);
  // console.log(Resulttoken);
      const TestResult=  await SubmitToken(Resulttoken);
          for(const test of TestResult){
          if(test.status_id!=3){  console.log(test);return res.status(400).send("Error");}
          }

  }
 

  await ProblemModel.create({
    ...req.body,
    author: req.User._id
  })

 res.status(201).json({
    message:"Saved",
 })
}
catch(err){
    console.log(err.message);
    res.send("Error:"+err.message);
}


};