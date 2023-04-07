import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { COLORS, FONTS } from "../constants/theme";

const AdminCard = ({ onPress, source, title }) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.mainContainer}>
      <Image resizeMode="contain" style={styles.image} source={source} />
      <Text numberOfLines={1} adjustsFontSizeToFit style={styles.title}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

export default AdminCard;

const styles = StyleSheet.create({
  mainContainer: {
    width: 125,
    height: 175,
    backgroundColor: COLORS.white,
    borderRadius: 10,
    padding: 10,
    borderColor: COLORS.border,
    borderWidth: 1,
  },
  title: {
    fontSize: 16,
    fontFamily: FONTS.semiBold,
    color: COLORS.gray,
  },
});
