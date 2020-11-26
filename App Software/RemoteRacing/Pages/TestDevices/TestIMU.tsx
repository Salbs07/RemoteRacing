import React from 'react';
import {
  StyleSheet,
	View,
	Text,
	ScrollView,
} from 'react-native';
import {connect} from 'react-redux';
import {connectBLE, setProcessData} from '../../Store/Actions/racing';

type AppState = {};
type NavigationType = any;

class TestIMU extends React.Component<NavigationType, AppState> {
  constructor(props: any) {
    super(props);
  }

	componentDidMount() {
		this.props.setProcessData(true);
	}

  render() {
    return (
			<View style={styles.test}>
			<View style={styles.dataViewer}>
				<View style={styles.dataTitle}>
					<Text style={styles.dataTextTitle}>IMU:</Text>
				</View>
				<View style={styles.data}>
					<ScrollView> 
						<Text style={styles.dataText}>{this.props.racingState.imu_string}</Text>
					</ScrollView> 
				</View>
			</View>
		</View>
    )
	}
	componentWillUnmount() {
		this.props.setProcessData(false);
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
	},
	dataViewer: {
		flex: 3,
		borderWidth: 2,
		borderColor: "#222222",
		backgroundColor: "#333333",
		margin: 5,
		borderRadius: 25,
	},
	dataTitle: {
		flex: 2,
		color: "#00FF00",
		padding: 6,
	},
	data: {
		flex: 35,
		padding: 6,
	},
	dataTextTitle: {
		fontSize: 20,
		color: "#00FF00",
	},
		dataText: {
		color: "#00FF00",
	}
})

const mapStateToProps = (state) => {
	return {
		racingState: state.racingReducer
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		connectBLE: () => dispatch(connectBLE()),
		setProcessData: (value) => dispatch(setProcessData(value))
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(TestIMU);
