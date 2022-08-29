var express = require("express");
var router = express.Router();
const authController = require("../controllers/authController");

/* GET users listing. */
router.get("/", function (req, res, next) {
  res.send("respond with a resource");
});

router.post("/signup", authController.signup);
router.post("/login", authController.login);
router.get("/getAllUsers", authController.getAllUsers);
router.get("/getAllUsersWithBirthday", authController.getAllUsersWithBirthday);
router.get("/getBirthdays/:birthday", authController.getBirthdays);
router.get("/getUser", authController.getUserFromJWT);

module.exports = router;