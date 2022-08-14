const express = require('express')
const router = express.Router();
const bdayController =  require('../../../controllers/api/v1/bday')


router.get('/', bdayController.getAll);


module.exports = router;