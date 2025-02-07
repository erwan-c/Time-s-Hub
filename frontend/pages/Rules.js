import React from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { stylesGlobal } from "../styles";
import Button from "../components/button";
import BackButton from "../components/backButton";

export default function Rules() {
  const navigation = useNavigation();

  return (
    <ScrollView style={styles.container}>
      <BackButton />
      <View style={styles.content}>
        <View style={styles.header}>
          <Image
            source={require("../assets/logoTimes.png")}
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
          1. **Première manche** : Le joueur peut dire tout ce qu'il veut pour
          faire deviner le mot (mais pas des mots en rapport avec le mot à
          deviner).
        </Text>
        <Text style={styles.paragraph}>
          2. **Deuxième manche** : Le joueur peut uniquement dire un mot pour
          faire deviner le mot (pas de phrases).
        </Text>
        <Text style={styles.paragraph}>
          3. **Troisième manche** : Le joueur doit mimer le mot sans dire un
          seul mot.
        </Text>

        <Text style={styles.sectionTitle}>La fin du jeu</Text>
        <Text style={styles.paragraph}>
          Lorsque toutes les cartes ont été jouées, l'équipe ayant deviné le
          plus grand nombre de mots remporte la partie.
        </Text>
        <View style={styles.header}>
          <Button
            text="Retour"
            type="primary"
            onPress={() => navigation.goBack()}
          />
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000000",
    paddingTop: 20,
  },

  content: {
    padding: 20,
  },
  header: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
  logo: {
    width: "60%",
    resizeMode: "contain",
  },
  sectionTitle: {
    fontSize: 22,
    color: "#c6c6c6",
    fontWeight: "bold",
    marginTop: 15,
    textDecorationLine: "underline",
    textDecorationColor: "#FF9000",
  },
  paragraph: {
    fontSize: 16,
    color: "#c6c6c6",
    lineHeight: 24,
    marginTop: 5,
  },
});
