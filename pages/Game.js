import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, Button } from "react-native";
import { useRoute } from '@react-navigation/native';
import TeamReadyModal from "../components/modals/TeamReadyModal"; // Import du composant de la modale

export default function Game() {
  const route = useRoute();
  const { teams, words } = route.params;

  // Convertir le nombre d'équipes en un tableau pour gérer les rotations d'équipes
  const teamsArray = Array.from({ length: teams }, (_, index) => `Équipe ${index + 1}`);

  // États pour garder une trace de l'indice du mot actuel, de l'équipe actuelle et du chrono
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [currentTeamIndex, setCurrentTeamIndex] = useState(0);
  const [timer, setTimer] = useState(30); // Timer initial à 30 secondes
  const [isTimerActive, setIsTimerActive] = useState(true);
  const [isModalVisible, setIsModalVisible] = useState(false); // État pour afficher la modale

  // Fonction pour passer au mot suivant
  const nextWord = () => {
    if (currentWordIndex < words.length - 1) {
      setCurrentWordIndex(currentWordIndex + 1);
    }
  };

  // Fonction pour passer à l'équipe suivante toutes les 30 secondes
  const switchTeam = () => {
    setCurrentTeamIndex((prevIndex) => (prevIndex + 1) % teamsArray.length); // Passe à l'équipe suivante
    setIsModalVisible(false); // Ferme la modale après confirmation
    setTimer(30); // Réinitialiser le timer à 30 secondes après avoir changé d'équipe
  };

  // Fonction pour démarrer le chrono et changer l'équipe toutes les 30 secondes
  useEffect(() => {
    if (isTimerActive) {
      const interval = setInterval(() => {
        setTimer((prevTime) => {
          if (prevTime === 1) {
            setIsModalVisible(true); // Affiche la modale quand le chrono atteint 0
            return 30; // Réinitialiser le timer à 30 secondes
          }
          return prevTime - 1; // Décrémenter le timer chaque seconde
        });
      }, 1000); // Décrémenter chaque seconde

      // Nettoyer l'intervalle lorsque le composant est démonté ou que le chrono est arrêté
      return () => clearInterval(interval);
    }
  }, [isTimerActive, timer]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Jeu en Cours</Text>

      {/* Afficher l'équipe actuelle */}
      <Text style={styles.subTitle}>Équipe actuelle : {teamsArray[currentTeamIndex]}</Text>

      {/* Afficher le chrono */}
      <Text style={styles.timer}>Temps restant : {timer} s</Text>

      {/* Affichage de la carte avec le mot */}
      <View style={styles.card}>
        <Text style={styles.word}>{words[currentWordIndex]}</Text>
      </View>

      {/* Boutons pour passer au mot suivant */}
      <View style={styles.buttonsContainer}>
        <Button
          title="Suivant (Rouge)"
          color="red"
          onPress={nextWord}
        />
        <Button
          title="Suivant (Vert)"
          color="green"
          onPress={nextWord}
        />
      </View>

      {/* Utilisation du composant TeamReadyModal */}
      <TeamReadyModal
        visible={isModalVisible}
        onClose={() => setIsModalVisible(false)} // Fonction pour fermer la modale
        onConfirm={switchTeam} // Fonction pour changer d'équipe
        teamName={teamsArray[(currentTeamIndex + 1) % teamsArray.length]} // Nom de l'équipe suivante
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
    justifyContent: "center",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
    color: "#4CAF50",
    marginBottom: 20,
  },
  subTitle: {
    fontSize: 20,
    marginBottom: 10,
    color: "#333",
    fontWeight: "bold",
  },
  card: {
    backgroundColor: "#f0f0f0",
    padding: 20,
    borderRadius: 10,
    marginBottom: 20,
    alignItems: "center",
  },
  word: {
    fontSize: 24,
    color: "#333",
    fontWeight: "bold",
  },
  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  timer: {
    fontSize: 24,
    color: "#ff5733",
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
});
