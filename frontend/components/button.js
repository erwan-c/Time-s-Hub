// components/Button.js
import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";

export default function Button({ text, onPress, type = "primary" }) {
  return (
    <TouchableOpacity
      style={[
        styles.button,
        type === "primary" ? styles.primary : styles.secondary,
      ]}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <Text
        style={[
          styles.text,
          type === "primary" ? styles.textPrimary : styles.textSecondary,
        ]}
      >
        {text}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 12,
    width: "100%",
    marginTop: 15,
    alignItems: "center",
  },
  primary: {
    backgroundColor: "#F39C12",
    shadowColor: "#F39C12",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 6,
  },
  secondary: {
    backgroundColor: "transparent",
    borderWidth: 1,
    borderColor: "#F39C12",
  },
  text: {
    fontSize: 16,
    fontWeight: "bold",
  },
  textPrimary: {
    color: "#000",
  },
  textSecondary: {
    color: "#F39C12",
  },
});
