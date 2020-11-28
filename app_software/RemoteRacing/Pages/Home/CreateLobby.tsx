import React from 'react';
import {
  StyleSheet,
  View,
	ImageBackground,
} from 'react-native';
import {connect} from 'react-redux';
import {connectBLE} from '../../Store/Actions/racing';

type AppState = {};
type NavigationType = any;

const backgroundImage = "../../Assets/Images/main_background_2.jpeg";

class CreateLobby extends React.Component<NavigationType, AppState> {
  constructor(props: any) {
    super(props);
  }

  render() {
    return (
      <ImageBackground source={require(backgroundImage)} style={styles.backgroundImage}>
				<View style={styles.test}>
				</View>
      </ImageBackground>
    )
  }
}

const styles = StyleSheet.create({
  test: {
    flex: 1,
    alignItems: 'stretch',
    justifyContent: 'space-around',
  },
  backgroundImage: {
    flex: 1,
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

export default connect(mapStateToProps, mapDispatchToProps)(CreateLobby);
