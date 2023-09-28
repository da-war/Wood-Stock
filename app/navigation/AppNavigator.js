import { StyleSheet } from "react-native";
import React from "react";

import AdminAppNavigator from "../navigation/AdminAppNavigator";
import AsyncStorage from "@react-native-async-storage/async-storage";
import UserNavigator from "./UserNavigator";

const AppNavigator = ({ navigation }) => {
  const [admin, setAdmin] = React.useState(false);
  React.useLayoutEffect(() => {
    getModeFromAsyncStorage();
  }, [navigation]);

  const getModeFromAsyncStorage = async () => {
    const mode = await AsyncStorage.getItem("mode");
    if (mode === "admin") {
      setAdmin(true);
    }
    if (mode === "user") {
      setAdmin(false);
    }
  };

  return admin ? <AdminAppNavigator /> : <UserNavigator />;
};
export default AppNavigator;
