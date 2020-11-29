import { RevealFromBottomAndroid } from '@react-navigation/stack/lib/typescript/src/TransitionConfigs/TransitionPresets';
import React from 'react';
import {
  StyleSheet,
  Text,
  View,
	TouchableOpacity,
	ScrollView,
	TextInput,
	Alert,
} from 'react-native';
import {connect} from 'react-redux';
import {initSocket, recieve_messages, send_message, setProcessData, setReadyUp} from '../Store/Actions/racing';
import Ionicons from 'react-native-vector-icons/Ionicons';

type AppState = {title: string};
type NavigationType = any;

const backgroundImage = "../Assets/Images/main_background_2.jpeg";

class Home extends React.Component<NavigationType, AppState> {
	scrollView;
	text_message = "";
  constructor(props: any) {
    super(props);
	}
	
	componentDidMount() {
		this.props.initSocket();
		this.props.recieve_messages();
		this.props.setProcessData(true);
	}

	sendText() {
		this.props.send_message("new message", {lobbyName: this.props.racingState.active_lobby, racerName: this.props.racingState.username, message: this.text_message});
	}

	leaveLobby() {
		this.props.send_message("leave lobby", {lobbyName: this.props.racingState.active_lobby, racerName: this.props.racingState.username});
	}

	readyUp(value) {
		if (value) {
			if (this.props.racingState.gps_lock) {
				this.props.setReadyUp(true);
				this.props.send_message("update readyup", {lobbyName: this.props.racingState.active_lobby, racerName: this.props.racingState.username, readyup: true});
			} else {
				Alert.alert(
					"Cannot Ready Up",
					"Must acquire GPS lock before you may ready up.",
					[
						{
							text: "OK",
							style: "cancel"
						}
					]
				);
			}
		} else {
			this.props.setReadyUp(false);
			this.props.send_message("update readyup", {lobbyName: this.props.racingState.active_lobby, racerName: this.props.racingState.username, readyup: false});
		}
	}

