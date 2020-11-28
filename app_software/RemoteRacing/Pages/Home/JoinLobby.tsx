import React from 'react';
import {
  StyleSheet,
  View,
	TouchableOpacity,
	Text
} from 'react-native';
import {connect} from 'react-redux';
import {connectBLE} from '../../Store/Actions/racing';
import Ionicons from 'react-native-vector-icons/Ionicons';

type AppState = {};
type NavigationType = any;

class JoinLobby extends React.Component<NavigationType, AppState> {
  constructor(props: any) {
    super(props);
	}
	
	componentDidMount() {
	}

  render() {
    return (
			<View style={styles.test}>
			<TouchableOpacity style={styles.settingsListItem}>
				<Ionicons name="people-outline" size={25} color={"#FF6347"}/>	
				<Text style={styles.settingsListText}>Lobby 1</Text>
				<View style={{flex: 1}}></View>
				<Ionicons style={{paddingRight: 5}}name="chevron-forward" size={25} color={"#FF6347"}/>	
			</TouchableOpacity>
			<TouchableOpacity style={styles.settingsListItem}>
				<Ionicons name="people-outline" size={25} color={"#FF6347"}/>	
				<Text style={styles.settingsListText}>Lobby 2</Text>
				<View style={{flex: 1}}></View>
				<Ionicons style={{paddingRight: 5}}name="chevron-forward" size={25} color={"#FF6347"}/>	
			</TouchableOpacity>
			<TouchableOpacity style={styles.settingsListItem}>
				<Ionicons name="people-outline" size={25} color={"#FF6347"}/>
				<Text style={styles.settingsListText}>Lobby 3</Text>
				<View style={{flex: 1}}></View>
				<Ionicons style={{paddingRight: 5}}name="chevron-forward" size={25} color={"#FF6347"}/>	
			</TouchableOpacity>
			<TouchableOpacity  style={styles.settingsListItem}>
				<Ionicons name="people-outline" size={25} color={"#FF6347"}/>	
				<Text style={styles.settingsListText}>Lobby 4</Text>
				<View style={{flex: 1}}></View>
				<Ionicons style={{paddingRight: 5}}name="chevron-forward" size={25} color={"#FF6347"}/>	
			</TouchableOpacity >
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
		connectBLE: () => dispatch(connectBLE())
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(JoinLobby);
