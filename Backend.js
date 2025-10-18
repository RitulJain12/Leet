
require('dotenv').config();
const Connect=require('./Database/db');
const app=require('./app');
const {Cnct}=require('./Blacklisted/reddis');
 Connect()
 .then( async ()=>{
    await Cnct();
     app.listen(process.env.PORT,()=>{
        console.log("Listening");
    })
 }).catch((err)=> console.log(err.message));