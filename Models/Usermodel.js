const mongoose=require('mongoose');
const {Schema}=mongoose;
const bcrypt=require('bcrypt');
const jwtt=require('jsonwebtoken');
require('dotenv').config();
const UserSchema=new Schema({
      
    firstname:{
        type:String,
        required:true,
        minLength:3,
        maxLength:13,
    },
    lastname:{
        type:String,
       
        minLength:3,
        maxLength:13,
    },
    email:{
        type:String,
        required:true,
        unique:true,
        trim:true,
        lowercase:true,
        immutable:true
    },
    age:{
        type:Number,
        min:6,
        max:80,
    },
    role: {
        type:String,
        enum: ['user', 'admin'],
        default: 'user'
    },
    
    ProblemSolved:{
        type:[String]
    },
    password:{
        type:String,
        required:true,
        minLength:3,
    }


},{timestamps:true});

UserSchema.methods.jwt=(_id,email,role)=>{
const token=jwtt.sign({_id,email,role},process.env.PASS_KEY,{expiresIn:86400});
return token;
};
UserSchema.statics.hashpass=async(password)=>{
    const pass=await bcrypt.hash(password,10);
    return pass;
}
UserSchema.methods.Compare=async(pass,password)=>{
     const Istrue=await bcrypt.compare(pass,password);
     return Istrue;
}

const User=mongoose.model("User",UserSchema);
module.exports=User;