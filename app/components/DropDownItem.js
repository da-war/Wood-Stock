import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";

import { MaterialCommunityIcons } from "@expo/vector-icons";
import { COLORS, FONTS } from "../constants/theme";

const DropDownItem = ({ title, onPressDelete, hide }) => {
  return (
    <View style={styles.mainContainer}>
      <Text style={styles.title}>{title}</Text>
      {!hide && (
        <MaterialCommunityIcons
          name="delete"
          color={COLORS.secondary}
          size={18}
          onPress={onPressDelete}
        />
      )}
    </View>
  );
};

export default DropDownItem;

const styles = StyleSheet.create({
  mainContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 7,
    borderRadius: 6,
    backgroundColor: COLORS.white,
    marginHorizontal: 5,
    marginVertical: 4,
  },
  title: {
    fontFamily: FONTS.light,
    fontSize: 12,
    color: COLORS.gray,
    marginRight: 5,
  },
});
