import React from "react";
import { View, Text, StyleSheet } from "react-native";

const WordCard = ({ word }) => (
  <View style={styles.card}>
    <Text style={styles.word}>{word}</Text>
  </View>
);

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#f0f0f0",
    padding: 20,
    borderRadius: 10,
    marginBottom: 20,
    alignItems: "center",
  },
  word: {
    fontSize: 24,
    color: "#333",
    fontWeight: "bold",
  },
});

export default WordCard;