  render() {
		let buttons;
		let home;
		let deviceHeader;

		if (this.props.racingState.connected) {
			let gps_lock;
			if (this.props.racingState.gps_lock) {
				gps_lock = (
					<View style={styles.deviceData}>
						<Ionicons style={{paddingRight: 5, paddingLeft: 5}}name="locate" size={25} color={"#2ed146"}/>	
						<Text style={styles.settingsListTextSmall}>GPS LOCK</Text>
						<View style={{flex: 1}}></View>
					</View>
				)
			} else {
				gps_lock = (
					<View style={styles.deviceData}>
						<Ionicons style={{paddingRight: 5, paddingLeft: 5}}name="locate-outline" size={25} color={"#FF6347"}/>	
						<Text style={styles.settingsListTextSmall}>NO GPS LOCK</Text>
						<View style={{flex: 1}}></View>
					</View>
				)
			}
			deviceHeader = (
				<View style={styles.settingsListItemSmall2}>
					{gps_lock}
					<View style={styles.deviceData}>
						<Ionicons style={{paddingRight: 5, paddingLeft: 5}} name="time-outline" size={25} color={"#FF6347"}/>	
						<Text style={styles.settingsListTextSmall}>UTC: {this.props.racingState.utc_time}</Text>
						<View style={{flex: 1}}></View>
					</View>
				</View>
			)
		} else {
			deviceHeader = (
				<View style={styles.settingsListItemSmall2}>
					<Text style={styles.deviceHeader}>Connect to device in settings</Text>
				</View>
			)
		}

		if (this.props.racingState.in_lobby) {
			let readyUp;
			if (this.props.racingState.ready_up) {
				let disable = (this.props.racingState.lobby_status != "waiting...");
				readyUp = (
					<TouchableOpacity disabled={disable} style={disable ? styles.notReadyButtonDisabled : styles.notReadyButton} onPress={() => this.readyUp(false)}>
						<Text style={styles.settingsListText}>Not Ready</Text>
					</TouchableOpacity>
				)
			} else {
				readyUp  = (
					<TouchableOpacity style={styles.readyButton} onPress={() => this.readyUp(true)}>
						<Text style={styles.settingsListText}>Ready</Text>
					</TouchableOpacity>
				)
			}

			buttons = (
				<View style={styles.settingsListItem}>
					{readyUp}
					<TouchableOpacity style={styles.homeButton} onPress={() => this.leaveLobby()}>
						<Text style={styles.settingsListText}>Leave Lobby</Text>
						<View style={{flex: 1}}></View>
						<Ionicons style={{paddingRight: 5, paddingLeft: 5}}name="chevron-forward" size={25} color={"#FF6347"}/>	
					</TouchableOpacity>
				</View>
			)

			let racerList = this.props.racingState.lobby_racers.map((racer, index) => (
				<View key={racer} style={styles.racerLister}>
					<Ionicons style={{paddingRight: 5, paddingLeft: 5}} name="person" size={20} color={"#FF6347"}/>	
					<Text style={styles.settingsListTextSmall}>{racer}</Text>
					<View style={{flex: 1}}></View>
					<Text style={styles.settingsListTextSmall}>Position: {index} | {this.props.racingState.racers_distances[index]} miles</Text>
					<View style={{flex: 1}}></View>
					<Ionicons style={{paddingRight: 5, paddingLeft: 5}} name={this.props.racingState.racers_ready[index] ? "checkmark" : "close"} size={20} color={this.props.racingState.racers_ready[index] ? "#2ed146" : "#FF6347"}/>	
				</View>
			));

			let chatList = this.props.racingState.chat_messages.map((chat_message, index) => (
				<View key={index} style={styles.chatLister}>
					<View style={styles.chatListerName}>
						<Ionicons style={{paddingRight: 5, paddingLeft: 5}} name="chatbox" size={20} color={"#FF6347"}/>	
						<Text style={styles.settingsListTextSmall}>{this.props.racingState.chat_names[index]}</Text>
					</View>
					<View style={{flex: 1}}></View>
					<Text style={styles.chatMessageText}>{chat_message}</Text>
				</View>
			));
			home = (
				<View style={styles.settingsListFiller}>

					<View style={styles.homePane}>
						<View style={styles.homePaneTitleContainer}>
							<Text style={styles.homePaneTitleText}>Chat: </Text>
						</View>
						<View style={styles.homePaneDataContainer}>
							<ScrollView
							    ref={ref => {this.scrollView = ref}}
									onContentSizeChange={() => this.scrollView.scrollToEnd({animated: true})}>
								{chatList}
							</ScrollView>
							<View style={styles.messageInputContainer}>
								<TextInput style={styles.messageInputField} onChangeText={text => this.text_message = text}></TextInput>
								<TouchableOpacity style={styles.messageInputSendButton} onPress={() => this.sendText()}>
									<Text style={styles.messageInputSendButtonText}>Send</Text>
								</TouchableOpacity>
							</View>
						</View>
					</View>

					<View style={styles.homePane}>
						<View style={styles.homePaneTitleContainer}>
							<Text style={styles.homePaneTitleText}>Lobby: 
								<Text style={{color: "#bbbbbb"}}>  {this.props.racingState.active_lobby}</Text>
							</Text>
							<View style={{flex: 1}}></View>
							<Text style={{color: "#bbbbbb", paddingRight: 5}}>  {this.props.racingState.lobby_status}</Text>
						</View>
						<View style={styles.homePaneDataContainer}>
							<ScrollView>
								{racerList}
							</ScrollView>
						</View>
					</View>

				</View>
			)
		} else {
			buttons = (
				<View style={styles.settingsListItem}>
					<TouchableOpacity style={styles.homeButton} onPress={() => this.props.navigation.navigate('Join Lobby')}>
						<Text style={styles.settingsListText}>Join Lobby</Text>
						<View style={{flex: 1}}></View>
						<Ionicons style={{paddingRight: 5}}name="chevron-forward" size={25} color={"#FF6347"}/>	
					</TouchableOpacity>
					<TouchableOpacity style={styles.homeButton} onPress={() => this.props.navigation.navigate('Create Lobby')}>
						<Text style={styles.settingsListText}>Create Lobby</Text>
						<View style={{flex: 1}}></View>
						<Ionicons style={{paddingRight: 5}}name="chevron-forward" size={25} color={"#FF6347"}/>	
					</TouchableOpacity>
				</View>
			)
			home = (
				<View style={styles.settingsListFiller}>
					<View style={styles.settingsListFiller}></View>
					<Text style={styles.helpText}>Use the buttons below to join or create a lobby</Text>
					<View style={styles.settingsListFiller}></View>
				</View>
			)
		}

		return (
			<View style={styles.test}>
				{deviceHeader}
				{home}
				{buttons}
			</View>
		)
    {/* return (
      <ImageBackground source={require(backgroundImage)} style={styles.backgroundImage}>
      </ImageBackground>
    ) */}
	}
	componentWillUnmount() {
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
		flexDirection: "row",
	},
	settingsListItemSmall: {
		flex: 0.5,
		justifyContent: "center",
		backgroundColor: "#555555",
		borderWidth: 1,
		borderRadius: 6,
		borderColor: "#777777",
	},
	settingsListItemSmall2: {
		flex: 0.7,
		flexDirection: "row",
		justifyContent: "center",
		backgroundColor: "#555555",
		borderWidth: 2,
		borderRadius: 3,
		borderColor: "#777777",
		margin: 5,
		marginBottom: 0,
	},
	homeButton: {
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
		marginLeft: 5,
		marginRight: 5,
		marginBottom: 5,
	},
	homeButtonDisabled: {
		opacity: 0.2,
		flex: 1,
		backgroundColor: "#999999",
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
	settingsListTextSmall: {
		paddingLeft: 5,
		fontSize: 15,
		fontWeight: "bold",
		color: "#ffffff",
	},
	settingsListFiller: {
		flex: 11,
	},
	helpText: {
		fontSize: 15,
		fontWeight: "bold",
		color: "#888888",
		alignSelf: "center",
	},
	deviceHeader: {
		alignSelf: "center",
		fontSize: 15,
		fontWeight: "bold",
		color: "#888888",
	},
	readyButton: {
		flex: 1,
		backgroundColor: "#2ed146",
		borderBottomWidth: 1,
		borderLeftWidth: 1,
		borderRadius: 6,
		borderColor: "#777777",
		alignItems: "center",
		justifyContent: "center",
		flexDirection: "row",
		marginLeft: 5,
		marginRight: 5,
		marginBottom: 5,
	},
	notReadyButton: {
		flex: 1,
		backgroundColor: "#FF6347",
		borderBottomWidth: 1,
		borderLeftWidth: 1,
		borderRadius: 6,
		borderColor: "#777777",
		alignItems: "center",
		justifyContent: "center",
		flexDirection: "row",
		marginLeft: 5,
		marginRight: 5,
		marginBottom: 5,
	},
	notReadyButtonDisabled: {
		flex: 1,
		backgroundColor: "#bbbbbb",
		borderBottomWidth: 1,
		borderLeftWidth: 1,
		borderRadius: 6,
		borderColor: "#777777",
		alignItems: "center",
		justifyContent: "center",
		flexDirection: "row",
		marginLeft: 5,
		marginRight: 5,
		marginBottom: 5,
	},
	homePane: {
		flex: 1,
		backgroundColor: "#555555",
		margin: 5,
		borderRadius: 10,
	},
	homePaneTitleContainer: {
		flex: 1,
		flexDirection: "row",
		alignItems: "center",
	},
	homePaneTitleText: {
		paddingLeft: 5,
		fontSize: 17,
		fontWeight: "bold",
		color: "#ffffff",
	},
	homePaneDataContainer: {
		flex: 8,
	},
	racerLister: {
		height: 30,
		flexDirection: "row",
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: "#333333",
		borderWidth: 1,
		borderRadius: 6,
		borderColor: "#777777",
		marginLeft: 5,
		marginRight: 5,
		marginBottom: 3,
	},
	chatLister: {
		flexDirection: "row",
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: "#333333",
		borderWidth: 1,
		borderRadius: 6,
		borderColor: "#777777",
		marginLeft: 5,
		marginRight: 5,
		marginBottom: 3,
	},
	deviceData: {
		flex: 1,
		backgroundColor: "#555555",
		justifyContent: "center",
		alignItems: "center",
		flexDirection: "row",
		paddingLeft: 5,
	},
	chatListerName: {
		flex: 4,
		height: 30,
		alignSelf: "flex-start",
		flexDirection: "row",
		justifyContent: "flex-start",
		alignItems: "center",
	},
	chatMessageText: {
		flex: 8,
		padding: 5,
		fontSize: 15,
		fontWeight: "bold",
		color: "#5ccbd1",
	},
	messageInputContainer: {
		height: 35,
		flexDirection: "row",
		alignItems: "center",
		margin: 3,
	},
	messageInputField: {
		flex: 9,
		fontSize: 20,
		fontWeight: "bold",
		color: "#ffffff",
		backgroundColor: "#999999",
		borderRadius: 5,
		alignSelf: "stretch",
		padding: 5,
		paddingLeft: 10,
		paddingRight: 10,

	},
	messageInputSendButton: {
		flex: 2,
		alignSelf: "stretch",
		marginLeft: 5,
		alignItems: "center",
		justifyContent: "center",
		backgroundColor: "#5ccbd1",
		borderRadius: 5,
	},
	messageInputSendButtonText: {
		fontSize: 17,
		fontWeight: "bold",
		color: "#ffffff",
	}
})

const mapStateToProps = (state) => {
	return {
		racingState: state.racingReducer
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		initSocket: () => dispatch(initSocket()),
		recieve_messages: () => dispatch(recieve_messages()),
		send_message: (type, payload) => dispatch(send_message(type, payload)),
		setProcessData: (value) => dispatch(setProcessData(value)),
		setReadyUp: (value) => dispatch(setReadyUp(value)),
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
