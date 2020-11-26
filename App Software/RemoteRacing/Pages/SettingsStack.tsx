/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */
import 'react-native-gesture-handler';
import React from 'react';
import {
  StyleSheet,
} from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import Settings from "./Settings"
import PlayerName from './Settings/PlayerName'
import DeviceConnect from './Settings/DeviceConnect'
import GPSSettings from './Settings/GPSSettings'
import IMUSettings from './Settings/IMUSettings'

type AppState = {title: string};
type AppProps = any;

const SettingsStack = createStackNavigator();

class SettingsStackScreen extends React.Component<AppProps, AppState> {
  constructor(props: any) {
    super(props);
  }

  render() {
    return (
        <SettingsStack.Navigator screenOptions={{headerStyle: {	backgroundColor: '#333333'}, headerTintColor: '#ffffff'}}>
					<SettingsStack.Screen name="Settings" component={Settings}/>
					<SettingsStack.Screen name="Player Name" component={PlayerName}/>
					<SettingsStack.Screen name="Device Connect" component={DeviceConnect}/>
		  		<SettingsStack.Screen name="GPS Settings" component={GPSSettings}/>
					<SettingsStack.Screen name="IMU Settings" component={IMUSettings}/>
        </SettingsStack.Navigator>
    )
  }
}

const styles = StyleSheet.create({
  test: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  button: {
    backgroundColor: '#FFFFFF',
    opacity: 0.9,
    color: "white",
    padding: 10,
    borderRadius: 10,
    height: 45,
    width: 150,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 10,

  },
  buttonText: {
    color: "#333333",
    fontSize: 20,
  },
  title: {
    fontSize: 20,
    color: "#FFFFFF",
  },
  backgroundImage: {
    flex: 1,
    // resizeMode: "cover",
    // justifyContent: "center"
  },
  connection: {
    width: 200,
	},
	headerStyle: {
		backgroundColor: '#333333',
	}
})

export default SettingsStackScreen;
