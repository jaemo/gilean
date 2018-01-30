import React from "react";
import { AsyncStorage } from "react-native";
import { View  } from "react-native";
import { Card, Button, Text  } from "react-native-elements";
import { onSignOut, getCreds  } from "../auth";
import styles from '../stylesheets/style';


export const handleSignOut = (navigation) => {
  onSignOut()
  .then(res => {
    console.log("SignOut Response " + res);
    navigation.navigate("SignedOut")
  })
};

export const renderView = () => {
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

export default ({ navigation }) => (
  <View style={styles.scrollContainer}>
    <Button
      backgroundColor="#03A9F4"
      title="SIGN OUT"
      onPress={() => {
        handleSignOut(navigation)
      }}
    />
  </View>
)

