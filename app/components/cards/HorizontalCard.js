import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";

import { MaterialCommunityIcons } from "@expo/vector-icons";
import { COLORS, FONTS, SHADOWS } from "../../constants/theme";

const HorizontalCard = ({
  rightIcon = "chevron-right",
  title = "Title",
  leftIcon = "home",
  onPress,
}) => {
  return (
    <TouchableOpacity style={styles.topCon} onPress={onPress}>
      <View style={styles.mainContainer}>
        <View style={styles.leftContainer}>
          <MaterialCommunityIcons
            name={leftIcon}
            color={COLORS.secondary}
            size={22}
          />
          <Text style={styles.title}>{title}</Text>
        </View>
        <MaterialCommunityIcons
          name={rightIcon}
          color={COLORS.secondary}
          size={22}
        />
      </View>
    </TouchableOpacity>
  );
};

export default HorizontalCard;

const styles = StyleSheet.create({
  leftContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  mainContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: COLORS.white,
    padding: 12,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: COLORS.tertiary,
    ...SHADOWS.dark,
  },
  topCon: {
    marginHorizontal: 20,
    marginVertical: 5,
  },
  title: {
    fontFamily: FONTS.medium,
    color: COLORS.secondary,
    marginLeft: 10,
  },
});
