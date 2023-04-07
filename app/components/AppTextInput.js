import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
} from "react-native";
import React from "react";

import { MaterialCommunityIcons } from "@expo/vector-icons";
import { COLORS } from "../constants/theme";

const AppTextInput = ({
  icon,
  placeholder = "email",
  iconColor = COLORS.primary,
  color = COLORS.white,
  value,
  searchBtn,
  width,
  onPressIcon,
  searchIcon = "magnify",
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
        value={value}
        {...otherProps}
      />
      {searchBtn && (
        <MaterialCommunityIcons
          name={searchIcon}
          color={COLORS.gray}
          size={25}
          onPress={onPressIcon}
        />
      )}
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
