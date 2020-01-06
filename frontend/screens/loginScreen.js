import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  Alert,
  AsyncStorage
} from "react-native";

import AuthCss from "../css/authCss";

const LoginScreen = props => {
  const [email, setEmail] = useState("a@a.com");
  const [password, setPassword] = useState("123456");

  const loginUser = async (email, password) => {
    try {const response = await fetch("http://localhost:5000/api/users/login/", {
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
    
    const data = await response.json()

    if (data.id) {
      // no need for AsyncStorage now
      props.navigation.navigate('Items', {userId: data.id, token: data.token} );
    } else {
      const errors = Object.values(data);

      errors.map(error => Alert.alert(error))
    }
  } catch {
    console.log(error)
  }
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
            defaultValue="yonureker@gmail.com"
          />
          <TextInput
            style={styles.textInput}
            secureTextEntry={true}
            placeholder="Password"
            placeholderTextColor="#D7DBDD"
            onChangeText={password => setPassword(password)}
            defaultValue="'12345678'"
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