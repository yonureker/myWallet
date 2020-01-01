import React, { useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity, TextInput } from "react-native";

import AuthCss from '../css/authCss'

const SignupScreen = props => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");

  const signupUser = (email, password, password2) => {
    fetch("http://localhost:5000/api/users/register/", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email: email,
        password: password,
        password2: password2
      })
    })
    .then((response) => response.json())
    .then((responseJson) => {
      console.log(responseJson);
    })
    .catch((error) => {
      console.error(error);
    });;
  };

  return (
    <View style={styles.container}>
      <View style={styles.loginModule}>
        <View>
          <TextInput
            style={styles.textInput}
            autoCapitalize="none"
            placeholder="Email"
            placeholderTextColor="#D7DBDD"
            onChangeText={email => setEmail(email)}
          />
          <TextInput
            style={styles.textInput}
            secureTextEntry={true}
            placeholder="Password"
            placeholderTextColor="#D7DBDD"
            onChangeText={password => setPassword(password)}
          />
          <TextInput
            style={styles.textInput}
            secureTextEntry={true}
            placeholder="Confirm Password"
            placeholderTextColor="#D7DBDD"
            onChangeText={password2 => setPassword2(password2)}
          />
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              signupUser(email, password, password2);
            }}
          >
            <Text style={{ fontSize: 20, color: "#ffffff" }}>Signup</Text>
          </TouchableOpacity>
        </View>
          <View style={styles.signupContainer}>
          <Text>
            Don't have an account?{" "}
            <Text
              style={styles.textLink}
              onPress={() => props.navigation.navigate("Signup")}
            >
              Sign Up.
            </Text>
          </Text>
          </View>
        </View>
      </View>
  );
}

SignupScreen.navigationOptions = {
  title: "Sign Up"
};

const styles = StyleSheet.create(AuthCss);

export default SignupScreen;