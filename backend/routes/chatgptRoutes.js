
const express = require("express");
const router = express.Router();
const { getChatGPTWords } = require('../controllers/chatgptController');  

router.post("/", getChatGPTWords);

module.exports = router;
