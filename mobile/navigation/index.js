import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Login from "../src/Views/Auth/Login";
import { useSelector } from "react-redux";
import Home from "../src/Views/Home";
import { Entypo } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import Account from "../src/Views/Account";
import Quotation from "../src/Views/Quotation";
const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function App() {
  const auth = useSelector(state => state.user.token);
  return (
    <NavigationContainer>
      <Stack.Navigator headerMode="null">
        <Stack.Screen
          name="Identifiez-vous"
          component={auth ? HomeView : AuthView}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const AuthView = () => {
  return (
    <Stack.Navigator headerMode="none">
      <Stack.Screen name="Login" component={Login} />
    </Stack.Navigator>
  );
};

const HomeView = () => {
  return (
    <Tab.Navigator
      headerMode="none"
      tabBarOptions={{
        activeTintColor: "#CFB48F",
        inactiveTintColor: "gray"
      }}
    >
      <Tab.Screen
        label={true}
        name="Home"
        component={Home}
        options={{
          tabBarLabel: () => null,
          showLabel: false,
          tabBarIcon: ({ color, size }) => (
            <Entypo name="home" size={size} color={color} />
          )
        }}
      />
      <Tab.Screen
        name="Devis"
        component={Quotation}
        options={{
          tabBarLabel: () => null,
          tabBarIcon: ({ color, size }) => (
            <FontAwesome5 name="pen" size={size} color={color} />
          )
        }}
      />
      <Tab.Screen
        name="Account"
        component={Account}
        options={{
          tabBarLabel: () => null,
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="account-circle" size={size} color={color} />
          )
        }}
      />
    </Tab.Navigator>
  );
};

export default App;
