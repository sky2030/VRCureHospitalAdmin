import React from "react";

import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import Icon from "react-native-vector-icons/Ionicons";
import {
  Fontisto,
  FontAwesome,
  MaterialCommunityIcons,
} from "@expo/vector-icons";

import HomeScreen from "./HomeScreen";
import FindSpecialityScreen from "./DepartmentScreen";
import DoctorScreen from "./DoctorScreen";
import ProfileScreen from "./ProfileScreen";

const HomeStack = createStackNavigator();
const FindSpecialityStack = createStackNavigator();
const ProfileStack = createStackNavigator();
const DoctorsStack = createStackNavigator();

const Tab = createMaterialBottomTabNavigator();

const MainTabScreen = () => (
  <Tab.Navigator initialRouteName="Home" activeColor="#fff">
    <Tab.Screen
      name="Home"
      component={HomeStackScreen}
      options={{
        tabBarLabel: "Home",
        tabBarColor: "#694fad",
        tabBarIcon: ({ color }) => (
          <Icon name="ios-home" color={color} size={26} />
        ),
      }}
    />
    <Tab.Screen
      name="Speciality"
      component={FindSpecialityStackScreen}
      options={{
        tabBarLabel: "Department",
        tabBarColor: "#694fad",
        tabBarIcon: ({ color }) => (
          <MaterialCommunityIcons name="hospital-box" size={26} color={color} />
        ),
      }}
    />
    <Tab.Screen
      name="Doctors"
      component={DoctorsStackScreen}
      options={{
        tabBarLabel: "All Doctors",
        tabBarColor: "#694fad",
        tabBarIcon: ({ color }) => (
          <Fontisto name="doctor" size={26} color={color} />
          //<Icon name="ios-calendar" color={color} size={26} />
        ),
      }}
    />
    <Tab.Screen
      name="Profile"
      component={ProfileStackScreen}
      options={{
        tabBarLabel: "My Hospital",
        tabBarColor: "#694fad",
        tabBarIcon: ({ color }) => (
          <FontAwesome name="hospital-o" size={26} color={color} />
        ),
      }}
    />
  </Tab.Navigator>
);

export default MainTabScreen;

const HomeStackScreen = ({ navigation }) => (
  <HomeStack.Navigator
    screenOptions={{
      headerStyle: {
        backgroundColor: "#fff",
        height: 60,
      },
      headerTintColor: "#694fad",
      headerTitleStyle: {
        fontWeight: "bold",
      },
    }}
  >
    <HomeStack.Screen
      name="Home"
      component={HomeScreen}
      options={{
        title: "Dashboard",
        headerLeft: () => (
          <Icon.Button
            name="ios-menu"
            size={25}
            backgroundColor="#fff"
            color="#694fad"
            onPress={() => navigation.openDrawer()}
          ></Icon.Button>
        ),
      }}
    />
  </HomeStack.Navigator>
);

const FindSpecialityStackScreen = ({ navigation }) => (
  <FindSpecialityStack.Navigator
    screenOptions={{
      headerStyle: {
        backgroundColor: "#fff",
        height: 60,
      },
      headerTintColor: "#694fad",
      headerTitleStyle: {
        fontWeight: "bold",
      },
    }}
  >
    <FindSpecialityStack.Screen
      name="Speciality"
      component={FindSpecialityScreen}
      options={{
        title: "All Departments",
        headerLeft: () => (
          <Icon.Button
            name="ios-menu"
            size={25}
            backgroundColor="#fff"
            color="#694fad"
            onPress={() => navigation.openDrawer()}
          ></Icon.Button>
        ),
      }}
    />
  </FindSpecialityStack.Navigator>
);
const ProfileStackScreen = ({ navigation }) => (
  <ProfileStack.Navigator
    screenOptions={{
      headerStyle: {
        backgroundColor: "#fff",
        height: 60,
      },
      headerTintColor: "#694fad",
      headerTitleStyle: {
        fontWeight: "bold",
      },
    }}
  >
    <ProfileStack.Screen
      name="Profile"
      component={ProfileScreen}
      options={{
        title: "My Hospital",
        headerLeft: () => (
          <Icon.Button
            name="ios-menu"
            size={25}
            backgroundColor="#fff"
            color="#694fad"
            onPress={() => navigation.openDrawer()}
          ></Icon.Button>
        ),
      }}
    />
  </ProfileStack.Navigator>
);

const DoctorsStackScreen = ({ navigation }) => (
  <DoctorsStack.Navigator
    screenOptions={{
      headerStyle: {
        backgroundColor: "#fff",
        height: 60,
      },
      headerTintColor: "#694fad",
      headerTitleStyle: {
        fontWeight: "bold",
      },
    }}
  >
    <DoctorsStack.Screen
      name="Doctors"
      component={DoctorScreen}
      options={{
        title: "All Doctors",
        headerLeft: () => (
          <Icon.Button
            name="ios-menu"
            size={25}
            backgroundColor="#fff"
            color="#694fad"
            onPress={() => navigation.openDrawer()}
          ></Icon.Button>
        ),
      }}
    />
  </DoctorsStack.Navigator>
);
