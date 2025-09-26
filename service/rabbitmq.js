const amqp = require("amqplib");
require("dotenv").config();

let connection, channel;
console.log(process.env.RABBIT_URL);
async function connect() {
  //console.log(process.env.RABBIT_URL);
  connection = await amqp.connect(process.env.RABBIT_URL);
  channel = await connection.createChannel();
  console.log("Connected to RabbitMQ");
}

async function subscribeToQueue(queueName, callback) {
  if (!channel) await connect();
  await channel.assertQueue(queueName);
  channel.consume(queueName, (message) => {
    callback(message.content.toString());
    channel.ack(message);
  });
}

async function publishToQueue(queueName, data) {
  if (!channel) await connect();
  await channel.assertQueue(queueName);
  channel.sendToQueue(queueName, Buffer.from(data));
}

module.exports = {
  subscribeToQueue,
  publishToQueue,
  connect,
};
