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
module.exports.problemUpdate= async(req,res)=>{
  const {id}=req.params;
  //console.log(id);
  try{
      if(!id) return res.status(400).json({message:"Invalid Request"});
      const IsPresent= await ProblemModel.findById(id);
      if(!IsPresent) return res.status(404).json({message:"Problem Not Found"});
      //console.log(IsPresent);
    const {title, description,  BoilerPlate, ReffSolution,complexity,  visibleTestCases, invisibleTestCases}=req.body;
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
   
  
  const UpdatedPro= await ProblemModel.findByIdAndUpdate(id,{...req.body},{runValidators:true ,new:true});
  
   res.status(201).json({
      message:"Saved",
      profile:UpdatedPro
   })
  }
  catch(err){
      console.log(err.message);
      res.send("Error:"+err.message);
  }
  
  };
  module.exports.problemDelete= async(req,res)=>{
      const {id}=req.params;
      //console.log(id);
      try{
          if(!id) return res.status(400).json({message:"Invalid Request"});
          const IsPresent= await ProblemModel.findByIdAndDelete(id);
          if(!IsPresent) return res.status(404).json({message:"Problem Not Found"});
          res.status(201).json({message:"Success"});
      }
    catch(err){
        console.log(err.message);
        res.send("Error:"+err.message);
    }
    
    };
    module.exports.problemFetch= async(req,res)=>{
      const {id}=req.params;
      //console.log(id);
      try{
          if(!id) return res.status(400).json({message:"Invalid Request"});
          const IsPresent= await ProblemModel.findById(id).select('-author -__v -invisibleTestCases');
          if(!IsPresent) return res.status(404).json({message:"Problem Not Found"});
          res.status(201).json({message:"Success",id:IsPresent});
      }
    catch(err){
        console.log(err.message);
        res.send("Error:"+err.message);
    }
    
    };
    module.exports.getAllProblem= async(req,res)=>{
      try{
          ///console.log(req.query);
          // Difficult and coustamize krna he
         const {page}=req.query;
          const Probs= (await ProblemModel.find().select("-author -__v -invisibleTestCases").skip((page-1)*5).limit(5));
          if(Probs.length==0)   return res.status(404).json({message:"UnSuccessas"});
          res.status(201).json({message:"Successas", Probs});
      }
    catch(err){
        console.log(err.message);
        res.send("Error:"+err.message);
    }
    
    };
    // module.exports.problemSolved= async(req,res)=>{
    //   const {id}=req.params;
    //   //console.log(id);
    //   try{
    //       if(!id) return res.status(400).json({message:"Invalid Request"});
    //       const IsPresent= await ProblemModel.findByIdAndDelete(id);
    //       if(!IsPresent) return res.status(404).json({message:"Problem Not Found"});
    //       res.status(201).json({message:"Success"});
    //   }
    // catch(err){
    //     console.log(err.message);
    //     res.send("Error:"+err.message);
    // }
    
    // };