import {
	INIT_BLE,
	SET_NAME,
	CHECK_NAME,
	DISCOVER_BLE,
	ADD_DEVICE,
	CONNECT_BLE,
	CLEAR_IMU_STRING,
	SET_IMU_STRING,
	SET_GPS_STRING,
	SET_CONNECTED,
	SET_DEVICE_STATUS,
	SET_PHONE_GPS_ENABLE,
	SET_PHONE_IMU_ENABLE,
	IMU_DATA_SET,
	GPS_DATA_SET,
	UTC_TIME_SET,
	GPS_LOCK_SET,
	SET_PROCESS_DATA,
} from '../Actions/types';

import {BleManager} from 'react-native-ble-plx';

const initialState = {
	username: "Change Me!",
	usernameAvailable: false,
	devices: [],
	device: "",
	subscription: "",
	manager: "",
	uart_serviceUUID: "",
	uart_rxUUID: "",
	uart_txUUID: "",
	imu_string: "",
	gps_string: "",
	connected: false,
	device_status: "ignore",
	phone_gps_enabled: false,
	phone_imu_enabled: false,
	gps_data: [],
	imu_data: [],
	gps_lock: false,
	utc_time: "",
	process_data: false,
}

const racingReducer = (state = initialState, action) => {
	switch(action.type) {
		case INIT_BLE:
			return {
				...state,
				manager: new BleManager,
				uart_serviceUUID: "6e400001-b5a3-f393-e0a9-e50e24dcca9e",
				uart_rxUUID: "6e400002-b5a3-f393-e0a9-e50e24dcca9e",
				uart_txUUID: "6e400003-b5a3-f393-e0a9-e50e24dcca9e"
			}
		case SET_NAME:
			if (state.usernameAvailable == true) {
				return {
					...state,
					username: action.data
				}
			}
			return state;
		case CHECK_NAME:
			if (action.data != "Preston" && action.data != "Joe") {
				return {
					...state,
					usernameAvailable: false
				}
			}
			return {
				...state,
				usernameAvailable: true
			}
		case ADD_DEVICE:
			return {
				...state,
				devices: state.devices.concat(action.data)
			}
		case CLEAR_IMU_STRING:
			return {
				...state,
				imu_string: ""
			};
		case SET_IMU_STRING:
			return {
				...state,
				imu_string: action.data
			};
		case SET_GPS_STRING:
			return {
				...state,
				gps_string: action.data
			};
		case SET_CONNECTED:
			return {
				...state,
				connected: action.data.result,
				device: action.data.device
			}
		case SET_DEVICE_STATUS:
			return {
				...state,
				device_status: action.data
			}
		case SET_PHONE_GPS_ENABLE:
			return {
				...state,
				phone_gps_enabled: action.data
			}
		case SET_PHONE_IMU_ENABLE:
			return {
				...state,
				phone_imu_enabled: action.data
			}
		case IMU_DATA_SET:
			return {
				...state,
				imu_data: action.data
			}
		case GPS_DATA_SET:
			return {
				...state,
				gps_data: action.data
			}
		case UTC_TIME_SET:
			return {
				...state,
				utc_time: action.data
			}
		case GPS_LOCK_SET:
			return {
				...state,
				gps_lock: action.data
			}
		case SET_PROCESS_DATA:
			return {
				...state,
				process_data: action.data
			}
		default:
			return state;
	}
}

export default racingReducer;