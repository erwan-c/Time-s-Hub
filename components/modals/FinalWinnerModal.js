import React from "react";
import { Modal, View, Text, Button, StyleSheet } from "react-native";

const FinalWinnerModal = ({ visible, onClose, teams }) => {
  const maxScore = Math.max(...teams.map((team) => team.score));
  const winningTeams = teams.filter((team) => team.score === maxScore);
  const winnerNames = winningTeams.map((team) => team.name).join(", ");

  return (
    <Modal visible={visible} animationType="slide" transparent={true}>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.title}>Fin du Jeu</Text>
          <Text style={styles.text}>
            Félicitations à {winnerNames} avec {maxScore} point(s) !
          </Text>
          <Button title="Retour à l'accueil" onPress={onClose} />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    width: "80%",
    backgroundColor: "white",
    borderRadius: 10,
    padding: 20,
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  text: {
    fontSize: 18,
    textAlign: "center",
    marginBottom: 20,
  },
});

export default FinalWinnerModal;
