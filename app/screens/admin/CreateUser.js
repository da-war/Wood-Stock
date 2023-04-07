import { StyleSheet, Text, View } from "react-native";
import React from "react";
import AppScreen from "../../components/AppScreen";
import AppHeader from "../../components/AppHeader";
import { gStyle } from "../../global/styles";

import * as Yup from "yup";
import AppForm from "../../components/form/AppForm";
import AppFormField from "../../components/form/AppFormField";
import SubmitButton from "../../components/form/SubmitButton";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "../../../firebase";
import moment from "moment";
import AsyncStorage from "@react-native-async-storage/async-storage";

const validationSchema = Yup.object().shape({
  name: Yup.string().required().label("Name"),
  email: Yup.string().required().email().label("Email"),
  password: Yup.string().required().min(4).label("Password"),
});
const initialValues = { name: "", email: "", password: "" };

const CreateUser = ({ navigation }) => {
  const [loading, setLoading] = useState(false);
  const [isAdmin, setIsAdmin] = React.useState(false);
  const handleCreateUser = (values) => {
    setLoading(true);
    createUserWithEmailAndPassword(auth, values.email, values.password)
      .then((userCredential) => {
        const user = userCredential.user;
        setDoc(doc(db, "users", user.uid), {
          name: values.name,
          email: values.email,
          uid: user.uid,
          joined: moment().format("MMMM Do YYYY, h:mm:ss a"),
          isAdmin: isAdmin ? true : false,
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
          //getAllUsersList from async storage
          AsyncStorage.getItem("usersList").then((usersList) => {
            if (usersList) {
              usersList = JSON.parse(usersList);
              usersList.push(userData);
              AsyncStorage.setItem("usersList", JSON.stringify(usersList));
            } else {
              AsyncStorage.setItem("usersList", JSON.stringify([userData]));
            }
          });
          setLoading(false);
        });
      })
      .catch((error) => {
        Alert.alert("Error", error.message);
        setLoading(false);
      });
  };
  return (
    <AppScreen>
      <AppHeader
        title="Create User"
        leftIcon="chevron-left"
        onPressleft={() => navigation.goBack()}
      />
      <View style={gStyle.mainContainer}>
        <Text style={gStyle.gTitle}>Create User</Text>
        <AppForm
          validationSchema={validationSchema}
          initialValues={initialValues}
          onSubmit={(values) => handleCreateUser(values)}
        >
          <AppFormField />
          <AppFormField />
          <AppFormField />
          <View />
          <SubmitButton title="Create User" />
        </AppForm>
      </View>
    </AppScreen>
  );
};

export default CreateUser;
