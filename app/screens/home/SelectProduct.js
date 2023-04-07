import { ScrollView, StyleSheet, Text, View } from "react-native";
import React from "react";
import AppScreen from "../../components/AppScreen";
import AppHeader from "../../components/AppHeader";
import { useNavigation } from "@react-navigation/native";
import AppTextInput from "../../components/AppTextInput";
import { FONTS } from "../../constants/theme";
import ProductItem from "../../components/ProductItem";
import { ProductContext } from "../../contexts/productsContext";
import AsyncStorage from "@react-native-async-storage/async-storage";

const SelectProduct = () => {
  const navigation = useNavigation();
  const [products, setProducts] = React.useState([
    "dawar",
    "rana",
    "Mahnoor",
    "Hashmi",
  ]);

  React.useLayoutEffect(() => {
    getProductsFromAsyncStorage();
  }, []);

  const getProductsFromAsyncStorage = async () => {
    try {
      const products = await AsyncStorage.getItem("products");
      if (products !== null) {
        setProducts(JSON.parse(products));
        console.log("products", products);
      }
    } catch (e) {
      console.log("error", e);
    }
  };

  return (
    <AppScreen>
      <AppHeader
        title="Select Product"
        leftIcon="chevron-left"
        onPressleft={() => navigation.goBack()}
      />
      <View style={styles.mainContainer}>
        <Text style={styles.inventorySearchText}>
          Search Products & Add Packages
        </Text>
        <View style={styles.searchContainer}>
          <AppTextInput placeholder="Search Product" searchBtn={true} />
        </View>
        <View style={{ flex: 1 }}>
          {products.length > 0 ? (
            <ScrollView>
              {products.map((product, index) => (
                <ProductItem
                  key={index}
                  title={product.name}
                  onPress={() => navigation.navigate("form", product)}
                />
              ))}
            </ScrollView>
          ) : (
            <Text>No Products Found</Text>
          )}
        </View>
      </View>
    </AppScreen>
  );
};

export default SelectProduct;

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
    width: "70%",
  },
});
