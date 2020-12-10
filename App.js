import React, { useState, useEffect } from "react";
import { View, ActivityIndicator, Alert } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import AsyncStorage from "@react-native-community/async-storage";

import { AuthContext } from "./components/context";
import "./Global";
import DrawerStackScreen from "./screens/DrawerNav";
import RootStackScreen from "./screens/RootStackScreen";

import { createStore, combineReducers } from "redux";
import { Provider } from "react-redux";
//import {doctorReducer} from './reducers/doctorReducer'
//import {deptReducer} from './reducers/deptReducer'
//import Rootreducer from './reducers/rootReducer'

// const rootReducer = combineReducers({
//   doctorReducer,
//   deptReducer
// });

// const store  = createStore(rootReducer)

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [userToken, setUserToken] = useState(null);

  const initialLoginState = {
    isLoading: true,
    userName: null,
    userToken: null,
  };

  const loginReducer = (prevState, action) => {
    switch (action.type) {
      case "RETRIEVE_TOKEN":
        return {
          ...prevState,
          userToken: action.token,
          isLoading: false,
        };
      case "LOGIN":
        return {
          ...prevState,
          userName: action.id,
          userToken: action.token,
          isLoading: false,
        };
      case "LOGOUT":
        return {
          ...prevState,
          userName: null,
          userToken: null,
          isLoading: false,
        };
      case "REGISTER":
        return {
          ...prevState,
          userName: action.id,
          userToken: action.token,
          isLoading: false,
        };
    }
  };

  const [loginState, dispatch] = React.useReducer(
    loginReducer,
    initialLoginState
  );

  const authContext = React.useMemo(
    () => ({
      signIn: (username, password) => {
        // setIsLoading(false);
        let URL = `${BASE_URL}login`
        console.log(URL)
        fetch(URL, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: username,
            password: password,
          }),
        })
          .then((res) => res.json())
          .then(async (data) => {
            console.log(data);
            try {
              await AsyncStorage.setItem("userToken", data.data.access_token);
              const userToken = await AsyncStorage.getItem("userToken");
              dispatch({ type: "LOGIN", id: username, token: userToken });
            } catch (e) {
              console.log("Something went wrong with sky's Code", e);
              Alert(Alert_Title, SOMETHING_WENT_WRONG);
            }
          });
        //  const userToken = AsyncStorage.getItem('userToken');
        // dispatch({ type: 'LOGIN', id: username, token: userToken });
      },
      signOut: async () => {
        // setUserToken(null);
        //  setIsLoading(false);
        try {
          await AsyncStorage.removeItem("userToken");
        } catch (e) {
          console.log(e);
        }
        dispatch({ type: "LOGOUT" });
      },
      signUp: () => {
        //  setUserToken('fgkj');
        //  setIsLoading(false);
      },
    }),
    []
  );

  const CheckToken = () => {
    setTimeout(async () => {
      setIsLoading(false);
      let checkToken;
      checkToken = null;
      try {
        checkToken = await AsyncStorage.getItem("userToken");
      } catch (e) {
        console.log(e);
      }
      dispatch({ type: "RETRIEVE_TOKEN", token: checkToken });
    }, 1000);
  };

  useEffect(() => {
    CheckToken();
  }, []);

  if (loginState.isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <AuthContext.Provider value={authContext}>
      {/* <Provider store={store}> */}
      <NavigationContainer>
        {loginState.userToken !== null ? (
          <DrawerStackScreen />
        ) : (
            <RootStackScreen />
          )}
      </NavigationContainer>
      {/* </Provider> */}
    </AuthContext.Provider>
  );
}
