import React from 'react';
import {
  StyleSheet,
  View,
} from 'react-native';
import {connect} from 'react-redux';
import {connectBLE} from '../Store/Actions/racing';

type AppState = {};
type NavigationType = any;

class Metrics extends React.Component<NavigationType, AppState> {
  constructor(props: any) {
    super(props);
  }

  render() {
    return (
				<View style={styles.test}>
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

export default connect(mapStateToProps, mapDispatchToProps)(Metrics);
