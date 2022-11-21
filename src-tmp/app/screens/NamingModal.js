import React, { useState } from "react";
import { Touchable } from "react-native";
import {
  View,
  StyleSheet,
  Button,
  TextInput,
  Text,
  TouchableOpacity,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { CommonActions } from "@react-navigation/native";

import color from "../config/color";

function NamingModal({ APIkey, parentCallback, data, navigation }) {
  const [isModalVisible, setModalVisible] = useState(false);

  const [text, setText] = useState("");

  const storeData = async (value) => {
    try {
      await AsyncStorage.setItem("@DataBase", JSON.stringify(value));
    } catch (e) {
      // saving error
    }
  };

  const handleInput = (inputText) => {
    setText(inputText);
  };

  const incrementData = () => {
    let max = 0;
    if (data) {
      data.forEach((data) => {
        if (data.id > max) {
          max = data.id;
        }
      });
      let increment = parseInt(max) + 1;
      return increment;
    }
    return parseInt(max) + 1;
  };
  const handleButton = () => {
    // alert(`${APIkey} ${data}`);
    var testdata = [
      {
        id: `${incrementData()}`,
        APIkey: APIkey,
        title: text.toUpperCase(),
      },
    ];
    if (text !== "") {
      var DataPush = data;
      try {
        // setNewData([...data, testdata]);
        // DataPush.push(JSON.parse(JSON.stringify(testdata)));

        DataPush = data.concat(testdata);
      } catch (err) {
        console.log(err);
        storeData(testdata);
      } finally {
        // alert(JSON.stringify(DataPush));
        if (data !== null) {
          storeData(DataPush);
        } else {
          storeData(testdata);
        }
      }
      // var countries = AsyncStorage.getItem("@DataBase");
      // countries = JSON.parse(countries);
      // countries.push(testdata);
      // AsyncStorage.setItem("@DataBase", JSON.stringify(countries));
      // dataN.push(newData.length !== 0);
      // if (newData.length !== 0) alert(JSON.stringify(newData));
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [
            {
              name: "View",
              params: {
                APIkey: APIkey,
                displayName: text.toUpperCase(),
              },
            },
          ],
        })
      );
    }
  };
  return (
    <View
      style={{
        // flex: 1,
        backgroundColor: "white",
        height: "20%",
        width: "80%",
        justifyContent: "space-between",
        alignItems: "center",
        borderRadius: 0,
      }}
    >
      <Text
        style={{
          fontSize: 20,
          marginTop: 13,
          fontFamily: "Hind_600SemiBold",
        }}
      >
        PLANT NAME
      </Text>
      <View style={{ position: "absolute", flexWrap: "wrap", top: "42%" }}>
        <TextInput
          maxLength={8}
          autoCapitalize="none"
          autoCorrect={false}
          defaultValue={text}
          onChangeText={(input) => handleInput(input)}
          placeholder="< 8 character"
          style={styles.TextInput}
          selectionColor={color.primary}
        />
      </View>

      <View
        style={{
          //   justifyContent: "space-between",
          //   alignItems: "baseline",
          flexDirection: "row",
          width: "100%",
        }}
      >
        <TouchableOpacity
          style={styles.buttonContainer}
          onPress={() => {
            parentCallback(isModalVisible);
          }}
        >
          <Text style={{ color: "white", fontWeight: "bold" }}>BACK</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttonContainer} onPress={handleButton}>
          <Text style={{ color: "white" }}>NEXT</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    justifyContent: "center",
    alignItems: "center",
    // backgroundColor: "red",
    width: "50%",
    height: 30,
    backgroundColor: color.primary,
  },
  TextInput: {
    width: "100%",
    fontSize: 17,
    color: color.secondary,
  },
});
export default NamingModal;
