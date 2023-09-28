import { ScrollView, StyleSheet, Text, View } from "react-native";
import React from "react";
import AppScreen from "../../components/AppScreen";
import AppHeader from "../../components/AppHeader";
import { COLORS, FONTS } from "../../constants/theme";
import AllUsersCard from "../../components/AllUsersCard";

const users = [
  {
    id: 1,
    name: "Ahsan",
    email: "ranadawarabdullah@gmail.com",
  },
  {
    id: 2,
    name: "Ahsan",
    email: "ranadawarabdullah",
  },
  {
    id: 3,
    name: "Ahsan",
    email: "hello@gmail.clm",
  },
];

const AllUsers = ({ navigation }) => {
  return (
    <AppScreen>
      <AppHeader
        leftIcon="chevron-left"
        title="All Users"
        onPressleft={() => navigation.goBack()}
      />
      <View style={styles.mainContainer}>
        <Text style={styles.title}>All Users</Text>

        <ScrollView>
          {users.map((user, index) => (
            <View key={index}>
              <AllUsersCard email={user.email} name={user.name} />
            </View>
          ))}
        </ScrollView>
      </View>
    </AppScreen>
  );
};

export default AllUsers;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    paddingHorizontal: 20,
  },
  title: {
    fontFamily: FONTS.medium,
    fontSize: 24,
    textAlign: "center",
    color: COLORS.gray,
    marginVertical: 10,
  },
});
