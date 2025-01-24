
const callChatGPT = require('../services/chatgptService');

const getChatGPTWords = async (req, res) => {
  const { wordsArray } = req.body;

  if (!Array.isArray(wordsArray) || wordsArray.length === 0) {
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
    console.error("Erreur lors de l'appel à ChatGPT: ", error.message);
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getChatGPTWords
};
