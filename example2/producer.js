const {Kafka} =require("kafkajs");
const log_data = require("./data.json");

createProducer();

async function createProducer(){
try{
    //Admin stuff
    const kafka =new Kafka({
        clientId:"kafka_log_store_client",
        brokers:["localhost:9092"]
         
    });
    const producer =kafka.producer();
    console.log("Producer Connection");
    await producer.connect();
    console.log("Producer Connected");
    let _message = log_data.map(item=>{
        return {
            value:JSON.stringify(item),
            partition:item.type=="system"?0:1
        }
    })


    const message_result=await producer.send({
        topic:"LogStore",
        messages: _message
    })
console.log("Message sent",JSON.stringify(message_result));
await producer.disconnect();

}catch(err){
    console.log("Error",err);
}
finally{
    process.exit(0)
}
}