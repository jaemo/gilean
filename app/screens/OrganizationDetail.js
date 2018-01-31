import React, { Component } from 'react';
import { KeyboardAvoidingView, Modal, View, ScrollView, TextInput,TouchableOpacity, Text } from 'react-native';
import { Tile, Card, List, ListItem } from 'react-native-elements';
import { isSignedIn, onSignOut, getCreds  } from "../auth";
import styles from '../stylesheets/style';

class OrganizationDetail extends Component {

  constructor(props){
    super(props);

    let { id, name } = this.props.navigation.state.params;

    this.state = {
      token: this.props.screenProps.token,
      id: id,
      name: name,
      modalVisible: false,
      users: [],
      user: {
        email: "",
        password: "",
        password_confirmation: "",
      }
    }
  }

  onSetField = (field) => {
    this.setState(field)
  };

  getUsers = async (token) => {
    let fetchedCredentials = await getCreds();
    credentials = JSON.parse(fetchedCredentials);
    if(credentials){

      let response = await fetch(global.api_url + '/api/v1/users', {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          'Authorization': "Bearer " + credentials.token,
          'organization-id': this.state.id,
        },
      })

      const json = await response.json();
      this.setState({
        okToRender: true,
        users: json.users
      })
    }
  }

  onDeleteOrganizationConfirm = () => {
    this.setState({
      modalVisible: true,
    })
  }

  onDeleteHandlerCancel = () => {
    this.setState({
      modalVisible: false,
    })
  }

  deleteOrganization = async () => {
    try{
      let response = await fetch(global.api_url + '/api/admin/organizations/' + this.state.id, {
        method: 'DELETE',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          'Authorization': "Bearer " + this.state.token,
        },
      })
      if(response.status == 204){
        this.props.navigation.state.params.refreshHandler();
        this.props.navigation.goBack();
      }
    } catch(error) {
      //
    }
  }

  updateOrganization = async () => {
    try{
      let response = await fetch(global.api_url + '/api/admin/organizations/' + this.state.id, {
        method: 'PUT',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          'Authorization': "Bearer " + this.state.token,
        },
        body: JSON.stringify({
          organization: {
            name: this.state.name,
          }
        })
      })

      if(response.status == 200){
        this.props.navigation.state.params.refreshHandler();
        this.props.navigation.goBack();
      }
    } catch(error) {
      //
    }
  };

  async componentDidMount(){

  }

  render() {
    let users = this.state.users;
    return (
      <ScrollView contentContainerStyle={styles.scrollview}>
        <Modal
          visible={this.state.modalVisible}
          animationType={'slide'}
          transparent={true}
          onRequestClose={() => this.onDeleteHandlerCancel()}
          style={styles.deleteModal}
        >
          <View style={styles.deleteWarningDialog}>

            <Card containerStyle={styles.deleteWarningCard}>
              <Text style={styles.warningHeader}>K But...</Text>
              <Text style={styles.text}>This will delete ALL users, tournaments, games... need I go on? THE WORLD.</Text>
  <View style={styles.dialogButtons}>
    <TouchableOpacity
      style={styles.buttonPairButton}
      onPress={() => {
        this.onDeleteHandlerCancel()
      }}
    >
      <Text style={styles.buttonText}>CHECK AGAIN!</Text>
    </TouchableOpacity>
    <TouchableOpacity
      style={styles.buttonPairButton}
onPress={() => {
  this.deleteOrganization()
}} >
<Text style={styles.deletebuttonText}>DIE, HERETIC!</Text>
    </TouchableOpacity>
  </View>
  </Card>
</View>
  </Modal>
  <Card containerStyle={styles.card}>
    <Text style={styles.formLabel}>Organization Name:</Text>
    <TextInput
      name="name"
      style={styles.lighterInput}
      onChangeText={(name) => this.onSetField({name})}
      placeholderTextColor="#fff"
      placeholder="Organization Name"
      underlineColorAndroid='transparent'
      value={this.state.name}
    />
  </Card>
  <View style={styles.buttonPair}>
    <TouchableOpacity
      style={styles.buttonPairButton}
      onPress={() => {
        this.updateOrganization()
      }}
    >
      <Text style={styles.buttonText}>UPDATE</Text>
    </TouchableOpacity>
    <TouchableOpacity
      style={styles.buttonPairButton}
      onPress={() => {
        this.onDeleteOrganizationConfirm()
      }}
    >
      <Text style={styles.deletebuttonText}>DELETE</Text>
    </TouchableOpacity>
  </View>

  <KeyboardAvoidingView behavior="padding">
  <Card containerStyle={styles.card}>
    <Text>Organization Users</Text>

    <Text style={styles.formLabel}>Email:</Text>
    <TextInput
      name="name"
      style={styles.lighterInput}
      onChangeText={(email) => this.onSetField({email})}
      placeholderTextColor="#fff"
      placeholder="User Email"
      underlineColorAndroid='transparent'
      value={this.state.user.email}
    />

    <Text style={styles.formLabel}>Password:</Text>
    <TextInput
      name="name"
      style={styles.lighterInput}
      onChangeText={(password) => this.onSetField({password})}
      placeholderTextColor="#fff"
      placeholder="Password"
      underlineColorAndroid='transparent'
      value={this.state.user.password}
    />

    <Text style={styles.formLabel}>Password Confirmation:</Text>
    <TextInput
      name="name"
      style={styles.lighterInput}
      onChangeText={(password_confirmation) => this.onSetField({password_confirmation})}
      placeholderTextColor="#fff"
      placeholder="Confirm Password"
      underlineColorAndroid='transparent'
      value={this.state.user.password_confirmation}
    />


    { users.length != 0 &&
        <ScrollView style={{flex: 2}}>
          <List>
            {users.map((user)  => (
              <ListItem
                containerStyle={styles.listitem}
                titleStyle={styles.listItemText}
                title={`${user.email}`}
                key={"user"+user.id}
                onPress={() => this.onEditUser(user)}
              />
            ))}
          </List>

        </ScrollView> }
      </Card>
    <View style={{ height: 60  }} />
  </KeyboardAvoidingView>
    </ScrollView>
);
}
}

export default OrganizationDetail;

