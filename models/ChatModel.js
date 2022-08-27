const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const passportLocalMongoose = require("passport-local-mongoose");

const Message = new Schema({
  userID: "",
  username: "",
  message: "",
  timestamp: "",
});
Message.plugin(passportLocalMongoose);

module.exports = mongoose.model("message", Message);