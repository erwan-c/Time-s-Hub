import React, { useEffect, useRef } from "react";
import {
  Modal,
  View,
  Text,
  StyleSheet,
  Animated,
  Image,
  Dimensions,
} from "react-native";
import Button from "../button";
import { stylesGlobal } from "../../styles";
import LottieView from "lottie-react-native";

const { width, height } = Dimensions.get("window");

const FinalWinnerModal = ({ visible, onClose, teams }) => {
  const maxScore = Math.max(...teams.map((team) => team.score));
  const winningTeams = teams.filter((team) => team.score === maxScore);
  const winnerNames = winningTeams.map((team) => team.name).join(", ");

  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (visible) {
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }).start();
    } else {
      fadeAnim.setValue(0);
    }
  }, [visible]);

  return (
    <Modal visible={visible} animationType="fade" transparent={true}>
      <View style={styles.modalBackground}>
        <Animated.View style={[styles.modalContainer, { opacity: fadeAnim }]}> 
          <LottieView
            source={require("../../assets/fireworks.json")}
            autoPlay
            loop
            style={styles.fireworks}
          />

          <Text style={stylesGlobal.subTitle}>✨ Victoire ! ✨</Text>
          <Text style={styles.winnerText}>
            Bravo à {winnerNames} avec {maxScore} point(s) !
          </Text>

          <View style={styles.buttonContainer}>
            <Button text="Retour à l'accueil" type="primary" onPress={onClose} />
          </View>
        </Animated.View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.85)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    width: "90%",
    backgroundColor: "#1e1e1e",
    borderRadius: 16,
    padding: 30,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 10,
  },
  winnerText: {
    fontSize: 20,
    color: "#FF9000",
    textAlign: "center",
    marginTop: 15,
    fontWeight: "600",
  },
  buttonContainer: {
    marginTop: 25,
    width: "100%",
  },
  fireworks: {
    position: "absolute",
    top: -60,
    width: width,
    height: height * 0.6,
  },
});

export default FinalWinnerModal;
