import React from 'react';
import {
  AppRegistry,
  Image,
  KeyboardAvoidingView,
  ActivityIndicator,
  StyleSheet,
  Text,
  TextInput,
  View,
  Button,
  TouchableOpacity,
} from 'react-native';
import {Card, FormLabel, FormInput} from 'react-native-elements';
import styles from '../stylesheets/style';

export default class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      emailError: false,
      password: '',
      passwordError: false,
      isLoggingIn: false,
    };
  }

  handleInputChange = (field, value) => {
    const newState = {
      ...this.state,
      [field]: value,
    };
    this.setState(newState);
  };

  handleSubmit = async () => {
    const {email, password} = this.state;
    if (email.length === 0) {
      return this.setState({emailError: true});
    }
    this.setState({emailError: false});
    if (password.length === 0) {
      console.log("password is nil");
      return this.setState({passwordError: true});
    }
    this.setState({passwordError: false, isLoggingIn: true});
    var loginResponse = await this.props.screenProps.loginHandler(email, password);
  };

  render() {
    const {emailError, passwordError} = this.state;
    let email = this.state.email || '';
    let password = this.state.password || '';
    let isLoggingIn = this.state.isLoggingIn;

    return (
      <KeyboardAvoidingView style={styles.container} behavior="padding">
        <View style={styles.logoframe}>
          <Image style={styles.logo} source={require('../images/logo.png')} />
        </View>
        {!isLoggingIn && (
          <Card containerStyle={styles.card}>
            { emailError && <Text style={styles.errorText}>Can't be blank.</Text> }
            <TextInput
              name="email"
              style={[styles.input, emailError && styles.inputError]}
              onChangeText={email => this.handleInputChange('email', email)}
              placeholder="Email"
              underlineColorAndroid="transparent"
            />
            { passwordError && <Text style={styles.errorText}>Can't be blank.</Text> }
            <TextInput
              name="password"
              style={[styles.input, passwordError && styles.inputError]}
              onChangeText={password =>
                this.handleInputChange('password', password)
              }
              placeholder="Password"
              secureTextEntry={true}
              underlineColorAndroid="transparent"
            />
            <TouchableOpacity style={styles.button} onPress={this.handleSubmit}>
              <Text style={styles.buttonText}>SIGN IN</Text>
            </TouchableOpacity>
          </Card>
        )}
        {isLoggingIn && <ActivityIndicator size="large" color="#ffffff" />}
        <View style={{height: 60}} />
      </KeyboardAvoidingView>
    );
  }
}
