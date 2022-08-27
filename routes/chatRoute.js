var express = require("express");
var router = express.Router();
const chatController = require("../controllers/chatController");

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("chat", { user: "flor" });
});

router.post("/sendMessage", chatController.sendMessage);
router.get("/getMessages", chatController.getAllMessagesFromDb);

module.exports = router;