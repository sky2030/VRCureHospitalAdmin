import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
  Modal,
  FlatList,
  Alert,
} from "react-native";
//import {Button} from 'react-native-paper'

//import {useSelector,useDispatch} from 'react-redux';
import { Entypo } from "@expo/vector-icons";
import AsyncStorage from "@react-native-community/async-storage";

const DoctorScreen = ({ navigation, route }) => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [rating, setRating] = useState("****");

  // const dispatch  = useDispatch()
  //   const {docdata,refreshloading} =  useSelector((state)=>{
  //       return state
  //   })

  const fetchData = async () => {
    const userToken = await AsyncStorage.getItem("userToken");
    // console.log(userToken);
    fetch(`${BASE_URL}doctors`, {
      method: "GET",
      headers: { Authorization: userToken },
    })
      .then((res) => res.json())
      .then((results) => {
        if (results.code == 200) {
          setData(results.data);
          setLoading(false);
        } else {
          Alert.alert(Alert_Title, results.message);
        }

        //dispatch({type:"ADD_DOCDATA",payload:results})
        // dispatch({type:"SET_DOCLOADING",payload:false})
      })
      .catch((err) => {
        Alert.alert(Alert_Title, SOMETHING_WENT_WRONG);
      });
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      setLoading(true);
      fetchData();
    });

    return unsubscribe;
  }, []);

  const renderList = (item) => {
    return (
      <ScrollView>
        <TouchableOpacity
          activeOpacity={0.95}
          onPress={() => navigation.navigate("DoctorProfile", { item })}
        >
          <View style={styles.Doctorcard}>
            <View style={styles.header}>
              <Text style={styles.headtext}>
                {" "}
                Dr. {item.first_name} {item.last_name}{" "}
              </Text>
            </View>
            <View style={styles.cardbody}>
              <View style={styles.drImage}>
                <Image
                  style={styles.drAvatar}
                  source={{ uri: item.picture }}
                  // source={profile}
                />
              </View>
              <View style={styles.detail}>
                <Text style={styles.cardbodytext}>{item.designation} </Text>
                <Text style={styles.cardbodytext}> {item.degree} </Text>
                {/* <Text style={styles.cardbodytext}> Rating: {rating} </Text> */}
                <Text style={styles.cardbodytext}>
                  Consultation Fees : {item.consultation}{" "}
                </Text>
                <Text style={styles.cardbodytext}>
                  Registration No : {item.registration_no}{" "}
                </Text>
              </View>
            </View>
          </View>
        </TouchableOpacity>
      </ScrollView>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        renderItem={({ item }) => {
          return renderList(item);
        }}
        keyExtractor={(item) => item._id}
        onRefresh={() => fetchData()}
        refreshing={loading}
      />

      <TouchableOpacity
        activeOpacity={0.95}
        style={styles.btn}
        onPress={() => navigation.navigate("AddDoctor")}
      >
        <Entypo
          name="add-user"
          size={35}
          color="black"
          style={styles.addicon}
        />
      </TouchableOpacity>
    </View>
  );
};

const theme = {
  colors: {
    primary: "#006aff",
  },
};
export default DoctorScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },

  mycard: {
    margin: 5,
  },
  cardView: {
    alignItems: "flex-start",
    justifyContent: "flex-start",
    flexDirection: "row",
    paddingBottom: 10,
  },
  text: {
    fontSize: 18,
  },

  headtext: {
    color: "#121201",
    fontSize: 20,
    fontWeight: "bold",
  },
  Doctorcard: {
    borderRadius: 4,
    elevation: 3,
    backgroundColor: "#E5F0ED",
    shadowOffset: { width: 1, height: 1 },
    shadowColor: "#333",
    shadowOpacity: 0.3,
    shadowRadius: 2,
    marginHorizontal: 20,
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 10,
    marginBottom: 20,
  },
  header: {
    backgroundColor: "#fffb00",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },
  cardbodytext: {
    color: "#4E557C",
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 5,
    width: "100%",
  },
  cardbody: {
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    paddingBottom: 10,
    flex: 1,
  },

  drImage: {
    alignItems: "center",
    justifyContent: "center",
    width: "28%",
  },
  drAvatar: {
    width: "95%",
    height: "95%",
    // borderRadius:40,
    borderWidth: 3,
    borderColor: "#fffb00",
  },
  detail: {
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 10,
    flexDirection: "column",
    flex: 2,

    width: "70%",
  },
  btntext: {
    color: "#4E557C",
    fontSize: 20,
    fontWeight: "bold",
  },
  addicon: {
    width: 35,
    height: 35,
  },
  btn: {
    backgroundColor: "#b6c1c2",
    padding: 25,
    borderRadius: 5,
    height: 25,
    justifyContent: "center",
    elevation: 6,
    position: "absolute",
    margin: 15,
    left: 10,
    bottom: 10,
  },
  modalToggle: {
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#f2f2f2",
    padding: 10,
    borderRadius: 10,
    alignSelf: "center",
  },
  modalClose: {
    marginTop: 20,
    marginBottom: 0,
  },
  modalContent: {
    flex: 1,
  },
});
