import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { TouchableHighlight } from "react-native-gesture-handler";

const ItemCard = props => {
  const { id, title, amount, description } = props;

  return (
    <TouchableHighlight onPress={() => props.onPress()}>
      <View style={styles.container}>
        <View style={styles.cardLeft}>
          <Text style={{ fontSize: 20 }}>{title}</Text>
        </View>
        <View style={styles.cardRight}>
          <Text style={{ fontSize: 20, alignSelf: "flex-end" }}>${amount.toFixed(2)}</Text>
        </View>
      </View>
    </TouchableHighlight>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    borderWidth: 1,
    borderColor: "#b8bcc2",
    borderRadius: 10,
    height: 50,
    marginTop: 10,
    maxWidth: 350,
    backgroundColor: "#d3dade"
  },
  cardLeft: {
    width: "60%",
    padding: 10,
    paddingLeft: 20
  },
  cardRight: {
    width: "40%",
    padding: 10,
    paddingRight: 20
  }
});

export default ItemCard;
