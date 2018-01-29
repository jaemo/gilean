
import React from 'react';
import { AppRegistry } from 'react-native';
import { StyleSheet, Text, TextInput, View, Button, TouchableOpacity } from 'react-native';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { username: '', password: '' };

    this.onPressLogin = this.onPressLogin.bind(this);
  }

  onPressLogin() {
    if(this.state.username != "" && this.state.password != ""){
      let response = fetch('https://astinus-dev.herokuapp.com/api/v1/authenticate', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: this.state.username,
          password: this.state.password,
        })
      })
        .then((response) => response.json())
        .then((responseJson) => {
          this.setState({
            user: responseJson.user,
            organizations: responseJson.organizations,
            token: responseJson.jwt,
          })
        })
    }
  }

  render() {
    let username = this.state.username || '';
    let password = this.state.password || '';
    return (
      <View style={styles.container}>
        <TextInput
          name="username"
          style={styles.input}
          onChangeText={username => this.setState({username})}
          placeholder="Your username or email"
          underlineColorAndroid='transparent'
        />
        <TextInput
          name="password"
          style={styles.input}
          onChangeText={password => this.setState({password})}
          placeholder="Password"
          secureTextEntry={true}
          underlineColorAndroid='transparent'
        />
        <TouchableOpacity
          style={styles.button}
      onPress={this.onPressLogin}>
      <Text style={styles.buttonText}>SIGN IN</Text>
    </TouchableOpacity>
    <Text>User name: {username}</Text>
      <Text>Password: {password}</Text>
    </View>
    );
  }
}

