import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  Alert,
  AsyncStorage,
  ImageBackground
} from "react-native";

import AuthCss from "../css/authCss";

const LoginScreen = props => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // for later AsyncStorage implementation
  // const saveCredentials = async (userId, token) => {
  //   try {
  //     await AsyncStorage.setItem('userId', userId);
  //     await AsyncStorage.setItem('token', token);
  //   } catch (error) {
  //     // Error retrieving data
  //     console.log(error.message);
  //   }
  // };

  const loginUser = async (email, password) => {
    try {
      const response = await fetch("http://localhost:5000/api/users/login/", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          email: email,
          password: password
        })
      });

      const data = await response.json();

      if (data.id) {
        AsyncStorage.setItem("userId", data.id);
        AsyncStorage.setItem("token", data.token);

        // no need for AsyncStorage now
        props.navigation.navigate("Items", {
          userId: data.id,
          token: data.token
        });
      } else {
        const errors = Object.values(data);

        errors.map(error => Alert.alert(error));
      }
    } catch {
      console.log(error);
    }
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        style={{ width: 300, height: 90, marginBottom: 50 }}
        source={require("../assets/auth_image.png")}
      />
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
