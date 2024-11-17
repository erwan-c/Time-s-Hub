import React, { useEffect, useRef, useState } from "react";
import { StyleSheet, Text, Animated, View } from "react-native";
import LottieView from "lottie-react-native"; 
import { useFonts } from "expo-font"; 
export default function Welcome({ navigation }) {
  const scaleAnim = useRef(new Animated.Value(0.5)).current;
  const rotateAnim = useRef(new Animated.Value(0)).current;
  const fadeAnim = useRef(new Animated.Value(1)).current; 
  const [startFireworks, setStartFireworks] = useState(false);

  const text = "Times'Hub"; 
  let [fontsLoaded] = useFonts({
    Bangers: require("../assets/fonts/Bangers-Regular.ttf"),
  });
  const renderLetters = () => {
    return text.split("").map((letter, index) => {
      const colorAnim = useRef(new Animated.Value(0)).current;

      useEffect(() => {
        Animated.loop(
          Animated.timing(colorAnim, {
            toValue: 1,
            duration: 1000 + Math.random() * 1000,
            useNativeDriver: true,
          })
        ).start();
      }, []);

      const colorInterpolate = colorAnim.interpolate({
        inputRange: [0, 1],
        outputRange: [
          `hsl(${Math.random() * 360}, 100%, 70%)`,
          `hsl(${Math.random() * 360}, 100%, 70%)`,
        ],
      });

      return (
        <Animated.Text
          key={index}
          style={{
            fontSize: 20,
            fontWeight: "bold",
            // fontFamily: "Bangers",
            color: colorInterpolate,
            marginLeft: 25,
            transform: [
              {
                scale: scaleAnim,
              },
              {
                rotate: rotateAnim.interpolate({
                  inputRange: [0, 1],
                  outputRange: ["0deg", "360deg"],
                }),
              },
            ],
          }}
        >
          {letter}
        </Animated.Text>
      );
    });
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      setStartFireworks(true);
    }, 1500);

    Animated.timing(scaleAnim, {
      toValue: 3,
      duration: 1500,
      useNativeDriver: true,
    }).start();

    Animated.timing(rotateAnim, {
      toValue: 1,
      duration: 1500,
      useNativeDriver: true,
    }).start();

    setTimeout(() => {
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 1000,
        useNativeDriver: true,
      }).start(() => {
        navigation.replace("Accueil");
      });
    }, 2000);

    return () => clearTimeout(timeout);
  }, []);

  return (
    <Animated.View style={[styles.container, { opacity: fadeAnim }]}>
      {startFireworks && (
        <LottieView
          source={require("../assets/animations/explosion.json")}
          autoPlay
          loop={false}
          style={styles.fireworksTop}
        />
      )}

      {startFireworks && (
        <LottieView
          source={require("../assets/animations/explosion.json")}
          autoPlay
          loop={false}
          style={styles.fireworksBottom}
        />
      )}

      <View style={{ flexDirection: "row" }}>{renderLetters()}</View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    alignItems: "center",
    justifyContent: "center",
  },
  fireworksTop: {
    position: "absolute",
    top: 200,
    width: "100%",
    height: "100%",
  },
  fireworksBottom: {
    position: "absolute",
    bottom: 200,
    width: "100%",
    height: "100%",
  },
});
