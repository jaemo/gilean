import React from "react";
import { AppRegistry  } from 'react-native';
import { createRootNavigator } from "./router";
import { getCreds, persistCredentials, onSignIn, signOut, isSignedIn } from "./auth";

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      signedIn: false,
      checkedSignIn: false
    };

    global.api_url="http://192.168.1.200:4000/" //your API URL
  }

  handleChangeLoginState = (loggedIn = false) => {
    if(!loggedIn){
      global.token="";
      signOut();
    }
    this.setState({ loggedIn });
  };

  apiAuthenticate = async (email, password) => {
    let auth = await onSignIn(email, password)
    let json = await auth.json();
    persistCredentials(json)
    this.handleChangeLoginState(true);
  }

  async componentWillMount() {
    let fetchedCredentials = await getCreds();
    credentials = await JSON.parse(fetchedCredentials);
    if(credentials){
      this.handleChangeLoginState(true);
    }
    this.setState({
      checkedSignIn: true
    })
  }

  render() {
    const { checkedSignIn, signedIn } = this.state;

    // If we haven't checked AsyncStorage yet, don't render anything (better ways to do this)
    if (!checkedSignIn) {
      return null;
    }

    const Layout = createRootNavigator(this.state.loggedIn);

    return <Layout paddingTop="0" screenProps={{ loginHandler: this.apiAuthenticate, changeLoginState: this.handleChangeLoginState }} />
  }
}
