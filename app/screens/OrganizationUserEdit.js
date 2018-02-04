import React, {Component} from 'react';
import {
  KeyboardAvoidingView,
  Modal,
  View,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Text,
} from 'react-native';
import {Tile, Card, List, ListItem} from 'react-native-elements';
import {isSignedIn, onSignOut, getCreds} from '../auth';
import styles from '../stylesheets/style';

class OrganizationDetail extends Component {
  constructor(props) {
    super(props);

    let {user, organization_id} = this.props.navigation.state.params;

    this.state = {
      token: this.props.screenProps.token,
      user: user,
      organization_id: organization_id,
      modalVisible: false,
      email: user.email,
      password: '',
      password_confirmation: '',
    };
  }

  onDeleteConfirmHandler = () => {
    this.setState({
      modalVisible: true,
    });
  };

  onSetField = field => {
    this.setState(field);
  };

  onDeleteHandlerCancel = () => {
    this.setState({
      modalVisible: false,
    });
  };

  deleteUser = async () => {
    try {
      let response = await fetch(
        global.api_url + '/api/v1/users/' + this.state.user.id,
        {
          method: 'DELETE',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + this.state.token,
            'organization-id': this.state.organization_id,
          },
        },
      );
      if (response.status == 204) {
        this.props.navigation.state.params.refreshHandler();
        this.props.navigation.goBack();
      }
    } catch (error) {
      //
    }
  };

  updateUser = async () => {
    try {
      let response = await fetch(
        global.api_url + '/api/v1/users/' + this.state.user.id,
        {
          method: 'PUT',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + this.state.token,
            'organization-id': this.state.organization_id,
          },
          body: JSON.stringify({
            user: {
              email: this.state.email,
              password: this.state.password,
              password_confirmation: this.state.password_confirmation,
            },
          }),
        },
      );

      if (response.status == 200) {
        this.props.navigation.state.params.refreshHandler();
        this.props.navigation.goBack();
      }
    } catch (error) {
      console.log(error);
      //
    }
  };

  async componentDidMount() {
    try {
      //anyone? bueller?
    } catch (error) {
      console.log(error);
    }
  }

  renderUserForm() {
    return (
      <KeyboardAvoidingView behavior="padding">
        <Card containerStyle={styles.card}>
          <Text style={styles.largeHeader}>Editing User</Text>

          <Text style={styles.formLabel}>Email:</Text>
          <TextInput
            name="name"
            style={styles.lighterInput}
            onChangeText={email => this.onSetField({email})}
            placeholderTextColor="#fff"
            placeholder="User Email"
            underlineColorAndroid="transparent"
            value={this.state.email}
          />

          <Text style={styles.formLabel}>Password:</Text>
          <TextInput
            name="name"
            style={styles.lighterInput}
            onChangeText={password => this.onSetField({password})}
            placeholderTextColor="#fff"
            placeholder="Password"
            underlineColorAndroid="transparent"
            value={this.state.password}
          />

          <Text style={styles.formLabel}>Password Confirmation:</Text>
          <TextInput
            name="name"
            style={styles.lighterInput}
            onChangeText={password_confirmation =>
              this.onSetField({password_confirmation})
            }
            placeholderTextColor="#fff"
            placeholder="Confirm Password"
            underlineColorAndroid="transparent"
            value={this.state.password_confirmation}
          />
          <View style={styles.buttonPair}>
            <TouchableOpacity
              style={styles.buttonPairButton}
              onPress={() => {
                this.updateUser();
              }}>
              <Text style={styles.buttonText}>UPDATE USER</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.buttonPairButton}
              onPress={() => {
                this.onDeleteConfirmHandler();
              }}>
              <Text style={styles.deletebuttonText}>DELETE USER</Text>
            </TouchableOpacity>
          </View>
        </Card>
        <View style={{marginBottom: 6}} />
      </KeyboardAvoidingView>
    );
  }

  renderModal() {
    return (
      <Modal
        visible={this.state.modalVisible}
        animationType={'slide'}
        transparent={true}
        onRequestClose={() => this.onDeleteHandlerCancel()}
        style={styles.deleteModal}>
        <View style={styles.deleteWarningDialog}>
          <Card containerStyle={styles.deleteWarningCard}>
            <Text style={styles.largeHeader}>Aiight listen.</Text>
            <Text style={styles.text}>
              This will delete the user. You sure bruh?
            </Text>
            <View style={styles.dialogButtons}>
              <TouchableOpacity
                style={styles.buttonPairButton}
                onPress={() => {
                  this.onDeleteHandlerCancel();
                }}>
                <Text style={styles.buttonText}>CHECK AGAIN!</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.buttonPairButton}
                onPress={() => {
                  this.deleteOrganization();
                }}>
                <Text style={styles.deletebuttonText}>DIE, HERETIC!</Text>
              </TouchableOpacity>
            </View>
          </Card>
        </View>
      </Modal>
    );
  }

  render() {
    let users = this.state.users;
    return (
      <View style={styles.scrollContainer}>
        {this.renderModal()}
        <ScrollView style={{flex: 2}}>{this.renderUserForm()}</ScrollView>
      </View>
    );
  }
}

export default OrganizationDetail;
