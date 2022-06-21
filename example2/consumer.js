const {Kafka} =require("kafkajs");


createConsumer();

async function createConsumer(){
try{
    //Admin stuff
    const kafka =new Kafka({
        clientId:"kafka_log_store_client",
        brokers:["localhost:9092"]
         
    });
    const consumer =kafka.consumer({//Consumer belirlenmedli
        groupId:"log_store_consumer_group"}
    );
    console.log("Consumer Connection");

    await consumer.connect();
    console.log("Consumer Connected");
    await consumer.subscribe({
        topic:"LogStore",
        fromBeginning:true//Başlangıçtan başlıyor.
    })
    await consumer.run({
        eachMessage: async result=>{
            console.log(`Message: ${result.message.value} - P:=>${result.partition}`);
        }
    })


}catch(err){
    console.log("Error",err);
}
}