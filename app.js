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

module.exports = app;
