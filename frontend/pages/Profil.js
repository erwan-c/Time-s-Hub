import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
  FlatList,
} from "react-native";
import useAuth from "../hook/useAuth";
import { getUserGameHistory } from "../api/gameHistory";

export default function Profil({ navigation }) {
  const { user, logout } = useAuth();
  const [gameHistory, setGameHistory] = useState([]);

  useEffect(() => {
    if (user) {
      const fetchGameHistory = async () => {
        try {
          const historyData = await getUserGameHistory();
          console.log(historyData);
          setGameHistory(historyData); // Assurez-vous que les données sont sous forme de tableau
        } catch (error) {
          console.error("Erreur lors de la récupération de l'historique des jeux:", error);
          Alert.alert("Erreur", "Impossible de récupérer l'historique des jeux.");
        }
      };
      fetchGameHistory();
    }
  }, [user]);

  if (!user) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>
          Vous devez être connecté pour voir cette page.
        </Text>
      </View>
    );
  }

  const handleLogout = () => {
    logout();
    Alert.alert("Déconnexion", "Vous avez été déconnecté.", [{ text: "OK" }]);
    navigation.navigate("Login");
  };

  const renderGameHistory = ({ item }) => (
    <View style={styles.historyItem}>
      <Text style={styles.historyText}>
        <Text style={styles.bold}>Thème :</Text> {item.theme}
      </Text>
      <Text style={styles.historyText}>
        <Text style={styles.bold}>Équipe gagnante :</Text> {item.winningTeam}
      </Text>
      <Text style={styles.historyText}>
        <Text style={styles.bold}>Nombre d'équipes :</Text> {item.numberOfTeams}
      </Text>
      <Text style={styles.historyText}>
        <Text style={styles.bold}>Date :</Text> {new Date(item.createdAt).toLocaleDateString()}
      </Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.navigate("Home")}
      >
        <Text style={styles.backText}>← Retour</Text>
      </TouchableOpacity>

      <Text style={styles.title}>Profil</Text>

      <View style={styles.infoContainer}>
        <Text style={styles.label}>Nom :</Text>
        <Text style={styles.info}>{user.name}</Text>
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.label}>Email :</Text>
        <Text style={styles.info}>{user.email}</Text>
      </View>

      <TouchableOpacity style={styles.button} onPress={handleLogout}>
        <Text style={styles.buttonText}>Se déconnecter</Text>
      </TouchableOpacity>

      <Text style={styles.titleHistorique}>Historique</Text>
      {gameHistory.length > 0 ? (
        <FlatList
          data={gameHistory}
          renderItem={renderGameHistory}
          keyExtractor={(item) => item._id}
          style={styles.historyList}
        />
      ) : (
        <Text style={styles.errorText}>Aucun historique de jeu trouvé.</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#4caf50",
    marginBottom: 20,
    marginTop: 70,
  },
  titleHistorique: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#4caf50",
    marginBottom: 5,
    marginTop: 50,
  },
  errorText: {
    fontSize: 18,
    color: "red",
    textAlign: "center",
    marginTop: 20,
  },
  infoContainer: {
    marginVertical: 10,
    width: "100%",
    paddingHorizontal: 20,
  },
  label: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
  },
  info: {
    fontSize: 16,
    color: "#555",
    marginTop: 5,
  },
  button: {
    backgroundColor: "#ff4444",
    padding: 15,
    borderRadius: 8,
    width: "100%",
    alignItems: "center",
    marginTop: 20,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  backButton: {
    position: "absolute",
    top: 50,
    left: 20,
  },
  backText: {
    fontSize: 18,
    color: "#007BFF",
  },
  historyList: {
    marginTop: 30,
    width: "100%",
  },
  historyItem: {
    padding: 10,
    backgroundColor: "#f1f1f1",
    marginBottom: 10,
    borderRadius: 5,
  },
  historyText: {
    fontSize: 16,
    color: "#333",
  },
  bold: {
    fontWeight: "bold",
  },
});
