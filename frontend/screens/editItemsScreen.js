import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity
} from "react-native";
import AuthCss from "../css/authCss";

const EditItemsScreen = props => {
  const [name, setName] = useState(props.navigation.state.params.title);
  const [amount, setAmount] = useState(props.navigation.state.params.amount);
  const [description, setDescription] = useState(
    props.navigation.state.params.description
  );

  const itemId = props.navigation.state.params.id

  console.log(itemId);

  const removeItem = async itemId => {
    try {const response = await fetch(`http://localhost:5000/api/items/${itemId}`, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        _id: itemId
      })
    })

    const data = await response.json();

    console.log(data)
  } catch {
    console.log(error)
  }};

  return (
    <View style={styles.container}>
      <View style={styles.loginModule}>
        <View>
          <TextInput
            style={styles.textInput}
            autoCapitalize="none"
            placeholder="Name"
            placeholderTextColor="#D7DBDD"
            defaultValue={name}
            onChangeText={name => setName(name)}
          />
          <TextInput
            style={styles.textInput}
            placeholder="Amount"
            placeholderTextColor="#D7DBDD"
            keyboardType="numeric"
            defaultValue={amount.toString()}
            onChangeText={amount => setAmount(amount)}
          />
          <TextInput
            style={styles.textInput}
            placeholder="Description"
            placeholderTextColor="#D7DBDD"
            defaultValue={description}
            onChangeText={description => setDescription(description)}
          />
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              addItem(userId, name, amount, description);
            }}
          >
            <Text style={{ fontSize: 20, color: "#ffffff" }}>Edit Item</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{ ...styles.button, backgroundColor: "#FF0000" }}
            onPress={() => {
              removeItem(itemId);
            }}
          >
            <Text style={{ fontSize: 20, color: "#ffffff" }}>Delete Item</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

EditItemsScreen.navigationOptions = {
  title: "Edit Item"
};

const styles = StyleSheet.create(AuthCss);

export default EditItemsScreen;