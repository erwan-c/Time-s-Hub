import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { CardStyleInterpolators, createStackNavigator } from "@react-navigation/stack";
import Welcome from "./pages/Welcome";
import Home from "./pages/Home";
import GameSettings from "./pages/GameSettings";
import Game from "./pages/Game";

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Welcome"
        screenOptions={{
          headerShown: false,
          cardStyleInterpolator: CardStyleInterpolators.forNoAnimation
        }}
      >
        <Stack.Screen name="Welcome" component={Welcome} />
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="GameSettings" component={GameSettings} />
        <Stack.Screen name="Game" component={Game} />

      </Stack.Navigator>
    </NavigationContainer>
  );
}
