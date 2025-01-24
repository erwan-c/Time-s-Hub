const express = require("express");
const router = express.Router();
const callChatGPT = require("../services/chatgptService");

router.post("/", async (req, res) => {
  const { wordsArray } = req.body;
  if (!wordsArray) {
    return res.status(400).json({ message: "Les mots sont requis." });
  }
const testResponse =[
    'Chocolat',  'Pizza',     'Danse',
    'Ganache',   'Margarita', 'Maman',
    'Praliné',   'Tomate',    'Toilettes',
    'Brownie',   'Mozza',     'Poulet',
    'Truffe',    'Pepperoni', 'Bouse',
    'Mousse',    'Olive',     'Croustillant',
    'Saucisse',  'Fudge',     'Pâte',
    'Chaudron',  'Fromage',   'Rappel',
    'Caramel',   'Piquant',   'Crustacé',
    'Croûte',    'Sucre',     'Digestif',
    'Basilic',   'Régal',     'Chaud',
    'Friture',   'Tartine',   'Bêtise',
    'Nutella',   'Savoureux', 'Fête',
    'Sensation'
  ]

  try {
    // const response = await callChatGPT(wordsArray);
     const response = testResponse;

    res.status(200).json({ response });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
