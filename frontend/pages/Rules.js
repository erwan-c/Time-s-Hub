import React from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  ImageBackground,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { stylesGlobal } from "../styles";
import Button from "../components/button";
import BackButton from "../components/backButton";

export default function Rules() {
  const navigation = useNavigation();

  return (
    <ImageBackground
      source={require("../assets/background3.png")}
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.overlay}>
        <ScrollView contentContainerStyle={styles.container}>
          <BackButton />
          <View style={styles.content}>
            <View style={styles.header}>
              <Image
                source={require("../assets/logo.png")}
                style={styles.logo}
              />
              <Text style={stylesGlobal.title}>Règles</Text>
            </View>

            <Text style={styles.sectionTitle}>Objectif du jeu</Text>
            <Text style={styles.paragraph}>
              Time's Up est un jeu d'ambiance où le but est de faire deviner à son
              équipe des mots ou des expressions dans un temps limité. Chaque joueur
              doit essayer de décrire ou mimer un mot sans le prononcer, pour que
              son équipe devine le plus grand nombre possible de mots avant la fin
              du temps imparti.
            </Text>

            <Text style={styles.sectionTitle}>Déroulement du jeu</Text>
            <Text style={styles.paragraph}>
              Le jeu se déroule en plusieurs manches. Dans chaque manche, un joueur
              doit faire deviner des mots à son équipe dans un temps limité. Il y a
              trois manches, et chaque manche a une règle différente.
            </Text>

            <Text style={styles.sectionTitle}>Les manches</Text>
            <Text style={styles.paragraph}>
              1. Première manche : Le joueur peut dire tout ce qu'il veut pour faire
              deviner le mot (mais pas des mots en rapport avec le mot à deviner).
            </Text>
            <Text style={styles.paragraph}>
              2. Deuxième manche : Le joueur peut uniquement dire un mot pour faire
              deviner le mot (pas de phrases).
            </Text>
            <Text style={styles.paragraph}>
              3. Troisième manche : Le joueur doit mimer le mot sans dire un seul mot.
            </Text>

            <Text style={styles.sectionTitle}>La fin du jeu</Text>
            <Text style={styles.paragraph}>
              Lorsque toutes les cartes ont été jouées, l'équipe ayant deviné le
              plus grand nombre de mots remporte la partie.
            </Text>

            <View style={styles.footerButton}>
              <Button
                text="Retour"
                type="primary"
                onPress={() => navigation.goBack()}
              />
            </View>
          </View>
        </ScrollView>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.8)",
  },
  container: {
    paddingBottom: 40,
  },
  content: {
    padding: 20,
    paddingTop: 60,
  },
  header: {
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  logo: {
    width: 180,
    height: 70,
    resizeMode: "contain",
  },
  sectionTitle: {
    fontSize: 22,
    color: "#FF9000",
    fontWeight: "bold",
    marginTop: 20,
    marginBottom: 8,
    textAlign: "center",
  },
  paragraph: {
    fontSize: 16,
    color: "#e0e0e0",
    lineHeight: 24,
    textAlign: "justify",
  },
  footerButton: {
    marginTop: 40,
    alignItems: "center",
  },
});
