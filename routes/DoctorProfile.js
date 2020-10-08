import React, { useEffect, useState } from "react";
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
import {
  MaterialIcons,
  Foundation,
  FontAwesome,
  Fontisto,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import AsyncStorage from "@react-native-community/async-storage";

const DoctorProfile = ({ navigation, route }) => {
  const {
    _id,
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
    consultation,
    degree,
    designation,
    department,
    deptcode,
    specialities,
    ewsfee,
    followupfee,
    followupdays,
  } = route.params.item;

  const deleteDoctor = async () => {
    const userToken = await AsyncStorage.getItem("userToken");
    fetch(`${BASE_URL}doctors/${_id}`, {
      method: "delete",
      headers: {
        "Content-Type": "application/json",
        Authorization: userToken,
      },
      body: JSON.stringify({
        id: _id,
      }),
    })
      .then((res) => res.json())
      .then((deletedDOC) => {
        Alert.alert(`${first_name} deleted`);
        navigation.navigate("Doctors");
      })
      .catch((err) => {
        Alert.alert(Alert_Title, SOMETHING_WENT_WRONG);
      });
  };
  const openDial = () => {
    if (Platform.OS === "android") {
      Linking.openURL(`tel:${mobile}`);
    } else {
      Linking.openURL(`telprompt:${mobile}`);
    }
  };
  return (
    <View style={styles.root}>
      <View style={styles.headTop}>
        <MaterialIcons
          name="navigate-before"
          size={35}
          onPress={() => navigation.goBack()}
          style={{ color: "#50319e" }}
        />
        <Text style={styles.titletext}>Doctor Profile </Text>
      </View>

      <LinearGradient
        colors={["#00b5d1", "#b4d6db"]}
        style={{ height: "23%" }}
      />
      <View style={{ alignItems: "center" }}>
        <Image
          style={{
            width: 140,
            height: 150,
            borderRadius: 140 / 2,
            marginTop: -160,
          }}
          source={{ uri: picture }}
        />
      </View>
      <View style={{ alignItems: "center", margin: 10 }}>
        <Title>
          {first_name} {last_name}
        </Title>
        <Text style={{ fontSize: 17 }}>{designation}</Text>
      </View>
      <Card style={styles.mycard}>
        <View style={styles.cardContent}>
          <MaterialCommunityIcons
            name="google-circles-group"
            size={32}
            color="#06bf91"
          />
          <Text style={styles.mytext}>{department}</Text>
        </View>
      </Card>

      <Card style={styles.mycard}>
        <View style={styles.cardContent}>
          <Fontisto name="doctor" size={32} color="#06bf91" />

          <Text style={styles.mytext}>{experience}</Text>
        </View>
      </Card>
      <Card style={styles.mycard}>
        <View style={styles.cardContent}>
          <MaterialCommunityIcons
            name="certificate"
            size={32}
            color="#06bf91"
          />

          <Text style={styles.mytext}>{degree}</Text>
        </View>
      </Card>

      <Card
        style={styles.mycard}
        onPress={() => {
          Linking.openURL(`mailto:${email}`);
        }}
      >
        <View style={styles.cardContent}>
          <MaterialIcons name="email" size={32} color="#06bf91" />
          <Text style={styles.mytext}>{email}</Text>
        </View>
      </Card>
      <Card style={styles.mycard} onPress={() => openDial()}>
        <View style={styles.cardContent}>
          <MaterialIcons name="dialer-sip" size={32} color="#06bf91" />
          <Text style={styles.mytext}>{mobile}</Text>
        </View>
      </Card>
      <Card style={styles.mycard}>
        <View style={styles.cardContent}>
          <Foundation name="dollar-bill" size={32} color="#06bf91" />

          <Text style={styles.mytext}>{consultation}</Text>
        </View>
      </Card>
      <Card style={styles.mycard}>
        <View style={styles.cardContent}>
          <FontAwesome name="birthday-cake" size={32} color="#06bf91" />
          <Text style={styles.mytext}>{dob}</Text>
        </View>
      </Card>

      <View
        style={{
          flexDirection: "row",
          justifyContent: "flex-end",
          padding: 10,
        }}
      >
        <Button
          icon="account-edit"
          mode="contained"
          theme={theme}
          onPress={() => {
            navigation.navigate("updateDetails", {
              _id,
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
              consultation,
              degree,
              designation,
              department,
              deptcode,
              specialities,
            });
          }}
        >
          Update Details
        </Button>
        <Button
          icon="delete"
          mode="contained"
          theme={theme}
          style={{ marginLeft: 18 }}
          onPress={() => deleteDoctor()}
        >
          Delete
        </Button>
      </View>
      <View
        style={{ flexDirection: "row", justifyContent: "flex-end", padding: 4 }}
      >
        <Button
          icon="doctor"
          mode="contained"
          theme={theme}
          style={{ marginLeft: 10 }}
          onPress={() => {
            navigation.navigate("AddFees", {
              _id,
              first_name,
              consultation,
              ewsfee,
              followupfee,
              followupdays,
            });
          }}
        >
          Add Fees
        </Button>
        <Button
          icon="doctor"
          mode="contained"
          theme={theme}
          style={{ marginLeft: 18 }}
          onPress={() => {
            navigation.navigate("Consultation", { _id, first_name });
          }}
        >
          Manage Slots
        </Button>
      </View>
    </View>
  );
};

const theme = {
  colors: {
    primary: "#50319e",
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
    paddingHorizontal: 100,
  },
  mycard: {
    margin: 3,
  },
  cardContent: {
    flexDirection: "row",
    padding: 8,
  },
  mytext: {
    fontSize: 18,
    marginTop: 3,
    marginLeft: 5,
  },
});
export default DoctorProfile;
