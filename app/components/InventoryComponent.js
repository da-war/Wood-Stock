import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { COLORS, FONTS } from "../constants/theme";

const InventoryComponent = ({ title = "Package", onPress }) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.mainContainer}>
      <Text style={styles.title}>{title}</Text>
    </TouchableOpacity>
  );
};

export default InventoryComponent;

const styles = StyleSheet.create({
  mainContainer: {
    padding: 15,
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.tertiary,
    borderRadius: 10,
    marginVertical: 3,
  },
  title: {
    fontFamily: FONTS.bold,
    alignItems: "center",
    justifyContent: "center",
  },
});
