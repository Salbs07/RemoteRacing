import React from 'react';
import {
  StyleSheet,
  View,
	TouchableOpacity,
	Text,
	Alert
} from 'react-native';
import {connect} from 'react-redux';
import {send_message} from '../../Store/Actions/racing';
import Ionicons from 'react-native-vector-icons/Ionicons';

type AppState = {};
type NavigationType = any;

class JoinLobby extends React.Component<NavigationType, AppState> {
  constructor(props: any) {
    super(props);
	}
	
	componentDidMount() {
		this.props.send_message("get lobbies", "");
	}

	joinLobby(name) {
		let racer = {
			lobbyName: name,
			racerName: this.props.racingState.username,
		}
		this.props.send_message("join lobby", racer);
		setTimeout(() => {
			if (this.props.racingState.in_lobby) {
				this.props.navigation.navigate('Race');
			} else {
				Alert.alert(
					"Cannot Join Lobby",
					"Failed to Join Lobby: [" + name + "] with username: [" + this.props.racingState.username + "].",
					[
						{
							text: "OK",
							style: "cancel"
						}
					]
				);
			}
		}, 500)
	}

  render() {
		const lobbies = this.props.racingState.lobby_list.map(name => (
			<TouchableOpacity key={name} style={styles.settingsListItem} onPress={() => this.joinLobby(name)}>
				<Ionicons name="people-outline" size={25} color={"#FF6347"}/>	
				<Text style={styles.settingsListText}>{name}</Text>
				<View style={{flex: 1}}></View>
				<Ionicons style={{paddingRight: 5}}name="chevron-forward" size={25} color={"#FF6347"}/>	
			</TouchableOpacity>
		))
    return (
			<View style={styles.test}>
			{lobbies}
			<View style={styles.settingsListFiller}>
			</View>
		</View>
    )
	}
	
	componentWillUnmount() {
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
		send_message: (type, payload) => dispatch(send_message(type, payload))
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(JoinLobby);
