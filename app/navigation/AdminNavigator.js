import { StyleSheet, Text, View } from "react-native";
import React from "react";

import AdminHome from "../screens/admin/AdminHome";
import AllUsers from "../screens/admin/AllUsers";
import CreateUser from "../screens/admin/CreateUser";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Stack = createNativeStackNavigator();

const AdminNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Home" component={AdminHome} />
      <Stack.Screen name="allusers" component={AllUsers} />
      <Stack.Screen name="createuser" component={CreateUser} />
    </Stack.Navigator>
  );
};

export default AdminNavigator;

const styles = StyleSheet.create({});
