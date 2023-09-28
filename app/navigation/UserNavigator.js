import { StyleSheet, Text, View } from "react-native";
import React from "react";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { MaterialCommunityIcons } from "@expo/vector-icons";
import { COLORS } from "../constants/theme";
import HomeStackNavigator from "./HomeStackNavigator";
import SettingNavigator from "./SettingNavigator";

const Tab = createBottomTabNavigator();
const UserNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveBackgroundColor: COLORS.primary,
        tabBarActiveTintColor: COLORS.white,
        tabBarInactiveBackgroundColor: COLORS.bg,
        tabBarInactiveTintColor: COLORS.primary,
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeStackNavigator}
        options={{
          tabBarLabel: "Home",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="home" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={SettingNavigator}
        options={{
          tabBarLabel: "Profile",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="account" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default UserNavigator;

const styles = StyleSheet.create({});
