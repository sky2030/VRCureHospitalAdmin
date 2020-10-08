import React, { useState, useEffect } from "react";
import { View, StyleSheet, Alert } from "react-native";

import { Avatar, Title, Caption, Paragraph, Drawer } from "react-native-paper";
import { DrawerContentScrollView, DrawerItem } from "@react-navigation/drawer";
import {
  Fontisto,
  FontAwesome,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { AuthContext } from "../components/context";
import AsyncStorage from "@react-native-community/async-storage";
import HospitalAvatar from "../assets/images/Hospital.gif";

export function DrawerContent(props) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const HospitalProfile = async () => {
    const userToken = await AsyncStorage.getItem("userToken");
    // console.log(userToken)
    fetch(BASE_URL, {
      method: "GET",
      headers: { Authorization: userToken },
    })
      .then((res) => res.json())
      .then((result) => {
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

  useEffect(() => {
    HospitalProfile();
  }, []);

  const { signOut } = React.useContext(AuthContext);

  return (
    <View style={{ flex: 1 }}>
      <DrawerContentScrollView {...props}>
        <View style={styles.drawerContent}>
          <View style={styles.userInfoSection}>
            <View style={{ flexDirection: "row", marginTop: 15 }}>
              <Avatar.Image
                source={
                  data.picture == null ? HospitalAvatar : { uri: data.picture }
                }
                size={50}
              />
              <View style={{ marginLeft: 15, flexDirection: "column" }}>
                <Title style={styles.title}>{data.hospitalname}</Title>
                <Caption style={styles.caption}>
                  {data.district} {data.pincode}
                </Caption>
              </View>
            </View>

            <View style={styles.row}>
              <View style={styles.section}>
                <Paragraph style={[styles.place, styles.caption]}>
                  {data.place},{" "}
                </Paragraph>
                <Paragraph style={[styles.paragraph, styles.caption]}>
                  {data.city}
                </Paragraph>
              </View>
            </View>
          </View>

          <Drawer.Section style={styles.drawerSection}>
            <DrawerItem
              icon={({ color, size }) => (
                <Icon name="home-outline" color={color} size={size} />
              )}
              label="Dashboard"
              onPress={() => {
                props.navigation.navigate("Home");
              }}
            />
            <DrawerItem
              icon={({ color, size }) => (
                // <Icon
                // name="account-outline"
                // color={color}
                // size={size}
                // />
                <FontAwesome name="hospital-o" size={size} color={color} />
              )}
              label="My Hospital"
              onPress={() => {
                props.navigation.navigate("Profile");
              }}
            />
            <DrawerItem
              icon={({ color, size }) => (
                // <Icon
                // name="account-check-outline"
                // color={color}
                // size={size}
                // />
                <Fontisto name="doctor" size={size} color={color} />
              )}
              label="Doctors"
              onPress={() => {
                props.navigation.navigate("Doctors");
              }}
            />
            <DrawerItem
              icon={({ color, size }) => (
                // <Icon
                // name="calendar-outline"
                // color={color}
                // size={size}
                // />
                <MaterialCommunityIcons
                  name="hospital-box"
                  size={size}
                  color={color}
                />
              )}
              label="Speciality"
              onPress={() => {
                props.navigation.navigate("Speciality");
              }}
            />
            <DrawerItem
              icon={({ color, size }) => (
                <Icon name="settings-outline" color={color} size={size} />
              )}
              label="Support"
              onPress={() => {
                props.navigation.navigate("Contactus");
              }}
            />
          </Drawer.Section>
        </View>
      </DrawerContentScrollView>
      <Drawer.Section style={styles.bottomDrawerSection}>
        <DrawerItem
          icon={({ color, size }) => (
            <Icon name="exit-to-app" color={color} size={size} />
          )}
          label="Sign Out"
          onPress={() => {
            signOut();
          }}
        />
      </Drawer.Section>
    </View>
  );
}

const styles = StyleSheet.create({
  drawerContent: {
    flex: 1,
  },
  userInfoSection: {
    paddingLeft: 20,
    paddingBottom: 10,
    borderBottomWidth: 1,
  },
  title: {
    fontSize: 16,
    marginTop: 3,
    fontWeight: "bold",
  },
  caption: {
    fontSize: 14,
    lineHeight: 14,
  },
  row: {
    marginTop: 20,
    flexDirection: "row",
    alignItems: "center",
  },
  section: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 15,
  },
  paragraph: {
    fontWeight: "bold",
    marginRight: 3,
  },
  place: {
    fontWeight: "bold",
    marginRight: 3,
  },
  drawerSection: {
    marginTop: 15,
  },
  bottomDrawerSection: {
    marginBottom: 15,
    borderTopColor: "#f4f4f4",
    borderTopWidth: 1,
  },
  preference: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
});
