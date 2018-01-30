import React from "react";
import { View, ScrollView, AsyncStorage, TouchableOpacity, Modal, Text } from "react-native";
import { Card, Button, List, ListItem  } from "react-native-elements";
import { isSignedIn, onSignOut, getCreds  } from "../auth";
import { getUsers } from "../models/users";
import styles from '../stylesheets/style';

export default class Organizations extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      organizations: []
    };
  }


  checkCredentials = async () => {
    try{
      let credentials = await(getCreds())
      if(credentials !== null){
        return(credentials)
      }
    } catch (error) {
      //
    }
  }

  loadOrganizations = async (token) => {
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

  async componentDidMount(){
      let fetchedCredentials = await getCreds();
      credentials = JSON.parse(fetchedCredentials);
      if(credentials){

      let response = await fetch(global.api_url + '/api/admin/organizations', {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          'Authorization': "Bearer " + credentials.token,
        },
      })

      const json = await response.json();
      this.setState({
        okToRender: true,
        organizations: json.organizations
      })
    }
    }


  onEditOrganization = (organization) => {
    this.props.navigation.navigate('OrganizationDetails', {...organization});
  }


  render(){
    let organizations = this.state.organizations;
    return (
      <View style={styles.scrollContainer}>
        <ScrollView style={{flex: 2}}>
          <List>
            {organizations.map((organization)  => (
              <ListItem
                containerStyle={styles.listitem}
                titleStyle={styles.listItemText}
                title={`${organization.name}`}
                key={organization.id}
                onPress={() => this.onEditOrganization(organization)}
              />
            ))}
          </List>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              console.log("derp")
            }}
          >
            <Text style={styles.buttonText}>CREATE ORGANIZATION</Text>
          </TouchableOpacity>

        </ScrollView>
      </View>
    )
  }
}

