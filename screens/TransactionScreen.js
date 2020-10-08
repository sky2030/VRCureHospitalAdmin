import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  Alert,
  FlatList,
  ScrollView,
} from "react-native";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

export default function Transaction({ navigation }) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = () => {
    fetch(`${BASE_URL}transactions`)
      .then((res) => res.json())
      .then((results) => {
        if (results.code == 200) {
          setData(results);
          setLoading(false);
        } else {
          Alert.alert(Alert_Title, results.message);
        }
        // console.log(results)
      })
      .catch((err) => {
        Alert.alert(Alert_Title, SOMETHING_WENT_WRONG);
      });
  };

  useEffect(() => {
    setLoading(false);
    // fetchData();
  }, []);

  const renderList = (item) => {
    return (
      <ScrollView>
        <View style={styles.card1}>
          <View style={styles.header}>
            <Text style={styles.headtext1}>{item.Paidon} </Text>
            <Text style={styles.headtext4}>{item.Status} </Text>
          </View>
          <View style={styles.title4}>
            <View style={styles.title7}>
              <Text style={styles.headtext2}>Invoice No.</Text>
              <Text style={styles.titletext}>{item.InvoiceNo} </Text>
            </View>
            <View style={styles.title8}>
              <Text style={styles.headtext2}>Doctor</Text>
              <Text style={styles.headtext2}>{item.Doctor} </Text>
            </View>
            <View style={styles.title6}>
              <Text style={styles.headtext2}>Amount</Text>
              <Text style={styles.headtext3}>Rs. {item.Amount} </Text>
            </View>
          </View>
        </View>
      </ScrollView>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.head}>
        <MaterialIcons
          name="navigate-before"
          size={30}
          onPress={() => navigation.goBack()}
          style={styles.back}
        />
        <Text style={styles.titletext}>Transactions history </Text>
      </View>
      {/* <FlatList
      data={data}
      renderItem={({ item }) => {
        return renderList(item);
      }}
      keyExtractor={(item) => item._id}
      onRefresh={() => fetchData()}
      refreshing={loading}
    /> */}
      <ScrollView>
        <View style={styles.card1}>
          <View style={styles.header}>
            <Text style={styles.headtext1}>25 JUN 2020 </Text>
          </View>
          <View style={styles.title4}>
            <View style={styles.title7}>
              <Text style={styles.headtext2}>Invoice No.</Text>
              <Text style={styles.InvoiceNo}>#INVR5RK6SOYH2 </Text>
            </View>
            <View style={styles.title8}>
              <Text style={styles.headtext2}>Doctor</Text>
              <Text style={styles.headtext2}>Dr. Ram Kumar </Text>
            </View>
            <View style={styles.title6}>
              <Text style={styles.headtext2}>Amount</Text>
              <Text style={styles.headtext2}>Rs.1000/- </Text>
            </View>
          </View>
        </View>

        <View style={styles.card1}>
          <View style={styles.header}>
            <Text style={styles.headtext1}>25 JUN 2020 </Text>
          </View>
          <View style={styles.title4}>
            <View style={styles.title7}>
              <Text style={styles.headtext2}>Invoice No.</Text>
              <Text style={styles.InvoiceNo}>#INVR5RK6SOYH2 </Text>
            </View>
            <View style={styles.title8}>
              <Text style={styles.headtext2}>Doctor</Text>
              <Text style={styles.headtext2}>Dr. Ram Kumar </Text>
            </View>
            <View style={styles.title6}>
              <Text style={styles.headtext2}>Amount</Text>
              <Text style={styles.headtext2}>Rs.1000/- </Text>
            </View>
          </View>
        </View>

        <View style={styles.card1}>
          <View style={styles.header}>
            <Text style={styles.headtext1}>25 JUN 2020 </Text>
          </View>
          <View style={styles.title4}>
            <View style={styles.title7}>
              <Text style={styles.headtext2}>Invoice No.</Text>
              <Text style={styles.InvoiceNo}>#INVR5RK6SOYH2 </Text>
            </View>
            <View style={styles.title8}>
              <Text style={styles.headtext2}>Doctor</Text>
              <Text style={styles.headtext2}>Dr. Ram Kumar </Text>
            </View>
            <View style={styles.title6}>
              <Text style={styles.headtext2}>Amount</Text>
              <Text style={styles.headtext2}>Rs.1000/- </Text>
            </View>
          </View>
        </View>

        <View style={styles.card1}>
          <View style={styles.header}>
            <Text style={styles.headtext1}>25 JUN 2020 </Text>
          </View>
          <View style={styles.title4}>
            <View style={styles.title7}>
              <Text style={styles.headtext2}>Invoice No.</Text>
              <Text style={styles.InvoiceNo}>#INVR5RK6SOYH2 </Text>
            </View>
            <View style={styles.title8}>
              <Text style={styles.headtext2}>Doctor</Text>
              <Text style={styles.headtext2}>Dr. Ram Kumar </Text>
            </View>
            <View style={styles.title6}>
              <Text style={styles.headtext2}>Amount</Text>
              <Text style={styles.headtext2}>Rs.1000/- </Text>
            </View>
          </View>
        </View>
      </ScrollView>
      {/* <View style={styles.footer}>
        <Text style={styles.bottomtext}>Privacy Policy | Terms of use</Text>
      </View> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
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

  footer: {
    backgroundColor: "#009387",
    padding: 20,
    height: 40,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
  },
  bottomtext: {
    color: "white",
    fontSize: 15,
  },
  headtext: {
    color: "#2E76B6",
    fontSize: 24,
    fontWeight: "900",
    marginBottom: 20,
    marginTop: 10,
    borderColor: "#2E76B6",
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 10,
    marginLeft: 50,
  },
  headtext1: {
    color: "#2F504C",
    fontSize: 17,
    fontWeight: "900",
    alignSelf: "center",
    marginVertical: 6,
  },
  btntext: {
    color: "white",
    fontSize: 15,
    padding: 10,
  },
  headtext2: {
    color: "#4E557C",
    marginTop: 5,
    fontWeight: "900",
  },
  InvoiceNo: {
    color: "#E3445C",
    marginTop: 5,
    fontWeight: "900",
  },
  header6: {
    color: "green",

    fontWeight: "900",
    marginBottom: 2,
    marginTop: 8,
    marginLeft: 2,
  },
  headtext3: {
    color: "#4E557C",
    fontSize: 15,
    fontWeight: "900",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 70,
    marginTop: 20,
  },
  headtext4: {
    color: "#4E557C",

    fontWeight: "900",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 70,
  },
  header: {
    color: "black",
    backgroundColor: "#EEF5F4",
    fontSize: 15,
    fontWeight: "900",
  },
  card: {
    borderRadius: 4,
    elevation: 3,
    backgroundColor: "white",
    shadowOffset: { width: 1, height: 1 },
    shadowColor: "#333",
    shadowOpacity: 0.3,
    shadowRadius: 2,
    marginHorizontal: 20,
    alignItems: "center",
    justifyContent: "center",
    paddingBottom: 10,
  },
  card1: {
    borderRadius: 4,
    elevation: 3,
    backgroundColor: "white",
    shadowOffset: { width: 2, height: 2 },
    shadowColor: "#55DE61",
    shadowOpacity: 0.3,
    shadowRadius: 2,
    marginHorizontal: 10,
    // alignItems: "center",
    // justifyContent: "center",
    marginBottom: 10,
    alignSelf: "center",
    marginTop: 10,
    width: "95%",
    paddingBottom: 10,
  },
  card2: {
    borderRadius: 4,
    elevation: 3,
    backgroundColor: "#CED2DC",
    shadowOffset: { width: 1, height: 1 },
    shadowColor: "#333",
    shadowOpacity: 0.3,
    shadowRadius: 2,
    alignItems: "center",
    justifyContent: "center",
    width: "90%",
    marginHorizontal: 20,
  },
  card3: {
    borderRadius: 4,
    elevation: 3,
    backgroundColor: "#7B6DA3",
    shadowOffset: { width: 1, height: 1 },
    shadowColor: "#333",
    shadowOpacity: 0.3,
    shadowRadius: 2,
    marginHorizontal: 10,
    marginVertical: 5,
    alignItems: "center",
    justifyContent: "center",
  },
  cardContent: {
    marginHorizontal: 20,
    marginVertical: 10,
  },
  input3: {
    marginBottom: 15,
    marginTop: 15,
  },
  input1: {
    alignContent: "center",
    justifyContent: "center",
    fontSize: 15,
    fontWeight: "900",
    marginLeft: 15,
  },
  baseText1: {
    marginBottom: 15,
    marginTop: 15,
    alignContent: "center",
    justifyContent: "center",
    fontSize: 18,
    fontWeight: "900",
  },
  title1: {
    flexDirection: "row",
    marginRight: 20,
  },
  title2: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 15,
  },
  title3: {
    alignItems: "flex-start",
    justifyContent: "flex-start",
    marginTop: 10,
    marginLeft: 10,
    marginRight: 170,
    flexDirection: "row",
  },
  title4: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  title5: {
    alignItems: "flex-start",
    justifyContent: "flex-start",
    marginLeft: 25,
    marginRight: 10,
    flexDirection: "column",
  },
  title6: {
    flex: 0.8,
    // backgroundColor: "#1e1",
    alignItems: "center",
    marginVertical: 5,
    marginRight: 5,
  },
  title7: {
    flex: 1,
    // backgroundColor: "#281",
    alignItems: "center",
    marginLeft: 5,
    marginVertical: 5,
  },
  title8: {
    flex: 1,
    alignItems: "center",
    // backgroundColor: "#8e1",
    marginVertical: 5,
  },
  title9: {
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 60,
    flexDirection: "column",
    marginRight: 10,
  },
  title10: {
    color: "white",
    backgroundColor: "#192161",
    fontSize: 15,
    fontWeight: "900",
    alignItems: "center",
    justifyContent: "center",
    width: "90%",
    marginHorizontal: 20,
  },
  title11: {
    alignItems: "flex-start",
    justifyContent: "flex-start",
    marginTop: 20,
    marginLeft: 10,
    marginRight: 20,
    flexDirection: "column",
  },
  header2: {
    color: "#4E557C",
    fontSize: 15,
    fontWeight: "900",
    marginBottom: 10,
    marginRight: 10,
    alignItems: "flex-start",
    justifyContent: "flex-start",
  },
  header3: {
    color: "#4E557C",
    fontSize: 15,
    fontWeight: "900",
    marginBottom: 2,
    marginTop: 10,
  },
  header4: {
    color: "#4E557C",
    fontSize: 15,
    fontWeight: "900",
    marginRight: 70,
    marginTop: 10,
  },
  header5: {
    color: "green",
    fontSize: 15,
    fontWeight: "900",
    marginBottom: 2,
    marginTop: 10,
  },
  headtext6: {
    color: "blue",
    fontSize: 15,
    fontWeight: "900",
    marginBottom: 2,
    marginTop: 10,
  },
  detail: {
    flexDirection: "row",
  },
  img: {
    marginBottom: 5,
    padding: 20,
    width: 60,
    height: 60,
    borderRadius: 60 / 2,
    marginLeft: 10,
  },
  collapseview: {
    flexDirection: "column",
  },
  btn: {
    width: 150,
    backgroundColor: "#707379",
    padding: 5,
    color: "#fff",
    fontSize: 22,
    fontWeight: "900",
    flexDirection: "row",
    borderRadius: 5,
    height: 25,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
    elevation: 3,
    marginBottom: 20,
    marginLeft: 20,
  },
  img1: {
    marginBottom: 40,
    padding: 15,
    marginTop: 10,
    width: 30,
    height: 30,
    borderRadius: 30 / 2,
  },
});
