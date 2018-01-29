import React from "react";
import { View, ScrollView, AsyncStorage, TouchableOpacity, Modal, Text } from "react-native";
import { Card, Button, List, ListItem  } from "react-native-elements";
import { isSignedIn, onSignOut, getCreds  } from "../auth";
import { getUsers } from "../models/users";
import styles from '../stylesheets/style';

export const onEditUser = () => {
  console.log("editing time!")
}


export async function checkCredentials() {
  try{
    let credentials = await(getCreds())
    if(credentials !== null){
      console.log(credentials);
      return(credentials)
    }
  } catch (error) {
    //
  }

}
export async function loadOrganizations(token){
  let response = await fetch(global.api_url + '/api/admin/organizations', {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'Authorization': "Bearer " + token,
    },
  })
  const json = await response.json();
}

export async function componentDidMount(){
  console.log('organizations mounted')
  checkCredentials()

  //    strCreds = await getCreds()
  //    credentials = await JSON.parse(strCreds)
  //    if(credentials === null){
  //      this.setState({
  //        okToRender: false
  //      })
  //} else{
  // fetcher les organizations
  //let token = global.token || credentials.token;
  //let organization_id = credentials.user.organization_id;

  //let response = await fetch(global.api_url + '/api/admin/organizations', {
  //  method: 'GET',
  //  headers: {
  //    Accept: 'application/json',
  //    'Content-Type': 'application/json',
  //    'Authorization': "Bearer " + token,
  //  },
  //})

  //const json = await response.json();
  //this.setState({
  //  okToRender: true
  //})
  //this.setStateAsync({organizations: json.organizations, okToRender: true})
  // }
}


export const onEditOrganization = (organization) => {
  this.props.navigation.navigate('OrganizationDetails', {...organization});
}


export default ({ navigation }) => (
  <View>
    <Text>Organizations</Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          checkCredentials()
        }}
      >
      </TouchableOpacity>
  </View>
  //<View style={styles.scrollContainer}>
  //  <ScrollView style={{flex: 2}}>
  //    <List>
  //    {organizations.map((organization)  => (
  //      <ListItem
  //        containerStyle={styles.listitem}
  //        titleStyle={styles.listItemText}
  //        title={`${organization.name}`}
  //        key={organization.id}
  //        onPress={() => this.onEditOrganization(organization)}
  //      />
  //    ))}
  //  <Text>Oops {strCreds}</Text>
  //  <Text>Ok To render: {String(okToRender)}</Text>
  //  <Text>IsSignedIn: {String(signedIn)}</Text>
  //  <Text>Token: {String(token)}</Text>
  //  </List>
  //  <TouchableOpacity
  //    style={styles.button}
  //    onPress={() => {
  //      console.log("derp")
  //    }}
  //  >
  //    <Text style={styles.buttonText}>CREATE ORGANIZATION</Text>
  //  </TouchableOpacity>

  //  </ScrollView>
  //</View>
)
