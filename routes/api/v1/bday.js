var express = require("express");
var router = express.Router();
const bdayController = require("../../../controllers/api/v1/bday");

router.get("/:birthday", bdayController.getBirthdayUsers);

module.exports = router;