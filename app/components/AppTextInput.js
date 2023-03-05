import { StyleSheet, Text, View, Image, TextInput } from "react-native";
import React from "react";

import { MaterialCommunityIcons } from "@expo/vector-icons";
import { COLORS } from "../constants/theme";

const AppTextInput = ({
  icon,
  placeholder = "email",
  iconColor = COLORS.primary,
  color = COLORS.white,
  width,
  ...otherProps
}) => {
  return (
    <View style={[styles.container, { backgroundColor: color, width: width }]}>
      {icon && (
        <MaterialCommunityIcons name={icon} color={iconColor} size={25} />
      )}
      <TextInput
        placeholder={placeholder}
        placeholderTextColor={COLORS.gray}
        style={styles.input}
        {...otherProps}
      />
    </View>
  );
};

export default AppTextInput;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 5,
    paddingHorizontal: 8,
    borderRadius: 8,
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.lighter,
  },
  input: {
    paddingVertical: 10,
    paddingHorizontal: 10,
    backgroundColor: COLORS.white,
    flex: 1,
  },
});
