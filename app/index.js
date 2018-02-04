import React from "react";
import { AppRegistry, Alert  } from 'react-native';
import { createRootNavigator } from "./router";
import { getCreds, persistCredentials, onSignIn, onSignOut, isSignedIn } from "./auth";

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      signedIn: false,
      checkedSignIn: false
    };

    global.api_url="http://192.168.1.200:4000" //your API URL
    //global.api_url="https://astinus-dev.herokuapp.com" //your API URL
  }

  handleChangeLoginState = (loggedIn = false) => {
    if(!loggedIn){
      global.token="";
      onSignOut();
    }
    this.setState({ loggedIn });
  };

  apiAuthenticate = async (email, password) => {
    let auth = await onSignIn(email, password)
    let json = await auth.json();
    if(auth.status != 200){
      this.handleChangeLoginState(false);
      Alert.alert('Error', "Could not log in");
    } else{
      persistCredentials(json)
      this.handleChangeLoginState(true);
    }
    return json;
  }

  async componentWillMount() {
    let fetchedCredentials = await getCreds();
    credentials = await JSON.parse(fetchedCredentials);
    if(credentials){
      this.setState({ token: credentials.token })
      this.handleChangeLoginState(true);
    }
    this.setState({
      checkedSignIn: true
    })
  }

  render() {
    const { checkedSignIn, signedIn } = this.state;
    let token = this.state.token;

    // If we haven't checked AsyncStorage yet, don't render anything (better ways to do this)
    if (!checkedSignIn) {
      return null;
    }

    const Layout = createRootNavigator(this.state.loggedIn);

    return <Layout paddingTop="0" screenProps={{ token: token, loginHandler: this.apiAuthenticate, changeLoginState: this.handleChangeLoginState }} />
  }
}
