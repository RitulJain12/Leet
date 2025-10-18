
const {client}=require('./reddis');
module.exports.Set=async(token)=>{
    await client.set(`Key:${token}`,`${token}`,{EX:86400});
}
module.exports.find=async(token)=>{
    const value = await client.get(`Key:${token}`);
    if(value) throw new Error({message:'Unauthorized Access Via Dead Token'});
}