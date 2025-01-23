import React from "react";
import { View, Modal, Text, Button, StyleSheet } from "react-native";

const TeamReadyModal = ({ visible, onClose, onConfirm, teamName }) => {
  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={onClose}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.modalText}>
            {teamName} est-elle prête à jouer ?
          </Text>
          <View style={styles.modalButtons}>
            <Button
              title="Oui, prête !"
              onPress={onConfirm}
              color="green"
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
    backgroundColor: "rgba(0, 0, 0, 0.5)", 
  },
  modalContent: {
    width: "80%",
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
  },
  modalText: {
    fontSize: 20,
    marginBottom: 20,
    color: "#333",
    textAlign: "center",
  },
  modalButtons: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
  },
});

export default TeamReadyModal;
