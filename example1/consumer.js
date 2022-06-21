const {Kafka} =require("kafkajs");


createConsumer();

async function createConsumer(){
try{
    //Admin stuff
    const kafka =new Kafka({
        clientId:"kafka_example",
        brokers:["localhost:9092"]
         
    });
    const consumer =kafka.consumer({//Consumer belirlenmedli
        groupId:"kafka_example_group_1"}
    );
    console.log("Consumer Connection");

    await consumer.connect();
    console.log("Consumer Connected");
    await consumer.subscribe({
        topic:"Logs1",
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