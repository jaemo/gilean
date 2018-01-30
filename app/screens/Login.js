import React from 'react';
import { AppRegistry } from 'react-native';
import { Card, FormLabel, FormInput } from "react-native-elements";
import { StyleSheet, Text, TextInput, View, Button, TouchableOpacity } from 'react-native';
import styles from '../stylesheets/style';

export default class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      emailError: false,
      password: '',
      passwordError: false,
    };

    this.onPressLogin = this.onPressLogin.bind(this);
  }

  handleInputChange = (field, value) => {
    console.log(...this.state);
    const newState = {
      ...this.state,
      [field]: value,

    };
    this.setState(newState);

  };

  handleSubmit = async () => {
    const { email, password  } = this.state;
    if (email.length === 0) {
      return this.setState({ emailError: true  });

    }
    this.setState({ emailError: false  });
    if (password.length === 0) {
      return this.setState({ passwordError: true  });
    }
    this.setState({ passwordError: false  });
      console.log(email)
      let authd = await authenticate(email, password)
    //return this.props.screenProps.changeLoginState(true);
  };

  export const authenticate = async (email, password) => {
    return new Promise((resolve, reject) => {
      let response = fetch('https://astinus-dev.herokuapp.com/api/v1/authenticate', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: this.state.email,
          password: this.state.password,
        })
      })
        .then(response =>{
          console.log(response);
        })

    })
  }

  onPressLogin() {
    if(this.state.email != "" && this.state.password != ""){
      let response = fetch('https://astinus-dev.herokuapp.com/api/v1/authenticate', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: this.state.email,
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
    const { emailError, passwordError  } = this.state;
    let email = this.state.email || '';
    let password = this.state.password || '';

    return (
      <View style={styles.container}>
        <Text>Analytics SuperAdmin Login</Text>
        <Card containerStyle={styles.card}>
          <TextInput
            name="email"
            style={styles.input}
            onChangeText={email => this.handleInputChange('email', email)}
            placeholder="Email"
            underlineColorAndroid='transparent'
          />
          <TextInput
            name="password"
            style={styles.input}
            onChangeText={password => this.handleInputChange('password', password)}
            placeholder="Password"
            secureTextEntry={true}
            underlineColorAndroid='transparent'
          />
          <TouchableOpacity
            style={styles.button}
            onPress={this.handleSubmit}>
            <Text style={styles.buttonText}>SIGN IN</Text>
          </TouchableOpacity>
        </Card>
      </View>
    );
  }
}

