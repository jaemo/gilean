import React from "react";
import { AsyncStorage } from "react-native";
import { View  } from "react-native";
import { Card, Button, Text  } from "react-native-elements";
import { onSignOut, getCreds  } from "../auth";
import styles from '../stylesheets/style';


export default class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  handleSignOut = () => {
    this.props.navigation.navigate("SignedOut");
  };

 renderView = () => {
   return(
     <Card title={username}>
       <View
         style={{
           backgroundColor: "#bcbec1",
           alignItems: "center",
           justifyContent: "center",
           width: 80,
           height: 80,
           borderRadius: 40,
           alignSelf: "center",
           marginBottom: 20
         }}
       >
         <Text style={{ color: "white", fontSize: 28  }}>JD</Text>
         <Text>Organization: {organization.name}</Text>
       </View>
     </Card>
   )
 }

  render() {
    return(
      <View style={styles.scrollContainer}>
        <Button
          backgroundColor="#03A9F4"
          title="SIGN OUT"
          onPress={this.handleSignOut}
        />
      </View>
    )
  }

}
