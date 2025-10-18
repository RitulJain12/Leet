const  mongoose=require('mongoose')
require('dotenv').config();
async function  Connect(){
try {
     await  mongoose.connect(process.env.KEY);
      console.log("Connected Succesfully");
 }
 catch(err){
    console.log(err)
 }
};
module.exports=Connect;