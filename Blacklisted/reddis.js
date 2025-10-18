const {createClient}=require('redis');
const client = createClient({
    username: 'default',
    password: 'EJzm0Sz9Im7BOrNQcGQANzjI1iinvdVH',
    socket: {
        host: 'redis-18864.crce179.ap-south-1-1.ec2.redns.redis-cloud.com',
        port: 18864
    }
});
module.exports.Cnct= async()=>{
    await client.connect();
    console.log("Connected::");
  }

module.exports.client=client;

