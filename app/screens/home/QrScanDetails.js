import { StyleSheet, Text, View } from "react-native";
import React from "react";
import AppScreen from "../../components/AppScreen";
import AppHeader from "../../components/AppHeader";
import { gStyle } from "../../global/styles";

import LottieView from "lottie-react-native";

const QrScanDetails = ({ route, navigation }) => {
  const data = route.params;

  return (
    <AppScreen>
      <AppHeader
        title="Qr Scan Details"
        onPressleft={() => navigation.goBack()}
        leftIcon="chevron-left"
      />

      <View style={gStyle.mainContainer}>
        {!data && (
          <View style={gStyle.mainContainer}>
            <Text style={gStyle.gTitle}>No data found</Text>
            <LottieView
              source={require("../../../assets/animations/empty.json")}
              autoPlay
              loop
              autoSize
              speed={0.5}
            />
          </View>
        )}
      </View>
    </AppScreen>
  );
};

export default QrScanDetails;

const styles = StyleSheet.create({});
