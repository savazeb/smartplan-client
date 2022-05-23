import React, { useEffect, useState } from "react";
import { StyleSheet, Platform } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { NavigationContainer } from "@react-navigation/native";
import {
  createStackNavigator,
  CardStyleInterpolators,
} from "@react-navigation/stack";

import * as Font from "expo-font";
import {
  Hind_300Light,
  Hind_400Regular,
  Hind_500Medium,
  Hind_600SemiBold,
  Hind_700Bold,
} from "@expo-google-fonts/hind";

import HomeScreen from "./app/screens/HomeScreen";
import ViewScreen from "./app/screens/ViewScreen";
import SplashScreen from "./app/screens/SplashScreen";
import DiagnoseScreen from "./app/screens/DiagnoseScreen";
import ScanScreen from "./app/screens/ScanScreen";
import NamingScreen from "./app/screens/NamingScreen";
import OnBoardScreen from "./app/screens/OnBoardScreen";

const DATA = [
  {
    id: "1",
    APIkey: "209LmsQaRmAB12CD",
    title: "ドラセナ",
  },
  {
    id: "2",
    APIkey: "88pKWBEFMIIJ56KL",
    title: "パキラ",
  },
  {
    id: "3",
    APIkey: "88pKWBEFMIIJ56KL",
    title: "サンスベリア",
  },
  {
    id: "4",
    APIkey: "209LmsQaRmAB12CD",
    title: "ガジュマル",
  },
  {
    id: "5",
    APIkey: "88pKWBEFMIIJ56KL",
    title: "オリーブ",
  },
  {
    id: "6",
    APIkey: "209LmsQaRmAB12CD",
    title: "モンステラ",
  },
  {
    id: "7",
    APIkey: "88pKWBEFMIIJ56KL",
    title: "オーガスタ",
  },
];

// const DATA = [];

export default function App() {
  const MainStack = createStackNavigator();
  const RootStack = createStackNavigator();
  const [fontLoaded, setFontLoaded] = useState(false);
  const [token, setToken] = useState(false);
  const [timer, setTimer] = useState(3);
  const [dataLoaded, setDataLoaded] = useState(false);
  const [dataSet, setDataSet] = useState(false);
  const loadFont = async () => {
    await Font.loadAsync({
      Smooth_Circulars: require("./app/assets/fonts/Smooth_Circulars.otf"),
      Futura_Bold: require("./app/assets/fonts/Futura_Bold.ttf"),
      Hind_300Light,
      Hind_400Regular,
      Hind_500Medium,
      Hind_600SemiBold,
      Hind_700Bold,
    });

    setFontLoaded(true);
  };

  const storeData = async (value) => {
    try {
      await AsyncStorage.setItem("@DataBase", JSON.stringify(value));
    } catch (e) {
      // saving error
    } finally {
      retrieveData();
    }
  };

  const retrieveData = async () => {
    try {
      const value = await AsyncStorage.getItem("@DataBase");
      if (value.length !== 0) {
        setToken(true);
        console.log("start", value.length);
        // alert(value);
      }
    } catch (err) {
      console.log(err);
      setToken(false);
    } finally {
      setDataLoaded(true);
    }
  };

  const startTimer = () => {
    let timeChange;
    //The key is to replace time in state with time for calculation and judgment, because time in state is constantly refreshed in render, but it will not be refreshed in the method
    let time = timer;
    const clock = () => {
      if (time > 0) {
        //The update method is executed when time>0
        time = time - 1;
        setTimer(time);
      } else {
        //When time=0, execute the end loop method
        clearInterval(timeChange);
      }
    };
    //The clock method is executed every second
    timeChange = setInterval(clock, 1000);
  };

  const clearAsyncStorage = async () => {
    AsyncStorage.clear();
  };
  useEffect(() => {
    loadFont();
    storeData(DATA);
    // retrieveData();
    // clearAsyncStorage();
    startTimer();
  }, []);

  function MainStackScreen() {
    return (
      <MainStack.Navigator
        initialRouteName={!token ? "OnBoard" : "Home"}
        // initialRouteName="Home"
        screenOptions={{
          // headerMode: "screen",
          headerShown: false,
          cardStyleInterpolator:
            Platform.OS === "ios"
              ? CardStyleInterpolators.forHorizontalIOS
              : CardStyleInterpolators.forNoAnimation,
        }}
      >
        <MainStack.Screen name="Input" component={NamingScreen} />
        <MainStack.Screen
          name="Home"
          component={HomeScreen}
          options={{
            animationEnabled: false,
          }}
        />
        <MainStack.Screen name="Scan" component={ScanScreen} />
        <MainStack.Screen name="ScanIcon" component={ScanScreen} />
        {/* <MainStack.Screen name="Diagnose" component={DiagnoseScreen} /> */}
        <MainStack.Screen name="OnBoard" component={OnBoardScreen} />
        <MainStack.Screen name="View" component={ViewScreen} />
      </MainStack.Navigator>
    );
  }

  if (fontLoaded && dataLoaded && timer <= 0) {
    return (
      <NavigationContainer>
        <RootStack.Navigator mode="modal" headerMode="none">
          <RootStack.Screen name="Main" component={MainStackScreen} />
          <RootStack.Screen name="Diagnose" component={DiagnoseScreen} />
        </RootStack.Navigator>
      </NavigationContainer>
    );
  } else return <SplashScreen />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
