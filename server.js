const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const router = require("./route/item.route")
const KafkaConfig = require("./config/kafkaConfig")
const app = express();

var corsOptions ={
    origin: "http://localhost:8081"
};

const kafkaConfig = new KafkaConfig();
kafkaConfig.consume("my-topic",(value) =>{
    console.log("Received message: " ,value)
})

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true}));
app.use('/api/items',router);

app.get('/',(req,res) =>{
    res.json({ message: 'hello from api'})
})
const PORT = process.env.PORT ||8080;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
  });
  app.timeout =30000;