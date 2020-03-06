require('dotenv').config();
const express = require("express");
const bodyParser = require("body-parser");
const https = require('https');
const request = require('request')
const mongoose = require('mongoose');
// const ejs = require("ejs");

//mongoose.connect("credentials.mongodb.URI || mongodb://localhost:27017/slookDB", { useNewUrlParser: true, useUnifiedTopology: true});
mongoose.connect("mongodb://kaycbas:mJuChEr94@ds137102.mlab.com:37102/heroku_ffl3g89w");


const app = express();

app.use(bodyParser.urlencoded({extended: true}));

const port = process.env.PORT || 3000;

app.listen(port);

//console.log("Hello World!");

app.get("/", (req, res) => {
  res.write("Hello World!");

  request.post('https://hooks.slack.com/services/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', {
    json: {
      todo: 'Buy the milk'
    }
  }, (error, res, body) => {
    if (error) {
      console.error(error)
      return
    }
    console.log(`statusCode: ${res.statusCode}`)
    console.log(body)
  });

  res.write("Hello World 2!");
  res.send();
});






module.exports = app;
