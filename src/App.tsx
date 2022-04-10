import { NavigationContainer, NavigationContainerRef } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { Text } from "react-native";
import ShareMenu, { ShareCallback, ShareListener } from "react-native-share-menu";
import NitterWrapper from './NitterWrapper';
import Start from './Start';

//https://reactnavigation.org/docs/typescript/
export type RootStackParamList = {
  NitterWrapper: { url?: string };
};

const Stack = createNativeStackNavigator();

//All deep links are just going to go to NitterWrapper
//https://reactnavigation.org/docs/deep-linking/
//https://reactnavigation.org/docs/configuring-links/
const config = {
  screens: {
    NitterWrapper: {
      path: '*'
    },
  },
};

const linking = {
  prefixes: ['https://twitter.com', 'https://mobile.twitter.com', 'https://nitter.net'],
  config,
};


class App extends React.PureComponent {
  listener: ShareListener | undefined;
  navigator: any;
  hasCheckedInitial: boolean = false;


  componentDidMount() {
    this.listener = ShareMenu.addNewShareListener(this.handleShare);
  }

  componentWillUnmount() {
    this.listener?.remove()
  }

  render() {
    return (
      <NavigationContainer
        linking={linking}
        fallback={<Text>Loading...</Text>}
        ref={this.updateNavigatorReference}>
        <Stack.Navigator initialRouteName="Start">

          <Stack.Screen
            name="Start"
            component={Start}
            options={{ headerShown: false }}
          />

          <Stack.Screen
            name="NitterWrapper"
            component={NitterWrapper}
            options={{ headerShown: false }}
          />

        </Stack.Navigator>
      </NavigationContainer>
    )
  }

  updateNavigatorReference = (r?: NavigationContainerRef<{ NitterWrapper: unknown; }> | null) => {
    this.navigator = r
    if (r && !this.hasCheckedInitial) {
      this.hasCheckedInitial = true
      ShareMenu.getInitialShare(this.handleShare);
    }
  }

  handleShare: ShareCallback = (item) => {
    if (!item) {
      return;
    }

    if (typeof item.data != "string") return;

    if (!this.isValidHttpUrl(item.data)) {
      return false
    } else {
      this.navigator.navigate("NitterWrapper", { url: item.data })
    }
  }

  isValidHttpUrl(s: string) {
    let url;
    try {
      url = new URL(s);
    } catch (e) {
      return false;
    }
    return /https?/.test(url.protocol);
  }
}

export default App;
