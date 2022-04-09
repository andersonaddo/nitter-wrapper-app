import React from 'react';
import { Text, StyleSheet, View, Linking, Share } from 'react-native';
import { WebView } from 'react-native-webview';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import Icon from 'react-native-vector-icons/FontAwesome';



//https://reactnavigation.org/docs/typescript/
type Props = NativeStackScreenProps<{}>

class NitterWrapper extends React.PureComponent<Props> {

  webview: WebView | null = null;

  //TODO: override hardware back button
  //https://reactnavigation.org/docs/custom-android-back-button-handling/
  // will have to make this a functional component so I can make use of 
  //https://reactnavigation.org/docs/function-after-focusing-screen/#triggering-an-action-with-the-usefocuseffect-hook
  render() {
    let fullUrl = "https://twitter.com" + this.props.route.path

    return (
      <View style={styles.container}>

        <WebView
          source={{ uri: 'https://nitter.net' + this.props.route.path }}
          style={{ flex: 1 }}
          ref = {r => this.webview = r}
        />

        <View style={styles.footer}>
          <Icon
            name="step-backward"
            size={20}
            color="black"
            onPress={() => this.webview?.goBack()}
          />
          <Icon
            name="share-alt"
            size={20}
            color="black"
            onPress={() => {
              Share.share({message: fullUrl})
            }}
          />
          <Icon
            name="globe"
            size={20}
            color="black"
            onPress={() => {
              Linking.canOpenURL(fullUrl)
                .then(canOpen => Linking.openURL(fullUrl))
                .catch(err => console.log(err))
            }}
          />
          <Icon
            name="step-forward"
            size={20}
            color="black"
            onPress={() => this.webview?.goForward()}
          />
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  footer: {
    height: 30,
    backgroundColor: "orange",
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center"
  },
  container: {
    alignContent: "center",
    justifyContent: "center",
    flex: 1
  },
});

export default NitterWrapper;
