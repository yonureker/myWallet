import React, { useState } from "react";
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from "react-native";

import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import LoginScreen from './screens/loginScreen'
import SignupScreen from './screens/signupScreen'
import ItemsScreen from './screens/itemsScreen'
// import ProfileScreen from './screens/profileScreen'
// import PasswordScreen from './screens/passwordScreen'

export default function App() {
  return (
      <AppContainer />
  );
}

const AppNavigator = createStackNavigator(
  {
    Login: LoginScreen,
    Signup: SignupScreen,
    Items: ItemsScreen
    // Profile: ProfileScreen,
    // Password: PasswordScreen
  },
  {
    initialRouteName: 'Items'
  }
);

const AppContainer = createAppContainer(AppNavigator);