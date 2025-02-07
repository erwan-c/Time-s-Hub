import React from "react";
import { Modal, View, Text,  StyleSheet } from "react-native";
import Button from "../button";
import { stylesGlobal } from "../../styles";

const FinalWinnerModal = ({ visible, onClose, teams }) => {
  const maxScore = Math.max(...teams.map((team) => team.score));
  const winningTeams = teams.filter((team) => team.score === maxScore);
  const winnerNames = winningTeams.map((team) => team.name).join(", ");

  return (
    <Modal visible={visible} animationType="slide" transparent={true}>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={stylesGlobal.subTitle}>Fin du Jeu</Text>
          <Text style={stylesGlobal.info}>
            Félicitations à {winnerNames} avec {maxScore} point(s) !
          </Text>
          <View style={styles.buttonContainer}>
          <Button
              text="Retour à l'accueil"
              type="primary"
              onPress={onClose}
            />
            </View>
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
    backgroundColor: "#000",
  },
  modalContent: {
    width: "80%",
    backgroundColor: "#212121",
    borderRadius: 10,
    padding: 20,
    alignItems: "center",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    marginTop: 20,
  },
});

export default FinalWinnerModal;
