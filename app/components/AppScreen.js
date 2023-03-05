import { SafeAreaView, StyleSheet, StatusBar as RNSB } from "react-native";

import React from "react";
import { StatusBar } from "expo-status-bar";

const AppScreen = ({ children, style }) => {
  return (
    <SafeAreaView style={[styles.main, style]}>
      <StatusBar style="dark" />
      {children}
    </SafeAreaView>
  );
};

export default AppScreen;

const styles = StyleSheet.create({
  main: {
    flex: 1,
    paddingTop: RNSB.currentHeight,
  },
});
