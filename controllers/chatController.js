const Message = require("../models/ChatModel");
const User = require("../models/UserModel");

const sendMessage = async (req, res, next) => {
  let username = req.body.user;
  let message = req.body.message;
  let timestamp = Date.parse(req.body.timestamp);

  const user = await User.findOne({ username: username })
    .then((result) => {
      return result;
    })
    .catch((error) => {
      res.json({
        status: "error",
        message: error,
      });
    });

  const chatMessage = new Message({
    userID: user._id,
    username: username,
    message: message,
    timestamp: timestamp,
  });

  await chatMessage
    .save()
    .then((result) => {
      res.json({
        status: "success",
        data: {
          message: result,
        },
      });
    })
    .catch((error) => {
      res.json({
        status: "error",
      });
    });
};

const addMessageToDBFromPrimus = async (data) => {
  let username = data.username;
  let message = data.message;
  let timestamp = Date.parse(data.timestamp);

  const user = await User.findOne({ username: username })
    .then((result) => {
      return result;
    })
    .catch((error) => {
      res.json({
        status: "error",
        message: error,
      });
    });

  const chatMessage = new Message({
    userID: user._id,
    username: username,
    message: message,
    timestamp: timestamp,
  });

  await chatMessage
    .save()
    .then((result) => {
      console.log("saved", result);
    })
    .catch((error) => {
      console.log(error);
      console.log("error");
    });
};

const getAllMessagesFromDb = async (req, res, next) => {
  await Message.find({})
    .then((result) => {
      console.log(result);
      return res.json({
        status: "success",
        data: result,
      });
    })
    .catch((error) => {
      return res.json({
        status: "error",
        message: error,
      });
    });
};

const getAllMessagesFromDbForPrimus = async () => {
  return await Message.find()
    .then((result) => {
      return { status: "success", result: result };
    })
    .catch((error) => {
      return { status: "error", error: error };
    });
};

module.exports.sendMessage = sendMessage;
module.exports.addMessageToDBFromPrimus = addMessageToDBFromPrimus;
module.exports.getAllMessagesFromDb = getAllMessagesFromDb;
module.exports.getAllMessagesFromDbForPrimus = getAllMessagesFromDbForPrimus;
