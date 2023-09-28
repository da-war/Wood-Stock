import {
  Modal,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
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
  const data = route.params;
  const [inventory, setInventory] = React.useState(data.data);
  const [loadInventory, setLoadInventory] = React.useState(false);
  const [theData, setTheData] = React.useState([]);
  const [title, setTitle] = React.useState(data.name);

  const [toShow, setToShow] = React.useState(false);
  const [numberOfPackages, setNumberOfPackages] = React.useState(0);

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

  //useCallback which updates component rendering when there is change in toShow

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
              <Text style={styles.numberOfPackages}>
                Total Packages {numberOfPackages}
              </Text>
            )}
            {inventory.length > 0 && (
              <View style={{ marginHorizontal: 20, marginVertical: 10 }}>
                <AppTextInput
                  placeholder="Suche nach Stücke"
                  onChangeText={(text) => handleSearch(text)}
                />
              </View>
            )}
            <View style={gStyle.mainContainer}>
              {inventory.map((item, index) => (
                <View key={index}>
                  <InventoryComponent
                    onPress={() => navigation.navigate("inventoryItemDetails")}
                  />
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
  numberOfPackages: {
    fontSize: 13,
    color: COLORS.gray,
    textAlign: "center",
  },
});
