import React from "react";
import { View, StyleSheet, Text } from "react-native";

const ItemsScreen = props => {
  // logged in User
  const userId = props.navigation.state.params.userId

  return (
   
    <View style={styles.container}>
      <Text>Your user ID is {userId}</Text>
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

export default ItemsScreen;
