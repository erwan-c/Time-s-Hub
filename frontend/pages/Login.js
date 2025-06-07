import React, { useState } from "react";
import useAuth from "../hook/useAuth";
import Input from "../components/input";
import Button from "../components/button";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Alert,
  Image,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
  ImageBackground,
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
    <ImageBackground
      source={require("../assets/background3.png")}
      style={styles.background}
      resizeMode="cover"
    >
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <ScrollView
          contentContainerStyle={styles.container}
          keyboardShouldPersistTaps="handled"
        >
          <Text style={stylesGlobal.title}>Connexion</Text>

          <View style={styles.formBox}>
            <Input
              placeholder="Email"
              value={email}
              onChangeText={setEmail}
            />
            <Input
              placeholder="Mot de passe"
              value={password}
              onChangeText={setPassword}
              secure={true}
            />
            <Button
              text="Se connecter"
              type="primary"
              onPress={handleSubmit}
            />
          </View>

          <View style={styles.linksBox}>
            <TouchableOpacity onPress={() => navigation.navigate("Register")}>
              <Text style={stylesGlobal.linkText}>
                Pas encore de compte ? Inscription
              </Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => navigation.navigate("Home")}>
              <Text style={stylesGlobal.linkText}>Mode hors ligne</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  container: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    paddingTop: 400,
    
  },
  logo: {
    width: 200,
    height: 80,
    resizeMode: "contain",
    marginBottom: 20,
  },
  formBox: {
    width: "100%",
    gap: 12,
    marginBottom: 24,
  },
  linksBox: {
    alignItems: "center",
    gap: 10,
  },
});
