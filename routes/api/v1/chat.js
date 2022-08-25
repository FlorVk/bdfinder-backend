const express = require('express')
const router = express.Router();
const chatController =  require('../../../controllers/api/v1/chat')


router.get('/chat', chatController.getChat);


module.exports = router;