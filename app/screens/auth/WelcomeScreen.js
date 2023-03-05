import { ImageBackground, StyleSheet, Text, View } from "react-native";
import React from "react";
import AppScreen from "../../components/AppScreen";
import { Image } from "react-native";
import AppButton from "../../components/btns/AppButton";
import { COLORS } from "../../constants/theme";

const WelcomeScreen = ({ navigation }) => {
  return (
    <AppScreen>
      <ImageBackground
        blurRadius={10}
        source={require("../../../assets/images/wood.jpg")}
        style={styles.imageBg}
      >
        <View style={styles.mainContainer}>
          <View style={styles.imageContainer}>
            <Image
              resizeMode="contain"
              style={styles.image}
              source={require("../../../assets/woody.png")}
            />
          </View>

          <View style={styles.btnContainer}>
            <AppButton
              title="Login"
              onPress={() => navigation.navigate("login")}
            />
            <AppButton
              onPress={() => navigation.navigate("register")}
              title="Register"
              color={COLORS.secondary}
            />
          </View>
        </View>
      </ImageBackground>
    </AppScreen>
  );
};

export default WelcomeScreen;

const styles = StyleSheet.create({
  btnContainer: {
    position: "absolute",
    bottom: 100,
    right: 20,
    left: 20,
  },

  imageContainer: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: COLORS.bg,
    width: 250,
    height: 250,
    alignSelf: "center",
    borderRadius: 150,
    marginTop: 40,
  },
  mainContainer: {
    flex: 1,
  },
  image: {
    width: 200,
    height: 200,
  },
  imageBg: {
    flex: 1,
  },
});
