import { StyleSheet, Text, View } from "react-native";
import { FONTS } from "../constants/theme";

export const gStyle = StyleSheet.create({
  gTitle: {
    fontSize: 18,
    fontFamily: FONTS.bold,
    textAlign: "center",
    marginVertical: 12,
  },
  mainContainer: {
    flex: 1,
    marginHorizontal: 20,
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
