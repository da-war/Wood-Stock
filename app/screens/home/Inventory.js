import { Modal, ScrollView, StyleSheet, Text, View } from "react-native";
import React from "react";
import AppScreen from "../../components/AppScreen";
import AppHeader from "../../components/AppHeader";
import { useNavigation } from "@react-navigation/native";
import { COLORS, FONTS } from "../../constants/theme";
import AppTextInput from "../../components/AppTextInput";
import ProductItem from "../../components/ProductItem";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../../firebase";

import LottieView from "lottie-react-native";

const Inventory = () => {
  const navigation = useNavigation();
  const [products, setProducts] = React.useState([]);
  const [loading, setLoading] = React.useState(false);

  React.useLayoutEffect(() => {
    getProductsFromAsyncStorage();
  }, []);

  const getProductsFromAsyncStorage = async () => {
    try {
      const products = await AsyncStorage.getItem("products");
      if (products !== null) {
        setProducts(JSON.parse(products));
      }
    } catch (e) {
      console.log("Error in getting products from async storage", e);
    }
  };

  const getData = async (name) => {
    setLoading(true);

    console.log("name", name);
    //get the document from the firestore
    const colName = name.toLowerCase();
    try {
      const colRef = collection(db, colName);
      const docsSnap = await getDocs(colRef);
      const data = [];
      docsSnap.forEach((doc) => {
        console.log(doc.data());
        data.push(doc.data());
      });
      setLoading(false);

      data.length &&
        navigation.navigate("inventoryDetails", { data: data, name: name });
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  return (
    <>
      <AppScreen>
        <AppHeader
          title="Inventory"
          leftIcon="chevron-left"
          onPressleft={() => navigation.goBack()}
        />
        <View style={styles.mainContainer}>
          <Text style={styles.inventorySearchText}>
            Search Products & View Inventory
          </Text>
          <View style={styles.searchContainer}>
            <AppTextInput placeholder="Search Product" searchBtn={true} />
          </View>
          <View style={{ flex: 1 }}>
            <ScrollView>
              {products.map((product) => (
                <ProductItem
                  title={product.name}
                  onPress={() => getData(product.name)}
                />
              ))}
            </ScrollView>
          </View>
        </View>
      </AppScreen>
      <Modal visible={loading}>
        <View style={{ flex: 1 }}>
          <LottieView
            loop
            autoPlay
            source={require("../../../assets/animations/find.json")}
          />
        </View>
      </Modal>
    </>
  );
};

export default Inventory;

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
  },
});
