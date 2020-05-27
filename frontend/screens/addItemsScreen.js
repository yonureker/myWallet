import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  TextInput,
  Alert
} from "react-native";

import AuthCss from "../css/authCss";

const AddItemsScreen = props => {
  const [name, setName] = useState("");
  const [amount, setAmount] = useState(0);
  const [description, setDescription] = useState("");

  // logged in User
  const { userId, token } = props.navigation.state.params;

  const addItem = async (userId, name, amount, description) => {
    try {
      const response = await fetch("http://localhost:5000/api/items/", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: token
        },
        body: JSON.stringify({
          user: userId,
          name: name,
          amount: amount,
          description: description
        })
      });

      const data = await response.json();

      if (data._id) {
        props.navigation.navigate("Items", {
          userId: userId,
          name: name,
          status: "deleted"
        });
      }
      // } else {
      //   const errors = Object.values(data);

      //   errors.map(error => Alert.alert(error))
      // }
    } catch {
      // console.log(error)
      // const errors = Object.values(data);
      return Alert.alert(error);

      // error.map(error => Alert.alert(error))
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.loginModule}>
        <View>
          <TextInput
            style={styles.textInput}
            autoCapitalize="sentences"
            placeholder="Expense Name"
            placeholderTextColor="#A7AAAD"
            onChangeText={name => setName(name)}
          />
          <TextInput
            style={styles.textInput}
            placeholder="Cost in $USD"
            placeholderTextColor="#A7AAAD"
            keyboardType="numeric"
            onChangeText={amount => setAmount(amount)}
          />
          <TextInput
            style={styles.textInput}
            placeholder="Description"
            placeholderTextColor="#A7AAAD"
            onChangeText={description => setDescription(description)}
          />
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              addItem(userId, name, amount, description);
            }}
          >
            <Text style={{ fontSize: 20, color: "#ffffff" }}>Add Item</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

AddItemsScreen.navigationOptions = {
  title: "Add Item"
};

const styles = StyleSheet.create(AuthCss);

export default AddItemsScreen;
