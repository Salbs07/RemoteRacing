import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import {connect} from 'react-redux';
import Ionicons from 'react-native-vector-icons/Ionicons';

type AppState = {};
type NavigationType = any;

class Settings extends React.Component<NavigationType, AppState> {
  constructor(props: any) {
    super(props);
  }

  render() {
    return (
				<View style={styles.test}>
					<TouchableOpacity style={styles.settingsListItem} onPress={() => this.props.navigation.navigate('Player Name')}>
						<Ionicons name="person-outline" size={25} color={"#FF6347"}/>	
						<Text style={styles.settingsListText}>Player Name</Text>
						<View style={{flex: 1}}></View>
						<Ionicons style={{paddingRight: 5}}name="chevron-forward" size={25} color={"#FF6347"}/>	
					</TouchableOpacity>
					<TouchableOpacity style={styles.settingsListItem} onPress={() => this.props.navigation.navigate('Device Connect')}>
						<Ionicons name="bluetooth" size={25} color={"#FF6347"}/>	
						<Text style={styles.settingsListText}>Device Connect</Text>
						<View style={{flex: 1}}></View>
						<Ionicons style={{paddingRight: 5}}name="chevron-forward" size={25} color={"#FF6347"}/>	
					</TouchableOpacity >
					<TouchableOpacity style={styles.settingsListItem} onPress={() => this.props.navigation.navigate('GPS Settings')}>
						<Ionicons name="pin" size={25} color={"#FF6347"}/>	
						<Text style={styles.settingsListText}>GPS Settings</Text>
						<View style={{flex: 1}}></View>
						<Ionicons style={{paddingRight: 5}}name="chevron-forward" size={25} color={"#FF6347"}/>	
					</TouchableOpacity >
					<TouchableOpacity  style={styles.settingsListItem} onPress={() => this.props.navigation.navigate('IMU Settings')}>
						<Ionicons name="speedometer" size={25} color={"#FF6347"}/>	
						<Text style={styles.settingsListText}>IMU Settings</Text>
						<View style={{flex: 1}}></View>
						<Ionicons style={{paddingRight: 5}}name="chevron-forward" size={25} color={"#FF6347"}/>	
					</TouchableOpacity >
					<View style={styles.settingsListFiller}>
					</View>
				</View>
    )
  }
}

const styles = StyleSheet.create({
  test: {
    flex: 1,
    alignItems: 'stretch',
		justifyContent: 'space-around',
		backgroundColor: "#5f5f5f",
  },
	settingsListItem: {
		flex: 1,
		backgroundColor: "#555555",
		borderBottomWidth: 1,
		borderLeftWidth: 1,
		borderRadius: 6,
		borderColor: "#777777",
		justifyContent: "flex-start",
		alignItems: "center",
		flexDirection: "row",
		paddingLeft: 5,
	},
	settingsListText: {
		paddingLeft: 5,
		fontSize: 20,
		fontWeight: "bold",
		color: "#ffffff",
	},
	settingsListFiller: {
		flex: 11,
	}
})

const mapStateToProps = (state) => {
	return {
		racingState: state.racingReducer
	}
}

export default connect(mapStateToProps)(Settings);
