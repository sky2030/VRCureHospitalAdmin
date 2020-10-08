import React, { useState, useEffect } from "react";
import { useFocusEffect } from "@react-navigation/native";
import {
  StyleSheet,
  Text,
  View,
  Modal,
  Alert,
  KeyboardAvoidingView,
  ScrollView,
  TouchableOpacity,
  FlatList,
  Image,
} from "react-native";
import { TextInput, Button } from "react-native-paper";
import * as ImagePicker from "expo-image-picker";
import * as Permissions from "expo-permissions";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { AntDesign } from "@expo/vector-icons";
import {
  Collapse,
  CollapseHeader,
  CollapseBody,
} from "accordion-collapse-react-native";
import AsyncStorage from "@react-native-community/async-storage";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import moment from "moment-timezone";
import Feather from "react-native-vector-icons/Feather";

const UpdateDoctor = ({ navigation, route }) => {
  //const [first_name,setName] = useState(getDetails("name"))
  const [first_name, setFirstName] = useState(route.params.first_name);
  const [last_name, setLastName] = useState(route.params.last_name);
  const [mobile, setMobile] = useState(route.params.mobile);
  const [email, setEmail] = useState(route.params.email);
  const [password, setPassword] = useState(route.params.password);
  const [gender, setGender] = useState(route.params.gender);
  const [dob, setDOB] = useState(route.params.dob);
  const [registration_no, setRegistration] = useState(
    route.params.registration_no
  );
  const [experience, setExperience] = useState(route.params.experience);
  const [consultation, setConsultation] = useState(route.params.consultation);
  const [degree, setDegree] = useState(route.params.degree);
  const [designation, setDesignation] = useState(route.params.designation);
  const [department, setDepartment] = useState(route.params.department);
  const [deptcode, setDeptcode] = useState(route.params.deptcode);
  const [specialities, setSpecialities] = useState(route.params.specialities);
  const [picture, setPicture] = useState(route.params.picture);
  const [modal, setModal] = useState(false);
  const [isDatePickerAvailable, setDatePickerAvailable] = useState(false);
  const [enableshift, setenableShift] = useState(false);
  const [deptData, setDept] = useState([]);
  const [loading, setLoading] = useState(true);
  const [id, setId] = useState(route.params._id);
  const [secureTextEntry, setSecureTextEntry] = useState(true);

  const updateSecureTextEntry = () => {
    setSecureTextEntry(!secureTextEntry);
  };

  const fetchDept = async () => {
    const userToken = await AsyncStorage.getItem("userToken");
    fetch(`${BASE_URL}departments`, {
      headers: new Headers({ Authorization: userToken }),
    })
      .then((res) => res.json())
      .then((results) => {
        if (results.code == 200) {
          setDept(results.data);
        } else {
          Alert.alert(results.message);
        }
      })
      .catch((err) => {
        Alert.alert(Alert_Title, SOMETHING_WENT_WRONG);
      });
  };
  const handleDatePicker = (date) => {
    setDOB(moment(date).format("DD/MM/YYYY"));
    //updateDOB(date);
    setDatePickerAvailable(false);
  };
  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      // The screen is focused
      fetchDept();
      // Call any action
      setId(route.params._id);
      setFirstName(route.params.first_name);
      setLastName(route.params.last_name);
      setMobile(route.params.mobile);
      setEmail(route.params.email);
      setPassword(route.params.password);
      setGender(route.params.gender);
      setDOB(route.params.dob);
      setRegistration(route.params.registration_no);
      setExperience(route.params.experience);
      setConsultation(route.params.consultation);
      setDegree(route.params.degree);
      setDesignation(route.params.designation);
      setDepartment(route.params.department);
      setDeptcode(route.params.deptcode);
      setSpecialities(route.params.specialities);
      setPicture(route.params.picture);

      //  console.log(route.params)
    });

    return unsubscribe;
  }, [route.params]);

  const updateDetails = async () => {
    const userToken = await AsyncStorage.getItem("userToken");
    fetch(`${BASE_URL}doctors/${id}`, {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        Authorization: userToken,
      },
      body: JSON.stringify({
        first_name,
        last_name,
        mobile,
        email,
        gender,
        dob,
        password,
        picture,
        registration_no,
        experience,
        degree,
        designation,
        department,
        deptcode,
        specialities,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        Alert.alert(`${first_name} is updated successfully`);
        navigation.navigate("Doctors");
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

  const renderList = (item) => {
    return (
      <TouchableOpacity
        activeOpacity={0.95}
        onPress={() => {
          setDepartment(item.departmentname);
          setDeptcode(item.deptcode);
        }}
        style={styles.option}
      >
        <Text style={styles.deptName}>{item.departmentname}</Text>
      </TouchableOpacity>
    );
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

        <Text style={styles.headtext}>Update Doctor</Text>
      </View>

      <ScrollView style={styles.formArea}>
        <View style={{ flex: 0.6, alignItems: "center" }}>
          <Image source={{ uri: picture }} style={styles.thumbnail} />
        </View>
        <TextInput
          label="First Name"
          placeholderTextColor="#666666"
          style={styles.inputStyle}
          value={first_name}
          // onFocus={()=>setenableShift(false)}
          theme={theme}
          mode="outlined"
          onChangeText={(text) => setFirstName(text)}
        />

        <TextInput
          label="Last Name"
          placeholderTextColor="#666666"
          style={styles.inputStyle}
          value={last_name}
          // onFocus={()=>setenableShift(false)}
          theme={theme}
          mode="outlined"
          onChangeText={(text) => setLastName(text)}
        />
        <TextInput
          label="Email"
          placeholderTextColor="#666666"
          style={styles.inputStyle}
          value={email}
          theme={theme}
          // onFocus={()=>setenableShift(false)}
          mode="outlined"
          onChangeText={(text) => setEmail(text)}
        />
        <View style={{ flexDirection: "row", flex: 1 }}>
          <TextInput
            label="Password"
            placeholderTextColor="#666666"
            style={styles.inputdrop}
            value={password}
            mode="outlined"
            secureTextEntry={secureTextEntry ? true : false}
            // onFocus={()=>setenableShift(true)}
            onChangeText={(text) => setPassword(text)}
          />
          <TouchableOpacity style={styles.eye} onPress={updateSecureTextEntry}>
            {secureTextEntry ? (
              <Feather name="eye-off" color="#8a72cc" size={20} />
            ) : (
              <Feather name="eye" color="#8a72cc" size={20} />
            )}
          </TouchableOpacity>
        </View>
        <TextInput
          label="Phone"
          placeholderTextColor="#666666"
          style={styles.inputStyle}
          value={mobile}
          theme={theme}
          //onFocus={()=>setenableShift(false)}
          keyboardType="number-pad"
          mode="outlined"
          onChangeText={(text) => setMobile(text)}
        />
        <Collapse>
          <CollapseHeader>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              {/* <TextInput
                label="Gender"
                placeholderTextColor="#666666"
                style={styles.inputdrop}
                value={gender}
                theme={theme}
                // onFocus={()=>setenableShift(true)}
                mode="outlined"
                onChangeText={(text) => setGender(text)}
              /> */}
              <View style={styles.Valuebox}>
                <Text> Gender</Text>
                <Text style={styles.values}> {gender}</Text>
              </View>
              <View
                style={{
                  width: "10%",
                  backgroundColor: "lightgrey",
                  padding: 7,
                  marginLeft: 4,
                  marginTop: 4,
                  marginEnd: 20,
                }}
              >
                <AntDesign name="down" size={24} color="blue" />
              </View>
            </View>
          </CollapseHeader>
          <CollapseBody style={{ marginLeft: 10 }}>
            <TouchableOpacity onPress={() => setGender("Male")}>
              <Text style={styles.option}>Male</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setGender("Female")}>
              <Text style={styles.option}>Female</Text>
            </TouchableOpacity>
          </CollapseBody>
        </Collapse>
        {/* <------------------  Department Selection -------------------> */}
        <Collapse>
          <CollapseHeader>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              {/* <TextInput
                label="Department"
                placeholderTextColor="#666666"
                style={styles.inputdrop}
                value={department}
                theme={theme}
                // onFocus={()=>setenableShift(true)}
                mode="outlined"
                onChangeText={(text) => setDepartment(text)}
              /> */}
              <View style={styles.Valuebox}>
                <Text> Department</Text>
                <Text style={styles.values}> {department}</Text>
              </View>
              <View
                style={{
                  width: "10%",
                  backgroundColor: "lightgrey",
                  padding: 7,
                  marginLeft: 4,
                  marginTop: 4,
                  marginEnd: 20,
                }}
                onPress={() => fetchDept()}
              >
                <AntDesign name="down" size={24} color="blue" />
              </View>
            </View>
          </CollapseHeader>
          <CollapseBody style={{ marginLeft: 10 }}>
            <FlatList
              data={deptData}
              renderItem={({ item }) => {
                return renderList(item);
              }}
              keyExtractor={(item) => item._id}
              //   onRefresh={()=>fetchDept()}
              //   refreshing={loading}
            />
          </CollapseBody>
        </Collapse>

        {/* <--------------  Department Selection -----------------------> */}
        <View style={styles.Subtitle}>
          <TextInput
            label="Date of Birth"
            style={styles.inputStyle}
            value={dob}
            theme={theme}
            onFocus={() => setenableShift(false)}
            //keyboardType="number-pad"
            mode="outlined"
            onChangeText={(text) => setDOB(text)}
          />
          <TouchableOpacity
            style={{
              color: "#08211c",
              marginLeft: 10,
              flex: 1,
            }}
            onPress={() => setDatePickerAvailable(true)}
          >
            <AntDesign name="calendar" size={32} color="black" />
          </TouchableOpacity>
        </View>
        <DateTimePickerModal
          isVisible={isDatePickerAvailable}
          mode="date"
          onConfirm={handleDatePicker}
          onCancel={() => setDatePickerAvailable(false)}
        />
        {/* <TextInput
          label="Date of Birth"
          placeholderTextColor="#666666"
          style={styles.inputStyle}
          value={dob}
          theme={theme}
          // onFocus={()=>setenableShift(true)}
          mode="outlined"
          onChangeText={(text) => setDOB(text)}
        /> */}
        <TextInput
          label="Registration No"
          placeholderTextColor="#666666"
          style={styles.inputStyle}
          value={registration_no}
          theme={theme}
          // onFocus={()=>setenableShift(true)}
          mode="outlined"
          onChangeText={(text) => setRegistration(text)}
        />
        <TextInput
          label="Experience"
          placeholderTextColor="#666666"
          style={styles.inputStyle}
          value={experience}
          theme={theme}
          // onFocus={()=>setenableShift(true)}
          mode="outlined"
          onChangeText={(text) => setExperience(text)}
        />
        <TextInput
          label="Consultation Fee"
          placeholderTextColor="#666666"
          style={styles.inputStyle}
          value={consultation}
          theme={theme}
          // onFocus={()=>setenableShift(true)}
          mode="outlined"
          onChangeText={(text) => setConsultation(text)}
        />
        <TextInput
          label="Degree"
          placeholderTextColor="#666666"
          style={styles.inputStyle}
          value={degree}
          theme={theme}
          // onFocus={()=>setenableShift(true)}
          mode="outlined"
          onChangeText={(text) => setDegree(text)}
        />
        <TextInput
          label="Designation"
          placeholderTextColor="#666666"
          style={styles.inputStyle}
          value={designation}
          theme={theme}
          // onFocus={()=>setenableShift(true)}
          mode="outlined"
          onChangeText={(text) => setDesignation(text)}
        />
        {/* <TextInput
                label='Department'
                placeholderTextColor="#666666"
                style={styles.inputStyle}
                value={department}
                theme={theme}
                // onFocus={()=>setenableShift(true)}
                mode="outlined"
                onChangeText={text =>setDepartment(text)}
            /> */}
        <TextInput
          label="Specialities"
          placeholderTextColor="#666666"
          style={styles.inputStyle}
          value={specialities}
          theme={theme}
          // onFocus={()=>setenableShift(true)}
          mode="outlined"
          onChangeText={(text) => setSpecialities(text)}
        />

        <Button
          style={styles.btn}
          icon={picture == "" ? "upload" : "check"}
          mode="contained"
          theme={theme}
          onPress={() => setModal(true)}
        >
          Upload Image
        </Button>

        <Button
          style={styles.btn}
          icon="content-save"
          mode="contained"
          theme={theme}
          onPress={() => updateDetails()}
        >
          Update details
        </Button>
      </ScrollView>
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
  thumbnail: {
    aspectRatio: 1,
    width: 200,
    height: 200,
  },
  head: {
    backgroundColor: "#fff",
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    paddingBottom: 7,
    marginBottom: 5,
  },
  inputdrop: {
    flex: 1,
    marginTop: Platform.OS === "ios" ? 0 : -1,
    paddingLeft: 2,
    color: "#05375a",
    height: 38,
    elevation: 1,
    shadowOffset: { width: 1, height: 1 },
    shadowColor: "#333",
    shadowOpacity: 0.3,
    shadowRadius: 2,
    marginBottom: 3,
    marginLeft: 20,
  },
  Subtitle: {
    alignItems: "center",
    justifyContent: "flex-start",
    flexDirection: "row",
    marginHorizontal: 2,
    borderRadius: 5,
  },
  Valuebox: {
    height: 38,
    elevation: 1,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    borderColor: "lightgrey",
    backgroundColor: "#f7f7f7",
    borderWidth: 1,
    marginLeft: 20,
  },
  values: {
    fontSize: 20,
    fontWeight: "600",
    marginLeft: 10,
  },
  option: {
    marginTop: Platform.OS === "ios" ? 0 : -1,
    padding: 6,
    color: "#05375a",
    marginEnd: 300,
    elevation: 1,
    borderWidth: 1,
    borderColor: "lightgrey",
    marginBottom: 5,
    fontSize: 16,
    fontWeight: "bold",
  },
  deptName: {
    color: "#05375a",
    fontSize: 16,
    fontWeight: "bold",
  },
  headtext: {
    fontSize: 30,
    fontWeight: "bold",
    paddingHorizontal: 70,
    color: "#694fad",
  },
  formArea: {
    height: "100%",
  },
  root: {
    flex: 1,
  },
  inputStyle: {
    flex: 1,
    marginTop: Platform.OS === "ios" ? 0 : -1,
    paddingLeft: 2,
    color: "#05375a",
    height: 38,
    //borderRadius: 4,
    elevation: 1,
    shadowOffset: { width: 1, height: 1 },
    shadowColor: "#333",
    shadowOpacity: 0.3,
    shadowRadius: 2,
    marginBottom: 1,
    marginHorizontal: 20,
  },
  eye: {
    marginHorizontal: 15,
    marginVertical: 12,
  },
  inputdrop: {
    flex: 1,
    marginTop: Platform.OS === "ios" ? 0 : -1,
    paddingLeft: 2,
    color: "#05375a",
    height: 38,
    elevation: 1,
    shadowOffset: { width: 1, height: 1 },
    shadowColor: "#333",
    shadowOpacity: 0.3,
    shadowRadius: 2,
    marginBottom: 3,
    marginLeft: 20,
  },

  btn: {
    marginVertical: 2,
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
});

export default UpdateDoctor;
