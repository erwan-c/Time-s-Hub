import React, { useState } from "react";
import useAuth from "../hook/useAuth";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  Image
} from "react-native";
import Input from "../components/input";
import Button from "../components/button";
import { stylesGlobal } from "../styles";

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
      <Image source={require("../assets/logoTimes.png")} style={styles.logo} />

      <Text style={stylesGlobal.title}>Inscription</Text>

      <Input placeholder="Nom" value={name} onChangeText={setName} />

      <Input placeholder="Email" value={email} onChangeText={setEmail} />
      <Input
        placeholder="Mot de passe"
        value={password}
        onChangeText={setPassword}
        secure={true}
      />

      <Button text="Créer un compte" type="primary" onPress={handleSubmit} />

      <TouchableOpacity onPress={() => navigation.navigate("Login")}>
        <Text style={stylesGlobal.linkText}>Déjà un compte ? Connexion</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate("Home")}>
        <Text style={stylesGlobal.linkText}>Mode hors ligne</Text>
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
    backgroundColor: "#000",
  },
  logo: {
    width: "60%",
    // height: 200,
    resizeMode: "contain",
    // marginBottom: 20,
  },
});
