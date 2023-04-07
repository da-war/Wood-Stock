import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { COLORS, FONTS } from "../constants/theme";

const InventoryComponent = ({ title = "Package", onPress }) => {
  return (
    <TouchableOpacity style={styles.mainContainer}>
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
    borderColor: COLORS.border,
    borderRadius: 10,
  },
  title: {
    fontFamily: FONTS.bold,
    alignItems: "center",
    justifyContent: "center",
  },
});
