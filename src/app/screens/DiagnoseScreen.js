import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  ActivityIndicator,
  Platform,
  Button,
} from "react-native";
import Constants from "expo-constants";

import axios from "axios";

import Screen from "../components/Screen";

import Good from "../assets/images/Good";
import Med from "../assets/images/Med";
import Bad from "../assets/images/Bad";

import color from "../config/color";

function DiagnoseScreen({ navigation, route }) {
  const [statusData, setStatusData] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const { APIkey } = route.params;
  const fetchCoraStatus = async (APIkey) => {
    const response = await axios
      .get(
        `https://us-central1-smartplant-88b76.cloudfunctions.net/getState?id=${APIkey}`
      )
      .catch((err) => {
        console.error(err);
      });

    if (response && response.data) setStatusData(response.data);
    console.log(statusData);
  };

  useEffect(() => {
    fetchCoraStatus(APIkey);
  }, []);

  useEffect(() => {
    const noData = !statusData || (statusData && statusData.length === 0);
    setLoading(noData);
  }, [statusData]);

  const ErrorScreen = () => {
    return (
      <View>
        <Text>Oh No!</Text>
        <Text>No internet found. Check your connection</Text>
      </View>
    );
  };

  const ResultScreen = () => {
    return (
      <View style={styles.status}>
        {statusData.st === 1 && <Good size={0.3} />}
        {statusData.st === 0 && <Med size={0.3} />}
        {statusData.st === -1 && <Bad size={0.3} />}
        <View style={styles.separator}>
          <Text style={styles.statusTextTitle}>
            {statusData.title.toUpperCase()}
          </Text>
        </View>
        <Text style={styles.statusText}>{statusData.water_status}</Text>
        <Text style={styles.statusText}>{statusData.light_status}</Text>
        <Text style={styles.statusText}>{statusData.text}</Text>
        {/* <Button onPress={() => navigation.goBack()} title="Dismiss" /> */}
      </View>
    );
  };

  return (
    <Screen style={styles.container}>
      {Platform.OS === "ios" && (
        <View
          style={{
            backgroundColor: color.forth,
            width: "13%",
            height: 5,
            borderRadius: 10,
            position: "absolute",
            top: "2%",
            marginTop: Constants.statusBarHeight,
          }}
        />
      )}
      {isLoading && (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <ActivityIndicator size="large" color="grey" />
        </View>
      )}
      {!isLoading && ResultScreen()}
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
  separator: {
    borderBottomWidth: 1,
    borderBottomColor: "white",
    marginBottom: 10,
  },
  status: {
    alignItems: "center",
  },
  statusTextTitle: {
    fontFamily: "Hind_600SemiBold",
    fontSize: 24,
    marginTop: 20,
    color: color.secondary,
  },
  statusText: {
    fontFamily: "Hind_400Regular",
    fontSize: 20,
    color: "black",
  },
});
export default DiagnoseScreen;
