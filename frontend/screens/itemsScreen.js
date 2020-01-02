import React from "react";
import { View, StyleSheet, Text } from "react-native";

const ItemsScreen = props => {
  // logged in User
  const userId = props.navigation.state.params.userId

  const receiveItems = async (userId) => {
    const response = await fetch(`http://localhost:5000/api/items/users/${userId}`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    });

    const data = await response.json()

    //data
  //   [
  //     {
  //         "_id": "5e0db1e33a7890be1b47ecac",
  //         "user": "5e0c58c827c9988d06fe9d86",
  //         "name": "Netflix",
  //         "amount": 50,
  //         "description": "hello",
  //         "date": "2020-01-02T09:03:31.067Z",
  //         "__v": 0
  //     }
  // ]
    console.log()
  }

  

  return (
   
    <View style={styles.container}>
      {receiveItems(userId)}
      {console.log(receiveItems())}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  }
});

ItemsScreen.navigationOptions = {
  title: "My Items",
  headerLeft: null
};

export default ItemsScreen;
