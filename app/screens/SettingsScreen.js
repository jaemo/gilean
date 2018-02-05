import React from "react";
import { ScrollView, AsyncStorage, TouchableOpacity } from "react-native";
import { Alert, View, TextInput } from "react-native";
import { Card, Button, Text  } from "react-native-elements";
import { onSignOut, getCreds  } from "../auth";
import { getUsers } from "../models/users";
import styles from '../stylesheets/style';

export default class SettingsScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      api_url: '',
    };
  }

  handleInputChange = (field, value) => {
    const newState = {
      ...this.state,
      [field]: value,
    };
    this.setState(newState);
  };

  handleApiUrlChange = () => {
    global.api_url = this.state.api_url;
    Alert.alert("Settings Updated", "API URL set to: " + global.api_url)
    this.props.navigation.navigate("SignIn");
  }

  render() {
    let api_url = this.state.api_url;
    return(
      <View style={styles.loginView}>
        <Card containerStyle={styles.card}>
          <Text>API Settings</Text>
            <TextInput
              name="api_url"
              style={[styles.input, api_url && styles.inputError]}
              onChangeText={api_url => this.handleInputChange('api_url', api_url)}
              placeholder="API Url"
              underlineColorAndroid="transparent"
            />
            <TouchableOpacity style={styles.button} onPress={this.handleApiUrlChange}>
              <Text style={styles.buttonText}>UPDATE API URL</Text>
            </TouchableOpacity>
        </Card>
      </View>
    )
  }
}

