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
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import HomeStackScreen from './Pages/HomeStack';
import TestDevicesStackScreen from './Pages/TestDevicesStack';
import SettingsStackScreen from './Pages/SettingsStack';
import MetricsStackScreen from './Pages/MetricsStack';

type AppState = {title: string};
type AppProps = any;

const Tab = createBottomTabNavigator();

class App extends React.Component<AppProps, AppState> {
  constructor(props: any) {
    super(props);
  }

  render() {
    return (
        <NavigationContainer>
        <Tab.Navigator tabBarOptions={{activeTintColor: 'tomato', inactiveTintColor: 'white', style: styles.headerStyle}}
				        screenOptions={({ route }) => ({
									tabBarIcon: ({ focused, color, size }) => {
										let iconName;
				
										if (route.name === 'Race') {
											iconName = focused
												? 'car-sport'
												: 'car-sport-outline';
										} else if (route.name === 'Settings') {
											iconName = focused ? 'settings' : 'settings-outline';
										} else if (route.name === 'Test Devices') {
											iconName = focused ? 'bluetooth' : 'bluetooth-outline';
										} else if (route.name === 'Metrics') {
											iconName = focused ? 'analytics-sharp' : 'analytics';
										}
				
										// You can return any component that you like here!
										return <Ionicons name={iconName} size={size} color={color} />;
									},
								})}
				>
          <Tab.Screen name="Race" component={HomeStackScreen}/>
					<Tab.Screen name="Metrics" component={MetricsStackScreen}/>
		  		<Tab.Screen name="Test Devices" component={TestDevicesStackScreen}/>
					<Tab.Screen name="Settings" component={SettingsStackScreen}/>
        </Tab.Navigator>
      </NavigationContainer>
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
// const styles = StyleSheet.create({
//   scrollView: {
//     backgroundColor: Colors.lighter,
//   },
//   engine: {
//     position: 'absolute',
//     right: 0,
//   },
//   body: {
//     backgroundColor: Colors.white,
//   },
//   sectionContainer: {
//     marginTop: 32,
//     paddingHorizontal: 24,
//   },
//   sectionTitle: {
//     fontSize: 24,
//     fontWeight: '600',
//     color: Colors.black,
//   },
//   sectionDescription: {
//     marginTop: 8,
//     fontSize: 18,
//     fontWeight: '400',
//     color: Colors.dark,
//   },
//   highlight: {
//     fontWeight: '700',
//   },
//   footer: {
//     color: Colors.dark,
//     fontSize: 12,
//     fontWeight: '600',
//     padding: 4,
//     paddingRight: 12,
//     textAlign: 'right',
//   },
// });

export default App;
