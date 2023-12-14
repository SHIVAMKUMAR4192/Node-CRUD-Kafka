const { Kafka } = require("kafkajs");

class KafkaConfig {
  constructor() {
    this.kafka = new Kafka({
      clientId: "nodejs-kafka",
      brokers: ["localhost:9092"],
    });
    this.producer = this.kafka.producer();
    this.consumer = this.kafka.consumer({ groupId: "test-group" });
  }

  async produce(topic, messages,callback) {
    try {
      await this.producer.connect();
      await this.producer.send({
        topic: topic,
        messages: messages,
      });
      if (callback) {
        await callback();
      }
    } catch (error) {
      console.error(error);
    } finally {
      await this.producer.disconnect();
    }
  }

  async consume(topic, callback) {
    try {
      await this.consumer.connect();
      await this.consumer.subscribe({ topic: topic, fromBeginning: true });
      await this.consumer.run({
        eachMessage: async ({ topic, partition, message }) => {
          const value = message.value.toString();
          console.log("value  :", value);
          callback(value);
        },
      });
    } catch (error) {
      console.error(error);
    }
  }
}

module.exports=KafkaConfig;