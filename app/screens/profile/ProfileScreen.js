import { Alert, ScrollView, StyleSheet, Text, View } from "react-native";
import React from "react";
import AppScreen from "../../components/AppScreen";
import AppHeader from "../../components/AppHeader";
import { COLORS, FONTS } from "../../constants/theme";
import { Image } from "react-native";
import HorizontalCard from "../../components/cards/HorizontalCard";
import AppButton from "../../components/btns/AppButton";
import { auth } from "../../../firebase";
import AsyncStorage from "@react-native-async-storage/async-storage";

const ProfileScreen = ({ navigation }) => {
  const [user, setUser] = React.useState({});

  React.useLayoutEffect(() => {
    getUserFromAsyncStorage();
  }, [navigation]);

  const getUserFromAsyncStorage = async () => {
    const user = await AsyncStorage.getItem("user");
    setUser(JSON.parse(user));
    console.log("user", user);
  };

  const logout = () => {
    //show alert if you want to logout or not if yes then logout if no don't do anythin
    Alert.alert("Logout", "Are you sure you want to logout?", [
      {
        text: "Cancel",
        onPress: () => console.log("Cancel Pressed"),
        style: "cancel",
      },
      {
        text: "OK",
        onPress: () => {
          auth.signOut();
        },
      },
    ]);
  };

  return (
    <AppScreen>
      <AppHeader
        leftIcon="chevron-left"
        title="Profile & Settings"
        onPressleft={() => navigation.goBack()}
      />
      <View style={styles.mainContainer}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.topContainer}>
            {user.images ? (
              <Image
                resizeMode="cover"
                style={styles.image}
                source={{ uri: user.images[0] }}
              />
            ) : (
              <Image
                resizeMode="cover"
                style={styles.image}
                source={require("../../../assets/images/profile.jpg")}
              />
            )}

            <Text style={styles.title}>{user.name}</Text>
            <Text style={styles.subTitle}>{user.email}</Text>
          </View>

          <View style={styles.bottomContainer}>
            <HorizontalCard
              leftIcon="account"
              title="Profil bearbeiten"
              onPress={() => navigation.navigate("up")}
            />
            <HorizontalCard
              leftIcon="database-plus"
              title="Produkt hinzufügen"
              onPress={() => navigation.navigate("addProduct")}
            />
            <HorizontalCard
              leftIcon="database-edit"
              title="Produkt bearbeiten"
            />
            <HorizontalCard leftIcon="text-box-search" title="Statistiken" />
            <HorizontalCard leftIcon="" title="Benachrichtigungen" />
          </View>

          <View style={styles.btnContainer}>
            <AppButton title="Log out" onPress={() => logout()} />
          </View>
        </ScrollView>
      </View>
    </AppScreen>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  bottomContainer: {
    marginVertical: 15,
  },
  btnContainer: {
    marginHorizontal: 20,
    marginVertical: 20,
  },
  topContainer: {
    height: 250,
    backgroundColor: COLORS.tertiary,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    justifyContent: "center",
    alignItems: "center",
  },
  mainContainer: {
    flex: 1,
  },
  image: {
    width: 120,
    height: 120,
    borderRadius: 60,
  },
  subTitle: {
    color: COLORS.white,
    fontSize: 12,
    marginVertical: 5,
  },
  title: {
    color: COLORS.white,
    fontSize: 20,
    fontFamily: FONTS.semiBold,
    marginTop: 20,
  },
});
