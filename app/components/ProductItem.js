import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";

import { MaterialCommunityIcons } from "@expo/vector-icons";
import { COLORS, FONTS } from "../constants/theme";

const ProductItem = ({ onPress, title }) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.mainContainer}>
      <Text style={styles.title}>{title}</Text>
      <MaterialCommunityIcons
        name="chevron-right"
        size={24}
        color={COLORS.gray}
      />
    </TouchableOpacity>
  );
};

export default ProductItem;

const styles = StyleSheet.create({
  mainContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 12,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 12,
    marginVertical: 3,
  },
  title: {
    fontFamily: FONTS.regular,
    color: COLORS.gray,
    fontSize: 14,
  },
});
