const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const config = require('dotenv').config();
const connectionDB = require('./db');

const app = express();
app.use(require('cors'));

connectionDB();

app.get('/',(req,res) => {
  res.send("Server up")
})

app.listen(process.env.PORT,() => {
  console.log("Server is listening on port 4000");
});