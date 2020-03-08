const express = require("express");
const bodyParser = require("body-parser");
const https = require('https');
const request = require('request');
const SlackBot = require('slackbots');
const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/slack-app-slook', { useUnifiedTopology: true, useNewUrlParser: true });

const app = express();

app.use(bodyParser.urlencoded({extended: true}));

const port = process.env.PORT || 3000;

app.listen(port);


app.get("/", (req, res) => {
  res.send("<h1>Hello World!</h1>");
});


app.get('/auth', (req, res) =>{
    res.sendFile(__dirname + '/add_to_slack.html')
});

app.get('/auth/redirect', (req, res) =>{
    var options = {
        uri: 'https://slack.com/api/oauth.access?code='
            +req.query.code+
            '&client_id='+process.env.SLACK_CLIENT_ID+
            '&client_secret='+process.env.SLACK_CLIENT_SECRET+
            '&redirect_uri='+process.env.MY_REDIRECT_URI,
        method: 'GET'
    }
    request(options, (error, response, body) => {
        var JSONresponse = JSON.parse(body)
        if (!JSONresponse.ok){
            console.log(JSONresponse)
            res.send("Error encountered: \n"+JSON.stringify(JSONresponse)).status(200).end()
        }else{
            console.log(JSONresponse)
            res.send("Success!")
        }
    })
})


// MongoDB test section
// const fruitSchema = new mongoose.Schema ({
//   name: {
//     type: String,
//     required: [true, "Name required."]
//   },
//   rating: {
//     type: Number,
//     min: 1,
//     max: 10
//   },
//   review: String
// },
// { collection : 'Fruits' });
//
// const Fruit = mongoose.model("Fruit", fruitSchema);
//
// Fruit.find((err, fruits) => {
//   if (err) {
//     console.log(err);
//   } else {
//     //mongoose.connection.close();
//     console.log(fruits);
//   }
// });
//
// const apple = new Fruit ({
//   name: "Apple",
//   rating: 8,
//   review: "Basic."
// });
//
// //apple.save();

module.exports = app;
