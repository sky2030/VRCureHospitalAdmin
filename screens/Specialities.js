import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  Alert,
  FlatList,
  ScrollView,
  Modal,
  TouchableWithoutFeedback,
  Keyboard,
  Image,
} from "react-native";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { TextInput, Button } from "react-native-paper";
import * as ImagePicker from "expo-image-picker";
import * as Permissions from "expo-permissions";
import Arthroscopy from "../assets/images/Arthroscopy.jpg";
import Surgery_Dental from "../assets/images/Surgery_Dental.jpg";
import AsyncStorage from "@react-native-community/async-storage";

export default function HospitalSpeciality({ navigation }) {
  const [title, setspecialityTitle] = useState("");
  const [description, setspecialitydescription] = useState("");
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState(false);
  const [picture, setPicture] = useState("");

  const HospitalProfile = async () => {
    const userToken = await AsyncStorage.getItem("userToken");
    // console.log(userToken);
    fetch(BASE_URL, {
      method: "GET",
      headers: { Authorization: userToken },
    })
      .then((res) => res.json())
      .then((result) => {
        console.log("Hospital Profile :", JSON.stringify(result));
        if (result.code == 200) {
          setData(result.data);
          setLoading(false);
        } else {
          Alert.alert(Alert_Title, result.message);
        }
      })
      .catch((err) => {
        Alert.alert(Alert_Title, SOMETHING_WENT_WRONG);
      });
    //  console.log(data.hospitalcode)
  };

  const submitData = async () => {
    if (title.length <= 0) {
      Alert.alert(
        Alert_Title,
        "Please add Title of Speciality and then try again."
      );
      return;
    }
    if (picture.length <= 0) {
      Alert.alert(
        Alert_Title,
        "Please add Speciality picture and then try again."
      );
      return;
    }
    console.log("Picture :", picture);
    console.log("Title of Speciality :", title);
    console.log("Description of Speciality :", description);

    const userToken = await AsyncStorage.getItem("userToken");

    const data = new FormData();
    let extension = picture.split("/");
    let fileName = extension[extension.length - 1];
    let pathArray = fileName.split(".");
    pathArray = pathArray[pathArray.length - 1];

    data.append("picture", {
      uri: picture,
      type: `image/${pathArray}`,
      name: fileName,
    });

    data.append("title", title);
    data.append("description", description);

    console.log("Data :", JSON.stringify(data));

    //  fetch(`${BASE_URL}speciality/add`, {
    //    method: "post",
    //    headers: {
    //      "Content-Type": "application/json",
    //      Authorization: userToken,
    //    },
    //    body: JSON.stringify(payload),
    //  })

    fetch(`${BASE_URL}speciality`, {
      method: "POST",
      headers: {
        Authorization: userToken,
        "Content-Type": "multipart/form-data",
      },
      body: data,
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("Add report :", JSON.stringify(data));
        if (data.code == 200) {
          Alert.alert(Alert_Title, data.message);
          setspecialityTitle("");
          setspecialitydescription("");
          setPicture("");
        } else {
          Alert.alert(Alert_Title, data.message);
        }
      })
      .catch((err) => {
        Alert.alert(Alert_Title, SOMETHING_WENT_WRONG);
      });
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      console.log("Speciality Focused");
      HospitalProfile();
      setspecialityTitle("");
      setspecialitydescription("");
      setPicture("");
    });
    return unsubscribe;
  }, []);

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
        setPicture(data.uri);
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
        setPicture(data.uri);
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
        Alert.alert(Alert_Title, SOMETHING_WENT_WRONG);
      });
  };

  const renderList = (item) => {
    return (
      <View style={styles.card}>
        <View style={styles.imagestyle}>
          <Image
            // source={cardiology}
            source={{ uri: BASE + item.picture.url }}
            style={styles.img}
          />
        </View>
        <View style={styles.dept}>
          <Text style={styles.deptName}>{item.title}</Text>
          <Text style={styles.description}>{item.description}</Text>
        </View>
      </View>
    );
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View style={styles.container}>
        <View style={styles.head}>
          <MaterialIcons
            name="navigate-before"
            size={30}
            onPress={() => navigation.goBack()}
            style={styles.back}
          />
          <Text style={styles.titletext}>All Specialities </Text>
        </View>
        <TextInput
          label="Speciality Title"
          style={styles.inputStyle}
          value={title}
          theme={theme}
          mode="outlined"
          onChangeText={(text) => setspecialityTitle(text)}
        />
        <TextInput
          label="Description"
          style={styles.inputdesc}
          value={description}
          theme={theme}
          multiline={true}
          mode="outlined"
          onChangeText={(text) => setspecialitydescription(text)}
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
          onPress={() => submitData()}
        >
          save
        </Button>

        {/* <FlatList
          data={data}
          renderItem={(Props) => {
            return <renderList {...Props} />;
          }}
          keyExtractor={extractKey}
          onRefresh={() => HospitalProfile()}
          refreshing={loading}
        /> */}
        <FlatList
          data={data.specialities}
          renderItem={({ item }) => {
            return renderList(item);
          }}
          keyExtractor={(item) => item.id}
        />

        {/* <View style={styles.card}>
          <View style={styles.imagestyle}>
            <Image
              // source={cardiology}
              source={Arthroscopy}
              style={styles.img}
            />
          </View>
          <View style={styles.dept}>
            <Text style={styles.deptName}>Arthroscopy</Text>
            <Text style={styles.description}>
              (ahr-THROS-kuh-pee) is a procedure for diagnosing and treating
              joint problems.
            </Text>
          </View>
        </View>

        <View style={styles.card}>
          <View style={styles.imagestyle}>
            <Image
              // source={cardiology}
              source={Surgery_Dental}
              style={styles.img}
            />
          </View>
          <View style={styles.dept}>
            <Text style={styles.deptName}>Surgery Dental </Text>
            <Text style={styles.description}>
              Dental surgery is any of a number of medical procedures that
              involve artificially.
            </Text>
          </View>
        </View> */}

        {/* <View>
                <Image source={{ uri: picture }} style={styles.thumbnail} />
            </View> */}

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
    </TouchableWithoutFeedback>
  );
}

