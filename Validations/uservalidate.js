const validator=require('validators');

function Validations(data){
try{
    const {email,password, firstname,role}=data;
    if(!email||!password||!firstname||!role) throw new Error("Mandatory Field Missing");
    if(!validator.isEmail(email)) throw new Error("Invalid Mail");
    if(!validator.isStrongPasswoed(password)) throw new Error("Weak password");
}
catch(err){
  console.log(err);
}
}
  module.exports=Validations;