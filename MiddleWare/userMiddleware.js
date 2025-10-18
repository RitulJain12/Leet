const { use } = require('../app');
const {Set,find}=require('../Blacklisted/blockedjwt');
const Usermodel=require('../Models/Usermodel');
const jwt=require('jsonwebtoken');
require('dotenv').config();
module.exports.UserLogout=async(req,res,next)=>{
try{
   const {token}=req.cookies;
   if(!token)  if(!token) return res.status(401).json({message:'Unauthorized'});
   await Set(token);
   res.cookie("token", null, {
    expires: new Date(Date.now()) 
  });
  next();
}
catch(err){
    console.log(err.message);
    res.status(401).json({message:"Unauthorized"});
}
};

module.exports.UserPro=async(req,res,next)=>{
  try{

   const token=req.cookies.token;   
    if(!token) return res.status(401).json({message:'Unauthorized'});
    const IsPresent= await find(token);
    if(IsPresent) return res.status(401).json({message:'Unauthordddized'});

    const Verify=await jwt.verify(token,process.env.PASS_KEY);
    const {email}=Verify;
     const user= await Usermodel.findOne({email});
     console.log(user);
    if(!user) return res.status(401).json({message:'User Does Not exist'});

   req.user=user;

    next();
 }
 catch(err){
    console.log(err);
    res.status(401).json({message:'Unauthorized'});
 }
  };