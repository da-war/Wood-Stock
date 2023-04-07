import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import { COLORS } from "../constants/theme";

const CustomSwitchButton = ({ isOn = false, onChangeSwitch }) => {
  return (
    <View style={isOn ? styles.container : styles.containerNo}>
      {isOn && (
        <LinearGradient
          colors={[COLORS.primary, COLORS.secondary]}
          style={styles.linear}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
        />
      )}
      <TouchableOpacity onPress={onChangeSwitch}>
        {isOn ? <View style={styles.on}></View> : <View style={styles.off} />}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 45,
    height: 25,
    borderRadius: 15,
    borderColor: "#ddd",
    justifyContent: "center",
    backgroundColor: COLORS.white,
  },
  containerNo: {
    width: 45,
    height: 25,
    borderRadius: 15,
    borderWidth: 2,
    borderColor: COLORS.gray,
    justifyContent: "center",
    backgroundColor: COLORS.white,
  },
  on: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: COLORS.white,
    borderWidth: 2,
    borderColor: COLORS.primary,
    alignSelf: "flex-end",
  },
  off: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: COLORS.primary,
    alignSelf: "flex-start",
  },
  linear: {
    flex: 1,
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    top: 0,
    borderRadius: 12,
  },
});

export default CustomSwitchButton;
