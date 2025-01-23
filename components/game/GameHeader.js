import React from "react";
import { View, Text, StyleSheet } from "react-native";

const GameHeader = ({ teamName, timer }) => (
  <View style={styles.container}>
    <Text style={styles.title}>Jeu en Cours</Text>
    <Text style={styles.subTitle}>Équipe actuelle : {teamName}</Text>
    <Text style={styles.timer}>Temps restant : {timer} s</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
    color: "#4CAF50",
    marginBottom: 10,
  },
  subTitle: {
    fontSize: 20,
    color: "#333",
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
  },
  timer: {
    fontSize: 24,
    color: "#ff5733",
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default GameHeader;
