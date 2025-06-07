import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Alert,
  Switch,
  ActivityIndicator,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import motsParDefaut from "../constantes/MotsParDefaults";
import { generateWords } from "../api/wordsAPI";
import { stylesGlobal } from "../styles";
import Input from "../components/input";
import Button from "../components/button";

export default function GameSettings({ navigation, onClose }) {
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
      const selectedWords = getRandomWords(motsParDefaut, 30);
      onClose(); // Fermer la popup avant navigation
      navigation.navigate("Game", {
        numberOfTeams,
        words: selectedWords,
        theme: "Par défaut",
      });
    } else if (gameTheme) {
      try {
        setIsLoading(true);
        const customWords = gameTheme.split(" ").filter(Boolean);
        const wordsObject = { wordsArray: customWords };
        const generatedWords = await generateWords(wordsObject);
        onClose();
        navigation.navigate("Game", {
          numberOfTeams,
          words: generatedWords.response,
          theme: gameTheme,
        });
      } catch (error) {
        console.error("Erreur:", error);
        Alert.alert("Erreur", "Impossible de générer les mots.");
      } finally {
        setIsLoading(false);
      }
    } else {
      Alert.alert("Oups", "Veuillez remplir tous les champs ou activer le thème par défaut");
    }
  };

  if (isLoading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#F39C12" />
        <Text style={styles.loadingText}>Chargement des mots...</Text>
      </View>
    );
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.modalBackground}
    >
      <ScrollView
        contentContainerStyle={styles.modalContent}
        keyboardShouldPersistTaps="handled"
      >
        <Text style={stylesGlobal.title}>🎯 Paramètres du Jeu</Text>

        <Text style={styles.label}>Nombre d’équipes</Text>
        <Input
          placeholder="Ex: 2"
          value={numberOfTeams}
          onChangeText={handleNumberInputChange}
          numeric
        />

        <View style={styles.themeSwitchContainer}>
          <Text style={styles.switchLabel}>Thème par défaut</Text>
          <Switch
            trackColor={{ false: "#212121", true: "#F39C12" }}
            thumbColor="#C6C6C6"
            ios_backgroundColor="#212121"
            value={isDefaultTheme}
            onValueChange={(value) => {
              setIsDefaultTheme(value);
              if (value) setGameTheme("");
            }}
          />
        </View>

        {!isDefaultTheme && (
          <>
            <Text style={styles.label}>Thème personnalisé</Text>
            <Input
              placeholder="Ex: fruits pays animaux"
              value={gameTheme}
              onChangeText={handleThemeInputChange}
            />
            <Text style={styles.hintText}>Max 5 mots séparés par des espaces</Text>
          </>
        )}

        <Button text="✅ Lancer la partie" type="primary" onPress={handleSubmit} />
        <Button text="❌ Fermer" type="secondary" onPress={onClose} />
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  modalBackground: {
  flex: 1,
  backgroundColor: "rgba(0, 0, 0, 0.7)",
  justifyContent: "center",
  alignItems: "center",
  padding: 10,
},
modalContent: {
  width: "100%",
  maxWidth: 400,
  backgroundColor: "#111111EE",
  borderRadius: 20,
  padding: 25,
  alignItems: "center",
  shadowColor: "#000",
  shadowOffset: { width: 0, height: 4 },
  shadowOpacity: 0.4,
  shadowRadius: 6,
  elevation: 10,
  marginTop:100,
},
  label: {
    color: "#F39C12",
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 16,
    alignSelf: "flex-start",
  },
  themeSwitchContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    marginTop: 20,
  },
  switchLabel: {
    fontSize: 16,
    color: "#c6c6c6",
    fontWeight: "500",
  },
  hintText: {
    fontSize: 14,
    color: "#888",
    marginTop: 4,
    marginBottom: 12,
    alignSelf: "flex-start",
  },
  loaderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#000",
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: "#F39C12",
  },
});
