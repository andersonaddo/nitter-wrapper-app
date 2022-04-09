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
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    alignContent: "center",
    justifyContent: "center",
    margin: 16,
    flex: 1
  },
  text: {
    fontSize: 18,
    textAlign: "center"
  },
});

export default Start;
