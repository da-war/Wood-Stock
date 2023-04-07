import { Alert, Dimensions, Modal, StyleSheet, Text, View } from "react-native";
import React from "react";
import AppScreen from "../../components/AppScreen";
import AppHeader from "../../components/AppHeader";
import { gStyle } from "../../global/styles";
import ImageInput from "../../components/ImageInput";
import AppTextInput from "../../components/AppTextInput";
import AppButton from "../../components/btns/AppButton";

import LottieView from "lottie-react-native";
import { doc, updateDoc } from "firebase/firestore";
import { auth, db, storage } from "../../../firebase";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { randomString } from "../../global/functions";
import AsyncStorage from "@react-native-async-storage/async-storage";

const UpdateProfile = ({ navigation }) => {
  const [image, setImage] = React.useState(null);
  const [name, setName] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [urls, setUrls] = React.useState([]);

  React.useLayoutEffect(() => {
    getUserDataFromAsyncStorage();
  }, []);

  const getUserDataFromAsyncStorage = async () => {
    const user = await AsyncStorage.getItem("user");
    const parsedUser = JSON.parse(user);
    setName(parsedUser.name);
    {
      parsedUser.image && setImage(parsedUser.image);
    }
  };

  const handleUpdate = () => {
    if (image === null || name === "") {
      Alert.alert("Please select an image and enter a name");
      return;
    }
    setLoading(true);
    uploadImagesToFirebase([image], { userName: name });
    //update userdoc in firestore with new image and updated name
  };
  const uploadImagesToFirebase = async (images, values) => {
    for (let i = 0; i < images.length; i++) {
      const image = images[i];
      const fileName = Date.now() + randomString(5);
      const storageRef = ref(storage, `profile/${fileName}.jpeg`);
      //create blob
      const blob = await new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.onload = function () {
          resolve(xhr.response);
        };
        xhr.onerror = function (e) {
          console.log(e);
          reject(new TypeError("Network request failed"));
        };
        xhr.responseType = "blob";
        xhr.open("GET", image, true);
        xhr.send(null);
      });
      //upload blob
      const uploadTask = uploadBytesResumable(storageRef, blob);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        },
        (error) => {
          console.log(error);
          Alert.alert("Error", "An error occurred while uploading.");
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            urls.push(downloadURL);
            if (urls.length === images.length) {
              //all images uploaded
              setUrls(urls);
              //save data to firebase
              postData(urls, values);
            }
          });
        }
      );
    }
  };

  const postData = async (images, values) => {
    console.log("entered");
    try {
      await updateDoc(doc(db, "users", auth.currentUser.uid), {
        images: images,
        name: values.userName,
      });
      const currentUser = AsyncStorage.getItem("user");
      const parsedUser = JSON.parse(currentUser);
      const updatedUser = {
        ...parsedUser,
        images: images,
        name: values.userName,
      };
      setLoading(false);
    } catch (error) {
      Alert.alert("Error", error.message);
      setLoading(true);
    }
  };
  return (
    <>
      <AppScreen>
        <AppHeader
          title="Update Profile"
          leftIcon="chevron-left"
          onPressleft={() => navigation.goBack()}
        />
        <View style={styles.mainContainer}>
          <Text style={gStyle.gTitle}>UpdateProfile</Text>

          <View style={styles.formContainer}>
            <ImageInput
              imageUri={image}
              onChangeImage={(uri) => setImage(uri)}
            />

            <AppTextInput
              placeholder="Updated Name"
              value={name}
              onChangeText={(text) => setName(text)}
            />
            <AppButton
              title="Update Profile"
              onPress={() => handleUpdate()}
              style={{ marginTop: 10 }}
            />
          </View>
        </View>
      </AppScreen>
      <Modal visible={loading}>
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <LottieView
            source={require("../../../assets/animations/update.json")}
            autoPlay
            loop
            autoSize
            style={{ width: 200, height: 200 }}
          />
        </View>
      </Modal>
    </>
  );
};

export default UpdateProfile;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  formContainer: {
    height: Dimensions.get("window").height / 1.5,
    alignItems: "center",
    marginHorizontal: 20,
  },
});
