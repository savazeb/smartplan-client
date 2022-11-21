import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Cora from "../assets/Icons/Cora";
import Screen from "../components/Screen";
import color from "../config/color";

function SplashScreen(props) {
  return (
    <Screen style={styles.container}>
      <Cora color="white" size={3} />
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: color.primary,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default SplashScreen;
