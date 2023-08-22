const express = require("express");
require("dotenv").config();
const app = express();
const mongo = require("mongoose");
const Data = require("./model/data");
const seed = require("./seedData");

mongo.set("strictQuery", false);
mongo.connect(process.env.MONGO_URI);

const db = mongo.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  console.log("Database connected");
});

app.get("/getdata", async (req, res) => {
  const data = await Data.find({});
  res.send(data);
});

app.get("/upload", async (req, res) => {
  await Data.deleteMany({});
  await Data.insertMany(seed);
});

app.listen(process.env.PORT, () => {
  console.log("Server is running on port", process.env.PORT);
});
