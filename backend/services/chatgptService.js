const axios = require("axios");

const formatPrompt = (wordsArray) => {
  if (!Array.isArray(wordsArray) || wordsArray.length === 0) {
    throw new Error("Le tableau de mots est vide ou invalide.");
  }

  const wordsList = wordsArray.join(", ");
  console.log("list : " + wordsList)
  return `
Donne-moi une liste de 30 mots inspirés des thèmes suivants, sans les utiliser : ${wordsList}.
Les mots doivent être variés, s’inspirer des thèmes donnés, et surtout être faciles à mimer.
Assure-toi qu’ils soient simples à comprendre, amusants à interpréter, et adaptés pour un jeu.
Ne donne dans ta réponse que la liste des mots, sans aucune explication, texte supplémentaire, ni numéro.
`;
};

const callGemini = async (wordsArray) => {
  try {
    const prompt = formatPrompt(wordsArray);

    const response = await axios.post(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        contents: [
          {
            parts: [{ text: prompt }],
          },
        ],
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const content = response.data.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!content) throw new Error("Réponse vide de Gemini");

    const wordsArrayFromResponse = content
      .split("\n")
      .map((word) => word.trim())
      .filter((word) => word.length > 0 && !/^[0-9]+[.)]/.test(word)); // retire numéros éventuels
    return wordsArrayFromResponse;
  } catch (error) {
    throw new Error("Impossible d'obtenir la réponse de Gemini");
  }
};

module.exports = callGemini;
