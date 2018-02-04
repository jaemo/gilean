import React from 'react';
import {
  ActivityIndicator,
  View,
  ScrollView,
  AsyncStorage,
  TouchableOpacity,
  Modal,
  Text,
} from 'react-native';
import {Card, Button, List, ListItem} from 'react-native-elements';
import {isSignedIn, onSignOut, getCreds} from '../auth';
import {getUsers} from '../models/users';
import styles from '../stylesheets/style';

export default class Organizations extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      organizations: [],
    };
  }

  componentDidMount() {
    this.onOrganizationsChange();
  }

  loadOrganizations = async () => {
    let fetchedCredentials = await getCreds();
    credentials = JSON.parse(fetchedCredentials);

    if (credentials) {
      let response = await fetch(global.api_url + '/api/admin/organizations', {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + credentials.token,
        },
      });
      const json = await response.json();
      return json;
    }
  };

  onOrganizationsChange = async () => {
    let json = await this.loadOrganizations();

    this.setState({
      okToRender: true,
      organizations: json.organizations,
    });
  };

  onEditOrganization = organization => {
    this.props.navigation.navigate('OrganizationDetails', {
      ...organization,
      refreshHandler: this.onOrganizationsChange,
    });
  };

  onNewOrganization = () => {
    this.props.navigation.navigate('OrganizationNew', {
      refreshHandler: this.onOrganizationsChange,
    });
  };

  render() {
    let organizations = this.state.organizations;

    return (
      <View style={styles.scrollContainer}>
        {organizations.length == 0 && (
          <ActivityIndicator size="large" color="#ffffff" />
        )}
        {organizations.length != 0 && (
          <ScrollView style={{flex: 2}}>
            <List>
              {organizations.map(organization => (
                <ListItem
                  containerStyle={styles.listitem}
                  titleStyle={styles.listItemText}
                  title={`${organization.name}`}
                  key={organization.id}
                  onPress={() => this.onEditOrganization(organization)}
                />
              ))}
            </List>
          </ScrollView>
        )}
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            this.onNewOrganization();
          }}>
          <Text style={styles.buttonText}>CREATE ORGANIZATION</Text>
        </TouchableOpacity>
      </View>
    );
  }
}
