import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { stylesGlobal } from "../styles";
export default function BackButton() {
  const navigation = useNavigation();

  return (
    <TouchableOpacity style={stylesGlobal.backButton} onPress={() => navigation.goBack()}>
      <Text style={stylesGlobal.backText}>← Retour</Text>
    </TouchableOpacity>
  );
}
