import React from 'react';
import {
  StyleSheet,
	View,
	TouchableOpacity,
	Text,
	TextInput,
	Alert,
} from 'react-native';
import {connect} from 'react-redux';
import {send_message} from '../../Store/Actions/racing';
import Ionicons from 'react-native-vector-icons/Ionicons';

type AppState = {lobbyName, distance};
type NavigationType = any;

class CreateLobby extends React.Component<NavigationType, AppState> {
  constructor(props: any) {
		super(props);
		this.state = {lobbyName: "", distance: 0};
  }

	nameChange(text) {
		this.setState({lobbyName: text});
	}

	distanceChange(text) {
		let distance = parseFloat(text);
		if (!isNaN(distance)) {
			this.setState({distance: distance});
		}
	}
	
	createLobby() {
		let payload = {
			distance: this.state.distance,
			name: this.state.lobbyName,
		}
		if (this.state.distance <= 0) {
			Alert.alert(
				"Invalid Distance",
				"Distance must be greater than zero.",
				[
					{
						text: "OK",
						style: "cancel"
					}
				]
			)
			return;
		}
		if (this.state.lobbyName.length <= 0 || this.state.lobbyName.length > 20) {
			Alert.alert(
				"Invalid Lobby Name",
				"Lobby name must be between 1 and 20 characters in length",
				[
					{
						text: "OK",
						style: "cancel"
					}
				]
			)
			return;
		}
		this.props.send_message("create lobby", payload);
		setTimeout(() => {
			if (this.props.racingState.create_lobby_success && this.props.racingState.in_lobby) {
				this.props.navigation.navigate('Race');
			} else if (!this.props.racingState.create_lobby_success) {
				Alert.alert(
					"Cannot Create Lobby",
					"Failed to Create Lobby: [" + this.state.lobbyName + "].",
					[
						{
							text: "OK",
							style: "cancel"
						}
					]
				)
			} else {
				Alert.alert(
					"Cannot Join Lobby",
					"Lobby Creation Succesful but Failed to Join Lobby with username: [" + this.props.racingState.username + "].  Try changing your username.",
					[
						{
							text: "OK",
							style: "cancel"
						}
					]
				)
			}
		}, 750)
	}

  render() {
    return (
			<View style={styles.test}>
				<View style={styles.settingsListItem}>
				<Text style={styles.settingsListText}>Name: </Text>
				<TextInput placeholder={"Enter Name"} style={styles.settingsListTextInput} onChangeText={(text) => this.nameChange(text)}></TextInput>
				</View>
				<View style={styles.settingsListItem}>
				<Text style={styles.settingsListText}>Distance: </Text>
				<TextInput keyboardType={"decimal-pad"}placeholder={"Enter Distance (miles)"} style={styles.settingsListTextInput} onChangeText={(text) => this.distanceChange(text)}></TextInput>
				</View>
				<TouchableOpacity style={styles.settingsListItem} onPress={() => this.createLobby()}>
					<Ionicons name="people-outline" size={25} color={"#FF6347"}/>	
					<View style={{flex: 1}}></View>
					<Text style={styles.settingsListTextButton}>Create and Join Lobby</Text>
					<Ionicons style={{paddingRight: 5}}name="chevron-forward" size={25} color={"#FF6347"}/>	
				</TouchableOpacity>
				<View style={styles.settingsListFiller}></View>
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
		color: "#ffffff",
	},
	settingsListTextButton: {
		paddingRight: 5,
		fontSize: 20,
		fontWeight: "bold",
		color: "#ffffff",
		marginBottom: 2,
	},
	settingsListTextInput: {
		flex: 1,
		fontSize: 20,
		fontWeight: "bold",
		color: "#ffffff",
		backgroundColor: "#999999",
		borderRadius: 5,
		alignSelf: "stretch",
		paddingLeft: 10,
		paddingRight: 10,
		margin: 5,
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
		send_message: (type, payload) => dispatch(send_message(type, payload))
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateLobby);
