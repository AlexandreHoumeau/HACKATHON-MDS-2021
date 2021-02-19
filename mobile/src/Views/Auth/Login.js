import React, { Component, useState } from "react";
import {
  Text,
  View,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
  Image
} from "react-native";
import { TextInput, Button } from "react-native-paper";
import { login } from "../../../actions/authActions";
import { connect } from "react-redux";
import { AntDesign } from "@expo/vector-icons";

const Login = props => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const submitForm = () => {
    const data = {
      email: email.toLowerCase(),
      password: password.toLowerCase()
    };
    props.login(data);
  };
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1, justifyContent: "center", backgroundColor: "#fff" }}
    >
      <View style={{ marginHorizontal: 20 }}>
        <Image
          style={{ width: "100%", resizeMode: "contain", marginBottom: 20 }}
          source={require("../../../assets/logo1.png")}
        />
        <Text style={{ color: "red", fontWeight: "bold" }}>
          {props.error.message}
        </Text>
        <TextInput
          theme={{ colors: { primary: "#ccc", text: "#707070" } }}
          mode="underline"
          underlineColor="transparent"
          label="Email"
          style={{ marginBottom: 20, backgroundColor: "#E6E6E8", color: '#707070' }}
          value={email}
          onChangeText={value => setEmail(value)}
        />
        <TextInput
          theme={{ colors: { primary: "#ccc", text: "#707070" } }}
          mode="underline"
          underlineColor="transparent"
          secureTextEntry={true}
          mode="underline"
          style={{ backgroundColor: "#E6E6E8" }}
          label="Mot de passe"
          value={password}
          onChangeText={value => setPassword(value)}
        />
        <Button
          style={{ marginTop: 50, padding: 10 }}
          labelStyle={{ fontSize: 15, fontWeight: "bold" }}
          mode="contained"
          onPress={() => submitForm()}
          color="#CFB48F"
        >
          Login
        </Button>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginTop: 20
          }}
        >
          <TouchableOpacity
            style={{
              padding: 10,
              borderWidth: 1,
              borderRadius: 4,
              width: 180,
              alignItems: "center",
              marginTop: 20
            }}
          >
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <AntDesign
                name="facebook-square"
                size={24}
                color="black"
                style={{ marginRight: 10 }}
              />
              <Text>Facebook</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            style={{
              padding: 10,
              borderWidth: 1,
              borderRadius: 4,
              width: 180,
              alignItems: "center",
              marginTop: 20
            }}
          >
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <AntDesign
                name="google"
                size={24}
                color="black"
                style={{ marginRight: 10 }}
              />
              <Text>Gmail</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

const mapStateToProps = state => ({
  user: state.user,
  error: state.error
});

export default connect(mapStateToProps, { login })(Login);
