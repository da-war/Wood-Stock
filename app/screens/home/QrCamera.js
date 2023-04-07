import {
  Alert,
  Button,
  Image,
  Modal,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React from "react";

import { BarCodeScanner } from "expo-barcode-scanner";

import { useNavigation } from "@react-navigation/native";
import LottieView from "lottie-react-native";
import { doc, getDoc } from "firebase/firestore";
import AppButton from "../../components/btns/AppButton";
import { COLORS } from "../../constants/theme";
import { db } from "../../../firebase";
import AppScreen from "../../components/AppScreen";
import AppHeader from "../../components/AppHeader";

const QrCamera = () => {
  const [hasPermission, setHasPermission] = React.useState(null);
  const [scanned, setScanned] = React.useState(false);
  const navigation = useNavigation();
  const [id, setId] = React.useState("");
  const [inventoryItem, setInventoryItem] = React.useState({});
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  const handleScanned = () => {
    if (inventoryItem) navigation.navigate("qrDetails", inventoryItem);
  };

  const getData = async (id) => {
    setLoading(true);

    try {
      //get doc where doc id is equal to id
      const docRef = doc(db, "inventory", id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        console.log("Document data:", docSnap.data());
        setInventoryItem(docSnap.data());
        navigation.navigate("packageD", docSnap.data());
        setLoading(false);
      } else {
        setLoading(false);
        Alert.alert("Error", "No listing found with this QR code");
        navigation.goBack();
      }
    } catch (error) {
      console.log(error);
      Alert.alert("Kein Paket gefunden");
      setLoading(false);
    }
  };
  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    setId(data);
    console.log("The id is ", id);
    if (data) getData(data);
  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  return (
    <>
      <AppScreen>
        <AppHeader
          title="Scanning"
          leftIcon="chevron-left"
          onPressleft={() => navigation.goBack()}
        />
        <BarCodeScanner
          onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
          style={StyleSheet.absoluteFillObject}
        />
        {scanned && (
          <>
            <View style={styles.mainQrCode}>
              <View style={styles.qrCodeIcon}>
                <Image
                  resizeMode="contain"
                  source={require("../../../assets/icons/qrcode.png")}
                  style={styles.qrCodeIcon}
                />
              </View>
            </View>
            <View style={styles.btnContainer}>
              <AppButton
                title="Wiederholen"
                color={COLORS.danger}
                textColor={COLORS.white}
                onPress={() => setScanned(false)}
              />

              <AppButton
                title="Geh zurück"
                onPress={() => navigation.goBack()}
                color={COLORS.secondary}
              />
            </View>
          </>
        )}
      </AppScreen>
      <Modal visible={loading}>
        <View style={{ flex: 1 }}>
          <LottieView
            autoPlay
            loop
            source={require("../../../assets/animations/find.json")}
          />
        </View>
      </Modal>
    </>
  );
};

export default QrCamera;

const styles = StyleSheet.create({
  btnContainer: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    padding: 20,
  },
  qrCodeIcon: {
    width: 150,
    height: 150,
    backgroundColor: COLORS.white,
  },
  mainQrCode: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
