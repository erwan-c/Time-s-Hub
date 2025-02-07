import React, { useState } from "react";
import useAuth from "../hook/useAuth";
import Input from "../components/input";
import Button from "../components/button";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  Image,
} from "react-native";
import { stylesGlobal } from "../styles";
export default function Login({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();

  const handleSubmit = async () => {
    try {
      await login({ email, password });

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
      <Text style={stylesGlobal.title}>Connexion</Text>

      <Input placeholder="Email" value={email} onChangeText={setEmail} />
      <Input
        placeholder="Mot de passe"
        value={password}
        onChangeText={setPassword}
        secure={true}
      />

      <Button text="Se connecter" type="primary" onPress={handleSubmit} />

      <TouchableOpacity onPress={() => navigation.navigate("Register")}>
        <Text style={stylesGlobal.linkText}>
          Pas encore de compte ? Inscription
        </Text>
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
    resizeMode: "contain",
  },
});
