import React from "react";

import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";

import LoginScreen from "./screens/loginScreen";
import SignupScreen from "./screens/signupScreen";
import ItemsScreen from "./screens/itemsScreen";
import AddItemsScreen from "./screens/addItemsScreen";

export default function App() {

  return (
      <AppContainer />
  );
}

const AppNavigator = createStackNavigator(
  {
    Login: LoginScreen,
    Signup: SignupScreen,
    Items: ItemsScreen,
    AddItems: AddItemsScreen
  },
  {
    initialRouteName: "Login"
  }
);

const AppContainer = createAppContainer(AppNavigator);
