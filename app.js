const express = require("express");
const app = express();
const rideRoutes = require("./routes/ride.routes");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
dotenv.config();
const connectDB = require("./db/db");
connectDB();
const RabbitMQ = require("./service/rabbitmq");
RabbitMQ.connect();

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

app.use("/", rideRoutes);

module.exports = app;
