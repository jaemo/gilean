import React from "react";
import { StyleSheet, Text, TouchableOpacity } from 'react-native';

export default class SignIn extends React.Component {
  constructor(props){
    super(props)
  }
  render() {
    return(
      <TouchableOpacity
        style={styles.button}
        onPress={() => { } }>
        <Text style={styles.buttonText}></Text>
      </TouchableOpacity>
    )}
}

