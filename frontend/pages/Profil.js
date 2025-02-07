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
import { stylesGlobal } from "../styles";
import Button from "../components/button";
import BackButton from "../components/backButton";

export default function Profil({ navigation }) {
  const { user, logout } = useAuth();
  const [gameHistory, setGameHistory] = useState([]);

  useEffect(() => {
    if (user) {
      const fetchGameHistory = async () => {
        try {
          const historyData = await getUserGameHistory();
          setGameHistory(historyData);
        } catch (error) {}
      };
      fetchGameHistory();
    }
  }, [user]);

  if (!user) {
    return (
      <View style={styles.container}>
        <BackButton />
        <View style={styles.center}>
          <Text style={stylesGlobal.errorTitle}>Attention</Text>
          <Text style={stylesGlobal.errorText}>
            Vous devez être connecté pour voir cette page.
          </Text>
        </View>
        <View style={styles.buttonContainer}>
          <Button
            text="Se connecter"
            type="primary"
            onPress={() => navigation.navigate("Login")}
          />
          <Button
            text="Rester hors ligne"
            type="primary"
            onPress={() => navigation.navigate("Home")}
          />
        </View>
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
        <Text style={styles.bold}>Date :</Text>{" "}  
        {new Date(item.createdAt).toLocaleDateString()}
      </Text>
    </View>
  );

  return (
    <View style={styles.containerConnected}>
      <BackButton />
      <View style={styles.categorie}>
        <View style={styles.center}>
          <Text style={stylesGlobal.title}>Profil</Text>
        </View>
        <View style={styles.infoContainer}>
          <Text style={stylesGlobal.label}>Nom :</Text>
          <Text style={stylesGlobal.info}>{user.name}</Text>
        </View>
        <View style={styles.infoContainer}>
          <Text style={stylesGlobal.label}>Email :</Text>
          <Text style={stylesGlobal.info}>{user.email}</Text>
        </View>
      </View>
      <Button text="Se déconnecter" type="primary" onPress={handleLogout} />

      <View style={styles.categorie}>
        <View style={styles.center}>
          <Text style={stylesGlobal.title}>Historique </Text>
        </View>
        {gameHistory.length > 0 ? (
          <View style={styles.historyContainer}>
          <FlatList
            data={gameHistory}
            renderItem={renderGameHistory}
            keyExtractor={(item) => item._id}
            style={styles.historyList}
          />
        </View>
        
        ) : (
          <View style={styles.center}>
            <Text style={stylesGlobal.errorTitle}>Attention</Text>
            <Text style={stylesGlobal.errorText}>
              Aucun historique de jeu trouvé.
            </Text>
          </View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 30,
    backgroundColor: "#000",
    justifyContent: "center",
  },
  containerConnected: {
    flex: 1,
    padding: 20,
    backgroundColor: "#000",
  },

  titleContainer: {
    marginTop: 50,
    marginBottom: 20,
  },
  categorie: {
    marginTop: 50,
    marginBottom: 20,
  },
  center: {
    justifyContent: "center",
    alignItems: "center",
  },
  buttonContainer: {
    gap: 20,
  },
  infoContainer: {
    marginVertical: 10,
    width: "100%",
    paddingHorizontal: 20,
  },
  historyList: {
    marginTop: 30,
    width: "100%",
  },
  historyItem: {
    padding: 10,
    backgroundColor: "#212121",
    marginBottom: 10,
    borderRadius: 5,
  },
  historyText: {
    fontSize: 16,
    color: "#c6c6c6",
  },
  bold: {
    fontWeight: "bold",
    color: "#FF9000",
  },
  historyContainer: {
    maxHeight: 400, 
    width: "100%",
  },
  
});
