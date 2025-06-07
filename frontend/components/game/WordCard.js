import React from "react";
import { View, Text, StyleSheet } from "react-native";

const WordCard = ({ word, reste }) => (
  <View style={styles.cardContainer}>
    <View style={styles.card}>
      <Text style={styles.word} numberOfLines={1} adjustsFontSizeToFit={true}>{word}</Text>
    </View>
    {typeof reste === "number" && (
      <View style={styles.counterBadge}>
        <Text style={styles.counterText}>{reste}</Text>
      </View>
    )}
  </View>
);

const styles = StyleSheet.create({
  cardContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  card: {
    backgroundColor: "white",
  width: 300, // ou minWidth: 300 et maxWidth: '90%'
  height: 100, // hauteur fixe
  borderRadius: 12,
  marginBottom: 30,
  alignItems: "center",
  justifyContent: "center",
  alignSelf: "center",
  shadowColor: "#000",
  shadowOffset: { width: 0, height: 6 },
  shadowOpacity: 0.2,
  shadowRadius: 8,
  elevation: 10,
  paddingHorizontal: 20,
  },
  word: {
    fontSize: 38,
    color: "#F39C12",
    fontWeight: "bold",
    textAlign: "center",
    textAlignVertical: "center"
  },
  counterBadge: {
    position: "absolute",
    bottom: 12,
    right: -10,
    backgroundColor: "#1ABC9C",
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: "center",
    alignItems: "center",
    elevation: 6,
  },
  counterText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 14,
  },
});

export default WordCard;
