import React from "react";
import { StyleSheet, Text, TextInput, View, TouchableOpacity } from 'react-native';
import { Card, Button, FormLabel, FormInput } from "react-native-elements";
import { isSignedIn, setLogin, onSignIn, getCreds } from "../auth";
import styles from '../stylesheets/style';

export const handleSignIn = (navigation) => {
  onSignIn()
  .then(res => {
    isSignedIn()
      .then(res => {
        console.log("Sign in Result: " + res)
        if(res){
          navigation.navigate("SignedIn");
        }
      })
  })
};

export default ({ navigation }) => (
  <View style={styles.loginView}>
    <Card containerStyle={styles.card}>
      <TextInput
        name="username"
        style={styles.input}
        onChangeText={username => setLogin({username})}
        placeholderTextColor="#fff"
        placeholder="Email"
        underlineColorAndroid='transparent'
        keyboardType='email-address'
      />
      <TextInput
        name="password"
        style={styles.input}
        onChangeText={password => setLogin({password})}
        placeholder="Password"
        placeholderTextColor="#fff"
        secureTextEntry={true}
        underlineColorAndroid='transparent'
      />
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          handleSignIn(navigation)
        }}
      >
        <Text style={styles.buttonText}>SIGN IN</Text>
      </TouchableOpacity>
    </Card>
  </View>
);
