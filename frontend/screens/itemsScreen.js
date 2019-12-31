import React from "react";
import { View, StyleSheet, Text } from "react-native";

const ItemsScreen = props => {
  return (
    <View style={styles.container}>
      <Text>This is the items screen</Text>
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
