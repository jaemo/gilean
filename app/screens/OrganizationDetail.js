import React, { Component } from 'react';
import { ScrollView, TextInput,TouchableOpacity, Text } from 'react-native';
import { Tile, Card, List, ListItem } from 'react-native-elements';
import styles from '../stylesheets/style';

class OrganizationDetail extends Component {

  constructor(props){
    console.log(props)
    super(props);

    let { name } = this.props.navigation.state.params;

    this.state = {
      name: name
    }
  }

  onSetField = (field) => {
    this.setState(field)
  };

  updateOrganization = () => {
    console.log(this.state.name);
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
              this.updateOrganization()
            }}
          >
            <Text style={styles.buttonText}>UPDATE ORGANIZATION</Text>
          </TouchableOpacity>
        </Card>
      </ScrollView>
    );
  }
}

export default OrganizationDetail;

