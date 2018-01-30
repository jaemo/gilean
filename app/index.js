import React from "react";
import { AppRegistry  } from 'react-native';
import { createRootNavigator } from "./router";
import { isSignedIn } from "./auth";

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      signedIn: false,
      checkedSignIn: false
    };

    global.api_url="https://astinus-dev.herokuapp.com/" //your API URL
    global.token="";
  }

  handleChangeLoginState = (loggedIn = false) => {
    this.setState({ loggedIn  });

  };

  componentWillMount() {
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

    return <Layout paddingTop="0" screenProps={{ changeLoginState: this.handleChangeLoginState }} />
  }
}
