import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  FlatList
} from "react-native";
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
    )

    const data = await response.json();
    setItems(data);
  };

  useEffect(() => {
    receiveItems(userId);
  });

  return (
    <View style={styles.container}>
      <FlatList
        data={items}
        renderItem={({ item }) => (
          <ItemCard
            id={item._id}
            title={item.name}
            amount={item.amount}
            description={item.description}
          />
        )}
        keyExtractor={item => item._id}
        ListFooterComponent={<TouchableOpacity style={styles.button} onPress={() => props.navigation.navigate('AddItems', {userId: userId, token: token})}>
        <Text style={{ color: "#ffffff" }}>Add New Item</Text>
      </TouchableOpacity>}
      />
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
    backgroundColor: "gray",
    minHeight: 50,
    alignItems: "center",
    justifyContent: "center"
  }
});

ItemsScreen.navigationOptions = {
  title: "My Items",
  headerLeft: null
};

export default ItemsScreen;
