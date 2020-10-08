import React from 'react';
import { 
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Image,  
  ImageBackground,
  StatusBar} from 'react-native';
  import Header from '../assets/images/Header.png';

  import {Fontisto,FontAwesome5,MaterialIcons,MaterialCommunityIcons} from '@expo/vector-icons'


const HomeScreen = ({navigation}) => {

    return (
     
      <View style={styles.container}>
        <StatusBar backgroundColor='#694fad' barStyle="light-content"/>
      <View style={styles.header}>
      <ImageBackground style={ styles.imgBackground }  source={Header}>
      </ImageBackground>
      </View>
     
          <TouchableOpacity 
             onPress={() => navigation.navigate("Speciality")} style={styles.card} >
              <MaterialCommunityIcons name="hospital-box" size={45} color="#694fad" />
              <Text style={styles.CardText}>Departments</Text>
              
              </TouchableOpacity>
              <TouchableOpacity 
             onPress={() => navigation.navigate("Doctors")} style={styles.card} >
              {/* <Image 
              source={logo1}
              style={styles.img}/> */}
              <Fontisto name="doctor" size={45} color="#694fad" />
              <Text style={styles.CardText}>Active Doctor's</Text>
             
          </TouchableOpacity>
          
         
          
          <TouchableOpacity 
             onPress={() => navigation.navigate("Profile")} style={styles.card} >
              {/* <Image 
              source={logo4}
              style={styles.img}/> */}
              <FontAwesome5 name="hospital-alt" size={40} color="#694fad" />
              <Text style={styles.CardText}> My Hospital</Text>  
          </TouchableOpacity>
          
          <TouchableOpacity 
             onPress={() => navigation.navigate("Transaction")} style={styles.card} >
              {/* <Image 
              source={logo3}
              style={styles.img}/> */}
              <MaterialIcons name="payment" size={45} color="#694fad" />
              <Text style={styles.CardText}>Transactions</Text>   
          </TouchableOpacity>
         

          
          <TouchableOpacity style={styles.footer} onPress={() => navigation.navigate("PrivacyPolicy")}>
           <Text style={styles.bottomtext}>Privacy Policy | Terms of use</Text>
          </TouchableOpacity>
      </View>
    );
};

export default HomeScreen;

const styles= StyleSheet.create({
  container: {
      flex: 1,
      width: "100%"
    },
    
    footer:{
    backgroundColor:"#50319e",
      padding:20,
      height: 40,
      width: "100%",
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: 20,
      bottom:1,
      position:'absolute'
  },
  bottomtext:{
      color:'#fff',
      fontSize: 15,
  },
  
 CardText:{
     color:'black',
     marginBottom:5,
     fontSize:18,
     fontWeight: 'bold',
     justifyContent:"center",
     alignItems:"center",
     marginLeft:20
 },
   
   card: {
      borderRadius: 4,
      elevation: 3,
      backgroundColor: 'white',
      shadowOffset: { width: 1, height: 1 },
      shadowColor: '#333',
      shadowOpacity: 0.3,
      shadowRadius: 2,
      marginHorizontal: 10,
      marginVertical: 5,
      alignItems: "center",
      justifyContent: 'center',
      flexDirection:"row",
      height:'12%',
      width:"95%"
      
    },
      
    img:{
        marginBottom: 10,
        marginTop: 10,
        marginLeft:8,
        width: 60, height: 60
    },
    imgBackground: {
     width: '100%',
     height: '100%',
     flex: 1,
     shadowOpacity:0.3,
     shadowOffset: { width: 1, height: 1 },
     shadowColor: '#333',
     resizeMode:"cover"
    },
    header: {
     width: '100%',
     height: '35%',
     shadowOpacity:0.3,
     shadowOffset: { width: 1, height: 1 },
     shadowColor: '#333',
     resizeMode:"cover",
     marginBottom: 10,
    },

})

