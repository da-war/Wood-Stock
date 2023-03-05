import { ScrollView, StyleSheet, Text, View } from "react-native";
import React from "react";
import AppScreen from "../../components/AppScreen";
import AppHeader from "../../components/AppHeader";
import { COLORS, FONTS } from "../../constants/theme";
import HomeCard from "../../components/cards/HomeCard";

const HomeScreen = () => {
  return (
    <AppScreen>
      <AppHeader title="Home" />
      <View style={styles.main}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <Text style={styles.title}>Welcome to Wood-Stock</Text>
          <HomeCard title="Erfassen" />
          <HomeCard title="QR Scannen" icon="ios-qr-code" />
          <HomeCard title="Lagerliste" m={true} icon="warehouse" />
        </ScrollView>
      </View>
    </AppScreen>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  main: {
    flex: 1,
  },
  title: {
    fontFamily: FONTS.bold,
    fontSize: 18,
    textAlign: "center",
    alignItems: "center",
    marginVertical: 13,
    color: COLORS.primary,
  },
});
