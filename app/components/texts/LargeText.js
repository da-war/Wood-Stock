import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { FONTS } from "../../constants/theme";

const LargeText = ({ children, style }) => {
  return <Text style={[styles.text, style]}>{children}</Text>;
};

export default LargeText;

const styles = StyleSheet.create({
  text: {
    fontFamily: FONTS.bold,
    fontSize: 18,
  },
});
