
const callChatGPT = require('../services/chatgptService');

const getChatGPTWords = async (req, res) => {
  const { wordsArray } = req.body;

  if (!Array.isArray(wordsArray) || wordsArray.length === 0) {
    return res.status(400).json({ message: "Les mots sont requis." });
  }

  try {
    const response = await callChatGPT(wordsArray);

    res.status(200).json({ response });

  } catch (error) {
    console.error("Erreur lors de l'appel à ChatGPT: ", error.message);
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getChatGPTWords
};
