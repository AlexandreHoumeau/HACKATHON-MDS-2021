import { btoa } from "js-base64";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Linking,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput
} from "react-native";
import { Image } from "react-native-elements";

import { connect } from "react-redux";
import BottomSheet from "reanimated-bottom-sheet";
import {
  getList,
  searchByKeyword,
  likePost
} from "../../../actions/postActions";
import { AntDesign } from "@expo/vector-icons";
const furnitures = [
  {
    link:
      "https://www.ikea.com/fr/fr/p/friheten-canape-convertible-angle-rangement-skiftebo-gris-fonce-s39216754/?cid=fr%7cps%7cgo%7c--&gclid=CjwKCAiAmrOBBhA0EiwArn3mfLCUE1WfUsQy2ATb-wMAFG60wx1bBgj39VBO5XbGgdQalnIsKHXbkBoCI4kQAvD_BwE&gclsrc=aw.ds",
    photo:
      "https://www.cdiscount.com/pdt2/b/e/p/1/700x700/luxi3pcvbep/rw/luxi-canape-droit-convertible-3-places-tissu-ble.jpg",
    title: "Canapé"
  },
  {
    link:
      "https://www.ikea.com/fr/fr/p/loevbacken-table-basse-brun-moyen-70282794/",
    photo:
      "https://www.ikea.com/fr/fr/images/products/loevbacken-table-basse-brun-moyen__0277780_PE417127_S5.JPG?f=xl",
    title: "Table basse"
  },
  {
    link:
      "https://www.ikea.com/fr/fr/p/lindelse-tapis-poils-hauts-ecru-beige-10390857/",
    photo:
      "https://www.ikea.com/fr/fr/images/products/lindelse-tapis-poils-hauts-ecru-beige__0555107_PE660140_S5.JPG?f=g",
    title: "Tapis"
  }
];

const Home = props => {
  const [list, setList] = useState(null);
  const [keyword, setKeyword] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isSearching, setSearching] = useState(false);
  const sheetRef = React.useRef(null);
  const [selectedItem, setSelectedItem] = useState(null);
  useEffect(() => {
    getList();
    return setList(null);
  }, []);

  const getList = async () => {
    setList(await props.getList());
    setIsLoading(false);
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

  const selectCard = async item => {
    await setSelectedItem(item);
    sheetRef.current.snapTo(1);
  };

  const submitKeyword = async () => {
    const data = {
      keyword: keyword.toLowerCase()
    }
    setSearching(true);
    setList(await props.searchByKeyword(data));
    setSearching(false);
  };

  const likePost = async post => {
    const array = [...list];
    const index = array.findIndex(element => element._id == post._id);
    array[index].liked = !post.liked;
    array[index].likes = array[index].liked
      ? array[index].likes + 1
      : array[index].likes - 1;
    setList(await array);
    const data = {
      postId: post._id
    };
    props.likePost(data);
  };

  if (!isLoading) {
    return (
      <>
        <View style={{ flex: 1, backgroundColor: "#fff" }}>
          <View
            style={{
              backgroundColor: "#fff",
              height: 170,
              justifyContent: "flex-end"
            }}
          >
            <View style={{ marginHorizontal: 20, marginBottom: 10 }}>
              <View style={{alignItems: 'center'}}>
                <Image
                  style={{
                    width: 120,
                    height: 70,
                    marginTop: 30,
                    resizeMode: "contain"
                  }}
                  source={require("../../../assets/logo_medium.png")}
                />
              </View>
              <TextInput
                style={{
                  padding: 15,
                  borderRadius: 10,
                  backgroundColor: '#E5E5E5'
                }}
                keyboardType="web-search"
                value={keyword}
                onChangeText={value => setKeyword(value)}
                onSubmitEditing={() => submitKeyword()}
                placeholder="Recherchez des types de décorations ..."
              />
            </View>
          </View>
          {list && !isSearching ? (
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
                  Scrollez à travers notre sélection.
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
          ) : (
            <View style={{ flex: 1, justifyContent: "center" }}>
              <ActivityIndicator size="large" />
            </View>
          )}
        </View>
        {selectedItem ? (
          <BottomSheet
            ref={sheetRef}
            snapPoints={[700, 300, 0]}
            borderRadius={10}
            renderContent={() => (
              <View
                style={{
                  backgroundColor: "#F3F3F3",
                  height: 700
                }}
              >
                <Image
                  style={{
                    height: 250,
                    width: "100%",
                  }}
                  source={{
                    uri:
                      "data:image/jpeg;base64," +
                      arrayBufferToBase64(selectedItem.img.image.data)
                  }}
                />
                <View style={{ padding: 16 }}>
                  <View
                    style={{ flexDirection: "row", alignItems: "flex-start" }}
                  >
                    <Text
                      style={{
                        fontSize: 20,
                        fontWeight: "bold",
                        marginBottom: 10,
                        marginRight: 10
                      }}
                    >
                      {selectedItem.created_by.name}
                    </Text>
                    <TouchableOpacity onPress={() => likePost(selectedItem)}>
                      <AntDesign
                        name="hearto"
                        size={20}
                        color={selectedItem.liked ? "red" : "#ccc"}
                        style={{ marginTop: 3 }}
                      />
                    </TouchableOpacity>
                  </View>
                  <Text
                    style={{
                      fontSize: 15,
                      fontWeight: "300",
                      marginBottom: 10
                    }}
                  >
                    {selectedItem.title}
                  </Text>
                  <View>
                    <Text
                      style={{
                        color: "#669BBC",
                        fontWeight: "bold"
                      }}
                    >
                      {selectedItem.style}
                    </Text>
                  </View>
                  <Text
                    style={{
                      fontSize: 14,
                      fontWeight: "300",
                      marginBottom: 10
                    }}
                  >
                    {selectedItem.content}
                  </Text>

                  <ScrollView style={{ marginTop: 20 }} horizontal={true}>
                    {furnitures.map(element => (
                      <TouchableOpacity
                        key={element.link}
                        onPress={() => Linking.openURL(element.link)}
                        style={{
                          borderWidth: 1,
                          // borderColor: "#ccc",
                          borderRadius: 10,
                          padding: 10,
                          margin: 5,
                          backgroundColor: '#fff'
                        }}
                      >
                        <Image
                          style={{ width: 200, height: 120 }}
                          source={{
                            uri: element.photo
                          }}
                        />
                        <Text
                          style={{
                            fontSize: 15,
                            fontWeight: "200",
                            textAlign: "center"
                          }}
                        >
                          {element.title}
                        </Text>
                      </TouchableOpacity>
                    ))}
                  </ScrollView>
                </View>
              </View>
            )}
          />
        ) : null}
      </>
    );
  }
  return (
    <View style={{ flex: 1, justifyContent: "center" }}>
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
export default connect(mapStateToProps, { getList, searchByKeyword, likePost })(
  Home
);
