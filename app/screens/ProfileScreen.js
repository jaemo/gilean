import React from 'react';
import {
  KeyboardAvoidingView,
  Modal,
  View,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Text,
} from 'react-native';
import {Card} from 'react-native-elements';
import {onSignOut, getCreds} from '../auth';
import styles from '../stylesheets/style';

export default class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {},
      organization: {},
    };
  }

  handleSignOut = async () => {
    await onSignOut();
    this.props.navigation.navigate('SignedOut');
  };

  renderView = () => {
    return (
      <Card title={username}>
        <View
          style={{
            backgroundColor: '#bcbec1',
            alignItems: 'center',
            justifyContent: 'center',
            width: 80,
            height: 80,
            borderRadius: 40,
            alignSelf: 'center',
            marginBottom: 20,
          }}>
          <Text style={{color: 'white', fontSize: 28}}>JD</Text>
          <Text>Organization: {organization.name}</Text>
        </View>
      </Card>
    );
  };

  render() {
    return (
      <View style={styles.scrollContainer}>
        <Card containerStyle={styles.card}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              this.handleSignOut();
            }}>
            <Text style={styles.buttonText}>SIGN OUT</Text>
          </TouchableOpacity>
        </Card>
      </View>
    );
  }
}
