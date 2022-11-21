import React, { useState, useEffect, useRef } from "react";
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
  ActivityIndicator,
  ScrollView,
  Dimensions,
  TextInput,
  TouchableWithoutFeedback,
  // Modal,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import Modal from "react-native-modal";
import { StackActions } from "@react-navigation/native";
import { Header } from "react-native-elements";
import axios from "axios";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
// import { data1, data2, data3 } from "../data/data";

import Screen from "../components/Screen";
import Chart from "../components/Chart";

import color from "../config/color";
import { TouchableOpacityBase } from "react-native";
import { Button } from "react-native";
import HealthCheckModal from "../screens/HealthCheckModal";
const deviceWidth = Dimensions.get("window").width;
const deviceHeight = Dimensions.get("window").height;

function ViewScreen({ navigation, route }) {
  let isMounted = useRef(false);
  const [isLoadingModal, setLoadingModal] = useState(true);
  const [dataSource, setDataSource] = useState(1);
  const [tempData, setTempData] = useState([]);
  const [humData, setHumData] = useState([]);
  const [presData, setPresData] = useState([]);
  const [isLoading1, setLoading1] = useState(true);
  const [isLoading2, setLoading2] = useState(true);
  const [isLoading3, setLoading3] = useState(true);
  const [error, setError] = useState(null);

  const [statusData, setStatusData] = useState([]);

  const [nowTemp, setNowTemp] = useState([]);
  const [nowHum, setNowHum] = useState([]);
  const [nowPres, setNowPres] = useState([]);

  const [isModalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      setTempData([]);
      setHumData([]);
      setPresData([]);
      setLoading1(true);
      setLoading2(true);
      setLoading3(true);
    });

    return unsubscribe;
  }, [navigation]);

  const toggleModal = () => {
    setLoadingModal(false);
    // fetchCoraStatus(APIkey);

    // setStatusData(statusRes);
    // const noData = !statusData || (statusData && statusData.length === 0);
  };

  useEffect(() => {
    const noData = !statusData || (statusData && statusData.length === 0);
    if (!noData && !isLoadingModal) {
      setModalVisible(!isModalVisible);
    }
  }, [statusData]);
  useEffect(() => {
    fetchCoraStatus(APIkey);
  }, [isLoadingModal]);

  const fetchCoraStatus = async (APIkey) => {
    const response = await axios
      .get(
        `https://us-central1-smartplant-88b76.cloudfunctions.net/getState?id=${APIkey}`
      )
      .catch((err) => {
        console.error(err);
      });

    if (response && response.data) setStatusData(response.data);
    // console.log(response.data);
  };

  const formatTime = (value) => {
    if (value) {
      const date = new Date(Number(value * 1000));
      const s = date.getSeconds();
      const m = date.getMinutes();
      const h = date.getHours();
      return `${h}:${m}`;
    }
    return "";
  };

  const formatDecimal = (value) => {
    const now = !value || (value && value.length === 0);

    if (value) {
      return value.toFixed(0);
    }
    return "";
  };

  const reduce = (data) => {
    const res = data.reduce(
      (prev, current) => (prev.x > current.x ? prev : current),
      1
    );
    // alert(res);
    return res;
  };

  const { APIkey, displayName } = route.params;
  // console.log(displayName);

  const fetchTemperatureData = async (APIkey) => {
    const response = await axios
      .get(
        `https://us-central1-smartplant-88b76.cloudfunctions.net/sensorData?id=${APIkey}&category=temperature`
      )
      .catch((err) => {
        console.error(err);
        setError(err);
      });

    if (response && response.data) setTempData(response.data);
  };

  const fetchHumidityData = async (APIkey) => {
    const response = await axios
      .get(
        `https://us-central1-smartplant-88b76.cloudfunctions.net/sensorData?id=${APIkey}&category=humidity`
      )
      .catch((err) => {
        console.error(err);
        setError(err);
      });

    if (response && response.data) setHumData(response.data);
  };

  const fetchPressureData = async (APIkey) => {
    const response = await axios
      .get(
        `https://us-central1-smartplant-88b76.cloudfunctions.net/sensorData?id=${APIkey}&category=pressure`
      )
      .catch((err) => {
        console.error(err);
        setError(err);
      });

    if (response && response.data) setPresData(response.data);
  };

  const onDismiss = () => {
    setModalVisible(false);
    setStatusData([]);
    setLoadingModal(!isLoadingModal);
  };

  useEffect(() => {
    isMounted = true;
    if (isMounted) {
      fetchTemperatureData(APIkey);
      fetchHumidityData(APIkey);
      fetchPressureData(APIkey);

      return () => {
        isMounted = false;
      };
    }
  }, [navigation, APIkey]);

  useEffect(() => {
    const noTemp = !tempData || (tempData && tempData.length === 0);
    const noHum = !humData || (humData && humData.length === 0);
    const noPres = !presData || (presData && presData.length === 0);
    setNowTemp(reduce(tempData));
    setNowHum(reduce(humData));
    setNowPres(reduce(presData));

    setLoading1(noTemp);
    setLoading2(noHum);
    setLoading3(noPres);
  }, [tempData, humData, presData]);

  return (
    <Screen style={styles.container}>
      {isLoading1 && isLoading2 && isLoading3 ? (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <ActivityIndicator size="large" color="grey" />
        </View>
      ) : (
        <>
          <Header
            leftComponent={
              <TouchableOpacity
                style={styles.closeButton}
                onPress={() =>
                  navigation.dispatch({
                    ...StackActions.replace("Home"),
                  })
                }
              >
                <Ionicons name="md-close" size={20} color="#B4B4B4" />
              </TouchableOpacity>
            }
            centerComponent={<Text style={styles.title}>{displayName}</Text>}
            containerStyle={{
              marginHorizontal: 30,
              backgroundColor: "white",
            }}
          />
          <ScrollView>
            {/* <TouchableOpacity
            style={styles.closeButton}
            onPress={() =>
              navigation.dispatch({
                ...StackActions.replace("Home"),
              })
            }
          >
            <Ionicons name="md-close" size={24} color="#B4B4B4" />
          </TouchableOpacity> */}
            {/* <Text style={styles.title}>{displayName}</Text> */}
            <View style={styles.statusContainer}>
              <View>
                {dataSource === 1 && (
                  <>
                    <Text style={styles.statusData}>
                      {`${formatDecimal(nowTemp.y)}\u00B0C`}
                    </Text>
                    <Text style={styles.statusTime}>
                      {formatTime(nowTemp.x)}
                    </Text>
                  </>
                )}
                {dataSource === 2 && (
                  <>
                    <Text style={styles.statusData}>
                      {`${formatDecimal(nowHum.y)}%`}
                    </Text>
                    <Text style={styles.statusTime}>
                      {formatTime(nowHum.x)}
                    </Text>
                  </>
                )}
                {dataSource === 3 && (
                  <>
                    <Text style={styles.statusData}>
                      {`${formatDecimal(nowPres.y)}hPa`}
                    </Text>
                    <Text style={styles.statusTime}>
                      {formatTime(nowPres.x)}
                    </Text>
                  </>
                )}
              </View>
            </View>
            {/* <TouchableOpacity onPress={() => retrieveData()}>
            <Text>yes</Text>
          </TouchableOpacity> */}
            <Chart
              data1={tempData}
              data2={humData}
              data3={presData}
              dataSource={dataSource}
            />

            <View style={styles.pickerContainer}>
              <TouchableOpacity
                style={[
                  styles.pickerButton,
                  { backgroundColor: dataSource === 1 ? "#F8F8F8" : "white" },
                ]}
                onPress={() => setDataSource(1)}
              >
                <Text style={styles.pickerText}>気温</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.pickerButton,
                  { backgroundColor: dataSource === 2 ? "#F8F8F8" : "white" },
                ]}
                onPress={() => setDataSource(2)}
              >
                <Text style={styles.pickerText}>湿度</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.pickerButton,
                  { backgroundColor: dataSource === 3 ? "#F8F8F8" : "white" },
                ]}
                onPress={() => setDataSource(3)}
              >
                <Text style={styles.pickerText}>気圧</Text>
              </TouchableOpacity>
            </View>
            <TouchableOpacity
              style={styles.diagnoseButton}
              onPress={
                // () =>
                // navigation.navigate("Diagnose", { APIkey: APIkey })
                // console.log("pressed")
                toggleModal
              }
            >
              <LinearGradient
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                colors={["#0BF497", "#01D983"]}
                style={{
                  width: "100%",
                  height: "100%",
                  justifyContent: "center",
                  alignItems: "center",
                  borderRadius: 5,
                }}
              >
                {isLoadingModal && (
                  <Text style={styles.diagnoseText}>ヘルスチェック</Text>
                )}
                {!isLoadingModal && <ActivityIndicator color="white" />}
              </LinearGradient>
            </TouchableOpacity>

            <Modal
              isVisible={isModalVisible}
              // deviceWidth={deviceWidth / 0.3}
              // deviceHeight={300}
              // customBackdrop={
              //   // <TouchableWithoutFeedback>
              //   <View style={{ flex: 1 }} />
              //   // </TouchableWithoutFeedback>
              // }
              onSwipeComplete={onDismiss}
              swipeDirection="down"
            >
              {isModalVisible && <HealthCheckModal statusData={statusData} />}
            </Modal>
          </ScrollView>
        </>
      )}
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    justifyContent: "space-between",
    alignItems: "center",
  },
  chartContainer: {
    height: 100,
  },
  closeButton: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F8F8F8",
    height: 33,
    width: 33,
    borderRadius: 12,
  },
  diagnoseButton: {
    backgroundColor: color.primary,
    width: "75%",
    height: 47,
    marginBottom: 30,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
    alignSelf: "center",
  },
  diagnoseText: {
    fontFamily: "Hind_500Medium",
    fontSize: 17,
    color: "white",
  },

  pickerContainer: {
    flexDirection: "row",
    margin: 20,
    justifyContent: "space-around",
  },
  pickerButton: {
    height: 32,
    width: 70,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 10,
    borderRadius: 6,
  },
  pickerText: {
    fontFamily: "Hind_500Medium",
    fontSize: 12,
    color: color.secondary,
  },
  statusContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 8,
  },
  statusTitle: {
    fontFamily: "Hind_400Regular",
    fontSize: 15,
    color: color.secondary,
  },
  statusData: {
    fontFamily: "Futura_Bold",
    fontSize: 28,
    textAlign: "center",
    color: color.secondary,
  },
  statusTime: {
    fontFamily: "Hind_500Medium",
    fontSize: 25,
    textAlign: "center",
    color: color.secondary,
    marginBottom: 15,
  },
  separator: {
    borderWidth: 0.5,
    borderColor: "#919191",
    height: 30,
    marginHorizontal: 30,
    borderRadius: 0.2,
  },
  title: {
    // marginTop: 20,
    fontFamily: "Hind_700Bold",
    fontSize: 25,
    color: color.primary,
  },
});
export default ViewScreen;
