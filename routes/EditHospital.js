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
import Feather from "react-native-vector-icons/Feather";
import * as Permissions from "expo-permissions";

import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import AsyncStorage from "@react-native-community/async-storage";

const EditHospital = ({ navigation, route }) => {
  const [id, setid] = useState(route.params.data._id);
  const [hospitalname, sethospitalname] = useState(
    route.params.data.hospitalname
  );
  const [email, setEmail] = useState(route.params.data.email);
  const [phone, setPhone] = useState(route.params.data.phone);
  const [picture, setPicture] = useState(route.params.data.picture);
  const [emergencyNo, setEmergencyNo] = useState(route.params.data.emergencyNo);
  const [emergencyDetail, setEmergencydetail] = useState(
    route.params.data.emergencyDetail
  );
  const [modal, setModal] = useState(false);
  const [enableshift, setenableShift] = useState(false);

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      sethospitalname(route.params.data.hospitalname);
      setid(route.params.data._id);
      setPhone(route.params.data.phone);
      setEmail(route.params.data.email);
      setPicture(route.params.data.picture);
      setEmergencyNo(route.params.data.emergencyNo);
      setEmergencydetail(route.params.data.emergencyDetail);
    });

    return unsubscribe;
  }, [route.params]);

  const UpdateHospital = async () => {
    const userToken = await AsyncStorage.getItem("userToken");
    //  console.log(userToken)
    fetch(`${BASE_URL}${id}`, {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        Authorization: userToken,
      },
      body: JSON.stringify({
        email,
        phone,
        picture,
        emergencyNo,
        emergencyDetail,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        Alert.alert(`${hospitalname} is updated successfully`);
        navigation.goBack();
      })
      .catch((err) => {
        Alert.alert(Alert_Title, SOMETHING_WENT_WRONG);
      });
    setTimeout(() => {
      setPhone("");
      setEmail("");
      setPicture("");
      setEmergencyNo("");
      setEmergencydetail("");
    }, 3000);
  };

  const pickFromGallery = async () => {
    const { granted } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
    if (granted) {
      let data = await ImagePicker.launchImageLibraryAsync({
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
          size={30}
          onPress={() => navigation.goBack()}
          style={styles.back}
        />

        <Text style={styles.headtext}>Update Hospital Details </Text>
      </View>
      <ScrollView>
        <Text style={styles.Title}>{hospitalname}</Text>
        <View>
          <Image source={{ uri: picture }} style={styles.HospitalImage} />
        </View>
        <KeyboardAvoidingView
          behavior="position"
          style={styles.root}
          enabled={enableshift}
        >
          <View style={styles.formHeader}>
            <TextInput
              label="Email"
              style={styles.inputStyle}
              value={email}
              onFocus={() => setenableShift(false)}
              theme={theme}
              mode="outlined"
              onChangeText={(text) => setEmail(text)}
            />
            <TextInput
              label="Phone"
              style={styles.inputStyle}
              value={phone}
              theme={theme}
              onFocus={() => setenableShift(false)}
              mode="outlined"
              onChangeText={(text) => setPhone(text)}
            />

            <TextInput
              label="Emergency Contact No"
              style={styles.inputStyle}
              value={emergencyNo}
              theme={theme}
              onFocus={() => setenableShift(false)}
              //keyboardType="number-pad"
              mode="outlined"
              onChangeText={(text) => setEmergencyNo(text)}
            />
            <TextInput
              label="Emergency Detail"
              style={styles.inputStyle}
              value={emergencyDetail}
              theme={theme}
              onFocus={() => setenableShift(false)}
              //keyboardType="number-pad"
              mode="outlined"
              onChangeText={(text) => setEmergencydetail(text)}
            />

            <Button
              style={styles.uploadImage}
              icon={picture == "" ? "upload" : "check"}
              mode="contained"
              theme={theme}
              onPress={() => setModal(true)}
            >
              Update Image
            </Button>

            <Button
              style={styles.uploadImage}
              icon="content-save"
              mode="contained"
              theme={theme}
              onPress={() => UpdateHospital()}
            >
              Update details
            </Button>

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
  container: {
    flex: 1,
  },
  head: {
    backgroundColor: "#fff",
    flexDirection: "row",
    height: 50,
    width: "100%",
    alignItems: "center",
    marginBottom: 10,
  },
  back: {
    padding: 10,
    color: "#694fad",
  },

  headtext: {
    color: "#694fad",
    fontSize: 21,
    fontWeight: "500",
    textAlign: "center",
    width: "80%",
  },

  action: {
    flexDirection: "row",
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#f2f2f2",
    paddingBottom: 5,
  },

  Title: {
    color: "#000",
    fontSize: 25,
    fontWeight: "bold",
    marginHorizontal: 35,
  },
  HospitalImage: {
    margin: 10,
    marginLeft: 50,
    alignItems: "center",
    justifyContent: "center",
    width: "75%",
    height: 150,
    borderRadius: 15,
  },
  root: {
    flex: 1,
    width: "100%",
  },
  formHeader: {
    alignItems: "center",
    justifyContent: "center",
    marginRight: 5,
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

  inputStyle: {
    margin: 5,
    width: "90%",
  },
  inputpassword: {
    margin: 5,
    width: "85%",
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

export default EditHospital;
