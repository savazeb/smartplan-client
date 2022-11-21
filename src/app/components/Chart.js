import React, { useState, useEffect, Component, useContext } from "react";
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
  Dimensions,
  TextInput,
} from "react-native";

import {
  ChartDot,
  ChartPath,
  ChartPathProvider,
  ChartXLabel,
  ChartLabelX,
  ChartYLabel,
  monotoneCubicInterpolation,
  simplifyData,
} from "../rainbow-me/index";
import bSplineInterpolation from "../rainbow-me/interpolations/bSplineInterpolation";
import ChartContext from "../rainbow-me/helpers/ChartContext";

import color from "../config/color";

function Chart({ data1, data2, data3, dataSource }) {
  const [
    smoothingWhileTransitioningEnabled,
    setSmoothingWhileTransitioningEnabled,
  ] = useState(false);
  const [hapticsEnabled, setHapticsEnabled] = useState(false);
  const [data, setData] = useState({ points: data1 });
  const [simplifying, setSimplifying] = useState(false);
  const [pickRange, setPickRange] = useState(10);
  const [includeExtremes, setIncludeExtremes] = useState(true);
  const [interpolationStrategy, setInterpolationStrategy] = useState("b");
  const [numberOfPointsInterpolated, setNumberOfPointsInterpolated] = useState(
    80
  );
  const [bSplineDegree, setBSplineDegree] = useState(3);
  const [smoothingStrategy, setSmoothingStrategy] = useState("none");
  const [smoothingFactor, setSmoothingFactor] = useState(0.05);
  const [hitSlop, setHitSlop] = useState(30);

  useEffect(() => {
    const rawData = (() => {
      switch (dataSource) {
        case 1:
          return data1;
        case 2:
          return data2;
        case 3:
          return data3;
        default:
          return 0;
      }
    })();
    const simplifiedData = simplifying
      ? simplifyData(rawData, pickRange, includeExtremes)
      : rawData;
    const intepolatedData = (() => {
      // eslint-disable-next-line default-case
      switch (interpolationStrategy) {
        case "none":
          return simplifiedData;
        case "b":
          return bSplineInterpolation({
            data: simplifiedData,
            degree: bSplineDegree,
            range: numberOfPointsInterpolated,
          });
        case "mono":
          return monotoneCubicInterpolation({
            data: simplifiedData,
            range: numberOfPointsInterpolated,
          });
      }
    })();
    const data = {
      points: intepolatedData,
      smoothingFactor: smoothingStrategy === "none" ? 0 : smoothingFactor,
      smoothingStrategy,
    };
    setData(data);
  }, [
    bSplineDegree,
    dataSource,
    includeExtremes,
    interpolationStrategy,
    numberOfPointsInterpolated,
    pickRange,
    simplifying,
    smoothingFactor,
    smoothingStrategy,
    data1,
    data2,
    data3,
  ]);

  const { width: SIZE } = Dimensions.get("window");

  const formatUSD = (value) => {
    "worklet";
    if (value === "") {
      return "";
    }
    return value;
  };

  const formatDatetime = (value) => {
    "worklet";
    if (value === "") {
      return "";
    }
    var months = [
      "01",
      "02",
      "03",
      "04",
      "05",
      "06",
      "07",
      "08",
      "09",
      "10",
      "11",
      "12",
    ];
    const date = new Date(Number(value * 1000));
    const s = date.getSeconds();
    const m = date.getMinutes();
    const h = date.getHours();
    const d = date.getDate();
    const n = date.getMonth();
    const y = date.getFullYear();
    var namedMonth = months[n];
    return `${y}/${namedMonth}/${d} ${h}:${m}:${s}`;
  };
  return (
    <View
      style={{
        backgroundColor: "white",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <ChartPathProvider data={data}>
        <ChartPath
          hapticsEnabled={hapticsEnabled}
          hitSlop={hitSlop}
          smoothingWhileTransitioningEnabled={
            smoothingWhileTransitioningEnabled
          }
          fill="none"
          height={SIZE / 1.5}
          stroke={color.forth}
          strokeWidth="3"
          width={SIZE}
          selectedStrokeWidth={3}
        />
        <ChartDot
          style={{
            backgroundColor: color.forth,
          }}
        />
        <View
          style={{
            borderRadius: 10,
            padding: 5,
            flexDirection: "row",
            width: SIZE - 120,
            justifyContent: "center",
            alignItems: "center",
            marginBottom: -20,
            marginTop: -11,
          }}
        >
          <View
            style={{
              flexDirection: "column",
              width: "70%",
              borderBottomWidth: 1,
              borderColor: "#F7F5F5",
            }}
          >
            <Text
              style={{
                alignSelf: "flex-start",
                marginTop: 20,
                fontFamily: "Hind_500Medium",
                color: color.forth,
              }}
            >
              Date & Time
            </Text>
            <View>
              <ChartLabelX format={formatDatetime} style={styles.statusTime} />
            </View>
          </View>
          <View
            style={{
              flexDirection: "column",
              width: "30%",
              borderBottomWidth: 1,
              borderColor: "#F7F5F5",
            }}
          >
            <Text
              style={{
                alignSelf: "flex-start",
                marginTop: 20,
                fontFamily: "Hind_500Medium",
                color: color.forth,
              }}
            >
              {dataSource === 1 && "Data(\u00B0C)"}
              {dataSource === 2 && "Data(%)"}
              {dataSource === 3 && "Data(hPa)"}
            </Text>
            <View>
              <ChartYLabel format={formatUSD} style={styles.statusTime} />
            </View>
          </View>
        </View>
      </ChartPathProvider>
    </View>
  );
}
const styles = StyleSheet.create({
  statusTime: {
    fontFamily: "Hind_400Regular",
    fontSize: 20,
    fontStyle: "italic",
  },
});

export default Chart;
