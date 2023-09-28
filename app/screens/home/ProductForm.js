import { Modal, ScrollView, StyleSheet, Text, View } from "react-native";
import React from "react";
import AppScreen from "../../components/AppScreen";
import AppHeader from "../../components/AppHeader";
import { gStyle } from "../../global/styles";
import AppTextInput from "../../components/AppTextInput";
import AppFormDropdown from "../../components/form/AppFormDropDown";
import DropDown from "../../components/DropDown";
import AppButton from "../../components/btns/AppButton";
import { Table, Row } from "react-native-table-component";
import * as Print from "expo-print";
import * as Sharing from "expo-sharing";
import * as FileSystem from "expo-file-system";
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "../../../firebase";
import { randomString } from "../../global/functions";

import LottieView from "lottie-react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import moment from "moment";

const ProductForm = ({ navigation, route }) => {
  const data = route.params;
  const [title, setTitle] = React.useState("Product");
  const [productFields, setProductFields] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [fields, setFields] = React.useState([]);

  const [formData, setFormData] = React.useState({});

  React.useLayoutEffect(() => {
    setTitle(data.name);
    setProductFields(data.productFields);
    getAllProductFieldsName();
  }, [navigation, route]);

  const getAllProductFieldsName = () => {
    let allFields = [];
    data.productFields.map((field) => {
      allFields.push(field.name);
    });
    console.log("All Fields", allFields);
    setFields(allFields);
  };

  const dsf = () => {
    setLoading(true);

    const id = randomString(15);
    //if any field value is an object, then replace that object with a string which is at object.name
    for (let key in formData) {
      if (typeof formData[key] === "object") {
        formData[key] = formData[key].name;
      }
    }

    const allData = {
      ...formData,
      id: id,
      checkedInAt: moment().format("MMMM Do YYYY, h:mm:ss a"),
      user: auth.currentUser.uid,
    };
    console.log("All the data", allData);

    //set a doc in firestore in collection {title}
    setDoc(doc(db, title.toLowerCase(), id), allData)
      .then(() => {
        console.log("Document successfully written!");
        setLoading(false);
        printPdf(allData, id);
      })
      .catch((error) => {
        console.error("Error writing document: ", error);
        setLoading(false);
      });
  };

  const printPdf = async (data, id) => {
    const htmlContent = `
        <html>
          <head>
            <meta charset="utf-8">
            <title>Object Values</title>
            <style>
              table {
                border-collapse: collapse;
                width: 100%;
              }
              th, td {
                text-align: left;
                padding: 8px;
                width: 50%;
              }
              th {
                background-color: #ddd;
                font-size: 20px;
                font-weight: bold;
              }
            </style>
          </head>
          <body>
          <div style="display: flex; justify-content: center;margin-bottom:50px;">
      <div style="width: 50%;justify-content: center;">
          <img src="https://firebasestorage.googleapis.com/v0/b/wood-stock-249df.appspot.com/o/WoodStock%20Start.png?alt=media&token=6e8f516f-5fdd-440a-9160-1e1c3ac3d85d" style="width:350;height:350" alt="" title="" />
       </div>
       <div style="width: 50%;text-align: center;">
          <img src="https://api.qrserver.com/v1/create-qr-code/?data=${id}&amp;size=200x200" style="width:350px;height:350px;" alt="" title="" />
          
       </div>
       
        </div>
            <table>
              ${fields
                .map(
                  (item) => `
                <tr>
                  <th>${item}</th>
                  <td>${data[item] || ""}</td>
                </tr>
              `
                )
                .join("")}
            </table>
          </body>
        </html>
      `;
    const { uri: pdfUrl } = await Print.printToFileAsync({ html: htmlContent });

    const pdfName = "Product.pdf";
    const destinationUri = `${FileSystem.documentDirectory}${pdfName}`;
    await FileSystem.moveAsync({ from: pdfUrl, to: destinationUri });

    await Sharing.shareAsync(destinationUri);
  };

  return (
    <>
      <AppScreen>
        <AppHeader
          title="Add Package"
          leftIcon="chevron-left"
          onPressleft={() => navigation.goBack()}
        />
        <Text style={gStyle.gTitle}>{title}</Text>

        <View style={gStyle.mainContainer}>
          <ScrollView>
            {productFields.map((field, index) => (
              <View key={index}>
                {field.type === "text" ? (
                  <AppTextInput
                    key={field.name}
                    placeholder={field.label}
                    onChangeText={(text) =>
                      setFormData({ ...formData, [field.name]: text })
                    }
                  />
                ) : (
                  <DropDown
                    data={field.list}
                    placeholder={field.label}
                    onSelectItem={(item) =>
                      setFormData({ ...formData, [field.name]: item })
                    }
                    selectedItem={formData[field.name]}
                  />
                )}
              </View>
            ))}

            <AppButton title="Add and Print" onPress={() => dsf()} />
          </ScrollView>
        </View>
      </AppScreen>
      <Modal animationType="slide" visible={loading}>
        <View style={gStyle.centered}>
          <LottieView
            source={require("../../../assets/animations/loading.json")}
            autoPlay
            loop
            style={{ width: 225, height: 225 }}
          />
        </View>
      </Modal>
    </>
  );
};

export default ProductForm;

const styles = StyleSheet.create({});
