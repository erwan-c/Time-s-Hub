import React, { useState } from "react";
import useAuth from "../hook/useAuth";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";

export default function Register({ navigation }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { register } = useAuth();

  const handleSubmit = async () => {
    try {
      await register({ name, email, password });
      navigation.navigate("Home");
    } catch (err) {
      Alert.alert(
        "Oups",
        err.response?.data?.message || "Une erreur est survenue",
        [{ text: "OK" }]
      );
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Inscription</Text>

      <TextInput
        style={styles.input}
        placeholder="Nom"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Mot de passe"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Créer un compte</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate("Login")}>
        <Text style={styles.linkText}>Déjà un compte ? Connexion</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate("Home")}>
        <Text style={styles.linkText}>Mode hors ligne</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#f7f7f7",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#4caf50",
    marginBottom: 20,
  },
  input: {
    width: "100%",
    borderWidth: 1,
    borderColor: "#ddd",
    padding: 12,
    borderRadius: 8,
    marginBottom: 15,
    backgroundColor: "#fff",
  },
  button: {
    backgroundColor: "#4caf50",
    padding: 15,
    borderRadius: 8,
    width: "100%",
    alignItems: "center",
    marginVertical: 10,
  },
  buttonText: { color: "#fff", fontSize: 18, fontWeight: "bold" },
  linkText: { color: "#007BFF", marginTop: 10, fontSize: 16 },
});
