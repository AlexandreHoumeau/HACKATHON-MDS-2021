import React, { useState } from "react";
import AppContainer from "./navigation";
import { Provider } from "react-redux";
import store from "./store";
import AsyncStorage from "@react-native-community/async-storage";
import { setToken } from "./actions/authActions";
import setAuthToken from "./utils/setAuthToken";
import * as SplashScreen from "expo-splash-screen";

const App = () => {
  (async () => {
    if (await AsyncStorage.getItem("token")) {
      // Set auth token header auth
      const token = await AsyncStorage.getItem("token");
      setAuthToken(token);
      const payload = {
        token
      };

      //dispatch informations
      store.dispatch(setToken(payload));
    } else {
      store.dispatch(setToken(null));
      await AsyncStorage.removeItem("token");
    }
  })();
  return (
    <Provider store={store}>
      <AppContainer />
    </Provider>
  );
};

export default App