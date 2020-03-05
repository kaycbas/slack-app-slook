require('dotenv').config();
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require('mongoose');
// const ejs = require("ejs");

mongoose.connect("process.env.MONGODB_URI || mongodb://localhost:27017/slookDB", { useNewUrlParser: true, useUnifiedTopology: true});

const app = express();

app.use(bodyParser.urlencoded({extended: true}));

const port = process.env.PORT || 3000;

app.listen(port);

//console.log("Hello World!");

app.get("/", (req, res) => {
  res.send("Hello World!");
});




const fruitSchema = new mongoose.Schema ({
  name: {
    type: String,
    required: [true, "Name required."]
  },
  rating: {
    type: Number,
    min: 1,
    max: 10
  },
  review: String
});

const Fruit = mongoose.model("Fruit", fruitSchema);

const dragonFruit = new Fruit ({
  name: "Dragon Fruit",
  rating: 7,
  review: "Kind of mysterious."
});

dragonFruit.save();

module.exports = app;
