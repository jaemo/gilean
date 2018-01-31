import React, { Component } from 'react';
import { ScrollView, TextInput,TouchableOpacity, Text } from 'react-native';
import { Tile, Card, List, ListItem } from 'react-native-elements';
import styles from '../stylesheets/style';

class OrganizationNew extends Component {

  constructor(props){
    console.log(props)
    super(props);
    this.state = {
      token: this.props.screenProps.token,
    }
  }

  onSetField = (field) => {
    this.setState(field)
  };

  onCreateOrganization = async () => {
    try{
      let response = await fetch(global.api_url + '/api/admin/organizations', {
        method: 'POST',
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
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              this.onCreateOrganization()
            }}
            >
            <Text style={styles.buttonText}>CREATE ORGANIZATION</Text>
          </TouchableOpacity>
        </Card>
      </ScrollView>
    );
  }
}

export default OrganizationNew;
