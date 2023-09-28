import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { COLORS, FONTS, SHADOWS } from "../constants/theme";

const AllUsersCard = ({ name, email, onPress }) => {
  return (
    <TouchableOpacity style={styles.mainContainer}>
      <View style={styles.leftContainer}>
        <Image
          resizeMode="contain"
          source={require("../../assets/images/profile.jpg")}
          style={styles.image}
        />
      </View>
      <View style={styles.rightContainer}>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.email}>{email}</Text>
      </View>
      <TouchableOpacity style={styles.absoluteContainer}>
        <Text style={styles.detailsText}>Details</Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );
};

export default AllUsersCard;

const styles = StyleSheet.create({
  absoluteContainer: {
    position: "absolute",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: COLORS.primary,
    right: 15,
    paddingVertical: 7,
    paddingHorizontal: 5,
    borderRadius: 7,
    ...SHADOWS.medium,
  },
  detailsText: {
    fontFamily: FONTS.bold,
    color: COLORS.white,
  },
  mainContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    marginVertical: 5,
    backgroundColor: COLORS.white,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: COLORS.border,
    ...SHADOWS.dark,
  },
  leftContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: COLORS.primary,
    justifyContent: "center",
    alignItems: "center",
  },
  rightContainer: {
    marginLeft: 14,
  },
  image: {
    width: "100%",
    height: "100%",
    borderRadius: 30,
  },

  name: {
    fontFamily: FONTS.bold,
    fontSize: 16,
    color: COLORS.gray,
  },
  email: {
    fontFamily: FONTS.regular,
    fontSize: 12,
    color: COLORS.gray,
    marginTop: 3,
  },
});
