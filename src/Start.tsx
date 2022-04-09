import React from 'react';
import { StyleSheet, View, Text } from 'react-native';



//https://developer.android.com/training/app-links/verify-site-associations#unverified-apps
class Start extends React.PureComponent {

  render() {
    return (
      <View style={styles.container}>
        <Text style = {styles.text}>
          Welcome to the Nitter Wrapper!
        </Text>

        <Text style = {styles.text}>
          Since we're a third party app, we can't automatically deep link to twitter,
          you might have to change some settings to make it work on your android device.
        </Text>

        <Text style = {styles.text}>
          This app can also open twitter links in Nitter if you share links to it through Android's 
          share dialog.
        </Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    alignContent: "center",
    justifyContent: "center",
    padding: 16,
    flex: 1,
    backgroundColor: "silver"
  },
  text: {
    marginTop: 8,
    fontSize: 16,
    textAlign: "center",
    color: "black"
  },
});

export default Start;
