import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Animated,
  ImageBackground,
  Image,
} from "react-native";
import Icon from "react-native-vector-icons/AntDesign";
import { stylesGlobal } from "../styles";
import Button from "../components/button";
import Video from "react-native-video"; // Import de la vidéo

export default function Home({ navigation }) {
  return (
    <View style={styles.container}>
       
      <TouchableOpacity
        style={styles.profileIcon}
        onPress={() => navigation.navigate("Profil")}
      >
        <Icon
          name="user"
          size={35}
          color="#FF9000"
          style={styles.profileImage}
        />
      </TouchableOpacity>
      <Image source={require("../assets/logoTimes.png")} style={styles.logo} />

      <Text style={stylesGlobal.title}>Bienvenue!</Text>

      <View style={styles.buttonContainer}>
        <Button
          text="JOUER"
          type="play"
          onPress={() => navigation.navigate("GameSettings")}
        />

        <Button
          text="Comment jouer ?"
          type="primary"
          onPress={() => navigation.navigate("Rules")}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#000",
  },
 
  profileIcon: {
    position: "absolute",
    top: 60,
    right: 20,
    zIndex: 10,
  },

  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  buttonContainer: {
    alignItems: "center",
    justifyContent: "center",
    gap: 30, 
  },
  logo: {
    position: "absolute",
    top: 60,
    left: 1,
    width: 200, 
    height: 40, 
    resizeMode: "contain",
  },
});

