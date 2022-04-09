import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import React from 'react';
import { Linking, Share, StyleSheet, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { WebView } from 'react-native-webview';
import {RootStackParamList} from "./App"



//https://reactnavigation.org/docs/typescript/
type Props = NativeStackScreenProps<RootStackParamList, "NitterWrapper">

class NitterWrapper extends React.PureComponent<Props> {

  webview: WebView | null = null;

  //TODO: override hardware back button
  //https://reactnavigation.org/docs/custom-android-back-button-handling/
  // will have to make this a functional component so I can make use of 
  //https://reactnavigation.org/docs/function-after-focusing-screen/#triggering-an-action-with-the-usefocuseffect-hook
  render() {
    let fullUrl = "https://twitter.com" + this.getUrlData()
    return (
      <View style={styles.container}>

        <WebView
          source={{ uri: 'https://nitter.net' + this.getUrlData() }}
          style={{ flex: 1 }}
          ref = {r => this.webview = r}
          incognito={true}
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

  getUrlData = () : string => {
    //If this was opened due to a deep link...
    if (this.props.route.path) return this.props.route.path
    
    //Else it was opened due to a share
    if (this.props.route.params.url) return new URL(this.props.route.params.url).pathname; 

    return "/"
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
