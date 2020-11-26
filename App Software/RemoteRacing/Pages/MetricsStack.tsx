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
import Metrics from "./Metrics"

type AppState = {title: string};
type AppProps = any;

const MetricsStack = createStackNavigator();

class MetricsStackScreen extends React.Component<AppProps, AppState> {
  constructor(props: any) {
    super(props);
  }

  render() {
    return (
        <MetricsStack.Navigator screenOptions={{headerStyle: {	backgroundColor: '#333333'}, headerTintColor: '#ffffff'}}>
					<MetricsStack.Screen name="Metrics" component={Metrics}/>
        </MetricsStack.Navigator>
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

export default MetricsStackScreen;
