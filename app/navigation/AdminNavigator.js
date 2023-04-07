import { StyleSheet, Text, View } from "react-native";
import React from "react";

import AdminHome from "../screens/admin/AdminHome";
import AllUsers from "../screens/admin/AllUsers";
import CreateUser from "../screens/admin/CreateUser";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Tab = createNativeStackNavigator();

const AdminNavigator = () => {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen name="Home" component={AdminHome} />
      <Tab.Screen name="allusers" component={AllUsers} />
      <Tab.Screen name="createuser" component={CreateUser} />
    </Tab.Navigator>
  );
};

export default AdminNavigator;

const styles = StyleSheet.create({});
