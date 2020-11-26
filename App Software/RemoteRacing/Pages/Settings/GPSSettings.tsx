import React from 'react';
import {
  StyleSheet,
	View,
	Text,
	Switch,
} from 'react-native';
import {connect} from 'react-redux';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {setPhoneGPSEnable} from '../../Store/Actions/racing';

type AppState = {};
type NavigationType = any;

class GPSSettings extends React.Component<NavigationType, AppState> {
  constructor(props: any) {
    super(props);
  }

	changePhoneGPSEnable(value) {
		this.props.setPhoneGPSEnable(value);
	}

  render() {
    return (
				<View style={styles.test}>
					<View style={styles.settingsListItem}>
						<Ionicons name="pin" size={25} color={"#FF6347"}/>	
						<Text style={styles.settingsListText}>Enable Phone GPS Backup</Text>
						<View style={{flex: 1}}></View>
						<Switch
							trackColor={{ false: "#5f5f5f", true: "#FF6347" }}
							thumbColor={this.props.racingState.phone_gps_enabled ? "#FFFFFF" : "#FFFFFF"}
							ios_backgroundColor="#3e3e3e"
							onValueChange={(value) => this.changePhoneGPSEnable(value)}
							value={this.props.racingState.phone_gps_enabled}
							style={styles.switch}
						/>
					</View>
					<View style={styles.settingsListItemInfo}>
						<Ionicons name="information-circle-outline" size={25} color={"#FF6347"}/>	
						<Text style={styles.settingsInfo}>Enabling this feature allows continous collection of race data in the case of GPS-lock loss on the main device</Text>
						<View style={{flex: 1}}></View>
					</View >
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
		backgroundColor: "#ffffff",
		borderBottomWidth: 1,
		borderLeftWidth: 1,
		borderRadius: 6,
		borderColor: "#456369",
		justifyContent: "flex-start",
		alignItems: "center",
		margin: 3,
		flexDirection: "row",
		paddingLeft: 5,
	},
	settingsListText: {
		paddingLeft: 5,
		fontSize: 20,
		fontWeight: "bold",
		color: "#555555",
	},
	settingsListItemInfo: {
		flex: 3,
		backgroundColor: "#ffffff",
		borderBottomWidth: 1,
		borderLeftWidth: 1,
		borderRadius: 6,
		borderColor: "#456369",
		justifyContent: "flex-start",
		alignItems: "center",
		margin: 3,
		flexDirection: "row",
		paddingLeft: 5,
	},
	settingsInfo: {
		width: 350,
		paddingLeft: 5,
		fontSize: 20,
		fontWeight: "bold",
		color: "#555555",
	},
	settingsListFiller: {
		flex: 10,
	},
	switch: {
		marginRight: 10,
	}
})

const mapStateToProps = (state) => {
	return {
		racingState: state.racingReducer
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		setPhoneGPSEnable: (value) => dispatch(setPhoneGPSEnable(value))
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(GPSSettings);
