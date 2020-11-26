import React from 'react';
import {
  StyleSheet,
	View,
	TouchableOpacity,
	Text,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {connect} from 'react-redux';
import {initBLE, discoverBLE, connectBLE} from '../../Store/Actions/racing';

type AppState = {};
type NavigationType = any;

class DeviceConnect extends React.Component<NavigationType, AppState> {
  constructor(props: any) {
    super(props);
  }

	discoverDevices() {
		this.props.initBLE();
		this.props.discoverBLE();
	}

  render() {
		let discovered;
		let connectButton;
		if (this.props.racingState.connected == false && this.props.racingState.device_status == "ignore") {
			discovered = this.props.racingState.devices.map((deviceName) => (
				<TouchableOpacity style={styles.settingsListItem} key={deviceName} onPress={() => this.props.connectBLE(deviceName)}>
					<Ionicons name="bluetooth" size={25} color={"#FF6347"} key={deviceName +  "2"}/>	
					<Text style={styles.settingsListText} key={deviceName + "3"}>{deviceName}</Text>
					<View style={{flex: 1}} key={deviceName + "4"}></View>
				</TouchableOpacity>
			));
			connectButton = (
				<TouchableOpacity style={styles.settingsListItem} onPress={() => this.discoverDevices()}>
					<Ionicons name="bluetooth" size={25} color={"#FF6347"}/>	
					<Text style={styles.settingsListText}>Discover Devices</Text>
					<View style={{flex: 1}}></View>
					<Ionicons style={{paddingRight: 5}}name="add-outline" size={25} color={"#FF6347"}/>	
				</TouchableOpacity>
			);
		} else if (this.props.racingState.connected == false) {
			discovered = (
				<View style={styles.settingsListItem}>
					<Ionicons name="hourglass-outline" size={25} color={"#FF6347"}/>	
					<Text style={styles.settingsListText}>{this.props.racingState.device_status}</Text>
				</View>
			);
			connectButton = (<View></View>);
		} else {
			discovered = (
			<View style={styles.settingsListItem}>
				<Ionicons name="radio-outline" size={25} color={"#FF6347"}/>	
			<Text style={styles.settingsListText}> Connected to {this.props.racingState.device.name}</Text>
			</View>);
			connectButton = (<View></View>);
		}

    return (
			<View style={styles.test}>
				{connectButton}
				{discovered}
		</View>
    )
  }
}

const styles = StyleSheet.create({
  test: {
    flex: 1,
    alignItems: 'stretch',
		justifyContent: 'flex-start',
		backgroundColor: "#5f5f5f",
  },
	settingsListItem: {
		backgroundColor: "#555555",
		borderBottomWidth: 1,
		borderLeftWidth: 1,
		borderRadius: 6,
		borderColor: "#777777",
		justifyContent: "flex-start",
		alignItems: "center",
		flexDirection: "row",
		paddingLeft: 5,
		height: 55
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
		initBLE: () => dispatch(initBLE()),
		discoverBLE: () => dispatch(discoverBLE()),
		connectBLE: (deviceName) => dispatch(connectBLE(deviceName)),
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(DeviceConnect);
