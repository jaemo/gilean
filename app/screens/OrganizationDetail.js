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
import {FontAwesome} from 'react-native-vector-icons';
import styles from '../stylesheets/style';

class OrganizationDetail extends Component {
  constructor(props) {
    super(props);

    let {id, name} = this.props.navigation.state.params;

    this.state = {
      token: this.props.screenProps.token,
      id: id,
      name: name,
      modalVisible: false,
      userListToggled: false,
      users: [],
      user: {
        email: '',
        password: '',
        password_confirmation: '',
      },
    };
  }

  onSetField = field => {
    this.setState(field);
  };

  onToggleUserList = status => {
    this.setState({
      userListToggled: !status,
    });
  };

  getUsers = async token => {
    let fetchedCredentials = await getCreds();
    credentials = JSON.parse(fetchedCredentials);
    if (credentials) {
      let response = await fetch(global.api_url + '/api/v1/users', {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + credentials.token,
          'organization-id': this.state.id,
        },
      });

      const json = await response.json();
      this.setState({
        okToRender: true,
        users: json.users,
      });
      return json;
    }
  };

  onDeleteOrganizationConfirm = () => {
    this.setState({
      modalVisible: true,
    });
  };

  onDeleteHandlerCancel = () => {
    this.setState({
      modalVisible: false,
    });
  };

  deleteOrganization = async () => {
    try {
      let response = await fetch(
        global.api_url + '/api/admin/organizations/' + this.state.id,
        {
          method: 'DELETE',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + this.state.token,
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

  updateOrganization = async () => {
    try {
      let response = await fetch(
        global.api_url + '/api/admin/organizations/' + this.state.id,
        {
          method: 'PUT',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + this.state.token,
          },
          body: JSON.stringify({
            organization: {
              name: this.state.name,
            },
          }),
        },
      );

      if (response.status == 200) {
        this.props.navigation.state.params.refreshHandler();
        this.props.navigation.goBack();
      }
    } catch (error) {
      //
    }
  };

  addOrganizationUser = async organization => {
    try {
      let response = await fetch(global.api_url + '/api/v1/users/', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + this.state.token,
          'organization-id': this.state.id,
        },
        body: JSON.stringify({
          user: {
            email: this.state.email,
            password: this.state.password,
            password_confirmation: this.state.password_confirmation,
          },
        }),
      });

      if (response.status == 201) {
        await this.getUsers();
        this.setState({
          email: '',
          password: '',
          password_confirmation: '',
        });
        this.props.navigation.state.params.refreshHandler();
      }
    } catch (error) {
      console.log(error);
    }
  };

  onEditUser(user) {
    this.props.navigation.navigate('OrganizationUserEdit', {
      user: user,
      organization_id: this.state.id,
      refreshHandler: this.onOrganizationsChange,
    });
  }

  async componentDidMount() {
    try {
      await this.getUsers();
    } catch (error) {
      console.log(error);
    }
  }

  renderUserList(users) {
    return (
      <Card containerStyle={styles.card}>
        {users.length == 0 && (
          <Text style={styles.largeHeader}>Organization Users</Text>
        )}
        {users.length != 0 && (
          <ScrollView>
            <TouchableOpacity
              style={[
                styles.accordionToggle,
                this.state.userListToggled && styles.accordionToggleOpen,
              ]}
              onPress={() => {
                this.onToggleUserList(this.state.userListToggled);
              }}>
              <Text style={styles.accordionLabel}>Organization Users</Text>
              {!this.state.userListToggled && (
                <FontAwesome
                  style={styles.accordionIndicator}
                  name="chevron-left"
                  size={20}
                  color="#ffffff"
                />
              )}
              {this.state.userListToggled && (
                <FontAwesome
                  style={styles.accordionIndicator}
                  name="chevron-down"
                  size={20}
                  color="#ffffff"
                />
              )}
            </TouchableOpacity>

            <View
              style={!this.state.userListToggled && styles.accordionListClosed}>
              <List>
                {users.map(user => (
                  <ListItem
                    containerStyle={styles.listitem}
                    titleStyle={styles.listItemText}
                    title={`${user.email}`}
                    key={'user' + user.id}
                    onPress={() => this.onEditUser(user)}
                  />
                ))}
              </List>
            </View>
          </ScrollView>
        )}
      </Card>
    );
  }

  renderUserForm() {
    return (
      <KeyboardAvoidingView behavior="padding">
        <Card containerStyle={styles.card}>
          <Text style={styles.largeHeader}>Add New User</Text>

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
                this.addOrganizationUser(this.state.organization);
              }}>
              <Text style={styles.buttonText}>CREATE USER</Text>
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
            <Text style={styles.largeHeader}>K But...</Text>
            <Text style={styles.text}>
              This will delete ALL users, tournaments, games... need I go on?
              THE WORLD.
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

  renderOrganizationForm() {
    return (
      <View>
        <Card containerStyle={styles.card}>
          <Text style={styles.formLabel}>Organization Name:</Text>
          <TextInput
            name="name"
            style={styles.lighterInput}
            onChangeText={name => this.onSetField({name})}
            placeholderTextColor="#fff"
            placeholder="Organization Name"
            underlineColorAndroid="transparent"
            value={this.state.name}
          />
        </Card>

        <View style={styles.buttonPair}>
          <TouchableOpacity
            style={styles.buttonPairButton}
            onPress={() => {
              this.updateOrganization();
            }}>
            <Text style={styles.buttonText}>UPDATE</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.buttonPairButton}
            onPress={() => {
              this.onDeleteOrganizationConfirm();
            }}>
            <Text style={styles.deletebuttonText}>DELETE</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  render() {
    let users = this.state.users;
    return (
      <View style={styles.scrollContainer}>
        {this.renderModal()}
        <ScrollView style={{flex: 2}}>
          {this.renderOrganizationForm()}
          {users.length != 0 && this.renderUserList(users)}
          {this.renderUserForm()}
        </ScrollView>
      </View>
    );
  }
}

export default OrganizationDetail;
