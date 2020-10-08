import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Alert,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { TextInput, Button } from "react-native-paper";
import { MaterialIcons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-community/async-storage";

const AddFees = ({ navigation, route }) => {
  const [id, setdoctorId] = useState(route.params._id);
  const [doctorName, setdoctorName] = useState(route.params.first_name);
  const [consultation, setConsultation] = useState("");
  const [ewsfee, setEwsFees] = useState("");
  const [followupfee, setfollowupfees] = useState("");
  const [followupdays, setFollowupday] = useState("");

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      setdoctorName(route.params.first_name);
      setdoctorId(route.params._id);
      setConsultation(route.params.consultation);
      setEwsFees(route.params.ewsfee);
      setfollowupfees(route.params.followupfee);
      setFollowupday(route.params.followupdays);
    });
    return unsubscribe;
  }, [route.params]);

  const updateDetails = async () => {
    const userToken = await AsyncStorage.getItem("userToken");
    fetch(`${BASE_URL}doctorfee/${id}`, {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        Authorization: userToken,
      },
      body: JSON.stringify({
        consultation,
        ewsfee,
        followupfee,
        followupdays,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        Alert.alert(` ${doctorName} is updated successfully`);
        navigation.navigate("Doctors");
      })
      .catch((err) => {
        Alert.alert(Alert_Title, SOMETHING_WENT_WRONG);
      });
  };

  return (
    <View style={styles.container}>
      <View style={styles.head}>
        <MaterialIcons
          name="navigate-before"
          size={40}
          onPress={() => navigation.goBack()}
          style={styles.back}
        />

        <Text style={styles.headtext}>ADD DOCTOR FEE</Text>
      </View>
      <View style={styles.headtitle}>
        <Text style={styles.Title}>{doctorName}</Text>
      </View>

      <ScrollView style={styles.formArea}>
        <TextInput
          label="Consultation Fee"
          placeholderTextColor="#666666"
          style={styles.inputStyle}
          value={consultation}
          theme={theme}
          mode="outlined"
          onChangeText={(text) => setConsultation(text)}
        />

        <TextInput
          label="EWS Fees"
          placeholderTextColor="#666666"
          style={styles.inputStyle}
          value={ewsfee}
          theme={theme}
          mode="outlined"
          onChangeText={(text) => setEwsFees(text)}
        />

        <TextInput
          label="Follow Up Day"
          placeholderTextColor="#666666"
          style={styles.inputStyle}
          value={followupdays}
          theme={theme}
          mode="outlined"
          onChangeText={(text) => setFollowupday(text)}
        />

        <TextInput
          label="Followup Fees"
          placeholderTextColor="#666666"
          style={styles.inputStyle}
          value={followupfee}
          theme={theme}
          mode="outlined"
          onChangeText={(text) => setfollowupfees(text)}
        />
        <Button
          style={styles.btn}
          icon="content-save"
          mode="contained"
          theme={theme}
          onPress={() => updateDetails()}
        >
          Save
        </Button>
        <Button
          style={styles.cancelbtn}
          icon="content-save"
          mode="contained"
          theme={theme}
          onPress={() => navigation.goBack()}
        >
          Cancel
        </Button>
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
    backgroundColor: "#fff",
    paddingTop: 10,
  },
  timer: {
    marginLeft: 25,
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
  },
  timetext: {
    fontSize: 20,
    marginRight: 20,
    fontWeight: "bold",
  },
  head: {
    backgroundColor: "#fff",
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  headtitle: {
    backgroundColor: "#fff",
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
  },
  headtext: {
    fontSize: 30,
    fontWeight: "bold",
    paddingHorizontal: 50,
    color: "#694fad",
  },
  Title: {
    fontSize: 25,
    fontWeight: "bold",
    marginLeft: 10,
    color: "#192161",
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
    height: 42,
    elevation: 1,
    shadowOffset: { width: 1, height: 1 },
    shadowColor: "#333",
    shadowOpacity: 0.3,
    shadowRadius: 2,
    marginBottom: 1,
    marginHorizontal: 10,
  },
  option: {
    marginTop: Platform.OS === "ios" ? 0 : -1,
    padding: 6,
    color: "#05375a",
    marginEnd: 65,
    elevation: 2,
    borderRadius: 5,
    borderColor: "black",
    marginBottom: 5,
    shadowOffset: { width: 1, height: 1 },
    shadowColor: "#333",
    shadowOpacity: 0.3,
    shadowRadius: 2,
    backgroundColor: "lightgrey",
    fontSize: 18,
    fontWeight: "bold",
  },
  btn: {
    marginVertical: 15,
    marginHorizontal: 10,
  },
  cancelbtn: {
    marginHorizontal: 10,
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

export default AddFees;
