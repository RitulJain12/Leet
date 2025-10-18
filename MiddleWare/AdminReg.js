 const jwt=require('jsonwebtoken');
 require('dotenv').config();
 const {find}=require('../Blacklisted/blockedjwt');
module.exports.adminAuth=async(req,res,next)=>{
try{
   const {token}=req.cookies;
   if(!token)  if(!token) return res.status(401).json({message:'Unauthorized'});
       const IsPresent= await find(token);
       if(IsPresent) return res.status(401).json({message:'Blocked Token'});
      const payload=jwt.verify(token,process.env.PASS_KEY);
     const {role}=payload;
   if(role=='user') return res.status(401).json({message:'Unauthorized Admin'});

  next();
}
catch(err){
    console.log(err.message);
    res.status(401).json({message:"Unauthorized"});
}
}