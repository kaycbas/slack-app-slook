require('dotenv').config();
const express = require("express");
const bodyParser = require("body-parser");
const https = require('https');
const request = require('request');
const axios = require('axios');
const SlackBot = require('slackbots');
const mongoose = require('mongoose');
// const ejs = require("ejs");

mongoose.connect("mongodb://kaycbas:mJuChEr94@ds137102.mlab.com:37102/heroku_ffl3g89w", { useUnifiedTopology: true, useNewUrlParser: true });


const app = express();

app.use(bodyParser.urlencoded({extended: true}));

const port = process.env.PORT || 3000;

app.listen(port);


app.get("/", (req, res) => {
  res.send("Hello World!\n");
});


app.get('/auth', (req, res) =>{
    res.sendFile(__dirname + '/add_to_slack.html')
});

// app.get('/auth/redirect', (req, res) =>{
//     var options = {
//         uri: 'https://slack.com/api/oauth.access?code='
//             +req.query.code+
//             '&client_id='+process.env.CLIENT_ID+
//             '&client_secret='+process.env.CLIENT_SECRET+
//             '&redirect_uri='+process.env.REDIRECT_URI,
//         method: 'GET'
//     }
//     request(options, (error, response, body) => {
//         var JSONresponse = JSON.parse(body)
//         if (!JSONresponse.ok){
//             console.log(JSONresponse)
//             res.send("Error encountered: \n"+JSON.stringify(JSONresponse)).status(200).end()
//         }else{
//             console.log(JSONresponse)
//             res.send("Success!")
//         }
//     })
// })


module.exports = app;
