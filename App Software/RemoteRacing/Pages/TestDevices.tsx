import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import {connect} from 'react-redux';
import {connectBLE} from '../Store/Actions/racing';
import Ionicons from 'react-native-vector-icons/Ionicons';

type AppState = {};
type NavigationType = any;

class TestDevices extends React.Component<NavigationType, AppState> {
  constructor(props: any) {
    super(props);
  }

  render() {
    return (
				<View style={styles.test}>
					<TouchableOpacity style={styles.settingsListItem} onPress={() => this.props.navigation.navigate('Test GPS')}>
						<Ionicons name="pin" size={25} color={"#FF6347"}/>	
						<Text style={styles.settingsListText}>Test GPS</Text>
						<View style={{flex: 1}}></View>
						<Ionicons style={{paddingRight: 5}}name="chevron-forward" size={25} color={"#FF6347"}/>	
					</TouchableOpacity>
					<TouchableOpacity style={styles.settingsListItem} onPress={() => this.props.navigation.navigate('Test IMU')}>
						<Ionicons name="speedometer" size={25} color={"#FF6347"}/>	
						<Text style={styles.settingsListText}>Test IMU</Text>
						<View style={{flex: 1}}></View>
						<Ionicons style={{paddingRight: 5}}name="chevron-forward" size={25} color={"#FF6347"}/>	
					</TouchableOpacity >
					<TouchableOpacity style={styles.settingsListItem} onPress={() => this.props.navigation.navigate('Test LCD')}>
						<Ionicons name="tv-outline" size={25} color={"#FF6347"}/>	
						<Text style={styles.settingsListText}>Test LCD</Text>
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

const mapDispatchToProps = (dispatch) => {
	return {
		connectBLE: () => dispatch(connectBLE())
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(TestDevices);
