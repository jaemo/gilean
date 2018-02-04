import {AsyncStorage} from 'react-native';

let credentials;
export const CREDS_KEY = 'credentials';

export const getCreds = async () => {
  credentials = await AsyncStorage.getItem(CREDS_KEY);
  return credentials;
};

export const persistCredentials = responseJson => {
  let credentials = {
    user: responseJson.user,
    organizations: responseJson.organizations,
    token: responseJson.jwt,
  };
  //I might lose this and make it 100% core storage...
  global.token = responseJson.jwt;

  AsyncStorage.setItem(CREDS_KEY, JSON.stringify(credentials));
};

export const onSignOut = async () => {
  try {
    credentials = undefined;
    AsyncStorage.removeItem(CREDS_KEY);
  } catch (error) {
    //
  }
};

export async function onSignIn(email, password) {
  try {
    if (email !== null || password !== null) {
      let response = fetch(global.api_url + '/api/v1/authenticate', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      });
      return response;
    }
  } catch (error) {
    console.log(error);
  }
}
