import React from 'react';
import {
  StyleSheet,
	View,
	TextInput,
	Text,
	TouchableOpacity
} from 'react-native';
import {connect} from 'react-redux';
import {setName, checkName} from '../../Store/Actions/racing';

type AppState = {localName: string};
type NavigationType = any;

class PlayerName extends React.Component<NavigationType, AppState> {
  constructor(props: any) {
		super(props);
		this.state = {localName: "Enter New Username Here..."};
	}
	
	nameChange(text) {
		this.setState({localName: text});
		this.props.checkName(text);
	}

  render() {
		let warning;
		if (this.props.racingState.usernameAvailable == true) {
			warning = <Text style={styles.usernameAvailable}>Username Available!</Text>
		} else {
			warning = <Text style={styles.usernameUnavailable}>Username Not Available!</Text>
		}

    return (
			<View style={styles.test}>
			<View style={styles.playerNameViewer}>
					<Text style={styles.settingsListText}>Current Username: </Text>
					<Text style={styles.settingsListText}>{this.props.racingState.username}</Text>
			</View>
			<View style={styles.playerNameEnter}>
				<TextInput style={styles.settingsListTextInput} onChangeText={(text) => this.nameChange(text)}>{this.props.racingState.username}</TextInput>
				<View style={{flexDirection: "row"}}>
					{warning}
					<TouchableOpacity style={styles.setNameButton}onPress={() => this.props.setName(this.state.localName)}>
						<Text style={{fontSize: 20, color: "#FFFFFF"}}>Set Username</Text>
					</TouchableOpacity>
				</View>
			</View>
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
  backgroundImage: {
    flex: 1,
	},
	playerNameEnter: {
		flex: 4,
		backgroundColor: "#777777",
		borderBottomWidth: 1,
		borderLeftWidth: 1,
		borderRadius: 6,
		borderColor: "#456369",
		justifyContent: "space-around",
		alignItems: "flex-start",
		margin: 3,
		paddingLeft: 5,
	},
	settingsListText: {
		fontSize: 20,
		fontWeight: "bold",
		color: "#ffffff",
	},
	settingsListTextInput: {
		fontSize: 20,
		fontWeight: "bold",
		color: "#ffffff",
		backgroundColor: "#999999",
		borderRadius: 5,
		alignSelf: "stretch",
		padding: 10,
		margin: 5,
		marginLeft: 0,
		marginTop: 0,
	},
	settingsListFiller: {
		flex: 18,
	},
	usernameAvailable: {
		color: "#2ed146",
		fontSize: 20,
		flex: 1,
		alignSelf: "center",
		paddingLeft: 5,
	},
	usernameUnavailable: {
		color: "#FF6347",
		fontSize: 20,
		flex: 1,
		alignSelf: "center",
		paddingLeft: 5,
	},
	playerNameViewer: {
		flex: 1.3,
		backgroundColor: "#777777",
		borderBottomWidth: 1,
		borderLeftWidth: 1,
		borderRadius: 6,
		borderColor: "#456369",
		justifyContent: "space-between",
		alignItems: "center",
		flexDirection: "row",
		margin: 3,
		paddingLeft: 10,
		paddingRight: 10,
	},
	setNameButton: {
		backgroundColor: "#999999",
		padding: 7,
		borderRadius: 5,
		margin: 5,
	}
})

const mapStateToProps = (state) => {
	return {
		racingState: state.racingReducer
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		setName: (name) => dispatch(setName(name)),
		checkName: (name) => dispatch(checkName(name))
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(PlayerName);
