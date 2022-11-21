import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AntDesign } from "@expo/vector-icons";
import { StackActions } from "@react-navigation/native";
import { CommonActions } from "@react-navigation/native";

import Screen from "../components/Screen";

function NamingScreen({ navigation, route }) {
  const { APIkey } = route.params;

  const [text, setText] = useState("");

  const [data, setData] = useState([]);
  const [newData, setNewData] = useState([]);
  const retrieveData = async () => {
    try {
      const value = await AsyncStorage.getItem("@DataBase");
      setData(JSON.parse(value));
    } catch (err) {
      console.log(err);
      setData([0]);
    }
  };

  const storeData = async (value) => {
    try {
      await AsyncStorage.setItem("@DataBase", JSON.stringify(value));
    } catch (e) {
      // saving error
    }
  };

  useEffect(() => {
    retrieveData();
  }, [navigation, route]);

  const handleInput = (inputText) => {
    setText(inputText);
  };

  const incrementData = () => {
    let max = 0;
    data.forEach((data) => {
      if (data.id > max) {
        max = data.id;
      }
    });
    let increment = parseInt(max) + 1;
    return increment;
  };
  const handleButton = () => {
    var testdata = [
      {
        id: `${incrementData()}`,
        APIkey: APIkey,
        title: text.toUpperCase(),
      },
    ];
    if (text !== "")
      Alert.alert(
        "DISPLAY NAME",
        text,
        [
          {
            text: "No",
            onPress: () => Alert.alert("No Pressed"),
            style: "cancel",
          },
          {
            text: "Yes",
            onPress: () => {
              var DataPush = data;
              try {
                // setNewData([...data, testdata]);
                // DataPush.push(JSON.parse(JSON.stringify(testdata)));
                DataPush = data.concat(testdata);
              } catch (err) {
                console.log(err);
              } finally {
                // alert(JSON.stringify(DataPush));
                storeData(DataPush);
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
            },
          },
        ],
        {
          cancelable: true,
          onDismiss: () =>
            Alert.alert(
              "This alert was dismissed by tapping outside of the alert dialog."
            ),
        }
      );
  };

  return (
    <Screen style={styles.container}>
      <Text style={styles.title}>Set Plant Name</Text>
      <View style={styles.textInputSeparator}>
        <TextInput
          maxLength={8}
          autoCapitalize="none"
          autoCorrect={false}
          defaultValue={text}
          onChangeText={(input) => handleInput(input)}
          placeholder="max 8 character"
          style={styles.TextInput}
          selectionColor="blue"
        />
      </View>
      <TouchableOpacity style={styles.buttonContainer} onPress={handleButton}>
        <AntDesign name="rightcircle" size={26} color="blue" />
      </TouchableOpacity>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontFamily: "Hind_500Medium",
    fontSize: 35,
    // alignSelf: "flex-start",
    // marginLeft: 40,
  },
  buttonContainer: {
    // backgroundColor: "blue",
    marginTop: 20,
    alignSelf: "flex-end",
    width: 30,
    height: 30,
    borderRadius: 10,
    marginRight: 60,
    justifyContent: "center",
    alignItems: "center",
  },
  TextInput: {
    height: 40,
    paddingLeft: 6,
  },
  textInputSeparator: {
    borderBottomColor: "blue",
    borderBottomWidth: 2,
    width: "80%",
  },
});
export default NamingScreen;
