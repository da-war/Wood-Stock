import { StyleSheet, Text, View } from "react-native";
import React from "react";

import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ProfileScreen from "../screens/profile/ProfileScreen";
import AddProduct from "../screens/profile/AddProduct";
import UpdateProfile from "../screens/profile/UpdateProfile";

const Stack = createNativeStackNavigator();

const SettingNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="profile" component={ProfileScreen} />
      <Stack.Screen name="addProduct" component={AddProduct} />
      <Stack.Screen name="up" component={UpdateProfile} />
    </Stack.Navigator>
  );
};

export default SettingNavigator;

const styles = StyleSheet.create({});
