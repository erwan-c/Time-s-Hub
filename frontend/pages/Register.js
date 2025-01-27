import React, { useState } from "react";
import useAuth from "../hook/useAuth";
import { StyleSheet, View, Text, TextInput, Button, Alert } from "react-native";

const Register = ({ navigation }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { register } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await register({ name, email, password });
      navigation.navigate("Home");
    } catch (err) {
        console.log(err.response.data)
      if ( err.response.data) {
        Alert.alert("Oups ", err.response.data.message, [
          { text: "OK" },
        ]);
      } else {
        Alert.alert("Erreur réseau : ", err, [{ text: "OK" }]);
      }
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
      <Button title="Créer un compte" onPress={handleSubmit} />
      <Button
        title="Déjà un compte ? Connexion"
        onPress={() => navigation.navigate("Login")}
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

export default Register;
