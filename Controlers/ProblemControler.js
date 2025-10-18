const {getLanguageId,SubmitBatch}=require('../Utility/LanguageId');

module.exports.problemCreate= async(req,res)=>{
const {title, description,  BoilerPlate, ReffSolution,complexity,  visibleTestCases, invisibleTestCases}=req.body;
try{

  for(const { language, Fullcode} of ReffSolution){
    
    const languageid=getLanguageId(language);
    
     const Submission=visibleTestCases.map((input,output)=>({
            source_code:Fullcode,
            language_id: languageid,
            stdin: input,
            expected_output: output
     }));
    const Submitresult= await SubmitBatch(Submission);
     
  }

}
catch(err){
    console.log(err.message);
}


};