const theme = {
  colors: {
    primary: "#006aff",
  },
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    alignContent: "center",
  },
  imagestyle: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  dept: {
    //paddingLeft: 50,
    alignItems: "center",
    justifyContent: "center",
    flex: 2,
  },

  deptName: {
    color: "#000",
    fontSize: 25,
    fontWeight: "900",
  },
  description: {
    fontSize: 18,
    fontWeight: "500",
    marginBottom: 10,
  },
  card: {
    borderRadius: 10,
    elevation: 3,
    backgroundColor: "#E5F0ED",
    shadowOffset: { width: 1, height: 1 },
    shadowColor: "#333",
    shadowOpacity: 0.3,
    shadowRadius: 2,
    marginHorizontal: 10,
    marginVertical: 10,
    flexDirection: "row",
    borderBottomWidth: 3,
    borderColor: "yellow",
  },
  img: {
    margin: 10,
    width: 70,
    height: 90,
    borderWidth: 2,
    borderColor: "darkblue",
    aspectRatio: 1,
  },
  thumbnail: {
    width: 300,
    height: 300,
    resizeMode: "contain",
  },
  inputStyle: {
    height: 35,
    borderRadius: 20,
    fontSize: 18,
    fontWeight: "bold",
    backgroundColor: "white",
    marginHorizontal: 10,
  },
  uploadImage: {
    marginHorizontal: 10,
    marginTop: 5,
  },
  modalView: {
    position: "absolute",
    bottom: 2,
    width: "100%",
    backgroundColor: "white",
  },
  modalButtonView: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 10,
  },
  inputdesc: {
    borderRadius: 20,
    fontSize: 15,
    backgroundColor: "white",
    marginHorizontal: 10,
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

  titletext: {
    color: "#694fad",
    fontSize: 21,
    fontWeight: "500",
    textAlign: "center",
    width: "80%",
  },
});
