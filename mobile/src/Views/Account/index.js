import React, { useState, useEffect } from "react";
import { View, Text, ActivityIndicator, FlatList, TouchableOpacity, StyleSheet, Image } from "react-native";
import { connect } from "react-redux";
import { getMe } from "../../../actions/userAction";
import { Avatar } from "react-native-elements";
import { getList, getFavorite } from "../../../actions/postActions";
import { AntDesign } from "@expo/vector-icons";

import { btoa } from "js-base64";
import { logoutUser } from "../../../actions/authActions";
const Account = (props) => {
  const [user, setUser] = useState(null);
  const [list, setList] = useState([]);
  useEffect(() => {
    getFavoriteList();
    getUser();

  }, []);

  const getFavoriteList = async () => {
    setList(await getFavorite());
  };
  const arrayBufferToBase64 = buffer => {
    let binary = "";
    let bytes = new Uint8Array(buffer);
    let len = bytes.byteLength;
    for (let i = 0; i < len; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    return btoa(binary);
  };

  const getUser = async () => {
    setUser(await getMe());
  };

  const logout = async () => {
    props.logoutUser()
  }

  if (user) {
    return (
      <View>
        <View
          style={{
            height: 150,
            justifyContent: "flex-end",
            alignItems: "center"
          }}
        >
          <Avatar
            icon={{ name: "user", type: "font-awesome", color: "#fff" }}
            containerStyle={{ backgroundColor: "#CFB48F" }}
            size="large"
            rounded
          />
          <TouchableOpacity onPress={() => logout()} style={{position: 'absolute', right: 20, top: 50}}>
            <AntDesign name="poweroff" size={24} color="red" />
          </TouchableOpacity>
        </View>
        <View>
          <Text style={{ fontSize: 20, textAlign: "center", marginTop: 20 }}>
            Bonjour <Text style={{ fontWeight: "bold" }}>{user.name}</Text>
          </Text>
          {list.length > 0 ? (
            <FlatList
              columnWrapperStyle={{ justifyContent: "center" }}
              numColumns={2}
              data={list}
              keyExtractor={item => item._id}
              ListEmptyComponent={() => (
                <View
                  style={{
                    justifyContent: "center",
                    flex: 1,
                    alignContent: "center"
                  }}
                >
                  <Text>Nous n'avons rien trouvé</Text>
                </View>
              )}
              ListHeaderComponent={() => (
                <Text
                  style={{
                    fontSize: 20,
                    fontWeight: "bold",
                    marginLeft: 25,
                    marginTop: 20
                  }}
                >
                  Vos favoris
                </Text>
              )}
              renderItem={({ item }) => (
                <>
                  <TouchableOpacity
                    onPress={() => {
                      selectCard(item);
                    }}
                    style={[styles.card]}
                  >
                    <Image
                      style={{
                        height: "100%",
                        width: "100%",
                        borderRadius: 10
                      }}
                      source={{
                        uri:
                          "data:image/jpeg;base64," +
                          arrayBufferToBase64(item.img.image.data)
                      }}
                    />
                    <View
                      style={{
                        width: 100,
                        height: 35,
                        position: "absolute",
                        backgroundColor: "#fff",
                        bottom: -15,
                        alignSelf: "center",
                        alignItems: "center",
                        justifyContent: "center",
                        borderRadius: 10,
                        shadowColor: "#000",
                        shadowOffset: {
                          width: 0,
                          height: 1
                        },
                        shadowOpacity: 0.2,
                        shadowRadius: 1.41,

                        elevation: 2
                      }}
                    >
                      <View
                        style={{ flexDirection: "row", alignItems: "center" }}
                      >
                        <AntDesign
                          name="hearto"
                          size={20}
                          color={item.liked ? "red" : "#ccc"}
                          style={{ marginRight: 10 }}
                        />
                        <Text style={{ color: "#ccc" }}>{item.likes}</Text>
                      </View>
                    </View>
                  </TouchableOpacity>
                </>
              )}
            />
          ) : null}
        </View>
      </View>
    );
  }
  return (
    <View>
      <ActivityIndicator size="large" />
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    width: 180,
    height: 250,
    borderRadius: 10,
    marginHorizontal: 5,
    marginVertical: 20
  },
  cardContainer: {
    marginHorizontal: 20,
    paddingTop: 20
  }
});

const mapStateToProps = state => ({
  user: state.user
});

export default connect(mapStateToProps, {logoutUser})(Account);
