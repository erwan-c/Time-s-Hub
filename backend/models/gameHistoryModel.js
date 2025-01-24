const mongoose = require('mongoose');

const gameHistorySchema = mongoose.Schema({
  theme: {
    type: String,
    required: true
  },
  numberOfTeams: {
    type: Number,
    required: true
  },
  winningTeam: {
    type: String,
    required: true
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', 
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const GameHistory = mongoose.model('history', gameHistorySchema);

module.exports = GameHistory;
