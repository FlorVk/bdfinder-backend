var express = require("express");
var router = express.Router();
const chatController = require("../controllers/chatController");

router.get("/:birthday", function (req, res, next) {
  res.render("chat", { birthday: req.params.birthday });
});

router.post("/sendMessage", chatController.sendMessage);
router.get("/getMessages", chatController.getAllMessagesFromDb);

module.exports = router;