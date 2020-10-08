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
import { Dropdown } from "react-native-material-dropdown-v2";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { MaterialIcons, AntDesign, FontAwesome } from "@expo/vector-icons";
import moment from "moment-timezone";
import AsyncStorage from "@react-native-community/async-storage";
const dayList = [
  {
    value: "Sunday",
    index: 0,
  },
  {
    value: "Monday",
    index: 1,
  },
  {
    value: "Tuesday",
    index: 2,
  },
  {
    value: "Wednesday",
    index: 3,
  },
  {
    value: "Thursday",
    index: 4,
  },
  {
    value: "Friday",
    index: 5,
  },
  {
    value: "Saturday",
    index: 6,
  },
];
const ManageConsultation = ({ navigation, route }) => {
  const getDetails = (type) => {
    if (route.params) {
      switch (type) {
        case "first_name":
          return route.params.first_name;
        case "doctorId":
          return route.params._id;
      }
    }
    return "";
  };

  const GetParams = () => {
    setdoctorName(getDetails("first_name"));
    setdoctorId(getDetails("doctorId"));
  };

  const [d_id, setdoctorId] = useState(getDetails("doctorId"));
  const [doctorName, setdoctorName] = useState(getDetails("first_name"));
  const [startTime, setStarttime] = useState(Number);
  const [endTime, setEndtime] = useState(Number);
  const [dayfrom, setDayfrom] = useState(-1);
  const [dayto, setDayto] = useState(-1);
  const [days, setDay] = useState([]);
  const [duration, setSlotDuration] = useState(Number);
  const [isStartPickerPickerVisible, setStartPickerPickerVisible] = useState(
    false
  );
  const [isEndPickerPickerVisible, setEndPickerPickerVisible] = useState(false);

  // {"startTime": 0, "endTime":31000000, "duration": 1.8e+6, "days": [1,2,3] }

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      // The screen is focused
      GetParams();
      // Call any action
      setdoctorName(route.params.first_name);
      setdoctorId(route.params._id);
      console.log(route.params._id);
    });

    // Return the function to unsubscribe from the event so it gets removed on unmount

    return unsubscribe;
  }, [route.params]);

  const updateDetails = async () => {
    const userToken = await AsyncStorage.getItem("userToken");
    console.log(userToken);

    if (dayfrom < 0) {
      Alert.alert("Select Days from");
      return;
    }
    if (dayto < 0) {
      Alert.alert("Select Days To");
      return;
    }
    if (dayfrom > dayto) {
      Alert.alert(`Select day after ${dayList[dayfrom].value}`);
      return;
    }
    if (startTime <= 0) {
      Alert.alert("Select Start Time");
      return;
    }
    if (endTime <= 0) {
      Alert.alert("Select End Time");
      return;
    }
    if (Number(duration) <= 0) {
      Alert.alert("Select Slot Duration");
      return;
    }

    let durationValue = HHmmTimestampFromString(0, duration);
    let startIndex = dayfrom;
    let daysArray = [];
    while (startIndex <= dayto) {
      daysArray.push(startIndex);
      startIndex++;
    }
    let payload = {
      days,
      startTime,
      endTime,
      duration: durationValue,
      days: daysArray,
    };

    //  console.log(payload, d_id)

    fetch(`${BASE_URL}doctors/${d_id}/slots`, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        Authorization: userToken,
      },
      body: JSON.stringify(payload),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        Alert.alert(Alert_Title, data.message);
        navigation.goBack();
      })
      .catch((err) => {
        console.log(err);
        Alert.alert(Alert_Title, SOMETHING_WENT_WRONG);
      });
  };

  const handleStartTimeConfirm = (date) => {
    setStarttime(HHmmTimestampFromString(date.getHours(), date.getMinutes()));
    // console.log("A date has been picked: ", date.getHours());
    setStartPickerPickerVisible(false);
  };
  const handleendTimeConfirm = (date) => {
    let endtimevalue = HHmmTimestampFromString(
      date.getHours(),
      date.getMinutes()
    );
    if (endtimevalue > startTime) {
      setEndtime(endtimevalue);
    } else {
      Alert.alert("End time shloud be after start time");
    }
    setEndPickerPickerVisible(false);
  };
  const HHmmTimestampFromString = (hours, minutes) => {
    var returnValue = hours * 60 * 60 * 1000;
    if (minutes > 0) {
      returnValue = returnValue + minutes * 60 * 1000;
    }
    return returnValue;
  };
  const StringFromTime = (timevalue) => {
    if (timevalue <= 0) {
      return "";
    }
    const time = Number(timevalue) / 60000;
    let sdate = new Date();
    sdate.setHours(Math.floor(time / 60));
    sdate.setMinutes(time % 60);
    var returnValue = moment(sdate.getTime(), "x").format("hh:mm A");
    // DeviceInfo.is24Hour() ? "HH:mm" : "hh:mm A"

    return returnValue;
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

        <Text style={styles.headtext}>Manage Consultation</Text>
      </View>
      <View style={styles.headtitle}>
        <Text style={styles.Title}>{doctorName}</Text>
      </View>

      <ScrollView style={styles.formArea}>
        <View
          style={{ width: "90%", flexDirection: "row", alignSelf: "center" }}
        >
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              marginRight: 10,
            }}
          >
            <AntDesign
              name="down"
              size={15}
              color="blue"
              style={{
                position: "absolute",
                right: 20,
              }}
            />
            <Dropdown
              label="Days from"
              data={dayList}
              onChangeText={(value, index) => {
                setDayfrom(index);
              }}
            />
          </View>
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              marginLeft: 10,
            }}
          >
            <AntDesign
              name="down"
              size={15}
              color="blue"
              style={{
                position: "absolute",
                right: 20,
              }}
            />
            <Dropdown
              label="Days To"
              data={dayList}
              onChangeText={(value, index) => {
                if (dayfrom <= index) {
                  setDayto(index);
                } else {
                  Alert.alert(`Select day after ${dayList[dayfrom].value}`);
                }
              }}
            />
          </View>
        </View>

        <View
          style={{ width: "90%", flexDirection: "row", alignSelf: "center" }}
        >
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              marginRight: 10,
            }}
          >
            <AntDesign
              name="down"
              size={15}
              color="blue"
              style={{
                position: "absolute",
                right: 20,
              }}
            />
            <TouchableOpacity
              style={{
                flex: 1,
              }}
              onPress={() => setStartPickerPickerVisible(true)}
            >
              <Text style={{ fontSize: 16, color: "gray", marginLeft: 10 }}>
                Start Time
              </Text>
              <Text style={{ marginTop: 5, marginLeft: 10 }}>
                {StringFromTime(startTime)}
              </Text>
            </TouchableOpacity>
            <DateTimePickerModal
              isVisible={isStartPickerPickerVisible}
              mode="time"
              onConfirm={handleStartTimeConfirm}
              onCancel={() => setStartPickerPickerVisible(false)}
            />
          </View>
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              marginRight: 10,
            }}
          >
            <AntDesign
              name="down"
              size={15}
              color="blue"
              style={{
                position: "absolute",
                right: 20,
              }}
            />
            <TouchableOpacity
              style={{
                flex: 1,
              }}
              onPress={() => setEndPickerPickerVisible(true)}
            >
              <Text style={{ fontSize: 16, color: "gray", marginLeft: 10 }}>
                End Time
              </Text>
              <Text style={{ marginTop: 5, marginLeft: 10 }}>
                {StringFromTime(endTime)}
              </Text>
            </TouchableOpacity>
            <DateTimePickerModal
              isVisible={isEndPickerPickerVisible}
              mode="time"
              onConfirm={handleendTimeConfirm}
              onCancel={() => setEndPickerPickerVisible(false)}
            />
          </View>
        </View>
        <TextInput
          style={{
            width: "25%",
            marginLeft: 20,
            backgroundColor: "#fff",
            marginBottom: 15,
          }}
          label="Duration"
          value={duration}
          keyboardType={"number-pad"}
          onChangeText={(text) => setSlotDuration(text)}
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
  Days: {
    width: "45%",
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
});

export default ManageConsultation;
