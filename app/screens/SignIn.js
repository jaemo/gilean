import React from "react";
import { StyleSheet, Text, TextInput, View, TouchableOpacity } from 'react-native';
import { Card, Button, FormLabel, FormInput } from "react-native-elements";
import {  plsSignIn, setLogin, onSignIn, getCreds } from "../auth";
import styles from '../stylesheets/style';


async function handleThis(navigation){
  try{
    let res = await plsSignIn();
    if(res !== null || res !== undefined){
      console.log("Resolved Promise:" + res);
    }
  } catch(error){
    //
  }
}

export const handleSignIn = (navigation) => {
};

export default ({ navigation }) => {
  return(
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
          handleThis(navigation)
        }}
      >
        <Text style={styles.buttonText}>SIGN IN</Text>
      </TouchableOpacity>
    </Card>
  </View>
)};
