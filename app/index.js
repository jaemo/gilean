import '../ReactotronConfig';
import React from "react";
import { Provider } from 'react-redux';
import { CREATE_ORGANIZATION, LIST_ORGANIZATIONS } from './actions/actions'
import { AppRegistry  } from 'react-native';
import { ApolloClient  } from 'apollo-client';
import { ApolloProvider  } from 'react-apollo';
import { createRootNavigator } from "./router";

import { isSignedIn } from "./auth";

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "",
      password: "",
      signedIn: false,
      checkedSignIn: false
    };

    global.api_url="https://example.com/" //your API URL
    global.token="";
  }

  componentWillMount() {
    isSignedIn()
      .then(res => {
        console.log(res);
        this.setState({ signedIn: res, checkedSignIn: true })
      })
      .catch(err => alert("An error occurred"));
  }

  render() {
    const { checkedSignIn, signedIn } = this.state;

    // If we haven't checked AsyncStorage yet, don't render anything (better ways to do this)
    if (!checkedSignIn) {
      return null;
    }

    const Layout = createRootNavigator(signedIn);
    return <Layout paddingTop="0" />
  }
}
