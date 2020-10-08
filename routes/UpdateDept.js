import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Image,
  Text,
  View,
  Modal,
  Alert,
  ScrollView,
  KeyboardAvoidingView,
  TouchableOpacity,
} from "react-native";
import { TextInput, Button } from "react-native-paper";
import * as ImagePicker from "expo-image-picker";
import * as Permissions from "expo-permissions";
import AsyncStorage from "@react-native-community/async-storage";

import MaterialIcons from "react-native-vector-icons/MaterialIcons";

const UpdateDepartment = ({ navigation, route }) => {
  const [id, setId] = useState(route.params._id);
  const [departmentname, setDepartmentName] = useState(
    route.params.departmentname
  );
  const [description, setDescription] = useState(route.params.description);
  const [picture, setPicture] = useState(route.params.picture);
  const [modal, setModal] = useState(false);
  const [enableshift, setenableShift] = useState(false);

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      setId(route.params._id);
      setDepartmentName(route.params.departmentname);
      setDescription(route.params.description);
      setPicture(route.params.picture);

      // console.log(route.params)
    });

    return unsubscribe;
  }, [route.params]);

  const updateDetails = async () => {
    const userToken = await AsyncStorage.getItem("userToken");
    //   console.log(userToken)
    fetch(`${BASE_URL}departments/${id}`, {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        Authorization: userToken,
      },
      body: JSON.stringify({
        departmentname,
        description,
        picture,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.code == 200) {
          navigation.navigate("Speciality");
          Alert.alert(`${departmentname} ${data.message}`);
        } else {
          Alert.alert(Alert_Title, data.message);
        }
      })
      .catch((err) => {
        Alert.alert(Alert_Title, SOMETHING_WENT_WRONG);
      });
  };

  const pickFromGallery = async () => {
    const { granted } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
    if (granted) {
      let data = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        //  aspect: [1, 1],
        quality: 0.5,
        base64: true,
      });
      // console.log(data.base64);
      if (!data.cancelled) {
        //  handleUpload(newfile);
        setPicture(`data:image/jpeg;base64,${data.base64}`);
      }
    } else {
      Alert.alert("you need to give up permission to work");
    }
  };
  const pickFromCamera = async () => {
    const { granted } = await Permissions.askAsync(Permissions.CAMERA);
    if (granted) {
      let data = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        //  aspect: [1, 1],
        quality: 0.8,
        base64: true,
      });
      // console.log(data.base64);
      if (!data.cancelled) {
        //  handleUpload(newfile);
        setPicture(`data:image/jpeg;base64,${data.base64}`);
      }
    } else {
      Alert.alert("you need to give up permission to work");
    }
  };

  const handleUpload = (image) => {
    const data = new FormData();
    data.append("file", image);
    data.append("upload_preset", "skyMedi");
    data.append("cloud_name", "skycloud55");

    fetch("https://api.cloudinary.com/v1_1/skycloud55/image/upload", {
      method: "post",
      body: data,
    })
      .then((res) => res.json())
      .then((data) => {
        setPicture(data.url);
        setModal(false);
      })
      .catch((err) => {
        Alert.alert("error while uploading");
      });
  };

  return (
    <View style={styles.container}>
      <View style={styles.head}>
        <MaterialIcons
          name="navigate-before"
          size={28}
          onPress={() => navigation.goBack()}
          style={styles.back}
        />

        <Text style={styles.headtext}>Update Department </Text>
      </View>
      <ScrollView>
        <KeyboardAvoidingView
          behavior="position"
          style={styles.root}
          enabled={enableshift}
        >
          <View style={styles.formHeader}>
            <TextInput
              label="departmentName"
              style={styles.inputStyle}
              value={departmentname}
              onFocus={() => setenableShift(false)}
              theme={theme}
              mode="outlined"
              onChangeText={(text) => setDepartmentName(text)}
            />
            <TextInput
              label="description"
              style={styles.inputStyle}
              value={description}
              theme={theme}
              onFocus={() => setenableShift(false)}
              //keyboardType="number-pad"
              mode="outlined"
              onChangeText={(text) => setDescription(text)}
            />

            <Button
              style={styles.uploadImage}
              icon={picture == "" ? "upload" : "check"}
              mode="contained"
              theme={theme}
              onPress={() => setModal(true)}
            >
              Upload Image
            </Button>

            <Button
              style={styles.uploadImage}
              icon="content-save"
              mode="contained"
              theme={theme}
              onPress={() => updateDetails()}
            >
              Update details
            </Button>

            <View>
              <Image source={{ uri: picture }} style={styles.thumbnail} />
            </View>

            <Modal
              animationType="slide"
              transparent={true}
              visible={modal}
              onRequestClose={() => {
                setModal(false);
              }}
            >
              <View style={styles.modalView}>
                <View style={styles.modalButtonView}>
                  <Button
                    icon="camera"
                    theme={theme}
                    mode="contained"
                    onPress={() => pickFromCamera()}
                  >
                    camera
                  </Button>
                  <Button
                    icon="image-area"
                    mode="contained"
                    theme={theme}
                    onPress={() => pickFromGallery()}
                  >
                    gallery
                  </Button>
                </View>
                <Button theme={theme} onPress={() => setModal(false)}>
                  cancel
                </Button>
              </View>
            </Modal>
          </View>
        </KeyboardAvoidingView>
      </ScrollView>
    </View>
  );
};

const theme = {
  colors: {
    primary: "#006aff",
  },
};
const styles = StyleSheet.create({
  thumbnail: {
    width: 300,
    height: 300,
    resizeMode: "contain",
  },
  head: {
    backgroundColor: "#694fad",
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  back: {
    padding: 10,
    color: "white",
  },
  headtext: {
    fontSize: 30,
    fontWeight: "bold",
    paddingHorizontal: 50,
    color: "white",
  },

  root: {
    flex: 1,
    width: "100%",
  },
  formHeader: {
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
  },
  buttonNew: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  buttonheader: {
    alignItems: "flex-start",
    justifyContent: "flex-start",
    flexDirection: "row",
    marginRight: 50,
  },

  container: {
    flex: 1,
  },

  inputStyle: {
    margin: 5,
    width: "90%",
  },
  uploadImage: {
    margin: 5,
    marginTop: 10,
    width: "90%",
  },
  form: {
    width: "100%",
    marginLeft: 25,
  },
  modalView: {
    position: "absolute",
    bottom: 2,
    width: "100%",
    backgroundColor: "white",
  },
  savebtn: {
    width: 100,
    backgroundColor: "#6564AD",
    color: "#6564AD",
    fontSize: 18,
    fontWeight: "bold",
    flexDirection: "row",
    borderRadius: 5,
    height: 25,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
    elevation: 3,
    marginBottom: 20,
    marginLeft: 10,
    height: 50,
    marginRight: 15,
    paddingRight: 5,
    marginLeft: 5,
  },
  cancelbtn: {
    width: 100,
    backgroundColor: "#E71E4F",
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
    flexDirection: "row",
    borderRadius: 5,
    height: 25,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
    elevation: 3,
    marginBottom: 20,
    marginLeft: 10,
    height: 50,
    marginRight: 15,
    paddingRight: 5,
    marginLeft: 5,
  },
  btntext: {
    color: "white",
    fontSize: 18,
    marginLeft: 5,
  },
  modalButtonView: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 10,
  },
});

export default UpdateDepartment;
