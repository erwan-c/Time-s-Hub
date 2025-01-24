const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');
const userRoutes = require('./routes/userRoutes');
const gameHistoryRoutes = require('./routes/gameHistoryRoutes');
const chatgptRoutes = require('./routes/chatgptRoutes')

dotenv.config();

const app = express();

connectDB();

app.use(express.json());
app.use(cors());

app.use('/api/users', userRoutes);
app.use('/api/gameHistory', gameHistoryRoutes);
app.use('/api/chatgpt', chatgptRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
