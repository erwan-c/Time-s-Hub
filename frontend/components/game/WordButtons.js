import React from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/AntDesign"; 

const WordButtons = ({ onSkipWord, onValidateWord }) => (
  <View style={styles.container}>
    <TouchableOpacity onPress={onSkipWord} style={styles.button}>
      <View style={styles.customCheck}>
        <Icon name="close" size={60} color="white" />
      </View>
    </TouchableOpacity>

    <TouchableOpacity onPress={onValidateWord} style={styles.button}>
      <View style={styles.customCheck2}>
        <Icon name="check" size={45} color="white" />
      </View>
    </TouchableOpacity>
  </View>
);

const styles = StyleSheet.create({
  customCheck: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: "red", // fond du cercle
    justifyContent: "center",
    alignItems: "center",
  },
  customCheck2: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: "green", // fond du cercle
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  button: {
    padding: 30,
  },
});

export default WordButtons;
