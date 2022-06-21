const {Kafka} =require("kafkajs");

const topic_name=process.argv[2]|| "Logs2";
const _partition=process.argv[3]|| 0;
createProducer();

async function createProducer(){
try{
    //Admin stuff
    const kafka =new Kafka({
        clientId:"kafka_example",
        brokers:["localhost:9092"]
         
    });
    const producer =kafka.producer();
    console.log("Producer Connection");

    await producer.connect();
    console.log("Producer Connected");
    const message_result=await producer.send({
        topic:topic_name,
        messages:[{
            value:"Log message",
            partition:_partition
        }]
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