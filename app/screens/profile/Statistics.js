import { StyleSheet, Text, View } from "react-native";
import React from "react";
import AppScreen from "../../components/AppScreen";
import { COLORS, FONTS } from "../../constants/theme";
import AppHeader from "../../components/AppHeader";

const Statistics = ({ navigation }) => {
  return (
    <AppScreen>
      <AppHeader
        leftIcon="chevron-left"
        onPressleft={() => navigation.goBack()}
        title="Statistics"
      />
      <View style={styles.mainContainer}>
        <Text style={styles.title}>Statistics</Text>
      </View>
    </AppScreen>
  );
};

export default Statistics;

const styles = StyleSheet.create({
  title: {
    fontFamily: FONTS.bold,
    fontSize: 20,
    textAlign: "center",
    marginVertical: 12,
    color: COLORS.primary,
  },
  mainContainer: {
    flex: 1,
  },
});
