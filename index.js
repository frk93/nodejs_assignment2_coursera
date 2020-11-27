const express = require("express");
require('dotenv').config();
const connectionDB = require('./db');

connectionDB();

const app = express();
const PORT = process.env.PORT || 3000;

const leaderRouter = require('./routes/leaderRouter');
const promotionRouter = require('./routes/promoRouter');

app.use('/leader',leaderRouter);
app.use('/promotion', promotionRouter);

// Listening on server
app.listen(PORT, () => {
  console.log(`Server is up and running at ${PORT}`);
});