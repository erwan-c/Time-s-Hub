import React from "react";
import { Modal, View, Text, StyleSheet, FlatList } from "react-native";
import Button from "../button";
import { stylesGlobal } from "../../styles";
export default function EndGameModal({ visible, onClose, onNextRound, teams }) {
  const maxScore = Math.max(...teams.map((team) => team.score));
  const winningTeams = teams.filter((team) => team.score === maxScore);
  const winnerNames = winningTeams.map((team) => team.name).join(", ");

  return (
    <Modal visible={visible} animationType="slide" transparent={true}>
      <View style={styles.overlay}>
        <View style={styles.modalContainer}>
          <Text style={stylesGlobal.subTitle}>Fin de la Manche</Text>
          <Text style={stylesGlobal.info}>
            Winner : {winnerNames} !
          </Text>

          <Text style={stylesGlobal.sectionTitle}>Scores des équipes :</Text>
          <FlatList
            data={teams}
            keyExtractor={(item) => item.name}
            renderItem={({ item }) => (
              <Text style={stylesGlobal.teamScore}>
                {item.name} : {item.score} point(s)
              </Text>
            )}
          />

          <View style={styles.buttonContainer}>
            <Button
              text="Prochaine Manche"
              type="primary"
              onPress={onNextRound}
            />
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "#000",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    width: "90%",
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
