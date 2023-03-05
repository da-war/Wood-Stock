import { StyleSheet, Text, View } from "react-native";
import React from "react";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import AdminHome from "../screens/admin/AdminHome";

const Tab = createBottomTabNavigator();

const AdminAppNavigator = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Admin" component={AdminHome} />
    </Tab.Navigator>
  );
};

export default AdminAppNavigator;

const styles = StyleSheet.create({});
