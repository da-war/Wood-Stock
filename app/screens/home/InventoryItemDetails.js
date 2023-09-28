import { StyleSheet, Text, View } from "react-native";
import React from "react";
import AppScreen from "../../components/AppScreen";
import AppHeader from "../../components/AppHeader";
import { FONTS } from "../../constants/theme";

const InventoryItemDetails = ({ navigation }) => {
  return (
    <AppScreen>
      <AppHeader
        leftIcon="chevron-left"
        onPressleft={() => navigation.goBack()}
        title="Product Details"
      />
      <View style={styles.mainContainer}>
        <Text style={styles.title}>Package Details</Text>
      </View>
    </AppScreen>
  );
};

export default InventoryItemDetails;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  title: {
    fontFamily: FONTS.bold,
    fontSize: 18,
    textAlign: "center",
    marginVertical: 14,
  },
});
