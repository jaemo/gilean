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
    return this.props.screenProps.loginHandler(email, password);
  };

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

