import React, { useState } from "react";
import useAuth from "../hook/useAuth";
import { StyleSheet, View, Text, TextInput, Button, Alert } from "react-native";
const Login = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login({ email, password });
      navigation.navigate("Home");
    } catch (err) {
      if (err.response.data) {
        Alert.alert("Oups", err.response.data.message, [
          { text: "OK" },
        ]);
      } else {
        Alert.alert("Oups ", err, [{ text: "OK" }]);
      }
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Connexion</Text>
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
      <Button title="Se connecter" onPress={handleSubmit} />
      <Button
        title="Pas encore de compte ? Inscription"
        onPress={() => navigation.navigate("Register")}
      />
      <Button
        title="Mode hors ligne"
        onPress={() => navigation.navigate("Home")}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", padding: 20 },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    marginBottom: 15,
    borderRadius: 5,
  },
});

export default Login;
