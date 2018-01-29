import React from "react";
import { ScrollView, Text, Linking, View } from "react-native";
import { Card, Button } from "react-native-elements";
import { onSignOut, getCreds } from "../auth";
import styles from '../stylesheets/style';

let credentials;


export default ({ navigation }) => (
  <View style={styles.scrollContainer}>
    <ScrollView contentContainerStyle={{ paddingVertical: 20 }}>
      <Card containerStyle={styles.card}>
        <Text>My Organization</Text>
      </Card>
    <Button
      backgroundColor="#03A9F4"
      title="SIGN OUT"
      onPress={() => onSignOut().then(() => navigation.navigate("SignedOut"))}
    />
    </ScrollView>
  </View>
);

