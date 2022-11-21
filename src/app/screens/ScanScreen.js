import React, { useState, useEffect, useCallback } from "react";
import { View, StyleSheet, Text } from "react-native";
import Modal from "react-native-modal";
import { BarCodeScanner } from "expo-barcode-scanner";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { CommonActions } from "@react-navigation/native";
import Focus from "../assets/images/Focus";
import NamingModal from "./NamingModal";
import color from "../config/color";

function ScanScreen({ navigation }) {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [checkKey, setCheckKey] = useState(false);
  const [data, setData] = useState([]);
  const [token, setToken] = useState(false);
  const [scannedKey, setScannedKey] = useState(null);

  const [isModalVisible, setModalVisible] = useState(false);

  const callback = useCallback((state) => {
    setModalVisible(state);
    if (state === false) {
      setScanned(false);
      setCheckKey(false);
      setToken(false);
    }
  }, []);

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      setScanned(false);
      setCheckKey(false);
      setToken(false);
    });

    return unsubscribe;
  }, [navigation]);

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  const findData = (APIkey) => {
    if (data) {
      var xdata = data.filter((x) => x.APIkey === APIkey);
      return xdata;
    }
    return 0;
  };

  const checkAPIkey = async (APIkey) => {
    await axios
      .get(
        `https://us-central1-smartplant-88b76.cloudfunctions.net/sensorData?id=${APIkey}&category=temperature`
      )
      .then((res) => {
        setCheckKey(true);
      })
      .catch((err) => {
        setCheckKey(false);
      });
  };

  const retrieveData = async () => {
    try {
      const value = await AsyncStorage.getItem("@DataBase");
      setData(JSON.parse(value));
      console.log(value);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    retrieveData();
  }, [navigation]);

  const handleBarCodeScanned = ({ type, data }) => {
    // alert(`Bar code with type ${type} and data ${data} has been scanned!`);

    const APIkey = data.split("?")[1];

    setScannedKey(APIkey);
    if (APIkey !== "" || APIkey !== null) {
      checkAPIkey(APIkey);
      if (checkKey) {
        setScanned(true);
        const rdata = findData(APIkey);
        console.log("scan", rdata);
        if (rdata.length <= 0 || rdata <= 0) {
          // navigation.navigate("Input", { APIkey: APIkey });
          setModalVisible(!isModalVisible);
        } else {
          navigation.dispatch(
            CommonActions.reset({
              index: 0,
              routes: [
                {
                  name: "View",
                  params: {
                    APIkey: APIkey,
                    displayName: `${rdata[0].title}`,
                  },
                },
              ],
            })
          );
        }
      }
      //   .then((rdata) => {
      //     if (rdata.length > 0) {
      //       // navigation.navigate("Input", { APIkey: APIkey });
      //       alert("yes");
      //     } else {
      //       alert("no");
      //     }
      //   });
      // }

      // try {
      //   goData = findData(APIkey);
      // } catch (err) {
      // } finally {
      //   // navigation.dispatch(
      //   //   CommonActions.reset({
      //   //     index: 0,
      //   //     routes: [
      //   //       {
      //   //         name: "View",
      //   //         params: { APIkey: APIkey, displayName: goData.title },
      //   //       },
      //   //     ],
      //   //   })
      //   // );
      //   alert(goData.title);
      // }
    }

    // if (data.split("?")[1] === "chinko") {
    //   const APIkey = data.split("?")[1];
    //   setScanned(true);
    //   navigation.navigate("Input", { APIkey: APIkey });
    // }
  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }
  function renderScanFocus() {
    return (
      <View
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Focus size={0.8} />
        <View
          style={{
            position: "absolute",
            top: "15%",
            width: "43%",
            height: 50,
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: color.forth,
            borderRadius: 10,
          }}
          opacity={0.5}
        >
          <Text style={{ color: "white", fontSize: 13 }}>SCAN QR CODE</Text>
        </View>
      </View>
    );
  }

  return (
    <View style={{ flex: 1 }}>
      <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={StyleSheet.absoluteFillObject}
      />
      {renderScanFocus()}
      <Modal isVisible={isModalVisible} animationIn="bounceIn">
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <NamingModal
            parentCallback={callback}
            APIkey={scannedKey}
            data={data}
            navigation={navigation}
          />
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "blue",
  },
});
export default ScanScreen;
