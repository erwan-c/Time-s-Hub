import React from "react";
import { View, Text, StyleSheet } from "react-native";

const WordCard = ({ word }) => (
  <View style={styles.card}>
    <Text style={styles.word}>{word}</Text>
  </View>
);

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#FF9000",
    padding: 25,
    borderRadius: 10,
    marginBottom: 20,
    alignItems: "center",
  },
  word: {
    fontSize: 26,
    color: "#000000",
    fontWeight: "bold",
  },
});

export default WordCard;
