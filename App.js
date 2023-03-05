import { DefaultTheme, NavigationContainer } from "@react-navigation/native";
import { useFonts } from "expo-font";
import { onAuthStateChanged } from "firebase/auth";
import React, { useState } from "react";
import { LogBox } from "react-native";
import { COLORS } from "./app/constants/theme";
import AppNavigator from "./app/navigation/AppNavigator";
import AuthNavigator from "./app/navigation/AuthNavigator";
import { auth } from "./firebase";

export default function App() {
  const [user, setUser] = useState(null);
  LogBox.ignoreAllLogs();
  React.useEffect(() => {
    firebaseAuthState();
  }, []);

  const firebaseAuthState = () => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });
  };
  const theme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      background: COLORS.bg,
    },
  };
  const [fontsLoaded] = useFonts({
    EncodeSansBold: require("./assets/fonts/EncodeSans-Bold.ttf"),
    EncodeSansSemiBold: require("./assets/fonts/EncodeSans-SemiBold.ttf"),
    EncodeSansMedium: require("./assets/fonts/EncodeSans-Medium.ttf"),
    EncodeSansRegular: require("./assets/fonts/EncodeSans-Regular.ttf"),
    EncodeSansLight: require("./assets/fonts/EncodeSans-Light.ttf"),
    EncodeSansThin: require("./assets/fonts/EncodeSans-Thin.ttf"),
    EncodeSansExtraBold: require("./assets/fonts/EncodeSans-ExtraBold.ttf"),
  });

  if (!fontsLoaded) return null;
  if (!user) {
    return (
      <NavigationContainer theme={theme}>
        <AuthNavigator />
      </NavigationContainer>
    );
  } else {
    return (
      <NavigationContainer theme={theme}>
        <AppNavigator />
      </NavigationContainer>
    );
  }
}
