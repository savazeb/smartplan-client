import React, { useState } from "react";
import { View, Text, StyleSheet, Button } from "react-native";

import color from "../config/color";

import Good from "../assets/images/Good";
import Med from "../assets/images/Med";
import Bad from "../assets/images/Bad";

function HealthCheckModal({ parentCallback, statusData }) {
  //   alert(statusData);

  const [status, setStatus] = useState(statusData.st);

  const colorPicker = (() => {
    switch (status) {
      case 1:
        return color.primary;
      case 0:
        return "tomato";
      case -1:
        return "red";
      default:
        return color.primary;
    }
  })();

  return (
    <View
      style={{
        // flex: 1,
        backgroundColor: "white",
        height: "50%",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 10,
      }}
    >
      {statusData.st === 1 && <Good size={0.2} />}
      {statusData.st === 0 && <Med size={0.2} />}
      {statusData.st === -1 && <Bad size={0.12} />}
      <View style={styles.separator}>
        <Text style={styles.statusTextTitle}>
          {statusData.title.toUpperCase()}
        </Text>
      </View>
      <Text style={styles.statusText}>{statusData.water_status}</Text>
      <Text style={styles.statusText}>{statusData.light_status}</Text>
      <View
        style={{
          marginTop: 20,
          backgroundColor: colorPicker,
          width: "70%",
          height: "13%",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text style={styles.warningText}>{statusData.text.toUpperCase()}</Text>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  separator: {
    borderBottomWidth: 1,
    borderBottomColor: "white",
    marginBottom: 8,
  },
  status: {
    alignItems: "center",
  },
  statusTextTitle: {
    fontFamily: "Hind_600SemiBold",
    fontSize: 20,
    marginTop: 20,
    color: color.secondary,
  },
  statusText: {
    fontFamily: "Hind_400Regular",
    fontSize: 16,
    color: "black",
  },
  warningText: {
    fontFamily: "Hind_400Regular",
    fontSize: 18,
    color: "white",
  },
});
export default HealthCheckModal;
