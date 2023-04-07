import { Modal, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";

import { MaterialCommunityIcons } from "@expo/vector-icons";
import { COLORS, FONTS, SIZES } from "../constants/theme";

const AppHeader = ({ leftIcon, rightIcon, title = "Title", onPressleft }) => {
  return (
    <View style={styles.mainContainer}>
      <View style={styles.topContainer}>
        {leftIcon && (
          <TouchableOpacity onPress={onPressleft} style={styles.iconContainer}>
            <MaterialCommunityIcons
              name={leftIcon}
              size={25}
              color={COLORS.bg}
            />
          </TouchableOpacity>
        )}
        <Text style={styles.text}>{title}</Text>
      </View>
      <View style={styles.bottomContainer}>
        {rightIcon && (
          <MaterialCommunityIcons
            name={rightIcon}
            color={COLORS.bg}
            size={24}
          />
        )}
      </View>
    </View>
  );
};

export default AppHeader;

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: COLORS.primary,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 15,
  },
  topContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  text: {
    fontSize: SIZES.h4,
    color: COLORS.bg,
    marginLeft: 7,
    fontFamily: FONTS.semiBold,
  },
  iconContainer: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: COLORS.secondary,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 5,
  },
});
