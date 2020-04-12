import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  FlatList
} from "react-native";
import { Feather } from "@expo/vector-icons";

import ItemCard from "../components/itemCard";

const ItemsScreen = props => {
  const [items, setItems] = useState([]);

  // logged in User
  const { userId, token } = props.navigation.state.params;

  const receiveItems = async userId => {
    const response = await fetch(
      `http://localhost:5000/api/items/users/${userId}`,
      {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        }
      }
    );

    const data = await response.json();
    setItems(data);
  };

  const monthlyCost = () => {
    const costArray = items.map(item => item.amount);

    const reducer = (accumulator, currentValue) => accumulator + currentValue;
    const cost = costArray.reduce(reducer, 0);
    return cost.toFixed(2);
  };

  useEffect(() => {
    receiveItems(userId);
  }, [items]);

  return (
    <View style={styles.container}>
      <View style={{ flex: 10 }}>
        <FlatList
          data={items}
          renderItem={({ item }) => (
            <ItemCard
              id={item._id}
              title={item.name}
              amount={item.amount}
              description={item.description}
              onPress={() =>
                props.navigation.navigate("EditItems", {
                  id: item._id,
                  title: item.name,
                  amount: item.amount,
                  description: item.description,
                  userId: userId
                })
              }
            />
          )}
          keyExtractor={item => item._id}
          showsHorizontalScrollIndicator={false}
          ListFooterComponent={
            <TouchableOpacity
              style={styles.button}
              onPress={() =>
                props.navigation.navigate("AddItems", {
                  userId: userId,
                  token: token
                })
              }
            >
              <Text style={{ color: "#ffffff" }}>
                {items.length > 0 ? "Add New Item" : "Add First Item"}
              </Text>
            </TouchableOpacity>
          }
        />
      </View>
      <View style={styles.monthlyCost}>
        <Text style={{ color: "#ffffff", fontSize: 20 }}>
          Monthly Cost: ${monthlyCost()}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  button: {
    marginTop: 10,
    backgroundColor: "#0e75b5",
    minHeight: 50,
    minWidth: "80%",
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center"
  },
  monthlyCost: {
    flex: 1,
    backgroundColor: "#b83737",
    borderTopColor: "#e0cece",
    borderTopWidth: 2,
    width: "100%",
    justifyContent: "center",
    alignItems: "center"
  }
});

ItemsScreen.navigationOptions = ({ navigation }) => ({
  title: "Expenses",
  headerLeft: null,
  headerRight: () => (
    <Feather
      name={"plus"}
      size={30}
      color="black"
      style={{ marginRight: 15 }}
      onPress={() =>
        navigation.navigate("AddItems", {
          userId: navigation.state.params.userId,
          token: navigation.state.params.token
        })
      }
    />
  )
});

export default ItemsScreen;
