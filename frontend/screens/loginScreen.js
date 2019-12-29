import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";

const LoginScreen = () => {
  return (
    <View style={styles.container}>
      <Text>
        This is the Login Screen
      </Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
})

export default LoginScreen;