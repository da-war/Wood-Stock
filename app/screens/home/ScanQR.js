import { ScrollView, StyleSheet, Text, View } from "react-native";
import React from "react";
import AppScreen from "../../components/AppScreen";
import AppHeader from "../../components/AppHeader";
import { useNavigation } from "@react-navigation/native";
import AppTextInput from "../../components/AppTextInput";
import { FONTS } from "../../constants/theme";
import ProductItem from "../../components/ProductItem";
import AsyncStorage from "@react-native-async-storage/async-storage";

const ScanQR = () => {
  const navigation = useNavigation();
  const [products, setProducts] = React.useState([]);

  React.useLayoutEffect(() => {
    getProductsFromAsyncStorage();
  }, []);

  const getProductsFromAsyncStorage = async () => {
    try {
      const myProducts = await AsyncStorage.getItem("products");
      if (myProducts !== null) {
        setProducts(JSON.parse(myProducts));
      }
    } catch (e) {
      console.log("Error in getting products from async storage", e);
    }
  };

  return (
    <AppScreen>
      <AppHeader
        title="Scan QR"
        leftIcon="chevron-left"
        onPressleft={() => navigation.goBack()}
      />
      <View style={styles.mainContainer}>
        <Text style={styles.inventorySearchText}>Search Products & Scan</Text>
        <View style={styles.searchContainer}>
          <AppTextInput placeholder="Search Product" searchBtn={true} />
        </View>
        <View style={{ flex: 1 }}>
          <ScrollView>
            {products.map((product) => (
              <ProductItem
                title={product.name}
                onPress={() => navigation.navigate("qrcamera")}
              />
            ))}
          </ScrollView>
        </View>
      </View>
    </AppScreen>
  );
};

export default ScanQR;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    marginHorizontal: 20,
  },

  inventorySearchText: {
    fontFamily: FONTS.bold,
    fontSize: 24,
    marginTop: 15,
    marginBottom: 7,
    width: "65%",
  },
});
