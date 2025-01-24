const axios = require("axios");

const formatPrompt = (wordsArray) => {
  if (!Array.isArray(wordsArray) || wordsArray.length === 0) {
    throw new Error("Le tableau de mots est vide ou invalide.");
  }

  const wordsList = wordsArray.join(", ");
  return `
    Donne-moi une liste de 40 mots inspirés des thèmes suivants, sans les utiliser: ${wordsList}. 
    Les mots doivent être variés, s’inspirer des thèmes donnés, et surtout être faciles à mimer. 
    Assure-toi qu’ils soient simples à comprendre, amusants à interpréter, et adaptés pour un jeu. 
    Ne donne dans ta réponse que la liste des mots, sans aucune explication, texte supplémentaire, ni numéro.
  `;
};

const callChatGPT = async (wordsArray) => {
  try {
    const prompt = formatPrompt(wordsArray);

    // const maxPromptLength = 2000; 
    // const truncatedPrompt = prompt.length > maxPromptLength ? prompt.substring(0, maxPromptLength) : prompt;

    const response = await axios.post(
      "https://api.openai.com/v1/chat/completions",
      {
        model: "gpt-4o-mini",
        messages: [{ role: "user", content: prompt }],
        store: true,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        },
      }
    );



    const responseContent = response.data.choices[0].message.content.trim();

    const wordsArrayFromResponse = responseContent
      .split("\n")  
      .map((word) => word.trim())  
      .filter((word) => word !== ""); 

    return wordsArrayFromResponse;  
  } catch (error) {
    console.error("Erreur API ChatGPT: ", error.message);
    throw new Error("Impossible d'obtenir la réponse de ChatGPT");
  }
};

module.exports = callChatGPT;