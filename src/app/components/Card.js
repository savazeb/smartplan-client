import React from "react";
import { View, Text, StyleSheet } from "react-native";
function Card({ title, tempText, humText, presText }) {
  return (
    <View
      style={{
        marginBottom: "auto",
        margin: 30,
        // padding: 40,
        // paddingVertical: 10,
        paddingHorizontal: 70,
        // borderWidth: 1,
        // borderRadius: 10,
        borderColor: "#DEDEDE",
      }}
    >
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Text
          style={{
            fontSize: 44,
            fontFamily: "Hind_500Medium",
            textAlign: "left",
          }}
        >
          20<Text style={styles.degreeStyle}>o</Text>C
        </Text>
        <View>
          <Text style={[styles.subText, { color: "#DEDEDE", fontSize: 10 }]}>
            HUMIDITY
          </Text>
          <Text style={styles.subText}>10%</Text>
        </View>
      </View>

      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Text
          style={{
            fontSize: 32,
            fontFamily: "Hind_500Medium",
            color: "#157DFC",
          }}
        >
          bonzai
        </Text>
        <View>
          <Text style={[styles.subText, { color: "#DEDEDE", fontSize: 10 }]}>
            PRESSURE
          </Text>
          <Text style={styles.subText}>20hP</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  degreeStyle: {
    color: "#157DFC",
  },
  subText: {
    fontSize: 21,
    fontFamily: "Hind_500Medium",
    textAlign: "right",
    color: "#434343",
  },
});
export default Card;
