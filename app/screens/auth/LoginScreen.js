import { Alert, Image, Modal, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";

import * as Yup from "yup";

import LottieView from "lottie-react-native";
import { signInWithEmailAndPassword } from "firebase/auth";
import AppForm from "../../components/form/AppForm";
import AppFormField from "../../components/form/AppFormField";
import SubmitButton from "../../components/form/SubmitButton";
import { COLORS } from "../../constants/theme";
import AppButton from "../../components/btns/AppButton";
import AppScreen from "../../components/AppScreen";
import LargeText from "../../components/texts/LargeText";
import { auth } from "../../../firebase";

const validationSchema = Yup.object().shape({
  email: Yup.string().required().email().label("Email"),
  password: Yup.string().required().min(4).label("Password"),
});

const initialValues = { email: "", password: "" };

const LoginScreen = ({ navigation }) => {
  const [loading, setLoading] = useState(false);

  const handleLogin = (values) => {
    setLoading(true);
    signInWithEmailAndPassword(auth, values.email, values.password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        Alert.alert("Success", "User logged in successfully");
        setLoading(false);
        // ...
      })
      .catch((error) => {
        setLoading(false);
        const errorMessage = error.message;
        Alert.alert("Error", errorMessage);
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
          <LargeText>Anmeldung</LargeText>
        </View>
        <View>
          <AppForm
            validationSchema={validationSchema}
            initialValues={initialValues}
            onSubmit={handleLogin}
          >
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
            <SubmitButton title="Anmeldung" style={{ marginTop: 20 }} />
          </AppForm>
        </View>
        <AppButton
          title="Registrieren"
          textColor={COLORS.white}
          style={styles.secondary}
          onPress={() => navigation.navigate("register")}
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

export default LoginScreen;

const styles = StyleSheet.create({
  image: {
    width: "60%",
    height: "100%",
  },
  imageContainer: {
    alignItems: "center",
    marginVertical: 20,
    height: "34%",
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
