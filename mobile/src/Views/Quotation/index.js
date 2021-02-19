import { Feather, MaterialIcons } from "@expo/vector-icons";
import Slider from "@react-native-community/slider";
import * as ImagePicker from "expo-image-picker";
import { btoa } from "js-base64";
import React, { useRef, useState } from "react";
import { ActionSheetIOS, ActivityIndicator, Alert, FlatList, StyleSheet, Text, TouchableHighlight, TouchableOpacity, View } from "react-native";
import { Image } from "react-native-elements";
import BottomSheet from "reanimated-bottom-sheet";
import { getFavorite } from "../../../actions/postActions";

const roomType = ["Salon", "Cuisine", "Chambre", "Bureau"];
const styleType = [
  "Italien",
  "Parisien",
  "Moderne",
  "Contemporain",
  "Ancien",
  "Traditionnel",
  "Bohème"
];
const Quotation = () => {
  const [type, setType] = useState(null);
  const [image, setImage] = useState(null);
  const [style, setStyle] = useState(null);
  const [list, setList] = useState(null);
  const [size, setSize] = useState(null);
  const [photo, setPhoto] = useState(null);
  const [isLoading, setIsLoading] = useState(null)
  const sheetRef = useRef(null);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1
    });
    setImage("photo.jpeg");
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
  const onPress = () =>
    ActionSheetIOS.showActionSheetWithOptions(
      {
        options: ["Salon", "Cuisine", "Chambre", "Bureau"]
      },
      buttonIndex => {
        setType(roomType[buttonIndex]);
      }
    );

  const submitForm = () => {
    setIsLoading(true)
    setType(null)
    setImage(null)
    setStyle(null)
    setSize(null)
    setPhoto(null)
    setTimeout(async() => {
      setIsLoading(await false)
      Alert.alert(
        "Nous avons bien reçu votre demande de devis. Nous revenons vers vous dans les plus brefs délais !"
      );
      sheetRef.current.snapTo(2);
    }, 2000);

  };

  const chooseStyle = () =>
    ActionSheetIOS.showActionSheetWithOptions(
      {
        options: [
          "Italien",
          "Parisien",
          "Moderne",
          "Contemporain",
          "Ancien",
          "Traditionnel",
          "Bohème"
        ]
      },
      buttonIndex => {
        setStyle(styleType[buttonIndex]);
      }
    );

  const openModal = async () => {
    setList(await getFavorite());
    sheetRef.current.snapTo(1);
  };

  const selectImage = () => {
    console.log("Hello Woerld");
  };
