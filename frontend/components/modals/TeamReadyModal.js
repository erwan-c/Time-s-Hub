import React from "react";
import { View, Modal, Text, StyleSheet } from "react-native";
import Button from "../button";
import { stylesGlobal } from "../../styles";

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
          <Text style={stylesGlobal.info}>
            {teamName} est-elle prête à jouer ?
          </Text>
          <View style={styles.modalButtons}>
            <Button text="Oui, prête !" onPress={onConfirm} type="primary" />
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
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
  },

  modalButtons: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
  },
});

export default TeamReadyModal;
