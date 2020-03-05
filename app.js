const express = require("express");
const bodyParser = require("body-parser");
// const ejs = require("ejs");

const app = express();

app.use(bodyParser.urlencoded({extended: true}));

// Test
