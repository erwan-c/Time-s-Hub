import React from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/AntDesign"; 

const WordButtons = ({ onSkipWord, onValidateWord }) => (
  <View style={styles.container}>
    <TouchableOpacity onPress={onSkipWord} style={styles.button}>
      <Icon name="closecircle" size={60} color="red" />
    </TouchableOpacity>

    <TouchableOpacity onPress={onValidateWord} style={styles.button}>
      <Icon name="checkcircle" size={60} color="green" />
    </TouchableOpacity>
  </View>
);

const styles = StyleSheet.create({
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
