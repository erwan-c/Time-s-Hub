import React from "react";
import { View, Text, Button, StyleSheet, Alert } from "react-native";
import useAuth from "../hook/useAuth";

const Profil = ({ navigation }) => {
  const { user, logout } = useAuth();

  if (!user) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Vous devez être connecté pour voir cette page.</Text>
      </View>
    );
  }

  const handleLogout = () => {
    logout();
    Alert.alert("Déconnexion", "Vous avez été déconnecté.", [{ text: "OK" }]);
    navigation.navigate("Login"); // Redirige vers la page d'accueil après la déconnexion
  };

  return (
    <View style={styles.container}>
      <Button
        title="Retour"
        onPress={() => navigation.navigate("Home")}
        style={styles.backButton}
      />
      <Text style={styles.title}>Profil</Text>
      <View style={styles.infoContainer}>
        <Text style={styles.label}>Nom :</Text>
        <Text style={styles.info}>{user.name}</Text>
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.label}>Email :</Text>
        <Text style={styles.info}>{user.email}</Text>
      </View>
      <Button title="Se déconnecter" onPress={handleLogout} style={styles.logoutButton} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#f7f7f7",
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#4caf50",
    marginBottom: 20,
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
  backButton: {
    marginBottom: 20,
  },
  logoutButton: {
    marginTop: 20,
  },
});

export default Profil;
