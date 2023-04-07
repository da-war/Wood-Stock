import { Modal, ScrollView, StyleSheet, Text, View } from "react-native";
import React from "react";
import AppScreen from "../../components/AppScreen";
import AppHeader from "../../components/AppHeader";
import { COLORS, FONTS } from "../../constants/theme";
import { db } from "../../../firebase";
import { collection, getDocs } from "firebase/firestore";

import LottieView from "lottie-react-native";
import { gStyle } from "../../global/styles";
import InventoryComponent from "../../components/InventoryComponent";
import AppTextInput from "../../components/AppTextInput";

const InventoryDetailsScreen = ({ navigation, route }) => {
  const [title, setTitle] = React.useState("Product");
  const data = route.params;
  const [inventory, setInventory] = React.useState([]);
  const [loadInventory, setLoadInventory] = React.useState(false);
  const [theData, setTheData] = React.useState([]);

  React.useLayoutEffect(() => {
    if (data) {
      setTitle(data.title);
    }
    getAllPackages();
  }, [data]);

  const getAllPackages = async () => {
    setLoadInventory(true);
    try {
      const colRef = collection(db, title);
      const snapshot = await getDocs(colRef);
      var myData = [];
      //store the data in an array myData
      snapshot.forEach((doc) => {
        myData.push({ ...doc.data() });
      });
      setInventory(myData);
      setLoadInventory(false);
    } catch (error) {
      console.log(error);
      setLoadInventory(false);
    }
  };

  const handleSearch = (value) => {
    if (!value.length) {
      setTheData(inventory);
      setNumberOfPackages(inventory.length);
    }

    const filteredData = inventory.filter((item) =>
      item.numberOfPieces.toLowerCase().includes(value.toLowerCase())
    );
    if (filteredData.length) {
      setTheData(filteredData);
      setNumberOfPackages(theData.length);
    } else {
      setTheData([]);
      setNumberOfPackages(theData.length);
    }
  };

  return (
    <>
      <AppScreen>
        <AppHeader
          title={title}
          leftIcon="chevron-left"
          onPressleft={() => navigation.goBack()}
        />
        <View style={styles.mainContainer}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <Text style={styles.name}>Product Inventory</Text>
            {inventory.length > 0 && (
              <View style={{ marginHorizontal: 20, marginVertical: 10 }}>
                <AppTextInput
                  placeholder="Suche nach Stücke"
                  onChangeText={(text) => handleSearch(text)}
                />
              </View>
            )}
            <View style={gStyle.mainContainer}>
              {inventory.length === 0 && (
                <View
                  style={{
                    flex: 1,
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Text>No Packages Added Yet!</Text>
                  <View style={{ flex: 1 }}>
                    <LottieView
                      source={require("../../../assets/animations/empty.json")}
                      autoPlay
                      loop
                      autoSize
                      speed={0.5}
                      style={{ width: 200, height: 200 }}
                    />
                  </View>
                </View>
              )}
              {inventory.map((item, index) => (
                <View key={index}>
                  <InventoryComponent />
                </View>
              ))}
            </View>
          </ScrollView>
        </View>
      </AppScreen>
      <Modal visible={loadInventory}>
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <LottieView
            source={require("../../../assets/animations/loading.json")}
            autoPlay
            loop
          />
        </View>
      </Modal>
    </>
  );
};

export default InventoryDetailsScreen;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  name: {
    fontSize: 20,
    fontFamily: FONTS.semiBold,
    color: COLORS.gray,
    textAlign: "center",
    marginVertical: 12,
  },
});
