import { AsyncStorage } from "react-native";

let credentials;
export const CREDS_KEY = "credentials";

export const setLogin = (obj) => {
  username = obj.username;
  password = obj.password;
  for(p in obj){
    AsyncStorage.setItem(p, obj[p]);
  }
};

export const getCreds = async () => {
  if(credentials){
    return Promise.resolve(token);
  }
  credentials = await AsyncStorage.getItem(CREDS_KEY)
  return(credentials)
};

export const signIn = (newCredentials) => {
  credentials = newCredentials;
  return AsyncStorage.setItem(CREDS_KEY, newCredentials);
};

export const signOut = () => {
  credentials = undefined;
  return AsyncStorage.removeItem(CREDS_KEY)
};

//export async function onSignIn(){
//  try {
//    if (username !== null || password !== null){
//      password= await AsyncStorage.getItem('password');
//      username = await AsyncStorage.getItem('username');
//      let response = fetch(global.api_url + '/api/v1/authenticate', {
//        method: 'POST',
//        headers: {
//          Accept: 'application/json',
//          'Content-Type': 'application/json',
//        },
//        body: JSON.stringify({
//          email: username,
//          password: password,
//        })
//      })
//        .then((response) => {
//          //console.log("response from auth endpoint" + response)
//          let responseJson = {};
//          if(response.status != 200){
//            //return(false);
//            return({"Error": "Could not sign in"})
//          }else{
//            //console.log("Response from parsed JSON" + JSON.stringify(response));
//            return(response.json())
//          }
//        })
//        .then((responseJson) => {
//          if(responseJson){
//            let credentials = {
//              user: responseJson.user,
//              organizations: responseJson.organizations,
//              token: responseJson.jwt,
//            }
//            global.token = responseJson.jwt
//            AsyncStorage.setItem(CREDS_KEY, JSON.stringify(credentials));
//            AsyncStorage.removeItem('username');
//            AsyncStorage.removeItem('password');
//            return(responseJson)
//          }
//        })
//    }
//
//  } catch (error) {
//    // Error retrieving data
//    //
//  }
//
//
//}
//
//export async function onSignOut(){
//  //console.log("Signing Out")
//  try {
//    global.token = null;
//    AsyncStorage.removeItem(CREDS_KEY);
//    return(true);
//  } catch (error) {
//    //error logging out
//  }
//}
//
//
//export const Login = (username, password) => {
//  let response = fetch(global.api_url + '/api/v1/authenticate', {
//    method: 'POST',
//    headers: {
//      Accept: 'application/json',
//      'Content-Type': 'application/json',
//    },
//    body: JSON.stringify({
//      email: username,
//      password: password,
//    })
//  })
//  return(response);
//}
//
//export const getLoginCredentials = () => {
//  return new Promise((resolve, reject) => {
//    login_creds = AsyncStorage.multiGet(['username', 'password'])
//      .then((res =>{
//        if(res !== null){
//          let [[userField, username], [passwordField, password]] = res
//          AsyncStorage.removeItem('username');
//          AsyncStorage.removeItem('password');
//          resolve([username, password])
//        } else {
//          resolve(false);
//        }
//      }))
//    })
//}
//
//export const isSignedIn = () => {
//  //console.log("checking Sign In");
//  return new Promise((resolve, reject) => {
//    AsyncStorage.getItem(CREDS_KEY)
//      .then(res => {
//        if (res !== null) {
//          resolve(true);
//        } else {
//          resolve(false);
//        }
//      })
//      .catch(err => reject(err));
//  });
//};
