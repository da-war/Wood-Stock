import { StyleSheet, Text, View } from "react-native";
import React from "react";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import AdminHome from "../screens/admin/AdminHome";
import AdminProfile from "../screens/admin/AdminProfile";
import AdminNavigator from "./AdminNavigator";

const Tab = createBottomTabNavigator();

const AdminAppNavigator = () => {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen name="Admin" component={AdminNavigator} />
      <Tab.Screen name="Profile" component={AdminProfile} />
    </Tab.Navigator>
  );
};

export default AdminAppNavigator;

const styles = StyleSheet.create({});
