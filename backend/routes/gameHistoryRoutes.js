
const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');  
const { addGameHistory, getUserGameHistory } = require('../controllers/gameHistoryController');  

router.post('/add', protect, addGameHistory);

router.get('/user', protect, getUserGameHistory);

module.exports = router;