if(!isLoading) {
  return (
    <>
      <View style={{ backgroundColor: "#fff", flex: 1 }}>
        <View style={{ height: 120, justifyContent: "flex-end" }}>
          <Text
            style={{
              marginLeft: 20,
              fontSize: 30,
              fontWeight: "bold",
              textAlign: "center",
              color: '#CFB48F'
            }}
          >
            Demande de Devis
          </Text>
        </View>
        <View style={{ marginTop: 20 }}>
          <Text
            style={{
              fontSize: 15,
              fontWeight: "300",
              paddingHorizontal: 70,
              textAlign: "center"
            }}
          >
            Ici vous pouvez faire une demande de devis simplement en quelques
            clicks.
          </Text>
          <Text
            style={{
              fontSize: 15,
              fontWeight: "300",
              paddingHorizontal: 20,
              marginTop: 20,
              textAlign: "center",
              paddingHorizontal: 60
            }}
          >
            Après réception de votre dossier nous nous engageons à trouver un
            professionnel adapté à vos envies, qui vous contactera dans les plus
            brefs delais.
          </Text>
          <View style={{ marginTop: 80, marginHorizontal: 20 }}>
            <TouchableOpacity
              style={{
                backgroundColor: "#CFB48F",
                borderRadius: 10,
                paddingVertical: 10,
                paddingHorizontal: 20,
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between"
              }}
              onPress={onPress}
            >
              <Text>
                Type de pièce{" "}
                <Text style={{ color: "black", fontWeight: "bold" }}>
                  {type}
                </Text>
              </Text>
              <MaterialIcons
                name="keyboard-arrow-right"
                size={30}
                color="black"
              />
            </TouchableOpacity>

            <View style={{ marginLeft: 10 }}>
              <Text style={{ marginTop: 20, fontWeight: "300", fontSize: 15 }}>
                Superficie en m2
              </Text>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Text style={{ marginRight: 20 }}>{size}</Text>
                <Slider
                  style={{ width: 325, height: 40 }}
                  minimumValue={0}
                  maximumValue={100}
                  step={1}
                  minimumTrackTintColor="#CFB48F"
                  maximumTrackTintColor="#ccc"
                  onValueChange={value => setSize(value)}
                />
              </View>
            </View>

            <TouchableOpacity
              style={{
                backgroundColor: "#CFB48F",
                borderRadius: 10,
                paddingVertical: 10,
                paddingHorizontal: 20,
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                marginTop: 20
              }}
              onPress={pickImage}
            >
              <Text>
                Photo de votre pièce{" "}
                <Text style={{ color: "black", fontWeight: "bold" }}>
                  {image}
                </Text>
              </Text>
              <MaterialIcons
                name="keyboard-arrow-right"
                size={30}
                color="black"
              />
            </TouchableOpacity>

            <TouchableOpacity
              style={{
                backgroundColor: "#CFB48F",
                borderRadius: 10,
                paddingVertical: 10,
                paddingHorizontal: 20,
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                marginTop: 20
              }}
              onPress={chooseStyle}
            >
              <Text>
                Style de décoration{" "}
                <Text style={{ color: "black", fontWeight: "bold" }}>
                  {style}
                </Text>
              </Text>
              <MaterialIcons
                name="keyboard-arrow-right"
                size={30}
                color="black"
              />
            </TouchableOpacity>

            <TouchableOpacity
              style={{
                backgroundColor: "#CFB48F",
                borderRadius: 10,
                paddingVertical: 10,
                paddingHorizontal: 20,
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                marginTop: 20
              }}
              onPress={openModal}
            >
              <Text>
                Photo d'inspiration
                <Text style={{ color: "black", fontWeight: "bold" }}>
                  {"  "}
                  {photo}
                </Text>
              </Text>
              <MaterialIcons
                name="keyboard-arrow-right"
                size={30}
                color="black"
              />
            </TouchableOpacity>
          </View>
          <View style={{ alignItems: "center", marginTop: 40 }}>
            <TouchableOpacity
              onPress={() => submitForm()}
              style={{
                backgroundColor: "#CFB48F",
                padding: 15,
                borderRadius: 10,
                flexDirection: "row",
                justifyContent: "space-between"
              }}
            >
              <Feather name="send" size={24} color="black" />
              <Text
                style={{ fontSize: 17, fontWeight: "bold", marginLeft: 10 }}
              >
                ENVOYER
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      {list ? (
        <BottomSheet
          ref={sheetRef}
          snapPoints={[300, 300, 0]}
          borderRadius={10}
          renderContent={() => (
            <View
              style={{
                backgroundColor: "#fff",
                height: 300
              }}
            >
              <FlatList
                horizontal={true}
                data={list}
                keyExtractor={item => item._id}
                renderItem={({ item }) => (
                  <TouchableHighlight
                    onPress={() => {
                      console.log("Hello World");
                      sheetRef.current.snapTo(2);
                      setPhoto(1);
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
                  </TouchableHighlight>
                )}
              />
            </View>
          )}
        />
      ) : null}
    </>
  );
}
return(
  <View style={{flex: 1, justifyContent: 'center'}}>
    <ActivityIndicator size="large" />
  </View>
)
};

const styles = StyleSheet.create({
  card: {
    width: 180,
    height: 250,
    borderRadius: 10,
    marginHorizontal: 5,
    marginVertical: 20,
    backgroundColor: "red"
  },
  cardContainer: {
    marginHorizontal: 20,
    paddingTop: 20
  }
});
export default Quotation;
