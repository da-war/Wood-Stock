import { StyleSheet, Text, View } from "react-native";
import React from "react";

import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "../screens/home/HomeScreen";
import SelectProduct from "../screens/home/SelectProduct";
import ScanQR from "../screens/home/ScanQR";
import Inventory from "../screens/home/Inventory";
import InventoryDetailsScreen from "../screens/home/InventoryDetailsScreen";
import ProductForm from "../screens/home/ProductForm";
import QrCamera from "../screens/home/QrCamera";
import QrScanDetails from "../screens/home/QrScanDetails";
import InventoryItemDetails from "../screens/home/InventoryItemDetails";

const Stack = createNativeStackNavigator();

const HomeStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="home" component={HomeScreen} />
      <Stack.Screen name="select" component={SelectProduct} />
      <Stack.Screen name="scan" component={ScanQR} />
      <Stack.Screen name="qrcamera" component={QrCamera} />
      <Stack.Screen name="qrdetails" component={QrScanDetails} />
      <Stack.Screen name="inventory" component={Inventory} />
      <Stack.Screen
        name="inventoryDetails"
        component={InventoryDetailsScreen}
      />
      <Stack.Screen
        name="inventoryItemDetails"
        component={InventoryItemDetails}
      />
      <Stack.Screen name="form" component={ProductForm} />
    </Stack.Navigator>
  );
};

export default HomeStackNavigator;

const styles = StyleSheet.create({});
