# Node.js Kafka and Crud operation

this project is all about a simple node.js application using kafka for message communication

1.clone the repo:
2.install dependencies: npm install
3.run the application: node server.js

Kafka COnfiguration: firstly i have setup the kafka with zookeeper and server then i have created a topic then i have used that topic in the kafka configuration
in the KafkaConfig

CrudOperation: i have performed the POST,PUT,UPDATE,DELETE api to interact with the database with the help of Sequelize ORM

API Endpoints-
Endpoint: `POST /api/items/kafka/send`

RequestBody:
{
  "message": "This is a sample message."
}

Response:
{
  "status": "Ok!",
  "message": "Message successfully sent!"
}


Included Jwt authentication to generate the token and verify before hitting the api

included axios for getting the response from different api 

Include email sending- added dependency nodemailer
