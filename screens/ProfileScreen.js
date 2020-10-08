import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  FlatList,
  Alert,
  ScrollView,
} from "react-native";
import HospitalAvatar from "../assets/images/Hospital.gif";
import {
  MaterialIcons,
  Entypo,
  Feather,
  FontAwesome5,
} from "@expo/vector-icons";
import AsyncStorage from "@react-native-community/async-storage";
import { TextInput, Button } from "react-native-paper";

const ProfileScreen = ({ navigation }) => {
  const [data, Setdata] = useState([]);
  const [specialityTitle, setspecialityTitle] = useState("");
  const [specialitydescription, setspecialitydescription] = useState("");
  const [loading, setLoading] = useState(true);

  const HospitalProfile = async () => {
    const userToken = await AsyncStorage.getItem("userToken");
    // console.log(userToken);
    fetch(BASE_URL, {
      method: "GET",
      headers: { Authorization: userToken },
    })
      .then((res) => res.json())
      .then((result) => {
        //console.log(result);
        if (result.code == 200) {
          Setdata(result.data);
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
  const updateSpeciality = () => {
    Alert.alert("Specialities Updated Successfully");
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      setLoading(true);
      HospitalProfile();
      // console.log(route.params)
    });

    return unsubscribe;
  }, []);

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.HeadCard}>
          <Image
            source={
              data.picture == null ? HospitalAvatar : { uri: data.picture }
            }
            style={styles.HospitalImage}
          />
          <Text style={styles.Title}>{data.hospitalname} </Text>
        </View>
        <View style={styles.bodyCard}>
          <View style={styles.detail}>
            <MaterialIcons
              name="email"
              size={32}
              color="#03a4ad"
              style={styles.expoicon}
            />
            <Text style={styles.locationtext}>{data.email}</Text>
          </View>

          <View style={styles.detail}>
            <MaterialIcons
              name="dialer-sip"
              size={32}
              color="#03a4ad"
              style={styles.expoicon}
            />
            <Text style={styles.locationtext}>{data.phone}</Text>
          </View>

          <View style={styles.detail}>
            <Entypo
              name="location"
              size={32}
              color="#03a4ad"
              style={styles.expoicon}
            />
            <Text style={styles.locationtext}>{data.place} </Text>
          </View>
          <View style={styles.detail}>
            <FontAwesome5
              name="landmark"
              size={32}
              color="#03a4ad"
              style={styles.expoicon}
            />
            <Text style={styles.locationtext}> {data.landmark} </Text>
          </View>
          <View style={styles.detail}>
            <FontAwesome5
              name="city"
              size={32}
              color="#03a4ad"
              style={styles.expoicon}
            />
            <Text style={styles.locationtext}>
              {data.city}, {data.state}
            </Text>
          </View>
          <View style={styles.detail}>
            <Feather
              name="map"
              size={32}
              color="#03a4ad"
              style={styles.expoicon}
            />
            <Text style={styles.locationtext}> {data.pincode} </Text>
          </View>

          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              flex: 1,
              marginHorizontal: 5,
            }}
          >
            <TouchableOpacity
              activeOpacity={0.95}
              style={styles.btn}
              onPress={() => navigation.navigate("EditHospital", { data })}
            >
              <Feather name="edit" size={30} color="#03a4ad" />
              <Text style={styles.addicon}>Profile Update</Text>
            </TouchableOpacity>

            <TouchableOpacity
              activeOpacity={0.95}
              style={styles.btn}
              onPress={() => navigation.navigate("speciality")}
            >
              <MaterialIcons
                name="add-circle"
                size={30}
                color="#03a4ad"
                style={styles.icon}
              />
              <Text style={styles.addicon}>Add Specialities</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>

      {/* <FlatList
              data={data}
              renderitem={({item})=>{
                return renderList(item)
              }}
              keyExtractor={item=>item._id}
             onRefresh={()=>Boiler()}
              refreshing={loading}
              /> */}
      {/* {data && data.length > 0 && renderList(data[0])} */}
    </View>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    backgroundColor: "#e8c6f5",
  },

  inputStyle: {
    borderRadius: 20,
    fontSize: 18,
    fontWeight: "bold",
    backgroundColor: "white",
    marginHorizontal: 10,
  },
  inputdesc: {
    borderRadius: 20,
    fontSize: 18,
    backgroundColor: "white",
    marginHorizontal: 10,
  },
  Title: {
    color: "black",
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 10,
  },

  locationtext: {
    color: "#000",
    marginBottom: 10,
    fontSize: 20,
    marginLeft: 10,
    fontWeight: "bold",
  },
  addresshead: {
    color: "#000",
    marginBottom: 15,
    fontSize: 20,
    marginLeft: 10,
    fontWeight: "bold",
  },

  btn: {
    backgroundColor: "white",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
    elevation: 4,
    flexDirection: "row",
    marginVertical: 10,
    marginHorizontal: 10,
    borderRadius: 5,
  },
  addicon: {
    fontSize: 16,
    fontWeight: "bold",
    margin: 5,
    color: "#03a4ad",
  },
  bodytitle: {
    color: "#000",
    marginBottom: 15,
    fontSize: 25,
    fontWeight: "bold",
  },
  HeadCard: {
    alignItems: "center",
    justifyContent: "center",
  },
  bodyCard: {
    borderRadius: 2,
    shadowOffset: { width: 1, height: 1 },
    shadowColor: "#fff",
    shadowOpacity: 0.2,
    shadowRadius: 1,
    justifyContent: "center",
    marginHorizontal: 5,
  },
  detail: {
    flexDirection: "row",
    borderBottomColor: "#04c4cf",
    borderBottomWidth: 2,
    marginHorizontal: 5,
    marginBottom: 2,
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: 5,
  },
  expoicon: {
    marginHorizontal: 25,
    marginVertical: 5,
  },

  HospitalImage: {
    marginBottom: 7,
    width: "100%",
    height: 170,
    // borderRadius: 35,
  },
});
