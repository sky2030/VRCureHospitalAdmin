import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  Linking,
  Platform,
  Alert,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Title, Card, Button } from "react-native-paper";
import { MaterialIcons, Entypo, AntDesign } from "@expo/vector-icons";
import AsyncStorage from "@react-native-community/async-storage";

const DepartmentDetail = ({ navigation, route }) => {
  const {
    _id,
    departmentname,
    picture,
    deptcode,
    description,
  } = route.params.item;
  const DeleteDept = async () => {
    const userToken = await AsyncStorage.getItem("userToken");
    fetch(`${BASE_URL}departments/${_id}`, {
      method: "delete",
      headers: {
        "Content-Type": "application/json",
        Authorization: userToken,
      },
    })
      .then((res) => res.json())
      .then((deletedEmp) => {
        Alert.alert(`${departmentname} deleted`);
        navigation.navigate("Speciality");
      })
      .catch((err) => {
        Alert.alert(Alert_Title, SOMETHING_WENT_WRONG);
      });
  };

  return (
    <View style={styles.root}>
      <View style={styles.headTop}>
        <MaterialIcons
          name="navigate-before"
          size={35}
          onPress={() => navigation.goBack()}
          style={styles.back}
        />
        <Text style={styles.titletext}>Department Details</Text>
      </View>
      <LinearGradient
        colors={["#0033ff", "#6bc1ff"]}
        style={{ height: "25%" }}
      />
      <View style={{ alignItems: "center" }}>
        <Image
          style={{
            width: 300,
            height: 300,
            borderRadius: 150,
            marginTop: -150,
          }}
          source={{ uri: picture }}
        />
      </View>
      <View style={{ alignItems: "center", margin: 15 }}>
        <Text style={{ fontSize: 30, fontWeight: "bold" }}>
          {departmentname}
        </Text>
        <Text style={{ fontSize: 22 }}>{deptcode}</Text>
      </View>

      <Card style={styles.mycard} onPress={() => openDial()}>
        <View style={styles.cardContent}>
          <AntDesign name="antdesign" size={35} color="#006aff" />

          <Text style={styles.mytext}>{description}</Text>
        </View>
      </Card>

      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-around",
          padding: 10,
        }}
      >
        <Button
          icon="account-edit"
          mode="contained"
          theme={theme}
          onPress={() => {
            navigation.navigate("updatedept", {
              _id,
              departmentname,
              picture,
              description,
            });
          }}
        >
          Edit
        </Button>
        <Button
          icon="delete"
          mode="contained"
          theme={theme}
          onPress={() => DeleteDept()}
        >
          Delete Department
        </Button>
      </View>
    </View>
  );
};

const theme = {
  colors: {
    primary: "#006aff",
  },
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  headTop: {
    width: "100%",
    flexDirection: "row",
    height: 45,
    alignItems: "center",
  },

  titletext: {
    color: "#4E557C",
    fontSize: 25,
    fontWeight: "bold",
    paddingHorizontal: 80,
  },
  mycard: {
    marginTop: 10,
    marginHorizontal: 2,
  },
  cardContent: {
    flexDirection: "row",
    padding: 10,
  },
  mytext: {
    fontSize: 22,
    marginTop: 3,
    marginLeft: 5,
  },
});
export default DepartmentDetail;
