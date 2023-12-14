const KafkaConfig = require("../config/kafkaConfig");

const sendMessageToKafka = async (req, res) => {
  try {
    const { message } = req.body;
    const kafkaConfig = new KafkaConfig();
    const messages = [{ key: "key1", value: message }];
    await kafkaConfig.produce("my-topic", messages, async () =>{

    console.log("Message successfully sent!");
  });    

    res.status(200).json({
      status: "Ok!",
      message: "Message successfully send!",
    });
  } catch (error) {
    console.log(error);
  }
};

const kafkaControllers = { sendMessageToKafka };

module.exports = kafkaControllers;