import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Alert,
  Switch,
  ActivityIndicator,
} from "react-native";
import motsParDefaut from "../constantes/MotsParDefaults";
import { generateWords } from "../api/wordsAPI";
import BackButton from "../components/backButton";
import { stylesGlobal } from "../styles";
import Input from "../components/input";
import Button from "../components/button";
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
          <BackButton />
          <View style={styles.center}>
            <Text style={stylesGlobal.title}>Paramètres du Jeu</Text>
          </View>
          <Text style={styles.labelCategories}>Nombre d'équipes :</Text>

          <Input
            placeholder="Saisissez le nombre d'équipes"
            value={numberOfTeams}
            onChangeText={handleNumberInputChange}
            numeric
          />

          <Text style={styles.labelCategories}>Thème de la partie :</Text>

          <View style={styles.themeSwitchContainer}>
            <Text style={styles.switchLabel}>Par défaut</Text>
            <Switch
              trackColor={{ false: "#212121", true: "#FF9000" }}
              thumbColor="#C6C6C6"
              ios_backgroundColor="#212121"
              value={isDefaultTheme}
              onValueChange={(value) => {
                setIsDefaultTheme(value);
                if (value) {
                  setGameTheme("");
                }
              }}
            />
          </View>
          {!isDefaultTheme && (
            <Input
              placeholder="Saisissez le thème (max 5 mots)"
              value={gameTheme}
              onChangeText={handleThemeInputChange}
            />
          )}
          <Button text="Confirmer" type="primary" onPress={handleSubmit} />
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  center: {
    alignItems: "center",
    justifyContent: "center",
  },
  container: {
    flex: 1,
    backgroundColor: "#000",
    padding: 20,
    justifyContent: "center",
  },

  labelCategories: {
    fontSize: 20,
    marginBottom: 10,
    color: "#FF9000",
    marginTop: 7,
    fontWeight: "bold",
  },

  themeSwitchContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },

  switchLabel: {
    fontSize: 18,
    color: "#c6c6c6",
  },
  loaderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
