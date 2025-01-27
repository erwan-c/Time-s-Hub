const express = require('express');
const {
  registerUser,
  loginUser,
  getUsers,
  updateUser,
  deleteUser,
} = require('../controllers/userController');
const { protect } = require('../middleware/auth'); 

const router = express.Router();

router.post('/register', registerUser);  
router.post('/login', loginUser);       

router.put('/update', protect, updateUser);  
router.delete('/delete', protect, deleteUser); 

router.get('/', protect, getUsers); 

module.exports = router;
