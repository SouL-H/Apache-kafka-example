const {Kafka} =require("kafkajs");


createTopic();

async function createTopic(){
try{
    //Admin stuff
    const kafka =new Kafka({
        clientId:"kafka_example",
        brokers:["localhost:9092"]
         
    });
    const admin =kafka.admin();
    console.log("Connection");

    await admin.connect();
    console.log("Connected");
    await admin.createTopics({
        topics:[
        {
            topic:"Logs1",
            numPartitions:1,//Sadece bir partition'a sahip
        },
        {
            topic:"Logs2",
            numPartitions:2,
        }
    ]
    });
    console.log("Topic Created");
    await admin.disconnect();

}catch(err){
    console.log("Error",err);
}
finally{
    process.exit(0)
}
}