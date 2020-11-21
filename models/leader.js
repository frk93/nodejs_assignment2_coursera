const mongoose = require("mongoose");

const leaderSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  image: {
    type: String,
    required: true,
  },
  designation:{
    type: String,
    required: true,
  },
  abbr: {
    type: String,
    required: true,
    min:0
  },
  description: {
    type: String,
  },
  featured: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
})

module.exports = mongoose.model("leader", leaderSchema);