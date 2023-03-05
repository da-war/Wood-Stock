import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";

import { AntDesign } from "@expo/vector-icons";
import colors from "../config/colors";
import { COLORS } from "../constants/theme";

const ListItem = ({ title, onPress }) => {
  return (
    <View style={styles.mainContainer}>
      <Text>{title}</Text>
      <TouchableOpacity onPress={onPress}>
        <AntDesign name="delete" size={24} color={colors.primary} />
      </TouchableOpacity>
    </View>
  );
};

export default ListItem;

const styles = StyleSheet.create({
  mainContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 15,
    backgroundColor: COLORS.white,
    marginVertical: 5,
    padding: 12,
    borderRadius: 8,
  },
});
