import React from "react";
import { ScrollView, AsyncStorage, TouchableOpacity } from "react-native";
import { View  } from "react-native";
import { Card, Button, Text  } from "react-native-elements";
import { onSignOut, getCreds  } from "../auth";
import { getUsers } from "../models/users";
import styles from '../stylesheets/style';

let credentials;

export default class UsersScreen extends React.Component {
  static navigationOptions = {
    title: "Users",
  }

  constructor(){
    super()
    this.state = {
      okToRender: false
    }
  }

  onEditUser(){
    console.log("editing time!")
  }

  async componentWillMount() {
    const strCreds = await getCreds()
    credentials = await JSON.parse(strCreds)
    if(credentials === null){
      this.setState({
        okToRender: false
      })
    } else{
      this.setState({
        okToRender: true
      })
      let token = credentials.token;
      let organization_id = credentials.user.organization_id;

      let response = await fetch('https://astinus-dev.herokuapp.com/api/v1/users', {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          'Authorization': "Bearer " + token,
          'organization-id': organization_id
        },
      })
      const json = await response.json();
      this.setStateAsync({users: json, okToRender: true})
    }
  }

  setStateAsync(state) {
    return new Promise((resolve) => {
      this.setState(state, resolve)
    });
  }

  render() {

    if(this.state.okToRender !== true || this.state.users === undefined){
      return(null)
    }else{
      const users = this.state.users["users"]
      return(
        <View>
        <ScrollView contentContainerStyle={{ paddingVertical: 20 }}>
        {users.map(({ email, id, organization_id }) => (
          <Card containerStyle={styles.card} title={`${email}`}  key={id}>
            <Text>{organization_id}</Text>
            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                onEditUser()
              }}
            >
              <Text style={styles.buttonText}>EDIT USER</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.deletebutton}
            onPress={() => {
              onDeleteUser()
            }}
          >
            <Text style={styles.deletebuttonText}>DELETE USER</Text>
          </TouchableOpacity>
          </Card>
        ))}
      </ScrollView>
        </View>
      )
    }
  }
}
