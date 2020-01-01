import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput
} from "react-native";

import AuthCss from "../css/authCss";

const LoginScreen = props => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userId, setUserId] = useState("")

  const loginUser = async (email, password) => {
    await fetch("http://localhost:5000/api/users/login/", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email: email,
        password: password
      })
    })
    .then((response) => response.json())
    .then((responseJson) => {
      setUserId(responseJson.id)
    })
    .then(props.navigation.navigate('Items', {userId: userId} ))
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
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              loginUser(email, password);
            }}
          >
            <Text style={{ fontSize: 20, color: "#ffffff" }}>Log In</Text>
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
};

LoginScreen.navigationOptions = {
  title: "Log In"
};

const styles = StyleSheet.create(AuthCss);

export default LoginScreen;
