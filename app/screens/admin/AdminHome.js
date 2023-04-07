import { StyleSheet, Text, View } from "react-native";
import React from "react";
import AppScreen from "../../components/AppScreen";
import { gStyle } from "../../global/styles";
import AppHeader from "../../components/AppHeader";
import AdminCard from "../../components/AdminCard";

const AdminHome = () => {
  return (
    <AppScreen>
      <AppHeader title="Admin Dashboard" />
      <Text style={gStyle.gTitle}>Welcome to the App!</Text>
      <View style={gStyle.mainContainer}>
        <View style={styles.innerContainer}>
          <AdminCard
            title="Users"
            source={require("../../../assets/icons/man.png")}
          />
          <AdminCard
            title="Create User"
            source={require("../../../assets/icons/add-user.png")}
          />
        </View>
      </View>
    </AppScreen>
  );
};

export default AdminHome;

const styles = StyleSheet.create({
  innerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 5,
  },
});
