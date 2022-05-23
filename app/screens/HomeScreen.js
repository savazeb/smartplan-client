import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  FlatList,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import filter from "lodash.filter";

import { Header } from "react-native-elements";
import Cora from "../assets/Icons/Cora";
import Scan from "../assets/Icons/Scan";
import Screen from "../components/Screen";
import Card from "../components/Card";

import color from "../config/color";

const ItemSeparatorView = () => {
  return (
    <View
      style={{
        height: 0.5,
        width: "80%",
        backgroundColor: "#F7F5F5",
        alignSelf: "center",
      }}
    />
  );
};

function HomeScreen({ navigation }) {
  const [data, setData] = useState([]);
  const [query, setQuery] = useState("");
  const [fullData, setFullData] = useState([]);
  const [dataLoaded, setDataLoaded] = useState(true);

  const handleSearch = (text) => {
    const formattedQuery = text.toLowerCase();

    const filteredData = filter(fullData, (user) => {
      const dataLowerCase = user.title.toLowerCase();
      return dataLowerCase.indexOf(formattedQuery) > -1;
    });

    setData(filteredData);
    setQuery(text);
  };

  const retrieveData = async () => {
    try {
      const value = await AsyncStorage.getItem("@DataBase");
      if (value !== null) {
        setData(JSON.parse(value));
        setFullData(JSON.parse(value));
        // console.log(data);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    const noData = !fullData || (fullData && fullData.length === 0);
    setDataLoaded(noData);
  }, [fullData]);

  const Item = ({ title, APIkey, displayName }) => (
    <TouchableOpacity
      style={styles.item}
      onPress={() =>
        navigation.navigate("View", {
          APIkey: APIkey,
          displayName: displayName,
        })
      }
    >
      <Text style={styles.title}>{`${title}`}</Text>
    </TouchableOpacity>
  );

  const renderItem = ({ item }) => (
    <Item title={item.title} APIkey={item.APIkey} displayName={item.title} />
  );

  useEffect(() => {
    retrieveData();
  }, [navigation]);

  return (
    <Screen style={styles.container}>
      <Header
        // leftComponent={
        //   <View>
        //     <Cora size={0.5} />
        //   </View>
        // }
        rightComponent={
          <TouchableOpacity onPress={() => navigation.navigate("ScanIcon")}>
            <Scan size={18} />
          </TouchableOpacity>
        }
        containerStyle={{
          marginHorizontal: 30,
          backgroundColor: "white",
        }}
      />
      {/* <Card /> */}
      {/* <Text style={styles.titleStyle}>PLANT</Text> */}
      {dataLoaded ? (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <ActivityIndicator size="large" color="grey" />
        </View>
      ) : (
        <FlatList
          ListHeaderComponent={
            <View
              style={{
                backgroundColor: "#fff",
                padding: 10,
                marginVertical: 10,
                borderRadius: 20,
              }}
            >
              <TextInput
                autoCapitalize="none"
                autoCorrect={false}
                clearButtonMode="always"
                defaultValue={query}
                onChangeText={(queryText) => handleSearch(queryText)}
                placeholder="Search"
                style={{ backgroundColor: "#fff", paddingHorizontal: 40 }}
              />
            </View>
          }
          // scrollEnabled="false"
          data={data}
          extraData={query}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
          ItemSeparatorComponent={ItemSeparatorView}
        />
      )}
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "white" },
  headerContainer: {
    flexDirection: "row",
    padding: 20,
  },
  titleStyle: {
    marginBottom: "auto",
    margin: 30,
    fontFamily: "Hind_500Medium",
    fontSize: 20,
    color: color.secondary,
  },
  item: {
    marginLeft: 40,
    padding: 13,
  },
  title: {
    fontFamily: "Hind_500Medium",
    fontSize: 17,
    color: color.secondary,
  },
});
export default HomeScreen;
