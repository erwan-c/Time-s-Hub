import React, { useState } from "react";
import { StyleSheet, Text, View, TextInput, Button, Alert, Switch, TouchableOpacity } from "react-native";
import motsParDefaut from "../constantes/MotsParDefaults";

export default function GameSettings({ navigation }) {
  const [numberOfTeams, setNumberOfTeams] = useState("");
  const [gameTheme, setGameTheme] = useState("");
  const [isDefaultTheme, setIsDefaultTheme] = useState(false);

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

  const handleSubmit = () => {
    if (!numberOfTeams) {
      Alert.alert("Oups", "Veuillez saisir le nombre d'équipes");
      return;
    }

    if (isDefaultTheme) {
      const selectedWords = getRandomWords(motsParDefaut, 40);
      navigation.navigate("Game", {
        teams: numberOfTeams,
        words: selectedWords,
      });
    } else if (gameTheme) {
      const customWords = gameTheme.split(" ").filter(Boolean);
      navigation.navigate("Game", {
        teams: numberOfTeams,
        words: customWords,
      });
    } else {
      Alert.alert(
        "Oups",
        "Veuillez remplir tous les champs ou activer le thème par défaut"
      );
    }
  };

  return (
    <View style={styles.container}>
       <TouchableOpacity style={styles.backButton} onPress={() => navigation.navigate("Home")}>
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
});
