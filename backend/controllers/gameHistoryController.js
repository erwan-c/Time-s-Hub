
const GameHistory = require('../models/gameHistoryModel');
const User = require('../models/userModel');

const addGameHistory = async (req, res) => {
  try {
    const { theme, numberOfTeams, winningTeam } = req.body;

    const gameHistory = new GameHistory({
      theme,
      numberOfTeams,
      winningTeam,
      user: req.user.id  
    });

    await gameHistory.save();

    res.status(201).json(gameHistory);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erreur lors de l\'ajout de l\'historique du jeu' });
  }
};

const getUserGameHistory = async (req, res) => {
  try {
    const gameHistories = await GameHistory.find({ user: req.user.id });

    if (!gameHistories.length) {
      return res.status(404).json({ message: 'Aucun historique de jeu trouvé pour cet utilisateur' });
    }

    res.status(200).json(gameHistories);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erreur lors de la récupération de l\'historique du jeu' });
  }
};

module.exports = {
  addGameHistory,
  getUserGameHistory
};
