import { StyleSheet, Text, View } from "react-native";
import React from "react";
import AppScreen from "../../components/AppScreen";
import AppHeader from "../../components/AppHeader";

const AdminProfile = () => {
  return (
    <AppScreen>
      <AppHeader title="Profile" />
      <View style={styles.mainContainer}>
        <Text>AdminProfile</Text>
      </View>
    </AppScreen>
  );
};

export default AdminProfile;

const styles = StyleSheet.create({});
