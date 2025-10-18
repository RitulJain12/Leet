 const jwt=require('jsonwebtoken');
 require('dotenv').config();
 const Usermodel=require('../Models/Usermodel')
 const {find}=require('../Blacklisted/blockedjwt');
module.exports.adminAuth=async(req,res,next)=>{
try{
   const {token}=req.cookies;
   if(!token)  if(!token) return res.status(401).json({message:'Unauthorized'});
       const IsPresent= await find(token);
       if(IsPresent) return res.status(401).json({message:'Blocked Token'});
      const payload=jwt.verify(token,process.env.PASS_KEY);
     const {role,_id}=payload;
   if(role=='user') return res.status(401).json({message:'Unauthorized Admin'});
   const User=await Usermodel.findById({_id});
   if(!User) res.status(401).json({message:"User Not found"});
   req.User=User;
  next();
}
catch(err){
    console.log(err.message);
    res.status(401).json({message:"Unauthorized"});
}
}