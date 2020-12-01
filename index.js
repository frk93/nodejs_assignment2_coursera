const express = require("express");
require('dotenv').config();
const connectionDB = require('./db');

connectionDB();

const app = express();
const PORT = process.env.PORT || 3000;

app.get('/', (req,res)=> {
  res.send("Server is up and running")
})


const leaderRouter = require('./routes/leaderRouter');
const promotionRouter = require('./routes/promoRouter');

function auth (req, res, next) {
  var authHeader = req.headers.authorization;

  if(!authHeader){
    res.setHeader('WWW-Authenticate','Basic');
    res.statusCode = 401;
    throw new Error("You are not authenticated");    
  }

  console.log(authHeader);
  var auth = Buffer.from(authHeader.split(' ')[1], 'base64').toString().split(':');
  var user = auth[0];
  var pass = auth[1];

  if(user === "admin" && pass === "pass"){
    next();
  } else {
    res.setHeader('WWW-Authenticate','Basic');
    res.statusCode = 401;
    throw new Error("You are not authenticated");
  }
}

app.use(auth);

app.use('/leader',leaderRouter);
app.use('/promotion', promotionRouter);

// Listening on server
app.listen(PORT, () => {
  console.log(`Server is up and running at ${PORT}`);
});