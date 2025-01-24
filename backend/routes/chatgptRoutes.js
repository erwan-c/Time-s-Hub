// routes/chatgptRoutes.js

const express = require("express");
const router = express.Router();
const { getChatGPTWords } = require('../controllers/chatgptController');  // Import du controller

// Route pour obtenir des mots inspirés de l'API ChatGPT
router.post("/", getChatGPTWords);

module.exports = router;
