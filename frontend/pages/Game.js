import React, { useState, useEffect } from "react";
import { StyleSheet, View, Alert } from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";
import GameHeader from "../components/game/GameHeader";
import WordCard from "../components/game/WordCard";
import WordButtons from "../components/game/WordButtons";
import EndGameModal from "../components/modals/EndGameModal";
import TeamReadyModal from "../components/modals/TeamReadyModal";
import FinalWinnerModal from "../components/modals/FinalWinnerModal";
import useAuth from "../hook/useAuth";
import { addGameHistory } from "../api/gameHistory";
import { ImageBackground } from "react-native";
import BackButton from "../components/backButton";

export default function Game() {
  const route = useRoute();
  const navigation = useNavigation();
  const { numberOfTeams, words, theme } = route.params;
  const [teamsArray, setTeamsArray] = useState(
    Array.from({ length: numberOfTeams }, (_, index) => ({
      name: `Équipe ${index + 1}`,
      score: 0,
    }))
  );

  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [currentTeamIndex, setCurrentTeamIndex] = useState(0);
  const [remainingWords, setRemainingWords] = useState([...words]);
  const [usedWords, setUsedWords] = useState([]);
  const [currentRound, setCurrentRound] = useState(1);
  const [timer, setTimer] = useState(30);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isEndGameModalVisible, setIsEndGameModalVisible] = useState(false);
  const [isFinalWinnerModalVisible, setIsFinalWinnerModalVisible] =
    useState(false);
  const { user } = useAuth();

  const addHistoryGameToUser = async () => {
    if (user) {
      try {
        const winningTeam = teamsArray.reduce((prev, current) =>
          prev.score > current.score ? prev : current
        ).name;

        await addGameHistory({ theme, numberOfTeams, winningTeam });
      
      } catch (error) {
        console.error(error)
        Alert.alert(
          "Oups",
          "Erreur lors de l'enregistrement dans l'historique"
        );
      }
    }
  };

  const skipWord = () => {
    setRemainingWords((prevWords) => {
      const skippedWord = prevWords[currentWordIndex];
      const updatedWords = [
        ...prevWords.slice(0, currentWordIndex),
        ...prevWords.slice(currentWordIndex + 1),
        skippedWord,
      ];
      setCurrentWordIndex(
        currentWordIndex >= updatedWords.length - 1 ? 0 : currentWordIndex
      );
      return updatedWords;
    });
  };

  const validateWord = () => {
    setRemainingWords((prevWords) => {
      const validatedWord = prevWords[currentWordIndex];
      const updatedWords = prevWords.filter(
        (_, index) => index !== currentWordIndex
      );
      setUsedWords((prevUsed) => [...prevUsed, validatedWord]);
      setCurrentWordIndex(
        currentWordIndex >= updatedWords.length ? 0 : currentWordIndex
      );
      return updatedWords;
    });

    setTeamsArray((prevTeams) => {
      const updatedTeams = [...prevTeams];
      updatedTeams[currentTeamIndex].score += 1;
      return updatedTeams;
    });
  };

  const handleRoundEnd = () => {
    if (currentRound === 3) {
      handleFinalWinner();
      return;
    }

    setIsEndGameModalVisible(true);
  };

  const handleFinalWinner = () => {
    setIsFinalWinnerModalVisible(true);
  };

  const handleNextRound = () => {
    setRemainingWords([...usedWords]);
    setUsedWords([]);
    setCurrentWordIndex(0);
    setCurrentRound((prevRound) => prevRound + 1);
    setTimer(30);
    setIsEndGameModalVisible(false);

  };

  const switchTeam = () => {
    setCurrentTeamIndex((prevIndex) => (prevIndex + 1) % teamsArray.length);
    setIsModalVisible(false);
    setTimer(30);
  };

  useEffect(() => {
    if (remainingWords.length === 0) {
      handleRoundEnd();
    }
  }, [remainingWords]);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((prevTime) => {
        if (prevTime === 1) {
          setIsModalVisible(true);
          return 30;
        }
        return prevTime - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  

return (
  <ImageBackground
    source={require("../assets/background.png")} // ← ou ton nouveau fond
    style={styles.background}
    resizeMode="cover"
  >
    <BackButton />
    <View style={styles.overlay}>
      <View style={styles.headerContainer}>
        <GameHeader
          teamName={teamsArray[currentTeamIndex].name}
          timer={timer}
          round={currentRound}
        />
      </View>

      {remainingWords.length > 0 && (
        <View style={styles.wordContainer}>
          <WordCard word={remainingWords[currentWordIndex]} reste={remainingWords.length}/>
        </View>
      )}

      <View style={styles.buttonContainer}>
        <WordButtons onSkipWord={skipWord} onValidateWord={validateWord} />
      </View>

      <TeamReadyModal
        visible={isModalVisible}
        onClose={() => setIsModalVisible(false)}
        onConfirm={switchTeam}
        teamName={teamsArray[(currentTeamIndex + 1) % teamsArray.length].name}
      />

      <EndGameModal
        visible={isEndGameModalVisible}
        onClose={() => setIsEndGameModalVisible(false)}
        onNextRound={handleNextRound}
        teams={teamsArray}
      />

      <FinalWinnerModal
        visible={isFinalWinnerModalVisible}
        onClose={() => {
          addHistoryGameToUser();
          setIsFinalWinnerModalVisible(false);
          navigation.navigate("Home");
        }}
        teams={teamsArray}
      />
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
    backgroundColor: "rgba(0,0,0,0.7)", // effet fondu
    paddingHorizontal: 20,
    paddingTop: 40,
    justifyContent: "space-between",
  },
  headerContainer: {
    alignItems: "center",
    marginBottom: 10,
  },
  wordContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 10,
  },
  buttonContainer: {
    paddingBottom: 50,
    gap: 20,
  },
});
