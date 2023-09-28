import { StyleSheet, Text, View } from "react-native";
import React from "react";
import AppScreen from "../../components/AppScreen";
import { gStyle } from "../../global/styles";
import AppHeader from "../../components/AppHeader";

const PackageDetailsScreen = () => {
  return (
    <AppScreen>
      <AppHeader title="Package Details" />
      <View style={gStyle.mainContainer}>
        <Text style={gStyle.gTitle}>PackageDetailsScreen</Text>
      </View>
    </AppScreen>
  );
};

export default PackageDetailsScreen;

const styles = StyleSheet.create({});
