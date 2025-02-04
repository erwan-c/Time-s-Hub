import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  Alert,
  Switch,
  TouchableOpacity,
  ActivityIndicator
} from "react-native";
import motsParDefaut from "../constantes/MotsParDefaults";
import { generateWords } from "../api/wordsAPI";

export default function GameSettings({ navigation }) {
  const [numberOfTeams, setNumberOfTeams] = useState("");
  const [gameTheme, setGameTheme] = useState("");
  const [isDefaultTheme, setIsDefaultTheme] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleNumberInputChange = (text) => {
    if (/^\d+$/.test(text) || text === "") {
      setNumberOfTeams(text);
    }
  };

  const handleThemeInputChange = (text) => {
    const words = text.split(" ").filter(Boolean);
    if (words.length <= 5) {
      setGameTheme(text);
    }
  };

  function getRandomWords(array, count) {
    const shuffled = [...array].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  }

  const handleSubmit = async () => {
    if (!numberOfTeams) {
      Alert.alert("Oups", "Veuillez saisir le nombre d'équipes");
      return;
    }

    if (isDefaultTheme) {
      const selectedWords = getRandomWords(motsParDefaut, 40);
      navigation.navigate("Game", {
        numberOfTeams: numberOfTeams,
        words: selectedWords,
        theme: "Par défaut",
      });
    } else if (gameTheme) {
      try {
        setIsLoading(true);
        const customWords = gameTheme.split(" ").filter(Boolean);
        const wordsObject = { wordsArray: customWords };
        const generatedWords = await generateWords(wordsObject);
        console.log(generatedWords);

        navigation.navigate("Game", {
          numberOfTeams: numberOfTeams,
          words: generatedWords.response,
          theme: gameTheme,
        });
      } catch (error) {
        console.error("Erreur lors de la génération des mots:", error);
        Alert.alert("Erreur", "Impossible de générer les mots.");
      } finally {
        setIsLoading(false);
      }
    } else {
      Alert.alert(
        "Oups",
        "Veuillez remplir tous les champs ou activer le thème par défaut"
      );
    }
  };

  return (
    <View style={styles.container}>
      {isLoading ? (
        <View style={styles.loaderContainer}>
          <ActivityIndicator size="large" color="#007BFF" />
          <Text style={styles.loadingText}>Chargement des mots...</Text>
        </View>
      ) : (
        <>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.navigate("Home")}
          >
            <Text style={styles.backText}>← Retour</Text>
          </TouchableOpacity>
          <Text style={styles.title}>Paramètres du Jeu</Text>
          <Text style={styles.labelCategories}>Nombre d'équipes :</Text>
          <TextInput
            style={styles.input}
            keyboardType="numeric"
            value={numberOfTeams}
            onChangeText={handleNumberInputChange}
            placeholder="Entrez le nombre d'équipes"
          />
          <Text style={styles.labelCategories}>Thème de la partie :</Text>

          <View style={styles.themeSwitchContainer}>
            <Text style={styles.switchLabel}>Par défaut</Text>
            <Switch
              value={isDefaultTheme}
              onValueChange={(value) => {
                setIsDefaultTheme(value);
                if (value) {
                  setGameTheme("");
                }
              }}
              style={styles.switch}
            />
          </View>
          {!isDefaultTheme && (
            <TextInput
              style={styles.input}
              value={gameTheme}
              onChangeText={handleThemeInputChange}
              placeholder="Entrez le thème (max 5 mots)"
            />
          )}
          <Button title="Confirmer" onPress={handleSubmit} />
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
    justifyContent: "center",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
    color: "#4CAF50",
    marginBottom: 20,
  },
  labelCategories: {
    fontSize: 20,
    marginBottom: 10,
    color: "#333",
    marginTop: 7,
    fontWeight: "bold",
  },
  input: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    marginBottom: 20,
    paddingLeft: 10,
    fontSize: 18,
    borderRadius: 5,
    backgroundColor: "#f9f9f9",
  },
  themeSwitchContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  switch: {},
  switchLabel: {
    fontSize: 18,
    color: "#333",
  },
  backButton: { position: "absolute", top: 50, left: 20 },
  backText: { fontSize: 18, color: "#007BFF" },
  loaderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
