import React from "react";
import { StyleSheet, View, Text, LogBox } from "react-native";
import AppIntroSlider from "react-native-app-intro-slider";
import { AntDesign } from "@expo/vector-icons";
import { StackActions } from "@react-navigation/native";
import { CommonActions } from "@react-navigation/native";
import { Header } from "react-native-elements";

import Screen from "../components/Screen";
import Monitor from "../assets/images/Monitor";
import Track from "../assets/images/Track";
import Analyze from "../assets/images/Analyze";

import colors from "../config/color";
import color from "../config/color";
import Cora from "../assets/Icons/Cora";

const slides = [
  {
    key: "1",
    title: "MONITOR",
    text: "アプリで簡単に植物の状態を確認できます。",
    // image: require("../assets/images/Monitor.png"),
    image: <Monitor size={0.3} />,
    backgroundColor: "#59b2ab",
  },
  {
    key: "2",
    title: "TRACK",
    text: "植物の成長をデータ化して見守ることができます。",
    // image: require("../assets/images/Track.png"),
    image: <Track size={0.37} />,
    backgroundColor: "#febe29",
  },
  {
    key: "3",
    title: "ANALYZE",
    text: "取得したデータを元に植物のコンディションを分析します。",
    // image: require("../assets/images/Analyze.png"),
    image: <Analyze size={0.3} />,
    backgroundColor: "#22bcb5",
  },
];

function OnBoardScreen({ navigation }) {
  LogBox.ignoreLogs(["Warning: ..."]); // Ignore log notification by message
  LogBox.ignoreAllLogs(); //Ignore all log notifications
  const renderItem = ({ item }) => {
    return (
      <View style={{ flex: 1, alignItems: "center", marginTop: "20%" }}>
        <View
          style={{
            width: 220,
            height: 220,
            borderTopLeftRadius: item.key === "1" ? 200 : 200,
            borderBottomLeftRadius: item.key === "1" ? 200 : 200,
            borderTopRightRadius: item.key === "3" ? 200 : 200,
            borderBottomRightRadius: item.key === "3" ? 200 : 200,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "#F8F8F8",
            marginBottom: "10%",
          }}
        >
          {item.image}
        </View>

        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.text}>{item.text}</Text>
      </View>
    );
  };

  const renderNextButton = () => {
    return (
      <View style={styles.buttonCircle}>
        <AntDesign name="rightcircle" size={30} color={color.primary} />
      </View>
    );
  };

  const renderDoneButton = () => {
    return (
      <View style={styles.buttonCircle}>
        <AntDesign name="checkcircle" size={30} color={color.primary} />
      </View>
    );
  };

  const onDoneButton = () => {
    navigation.navigate("Scan");
  };

  return (
    <Screen style={styles.container}>
      <Header
        centerComponent={
          <View>
            <Cora size={2} />
          </View>
        }
        containerStyle={{
          // marginHorizontal: 30,
          backgroundColor: "white",
        }}
      />
      <AppIntroSlider
        activeDotStyle={{
          // width: 10,
          backgroundColor: color.primary,
        }}
        renderItem={renderItem}
        data={slides}
        renderDoneButton={renderDoneButton}
        renderNextButton={renderNextButton}
        onDone={onDoneButton}
        dotStyle={{ backgroundColor: "#F2F1F6" }}
      />
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    // justifyContent: "center",
    // alignItems: "center",
  },
  image: {
    // resizeMode: "cover",

    height: "100%",
    width: "100%",
  },
  title: {
    fontSize: 28,
    marginTop: 30,
    // padding: 0,
    fontFamily: "Hind_600SemiBold",
    color: color.secondary,
  },
  text: {
    fontFamily: "Hind_500Medium",
    fontSize: 18,
    textAlign: "center",
    color: "#707070",
    width: 200,
  },
  buttonCircle: {
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    top: 5,
    marginRight: 10,
  },
});

export default OnBoardScreen;
