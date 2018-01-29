import React from "react";
import { Platform, StatusBar } from "react-native";
import { StackNavigator, TabNavigator } from "react-navigation";
import { FontAwesome } from "react-native-vector-icons";

import SignIn from "./screens/SignIn";
import Home from "./screens/Home";
import ProfileScreen from "./screens/ProfileScreen";
import Organizations from "./screens/Organizations";
import OrganizationDetail from "./screens/OrganizationDetail";

import Users from "./screens/Users";

const headerStyle = {
  marginTop: 0,  // Platform.OS === "android" ? StatusBar.currentHeight : 0,
  backgroundColor: "#666",
  height: 20,
};


export const OrganizationStack = StackNavigator({
  OrganizationFeed: {
    screen: Organizations,
    navigationOptions: {
      headerStyle: {
        backgroundColor: '#222',
      },
      headerTitleStyle: {
        color: '#fff',
      }
    }
  },
  OrganizationDetails: {
    screen: OrganizationDetail,
    navigationOptions: ({ navigation }) => ({
      title: `${navigation.state.params.name.toUpperCase()}`,
      headerStyle: {
        backgroundColor: '#222',
      },
      headerTitleStyle: {
        color: '#fff',
      },
      cardStyle: {
        backgroundColor: "#333",
      }
    })
  }
})

export const SignedOut = StackNavigator({
  SignIn: {
    screen: SignIn,
    navigationOptions: {
      headerStyle
    }
  }
});

export const SignedIn = TabNavigator(
  {
    Organizations: {
      screen: OrganizationStack,
      navigationOptions: {
        tabBarLabel: "Organizations",
        tabBarIcon: ({ tintColor }) =>
        <FontAwesome name="sitemap" size={20} color={tintColor} />
      }
    },
    //Users: {
    //  screen: Users,
    //  navigationOptions: {
    //    tabBarLabel: "Users",
    //    tabBarIcon: ({ tintColor }) =>
    //    <FontAwesome name="users" size={20} color={tintColor} />
    //  }
    //},
    ProfileScreen: {
      screen: ProfileScreen,
      navigationOptions: {
        tabBarLabel: "Profile",
        tabBarIcon: ({ tintColor }) =>
        <FontAwesome name="user-circle" size={20} color={tintColor} />
      }
    },
    //SignOutLink: {
    //  screen: SignedOut,
    //  navigationOptions: {
    //    tabBarLabel: "Sign Out",
    //    tabBarIcon: ({ tintColor }) =>
    //    <FontAwesome name="sign-out" size={20} color={tintColor} />
    //  }
    //},
  },
  {
    tabBarPosition: 'top',
    activeBackgroundColor: "#666666",
    inactiveBacgroundColor: "#111111",
    tabBarOptions: {
      activeTintColor: "#ffffff",
      showIcon: true,
      iconStyle: {
        height: 20,
        width: 20,
      },
      style: {
        paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
        backgroundColor: "#666666",
      }
    }
  }
);


export const createRootNavigator = (signedIn = false) => {
  return StackNavigator(
    {
      SignedIn: {
        screen: SignedIn,
        navigationOptions: {
          gesturesEnabled: false
        }
      },
      SignedOut: {
        screen: SignedOut,
        navigationOptions: {
          gesturesEnabled: false
        }
      }
    },
    {
      headerMode: "none",
      mode: "modal",
      initialRouteName: signedIn ? "SignedIn" : "SignedOut"
    }
  );
};
