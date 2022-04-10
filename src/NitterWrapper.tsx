import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import React from 'react';
import { Linking, Share, StyleSheet, TouchableOpacity, View, Text, Alert, ToastAndroid } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import OctIcon from 'react-native-vector-icons/Octicons';
import { WebView, WebViewNavigation } from 'react-native-webview';
import { WebViewHttpErrorEvent } from 'react-native-webview/lib/WebViewTypes';
import { RootStackParamList } from "./App";

//TODO: override hardware back button
//https://reactnavigation.org/docs/custom-android-back-button-handling/
// will have to make this a functional component so I can make use of 
//https://reactnavigation.org/docs/function-after-focusing-screen/#triggering-an-action-with-the-usefocuseffect-hook


//https://reactnavigation.org/docs/typescript/
type Props = NativeStackScreenProps<RootStackParamList, "NitterWrapper">
type State = { canGoBack: boolean, canGoForward: boolean, linkIsOpenableInBrowser: boolean }
class NitterWrapper extends React.PureComponent<Props, State> {

  webview: WebView | null = null;
  twitterStub = "https://twitter.com"
  currentUrl = this.twitterStub
  state = { canGoBack: false, canGoForward: false, linkIsOpenableInBrowser: false }

  render() {
    return (
      <View style={styles.container}>

        {/* Couldn't get refresh control to properly work, sorry */}
        <TouchableOpacity
          style={styles.header}
          onPress={() => this.webview?.reload()}>
          <Text style={styles.headerText}>Refresh</Text>
        </TouchableOpacity>

        <WebView
          style={{ flex: 1 }}
          source={{ uri: 'https://nitter.net' + this.getPath() }}
          ref={r => this.webview = r}
          onNavigationStateChange={this.updateStateWithNewWebviewNav}
          onHttpError={this.onHttpError}
          incognito={true}
        />

        <View style={styles.footer}>
          <Icon
            name="step-backward"
            size={25}
            color={this.getIconColor(this.state.canGoBack)}
            onPress={() => this.webview?.goBack()}
          />

          <Icon
            name="share-alt"
            size={25}
            color={this.getIconColor(true)}
            onPress={() => Share.share({ message: this.nitterToTwitter(this.currentUrl) })}
          />

          <OctIcon
            name="globe"
            size={25}
            color={this.getIconColor(this.state.linkIsOpenableInBrowser)}
            onPress={this.openLinkInBrowser}
          />

          <Icon
            name="step-forward"
            size={25}
            color={this.getIconColor(this.state.canGoForward)}
            onPress={() => this.webview?.goForward()}
          />
        </View>
      </View>
    )
  }

  getPath = (): string => {
    //If this was opened due to a deep link...
    if (this.props.route.path) return this.props.route.path

    //Else it was opened due to a share
    if (this.props.route.params.url) return new URL(this.props.route.params.url).pathname;

    return "/"
  }

  nitterToTwitter = (url: string): string => {
    try {
      const urlObj = new URL(url);
      if (urlObj.host != "nitter.net") return url.trim()
      return this.twitterStub + urlObj.pathname.trim()
    } catch (e) {
      return "";
    }
  }

  // Would love for this to work with any link, but twitter and nitter links would 
  // just end up redirecting straight back to this app
  linkCanBeOpenedInBrowser = (url: string): boolean => {
    try {
      const urlObj = new URL(url);
      const invalidHosts = ['mobile.twitter.com', 'twitter.com', 'nitter.net']
      return !invalidHosts.includes(urlObj.host)
    } catch (e) {
      return false;
    }
  }

  openLinkInBrowser = () => {
    if (this.linkCanBeOpenedInBrowser(this.currentUrl)) {
      Linking.canOpenURL(this.currentUrl)
        .then(canOpen => {
          if (canOpen) Linking.openURL(this.currentUrl)
        })
        .catch(err => console.log(err))
    } else {
      Alert.alert(
        "No can do",
        "If you try to redirect a twitter or nitter link to your browser," +
        " it'll redirect straight back to this app. Try this with a link with a different domain."
      )
    }
  }

  updateStateWithNewWebviewNav = (event: {url: string, canGoBack: boolean, canGoForward: boolean}) => {
    this.currentUrl = event.url
    this.setState({
      canGoBack: event.canGoBack,
      canGoForward: event.canGoForward,
      linkIsOpenableInBrowser: this.linkCanBeOpenedInBrowser(event.url)
    })
  }

  onHttpError = (event: WebViewHttpErrorEvent) => {
    const { nativeEvent } = event;
    ToastAndroid.show(`Encountered http error: ${nativeEvent.statusCode}`, ToastAndroid.SHORT);
    this.updateStateWithNewWebviewNav(nativeEvent)
  }

  getIconColor = (isEnabled: boolean) => isEnabled ? "black" : "grey"
}

const styles = StyleSheet.create({
  footer: {
    height: 35,
    backgroundColor: "orange",
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center"
  },
  header: {
    height: 25,
    backgroundColor: "black",
    color: "orange",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center"
  },
  headerText: {
    color: "orange"
  },
  container: {
    alignContent: "center",
    justifyContent: "center",
    flex: 1,
    backgroundColor: "silver"
  },
});

export default NitterWrapper;
