import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { TouchableOpacity } from "react-native";
import AppHeader from "../AppHeader";
import { COLORS, FONTS, SHADOWS } from "../../constants/theme";

import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";

const HomeCard = ({
  styly,
  title = "Card",
  icon = "add-circle-sharp",
  containerStyle,
  m,
}) => {
  return (
    <TouchableOpacity style={[styles.topi, styly]}>
      <View style={[styles.mainContainer, containerStyle]}>
        {!m && <Ionicons name={icon} color={COLORS.white} size={50} />}
        {m && (
          <MaterialCommunityIcons name={icon} color={COLORS.white} size={50} />
        )}
        <Text style={styles.title}>{title}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default HomeCard;

const styles = StyleSheet.create({
  mainContainer: {
    height: 140,
    backgroundColor: COLORS.tertiary,
    marginHorizontal: 20,
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: COLORS.secondary,
    borderRadius: 7,
    ...SHADOWS.dark,
  },
  topi: {
    marginVertical: 10,
    borderRadius: 15,
  },
  title: {
    fontSize: 18,
    fontFamily: FONTS.bold,
    color: COLORS.white,
    marginTop: 10,
  },
});
