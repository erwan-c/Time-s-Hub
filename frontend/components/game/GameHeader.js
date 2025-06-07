import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { stylesGlobal } from "../../styles";
const GameHeader = ({ teamName, timer, round }) => (
  <View style={styles.container}>
    <Text style={stylesGlobal.title}>Manche {round}</Text>
    <Text style={stylesGlobal.subTitle}>{teamName}</Text>
    <Text style={stylesGlobal.time}>{timer}'</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
    justifyContent:"center",
    alignItems:"center"
  },
 
});

export default GameHeader;
