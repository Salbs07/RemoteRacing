import { RevealFromBottomAndroid } from '@react-navigation/stack/lib/typescript/src/TransitionConfigs/TransitionPresets';
import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';

type AppState = {title: string};
type NavigationType = any;

const backgroundImage = "../Assets/Images/main_background_2.jpeg";

class Home extends React.Component<NavigationType, AppState> {
  constructor(props: any) {
    super(props);
    // let self = this;
    // setInterval(() => {fetch('http://45.79.182.118:3100/').then((response) => {response.text().then((html) => {self.setState({textResponse: html})})})}, 3000);
  }

  render() {
    return (
      <ImageBackground source={require(backgroundImage)} style={styles.backgroundImage}>
        <View style={styles.test}>
          <View style={{flex: 11, justifyContent: "center"}}>
            <TouchableOpacity style={styles.button} onPress={() => this.props.navigation.navigate('Join Lobby')}>
              <Text style={styles.buttonText}>Join Lobby</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={() => this.props.navigation.navigate('Create Lobby')}>
              <Text style={styles.buttonText}>Create Lobby</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>
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
		fontSize: 35,
		fontFamily: 'System',
    color: "#FFFFFF",
  },
  backgroundImage: {
    flex: 1,
    // resizeMode: "cover",
    // justifyContent: "center"
  },
  connection: {
    width: 200,
  }
})

export default Home;
