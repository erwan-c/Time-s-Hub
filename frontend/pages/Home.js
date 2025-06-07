import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  StatusBar,
  ImageBackground,
  Modal,
  Platform,
} from "react-native";
import Icon from "react-native-vector-icons/AntDesign";
import { stylesGlobal } from "../styles";
import Button from "../components/button";
import GameSettings from "./GameSettings";

export default function Home({ navigation }) {
  const [showSettings, setShowSettings] = useState(false);

  return (
    <ImageBackground
      source={require("../assets/background3.png")}
      style={styles.background}
      resizeMode="cover"
    >
      <StatusBar barStyle="light-content" />

      <TouchableOpacity
        style={styles.profileIcon}
        onPress={() => navigation.navigate("Profil")}
      >
        <Icon name="user" size={28} color="#F39C12" />
      </TouchableOpacity>

      <View style={styles.centerContent}>
        {/* Tu peux rajouter ici ton logo si tu veux */}
      </View>

      <View style={styles.buttonContainer}>
        <Button
          text="🎮 JOUER"
          type="primary"
          onPress={() => setShowSettings(true)}
          style={styles.bigButton}
          textStyle={styles.bigButtonText}

        />
      </View>

      {/* Petit bouton "!" pour règles */}
      <TouchableOpacity
        style={styles.helpButton}
        onPress={() => navigation.navigate("Rules")}
      >
        <Text style={styles.helpText}>!</Text>
      </TouchableOpacity>

      <Text style={styles.footer}>✨ v1.0 — Time’s Hub</Text>

      {/* POPUP MODALE */}
      <Modal
        visible={showSettings}
        animationType="slide"
        transparent
        onRequestClose={() => setShowSettings(false)}
      >
        <GameSettings
          onClose={() => setShowSettings(false)}
          navigation={navigation}
        />
      </Modal>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  profileIcon: {
    position: "absolute",
    top: 50,
    right: 20,
    padding: 10,
    backgroundColor: "#1E1E1EAA",
    borderRadius: 25,
    zIndex: 10,
  },
  centerContent: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: Platform.OS === "ios" ? 80 : 40,
  },
  buttonContainer: {
    paddingHorizontal: 20,
    paddingBottom: 150,
    width: "100%",
    gap: 20,
  },
  footer: {
    position: "absolute",
    bottom: 10,
    alignSelf: "center",
    color: "#cccccc",
    fontSize: 12,
  },
  helpButton: {
    position: "absolute",
    bottom: 30,
    right: 20,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#F39C12",
    justifyContent: "center",
    alignItems: "center",
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
  },
  helpText: {
    color: "#fff",
    fontSize: 22,
    fontWeight: "bold",
  },
  bigButton: {
  paddingVertical: 24,
  paddingHorizontal: 40,
  borderRadius: 12,
},

bigButtonText: {
  fontSize: 28,
  fontWeight: "bold",
},
});
