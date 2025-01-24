import React from "react";
import { Modal, View, Text, StyleSheet, Button, FlatList } from "react-native";

export default function EndGameModal({ visible, onClose, onNextRound, teams }) {
  const maxScore = Math.max(...teams.map((team) => team.score));
  const winningTeams = teams.filter((team) => team.score === maxScore);
  const winnerNames = winningTeams.map((team) => team.name).join(", ");

  return (
    <Modal visible={visible} animationType="slide" transparent={true}>
      <View style={styles.overlay}>
        <View style={styles.modalContainer}>
          <Text style={styles.title}>Fin de la Manche</Text>
          <Text style={styles.subtitle}>
            Équipe(s) gagnante(s) : {winnerNames} avec {maxScore} point(s) !
          </Text>

          <Text style={styles.sectionTitle}>Scores des équipes :</Text>
          <FlatList
            data={teams}
            keyExtractor={(item) => item.name}
            renderItem={({ item }) => (
              <Text style={styles.teamScore}>
                {item.name} : {item.score} point(s)
              </Text>
            )}
          />

          <View style={styles.buttonContainer}>
            <Button title="Prochaine Manche" onPress={onNextRound} color="#4CAF50" />
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    width: "90%",
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 20,
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    textAlign: "center",
    color: "#666",
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#4CAF50",
    marginBottom: 10,
    alignSelf: "flex-start",
  },
  teamScore: {
    fontSize: 16,
    color: "#333",
    marginBottom: 5,
    alignSelf: "flex-start",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    marginTop: 20,
  },
});
