import React, { useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity, Animated } from "react-native";

export default function Home({navigation}) {
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

    navigation.navigate("GameSettings")
  };

  
  const colorInterpolate = colorAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ["#ff6347", "#ff1493"], 
  });

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Bienvenue sur la page d'accueil !</Text>
      
      <TouchableOpacity
        style={styles.button}
        onPressIn={handlePressIn}

      >
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
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#000",
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
  },
  buttonText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
  },
});
