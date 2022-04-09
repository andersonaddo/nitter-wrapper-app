import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import NitterWrapper from './NitterWrapper'
import Start from './Start'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Text } from "react-native"

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

  render() {
    return (
      <NavigationContainer linking={linking} fallback={<Text>Loading...</Text>}>
        <Stack.Navigator initialRouteName="Home">

          <Stack.Screen
            name="Start"
            component={Start}
            options={{headerShown:false}}
          />

          <Stack.Screen
            name="NitterWrapper"
            component={NitterWrapper}
            options={{headerShown:false}}
          />

        </Stack.Navigator>
      </NavigationContainer>
    )
  }
}

export default App;
