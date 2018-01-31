import React, { Component } from 'react';
import { View, ScrollView, TextInput,TouchableOpacity, Text } from 'react-native';
import { Tile, Card, List, ListItem } from 'react-native-elements';
import styles from '../stylesheets/style';

class OrganizationDetail extends Component {

  constructor(props){
    super(props);

    let { id, name } = this.props.navigation.state.params;

    this.state = {
      token: this.props.screenProps.token,
			id: id,
      name: name
    }
  }

  onSetField = (field) => {
    this.setState(field)
  };

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
      if(response.status == "201"){
        this.props.navigation.goBack();
        return(response)
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
      if(response.status == "201"){
        this.props.navigation.goBack();
        return(response)
      }
    } catch(error) {
      //
    }
  };

  render() {
    return (
      <ScrollView contentContainerStyle={styles.scrollview}>
        <Card containerStyle={styles.card}>
          <TextInput
            name="name"
            style={styles.lighterInput}
            onChangeText={(name) => this.onSetField({name})}
            placeholderTextColor="#fff"
            placeholder="Organization Name"
            underlineColorAndroid='transparent'
            value={this.state.name}
          />
          <View containerStyle={styles.buttonPair}>
              <TouchableOpacity
                style={styles.buttonPairButton}
                onPress={() => {
                  this.updateOrganization()
                }}
              >
                <Text style={styles.buttonText}>UPDATE ORGANIZATION</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.buttonPairButton}
                onPress={() => {
                  this.deleteOrganization()
                }}
              >
                <Text style={styles.deletebuttonText}>DELETE ORGANIZATION</Text>
              </TouchableOpacity>
          </View>
        </Card>
      </ScrollView>
    );
  }
}

export default OrganizationDetail;

