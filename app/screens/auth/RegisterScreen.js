import { Alert, Image, Modal, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";

import * as Yup from "yup";

import LottieView from "lottie-react-native";
import { createUserWithEmailAndPassword } from "firebase/auth";
import AppForm from "../../components/form/AppForm";
import AppFormField from "../../components/form/AppFormField";
import SubmitButton from "../../components/form/SubmitButton";
import { COLORS } from "../../constants/theme";
import AppButton from "../../components/btns/AppButton";
import AppScreen from "../../components/AppScreen";
import LargeText from "../../components/texts/LargeText";
import { auth, db } from "../../../firebase";
import { doc, setDoc } from "firebase/firestore";
import moment from "moment/moment";
import AsyncStorage from "@react-native-async-storage/async-storage";

const validationSchema = Yup.object().shape({
  name: Yup.string().required().label("Name"),
  email: Yup.string().required().email().label("Email"),
  password: Yup.string().required().min(4).label("Password"),
});

const initialValues = { name: "", email: "", password: "" };

const RegisterScreen = ({ navigation }) => {
  const [loading, setLoading] = useState(false);

  const handleSignUp = (values) => {
    setLoading(true);
    createUserWithEmailAndPassword(auth, values.email, values.password)
      .then((userCredential) => {
        const user = userCredential.user;
        setDoc(doc(db, "users", user.uid), {
          name: values.name,
          email: values.email,
          uid: user.uid,
          joined: moment().format("MMMM Do YYYY, h:mm:ss a"),
          isAdmin: false,
          isVerified: false,
        }).then(() => {
          Alert.alert("Account Created Successfully");
          const userData = {
            email: values.email,
            name: values.name,
            isAdmin: false,
            isVerified: false,
            joined: moment().format("MMMM Do YYYY, h:mm:ss a"),
          };
          AsyncStorage.setItem("user", JSON.stringify(userData));
          setLoading(false);
        });
      })
      .catch((error) => {
        Alert.alert("Error", error.message);
        setLoading(false);
      });
  };

  return (
    <>
      <AppScreen style={styles.mainContainer}>
        <View style={styles.imageContainer}>
          <Image
            source={require("../../../assets/woodyy.png")}
            resizeMode="contain"
            style={styles.image}
          />
          <LargeText>Registrieren</LargeText>
        </View>
        <View>
          <AppForm
            validationSchema={validationSchema}
            initialValues={initialValues}
            onSubmit={handleSignUp}
          >
            <AppFormField placeholder="Name" name="name" icon="account" />
            <AppFormField
              placeholder="Email"
              name="email"
              keyboardType="email-address"
              icon="email"
            />
            <AppFormField
              placeholder="Password"
              name="password"
              secureTextEntry
              icon="lock"
            />
            <SubmitButton title=" Registrieren" style={{ marginTop: 20 }} />
          </AppForm>
        </View>
        <AppButton
          title="Anmeldung"
          textColor={COLORS.white}
          style={styles.secondary}
          onPress={() => navigation.navigate("login")}
        />
      </AppScreen>
      <Modal style={{ flex: 1 }} visible={loading}>
        <View style={{ flex: 1 }}>
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

export default RegisterScreen;

const styles = StyleSheet.create({
  image: {
    width: "55%",
    height: "100%",
  },
  imageContainer: {
    alignItems: "center",
    marginVertical: 20,
    height: "30%",
    marginBottom: 50,
  },
  mainContainer: {
    flex: 1,
    marginHorizontal: 20,
  },
  secondary: {
    backgroundColor: COLORS.secondary,
    borderWidth: 1,
    borderColor: COLORS.primary,
  },
});
