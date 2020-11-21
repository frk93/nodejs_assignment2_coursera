const mongoose = require("mongoose");

const connectionDB = async () => {
  try{
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false
    });

    console.log("Mongoose DB is connected");
  }
  catch(err){
    throw new Error(err)
  }
}

module.exports = connectionDB;