import {
	INIT_BLE,
	SET_NAME,
	CHECK_NAME,
	ADD_DEVICE,
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
	SET_LOBBY_LIST,
	INIT_SOCKET,
	SET_CREATE_LOBBY_SUCCESS,
	SET_LOBBY,
	LEAVE_LOBBY,
	SET_READY_UP,
	UPDATE_ACTIVE_LOBBY,
	SET_FIRST_TIME,
} from '../Actions/types';

import {BleManager} from 'react-native-ble-plx';
import io from "socket.io-client";

const initialState = {
	// device side data
	devices: [],
	subscription: "",
	manager: "",
	device: "",
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
	first_time: false,
	// server side data
	username: "Change Me!",
	usernameAvailable: false,
	socket: "",
	lobby_list: [],
	in_lobby: false,
	active_lobby: "",
	create_lobby_success: false,
	lobby_racers: [],
	racers_ready: [],
	racers_distances: [],
	ready_up: false,
	chat_messages: [],
	chat_names: [],
	lobby_status: "",
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
			if (action.data == "Taken") {
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
		case SET_LOBBY_LIST:
			return {
				...state,
				lobby_list: action.data
			}
		case INIT_SOCKET:
			return {
				...state,
				socket: io("http://192.168.0.8:3100"),
			}
		case SET_CREATE_LOBBY_SUCCESS: 
			return {
				...state,
				create_lobby_success: action.data
			};
		case SET_LOBBY:
			if (action.data.result) {
				return {
					...state,
					active_lobby: action.data.lobbyName,
					in_lobby : action.data.result,
				};
			} else {
				return {
					...state,
					in_lobby : action.data.result,
				};
			}
		case LEAVE_LOBBY:
			return {
				...state,
				active_lobby: "",
				in_lobby : false,
				create_lobby_success: false,
			};
		case SET_READY_UP:
			return {
				...state,
				ready_up: action.data
			};
		case UPDATE_ACTIVE_LOBBY :
			return {
				...state,
				lobby_racers: action.data.racers.map((racer) => racer.name),
				racers_ready: action.data.racers.map((racer) => racer.ready),
				racers_distances: action.data.racers.map((racer) => racer.distance_so_far.toString().substring(0, 5)),
				chat_messages: action.data.chat_messages,
				chat_names: action.data.chat_names,
				lobby_status: action.data.status,
			}
		case SET_FIRST_TIME: 
			return {
				...state,
				first_time: action.data,
			}
		default:
			return state;
	}
}

export default racingReducer;