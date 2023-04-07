import {
  Alert,
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React from "react";
import AppScreen from "../../components/AppScreen";
import AppHeader from "../../components/AppHeader";
import AppTextInput from "../../components/AppTextInput";
import { COLORS, FONTS } from "../../constants/theme";
import AppButton from "../../components/btns/AppButton";
import { useNavigation } from "@react-navigation/native";
import FieldItem from "../../components/FieldItem";
import { Modal } from "react-native";
import DropDownItem from "../../components/DropDownItem";
import AsyncStorage from "@react-native-async-storage/async-storage";
import moment from "moment";
import { db } from "../../../firebase";
import { doc, setDoc } from "firebase/firestore";
import { generateRandomString } from "../../global/functions";

import LottieView from "lottie-react-native";
import CustomSwitchButton from "../../components/CustomSwitchButton";

const volumeFields = [
  {
    id: "width",
    name: "width",
    label: "Breite (Einschnittmass) (mm)",
    value: "width",
    type: "text",
  },
  {
    id: "thickness",
    name: "thickness",
    label: "Dicke (Einschnittmass)(mm)",
    value: "thickness",
    type: "text",
  },
  {
    id: "length",
    name: "length",
    label: "Länge (ca.)(m)",
    value: "length",
    type: "text",
  },
  {
    id: "pieces",
    name: "pieces",
    label: "Stücke",
    value: "pieces",
    type: "text",
  },
];

const AddProduct = ({ navigation }) => {
  const [loading, setLoading] = React.useState(false);
  const [showDropdown, setShowDropdown] = React.useState(false);
  const [productName, setProductName] = React.useState("");
  const [fields, setFields] = React.useState([]);
  const [newItem, setNewItem] = React.useState("");
  const [dropDownName, setDropDownName] = React.useState("");
  const [dropDownItem, setDropDownItem] = React.useState("");
  const [dropDownItems, setDropDownItems] = React.useState([]);

  const [isVolume, setIsVolume] = React.useState(false);

  const handleChangeVolume = () => {
    setIsVolume(!isVolume);
  };

  const handleSaveProduct = () => {
    //save newItem to fields
    if (productName === "" || fields.length === 0) {
      Alert.alert("Please add a product name and atleast one field");
      return;
    }

    const productId = generateRandomString();
    setLoading(true);
    console.log("fields", fields);
    console.log("productName", productName);

    const myProduct = {
      id: productId,
      name: productName,
      productFields: isVolume ? [...fields, ...volumeFields] : fields,
    };
    setDoc(doc(db, "products", productId), myProduct).then(() => {
      Alert.alert("Product Added Successfully");
      //get all products from async storage
      getAndUpdateProducts(myProduct);

      setLoading(false);
    });
  };

  const getAndUpdateProducts = async (myProduct) => {
    try {
      const jsonValue = await AsyncStorage.getItem("products");
      let products = jsonValue != null ? JSON.parse(jsonValue) : [];
      //add new product to products
      products.push(myProduct);
      //save products to async storage
      await AsyncStorage.setItem("products", JSON.stringify(products));
    } catch (e) {
      console.log(e);
    }
  };

  const handleAddField = () => {
    if (newItem === "") {
      return;
    }
    const newItemObj = {
      id: fields.length + 1,
      name: newItem,
      label: newItem,
      value: newItem,
      type: "text",
    };
    setFields([...fields, newItemObj]);
    setNewItem("");
  };

  const handleAddList = () => {
    setShowDropdown(true);
  };

  const handleAddDropDown = () => {
    if (dropDownName === "" || dropDownItems.length === 0) {
      Alert.alert("Please add a name and atleast a dropdown item");
      return;
    }
    const newItemObj = {
      id: fields.length + 1,
      name: dropDownName,
      label: dropDownName,
      value: dropDownName,
      type: "dropdown",
      list: dropDownItems,
    };

    setFields([...fields, newItemObj]);
    setDropDownName("");
    setDropDownItems([]);
  };

  const handleAddDropDownItem = () => {
    if (dropDownItem === "") {
      Alert.alert("Please add a dropdown item");
      return;
    }
    Alert.alert("Item Added");
    const newItemObj = {
      id: dropDownItems.length + 1,
      name: dropDownItem,
      value: dropDownItem,
    };
    setDropDownItems([...dropDownItems, newItemObj]);
    setDropDownItem("");
  };

  const onPressDeleteDropDownListItem = (item) => {
    const newList = dropDownItems.filter((i) => i.name !== item.name);
    setDropDownItems(newList);
  };

  const handleDeleteField = (item) => {
    const newFields = fields.filter((field) => field !== item);
    setFields(newFields);
  };
  return (
    <>
      <AppScreen>
        <AppHeader
          title="Add Product"
          leftIcon="chevron-left"
          onPressleft={() => navigation.goBack()}
        />
        <View style={styles.mainContainer}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <Text style={styles.sTitle}>Add a Product with Fields</Text>

            <View style={styles.productName}>
              <Text style={styles.textTitle}>Add Product Name</Text>
              <AppTextInput
                value={productName}
                onChangeText={(text) => setProductName(text)}
                placeholder="Add Product Name"
              />
            </View>
            <View style={styles.volumeContainer}>
              <Text style={styles.textoVolume}>
                Add Volume Fields(Breite,Dicke, Länge, Stücke )
              </Text>
              <CustomSwitchButton
                isOn={isVolume}
                onChangeSwitch={() => handleChangeVolume()}
              />
            </View>
            <Text style={styles.textTitle}>Fields</Text>
            {fields.length === 0 && (
              <Text style={{ textAlign: "center" }}>No Fields Added</Text>
            )}

            {fields.length > 0 && (
              <View style={styles.fieldsContainer}>
                <ScrollView>
                  {fields.map((field, index) => (
                    <View key={index}>
                      <FieldItem
                        title={field.name}
                        onPress={() => handleDeleteField(field)}
                        type={field.type}
                        dropDownItems={field.list}
                      />
                    </View>
                  ))}
                </ScrollView>
              </View>
            )}

            <View style={styles.fieldsContainer}>
              <Text style={styles.textTitle}>
                Add text fields for the product
              </Text>
              <AppTextInput
                value={newItem}
                placeholder="Enter Field Name"
                onChangeText={(text) => setNewItem(text)}
              />
              <View style={styles.fieldSubmitButton}>
                <AppButton
                  title="Add Text Field"
                  color={COLORS.secondary}
                  onPress={() => handleAddField()}
                />
              </View>
            </View>
            <View style={styles.fieldsContainer}>
              <Text style={styles.textTitle}>
                Add Dropdown field for the product
              </Text>
              <AppTextInput
                value={dropDownName}
                placeholder="Enter DropDown Name"
                onChangeText={(text) => setDropDownName(text)}
              />
              <AppTextInput
                value={dropDownItem}
                placeholder="Enter DropDown Item"
                onChangeText={(text) => setDropDownItem(text)}
                searchBtn={true}
                searchIcon="plus"
                onPressIcon={() => handleAddDropDownItem()}
              />
              <ScrollView horizontal>
                {dropDownItems.length > 0 &&
                  dropDownItems.map((item, index) => (
                    <View key={index}>
                      <DropDownItem
                        title={item.name}
                        onPressDelete={() =>
                          onPressDeleteDropDownListItem(item)
                        }
                      />
                    </View>
                  ))}
              </ScrollView>
              <View style={styles.fieldSubmitButton}>
                <AppButton
                  title="Add dropdown list"
                  color={COLORS.secondary}
                  onPress={() => handleAddDropDown()}
                />
              </View>
            </View>

            <AppButton
              title="Save Product"
              onPress={() => handleSaveProduct()}
              style={{ marginBottom: 50 }}
            />
          </ScrollView>
        </View>
      </AppScreen>
      <Modal visible={loading}>
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <LottieView
            source={require("../../../assets/animations/loading.json")}
            autoPlay
            loop
            style={{ height: 200, width: 200 }}
          />
        </View>
      </Modal>
    </>
  );
};

export default AddProduct;

const styles = StyleSheet.create({
  btnContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  fieldsContainer: {
    marginVertical: 10,
  },
  fieldSubmitButton: {
    alignSelf: "center",
    width: Dimensions.get("window").width / 1.75,
  },
  mainContainer: {
    flex: 1,
    marginHorizontal: 20,
    paddingTop: 15,
  },
  productName: {
    marginVertical: 10,
  },
  sTitle: {
    fontFamily: FONTS.bold,
    fontSize: 20,
    textAlign: "center",
    marginBottom: 20,
    color: COLORS.gray,
  },
  textTitle: {
    fontSize: 16,
    fontFamily: FONTS.medium,
    color: COLORS.gray,
    marginBottom: 4,
  },
  textoVolume: {
    fontSize: 12,
    width: "50%",
    marginVertical: 10,
    color: COLORS.gray,
  },
  volumeContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
});
