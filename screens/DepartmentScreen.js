import React, { useState, useEffect } from "react";
import {
  StatusBar,
  Alert,
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
  FlatList,
} from "react-native";

import { Entypo, AntDesign } from "@expo/vector-icons";
//import {useSelector,useDispatch} from 'react-redux';
import AsyncStorage from "@react-native-community/async-storage";

const FindSpecialityScreen = ({ navigation }) => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  // const dispatch  = useDispatch()
  //   const {data,loading} =  useSelector((state)=>{
  //       return state
  //   })

  const fetchData = async () => {
    const userToken = await AsyncStorage.getItem("userToken");
    fetch(`${BASE_URL}departments`, {
      headers: new Headers({
        Authorization: userToken,
      }),
    })
      .then((res) => res.json())
      .then((results) => {
        if (results.code == 200) {
          setData(results.data);
          setLoading(false);
        } else {
          Alert.alert(Alert_Title, results.message);
        }
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
      <TouchableOpacity
        activeOpacity={0.95}
        onPress={() => navigation.navigate("deptdetail", { item })}
        style={styles.card}
      >
        <View style={{ flex: 1 }}>
          <Image
            // source={cardiology}
            source={{ uri: item.picture }}
            style={styles.img}
          />
        </View>
        <View style={styles.dept}>
          <Text style={styles.deptName}>{item.departmentname}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#694fad" barStyle="light-content" />
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
        onPress={() => navigation.navigate("addDept")}
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

export default FindSpecialityScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    backgroundColor: "#fff",
  },
  addicon: {
    width: 35,
    height: 35,
  },
  searchtype: {
    height: "100%",
  },
  dept: {
    paddingLeft: 70,
    alignItems: "center",
    justifyContent: "center",
    flex: 5,
  },

  deptName: {
    color: "#fff",
    fontSize: 35,
    fontWeight: "bold",
  },
  card: {
    borderRadius: 6,
    elevation: 3,
    backgroundColor: "#07a9b8",
    shadowOffset: { width: 1, height: 1 },
    shadowColor: "#333",
    shadowOpacity: 0.3,
    shadowRadius: 2,
    marginHorizontal: 10,
    marginVertical: 10,
    flexDirection: "row",
  },
  img: {
    margin: 10,
    width: 80,
    borderRadius: 40,
    height: 80,
  },

  btn: {
    backgroundColor: "#E5F0ED",
    padding: 25,
    color: "#fff",
    fontSize: 22,
    fontWeight: "bold",
    flexDirection: "row",
    borderRadius: 5,
    height: 25,
    alignItems: "center",
    justifyContent: "center",
    elevation: 3,
    flexDirection: "row",
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
