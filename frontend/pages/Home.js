import React, { useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity, Animated, Button, ImageBackground } from "react-native";

export default function Home({ navigation }) {
  const [scaleAnim] = useState(new Animated.Value(1));
  const [colorAnim] = useState(new Animated.Value(0));

  const handlePressIn = () => {
    Animated.sequence([
      Animated.spring(scaleAnim, {
        toValue: 0.9,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        useNativeDriver: true,
      }),
    ]).start();

    navigation.navigate("GameSettings");
  };

  const colorInterpolate = colorAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ["#ff6347", "#ff1493"],
  });

  return (
    <ImageBackground source={{ uri: 'https://your-image-url.jpg' }} style={styles.backgroundImage}>
      <View style={styles.container}>
        <Button title="Compte" onPress={() => navigation.navigate("Profil")} />
        <Text style={styles.text}>Bienvenue sur la page d'accueil !</Text>

        <TouchableOpacity style={styles.button} onPressIn={handlePressIn}>
          <Animated.View
            style={[
              styles.buttonContent,
              {
                transform: [{ scale: scaleAnim }],
                backgroundColor: colorInterpolate,
              },
            ]}
          >
            <Text style={styles.buttonText}>JOUER</Text>
          </Animated.View>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    zIndex: 2, // Ensure buttons are above the background image
  },
  text: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 30,
  },
  button: {
    justifyContent: "center",
    alignItems: "center",
  },
  buttonContent: {
    width: 150,
    height: 150,
    borderRadius: 75,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ff6347",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5, // Add elevation for Android shadow
  },
  buttonText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
  },
  backgroundImage: {
    flex: 1,
    resizeMode: "cover", // Ensure background image covers the entire screen
    justifyContent: "center",
  },
});
