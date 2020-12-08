import React from 'react';
import {
  StyleSheet,
	View,
	TouchableOpacity,
	Text,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {connect} from 'react-redux';
import {sendCommand, setProcessData} from '../../Store/Actions/racing';

type AppState = {};
type NavigationType = any;

class TestLCD extends React.Component<NavigationType, AppState> {
  constructor(props: any) {
    super(props);
	}

	_focus;
	_blur;
	componentDidMount() {
    this._focus = this.props.navigation.addListener('focus', () => {
      this.on_focus();
		});
		this._blur = this.props.navigation.addListener('blur', () => {
      this.on_blur();
    });
  }

  componentWillUnmount() {
		this._focus();
		this._blur();
  }

	on_focus() {
		this.props.setProcessData(true);
	}
	
	sendCommand(command) {
		let commandPacket;
		switch (command) {
			case "GPS_RIP_2020NOV":
				commandPacket = {
					type: command,
				};
				this.props.sendCommand(commandPacket);
				break;
			case "IDLE":
				commandPacket = {
					type: command,
				};
				this.props.sendCommand(commandPacket);
				break;
			case "RACE_START":
				commandPacket = {
					type: command,
					startTime: getStartTime(this.props.racingState.utc_time).stringData
				};
				this.props.sendCommand(commandPacket);
				break;
			case "POS_UPDATE":
				commandPacket = {
					type: command,
					data: "3"
				};
				this.props.sendCommand(commandPacket);
				break;
			case "RACE_END":
				commandPacket = {
					type: command,
					data: "3"
				};
				this.props.sendCommand(commandPacket);
				break;
			case "RACE_END_ALL":
				commandPacket = {
					type: command,
					meIndex: 3,
					data: ["Anita", "Devin", "Grant", "Preston"]
				};
				this.props.sendCommand(commandPacket);
				break;
		}
	}

  render() {
		let body;
		if (this.props.racingState.connected) {
			body = (
				<View style={{flex: 1}}>
					<TouchableOpacity style={styles.settingsListItem} onPress={() => this.sendCommand("GPS_RIP_2020NOV")}>
						<Ionicons name="radio-outline" size={25} color={"#FF6347"}/>	
						<Text style={styles.settingsListText}>Send GPS_RIP_2020NOV</Text>
						<View style={{flex: 1}}></View>
						<Ionicons style={{paddingRight: 5}}name="send-outline" size={25} color={"#FF6347"}/>	
					</TouchableOpacity>
					<TouchableOpacity style={styles.settingsListItem} onPress={() => this.sendCommand("IDLE")}>
						<Ionicons name="radio-outline" size={25} color={"#FF6347"}/>	
						<Text style={styles.settingsListText}>Send IDLE</Text>
						<View style={{flex: 1}}></View>
						<Ionicons style={{paddingRight: 5}}name="send-outline" size={25} color={"#FF6347"}/>	
					</TouchableOpacity>
					<TouchableOpacity style={styles.settingsListItem} onPress={() => this.sendCommand("RACE_START")}>
						<Ionicons name="radio-outline" size={25} color={"#FF6347"}/>	
						<Text style={styles.settingsListText}>Send RACE_START</Text>
						<View style={{flex: 1}}></View>
						<Ionicons style={{paddingRight: 5}}name="send-outline" size={25} color={"#FF6347"}/>	
					</TouchableOpacity>
					<TouchableOpacity style={styles.settingsListItem} onPress={() => this.sendCommand("POS_UPDATE")}>
						<Ionicons name="radio-outline" size={25} color={"#FF6347"}/>	
						<Text style={styles.settingsListText}>Send POS_UPDATE</Text>
						<View style={{flex: 1}}></View>
						<Ionicons style={{paddingRight: 5}}name="send-outline" size={25} color={"#FF6347"}/>	
					</TouchableOpacity>
					<TouchableOpacity style={styles.settingsListItem} onPress={() => this.sendCommand("RACE_END")}>
						<Ionicons name="radio-outline" size={25} color={"#FF6347"}/>	
						<Text style={styles.settingsListText}>Send RACE_END</Text>
						<View style={{flex: 1}}></View>
						<Ionicons style={{paddingRight: 5}}name="send-outline" size={25} color={"#FF6347"}/>	
					</TouchableOpacity>
					<TouchableOpacity style={styles.settingsListItem} onPress={() => this.sendCommand("RACE_END_ALL")}>
						<Ionicons name="radio-outline" size={25} color={"#FF6347"}/>	
						<Text style={styles.settingsListText}>Send RACE_END_ALL</Text>
						<View style={{flex: 1}}></View>
						<Ionicons style={{paddingRight: 5}}name="send-outline" size={25} color={"#FF6347"}/>	
					</TouchableOpacity>
					<View style={styles.settingsListFiller}></View>
				</View>
			)
		} else {
			body = (
				<View style={{flex: 1}}>
					<View style={styles.settingsListItem}>
						<Ionicons name="hourglass-outline" size={25} color={"#FF6347"}/>	
						<Text style={styles.settingsListText}>Connect to device first...</Text>
						<View style={{flex: 1}}></View>	
					</View>
					<View style={styles.settingsListFiller}></View> 
				</View>	
			);
		}
    return (
				<View style={styles.test}>
					{body}
				</View>
    )
	}
	
	on_blur() {
		if (!this.props.racingState.in_lobby) {
			this.props.setProcessData(false);
		}
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
	settingsListFiller: {
		flex: 11,
	}
})

function getStartTime(current_time) {
	let current_seconds = parseInt(current_time.substring(4, 6));
	let current_minutes = parseInt(current_time.substring(2, 4));
	let current_hours = parseInt(current_time.substring(0, 2));
	current_seconds += 30;

	current_minutes = (current_seconds > 59) ? current_minutes + 1: current_minutes;
	current_seconds = (current_seconds > 59) ? current_seconds - 60 : current_seconds;

	current_hours =  (current_minutes > 59) ? current_hours + 1 : current_hours;
	current_minutes = (current_minutes > 59) ? current_minutes - 60 : current_minutes;

	current_hours = (current_hours > 23) ? 0 : current_hours;

	const filler = "0";

	let new_sec = current_seconds > 9 ? current_seconds.toString() : filler.concat(current_seconds.toString());
	let new_min = current_minutes > 9 ? current_minutes.toString() : filler.concat(current_minutes.toString());
	let new_hour = current_hours > 9 ? current_hours.toString() : filler.concat(current_hours.toString());

	let start_time = new_hour.concat(new_min.concat(new_sec.concat(current_time.substring(6, 10))));
	return {value: parseFloat(start_time), stringData: start_time};

}

const mapStateToProps = (state) => {
	return {
		racingState: state.racingReducer
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		sendCommand: (command) => dispatch(sendCommand(command)),
		setProcessData: (val) => dispatch(setProcessData(val))
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(TestLCD);
