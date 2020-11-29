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
	INIT_SOCKET,
	SET_LOBBY_LIST,
	SET_CREATE_LOBBY_SUCCESS,
	SET_LOBBY,
	LEAVE_LOBBY,
	SET_READY_UP,
	UPDATE_ACTIVE_LOBBY,
	SET_LOBBY_STATUS,
	SET_FIRST_TIME,
} from "./types";

import { Buffer } from 'buffer';

export const initBLE = () => (
	{
		type: INIT_BLE,
		data: ""
	}
);

export const setName = (name) => (
	{
		type: SET_NAME,
		data: name
	}
);

export const checkName = (name) => (
	{
		type: CHECK_NAME,
		data: name
	}
);

export const addDevice = (name) => (
	{
		type: ADD_DEVICE,
		data: name
	}
);

export const clearIMUString = () => (
	{
		type: CLEAR_IMU_STRING,
		data: ""
	}
);

export const setIMUString = (name) => (
	{
		type: SET_IMU_STRING,
		data: name
	}
);

export const setGPSString = (name) => (
	{
		type: SET_GPS_STRING,
		data: name
	}
);

export const setConnected = (name) => (
	{
		type: SET_CONNECTED,
		data: name
	}
);

export const setDeviceStatus = (name) => (
	{
		type: SET_DEVICE_STATUS,
		data: name
	}
);

export const setPhoneGPSEnable = (name) => (
	{
		type: SET_PHONE_GPS_ENABLE,
		data: name
	}
);

export const setPhoneIMUEnable = (name) => (
	{
		type: SET_PHONE_IMU_ENABLE,
		data: name
	}
);

export const gpsDataSet = (name) => (
	{
		type: GPS_DATA_SET,
		data: name
	}
);

export const imuDataSet = (name) => (
	{
		type: IMU_DATA_SET,
		data: name
	}
);

export const utcTimeSet = (name) => (
	{
		type: UTC_TIME_SET,
		data: name
	}
);

export const gpsLockSet = (name) => (
	{
		type: GPS_LOCK_SET,
		data: name
	}
);

export const initSocket = () => (
	{
		type: INIT_SOCKET,
		data: ""
	}
);

export const setProcessData = (name) => (
	{
		type: SET_PROCESS_DATA,
		data: name
	}
);

export const setLobbyList = (name) => (
	{
		type: SET_LOBBY_LIST,
		data: name
	}
);

export const setCreateLobbySuccess = (name) => (
	{
		type: SET_CREATE_LOBBY_SUCCESS,
		data: name
	}
);

export const setLobby = (name) => (
	{
		type: SET_LOBBY,
		data: name
	}
);

export const leaveLobby = () => (
	{
		type: LEAVE_LOBBY,
		data: ""
	}
);

export const setReadyUp = (value) => (
	{
		type: SET_READY_UP,
		data: value
	}
);

export const updateActiveLobby = (lobby) => (
	{
		type: UPDATE_ACTIVE_LOBBY,
		data: lobby
	}
);

export const setFirstTime = (value) => (
	{
		type: SET_FIRST_TIME,
		data: value
	}
);


//async functions
export const recieve_messages = () => {
	return function(dispatch, getState) {

		getState().racingReducer.socket.on("get lobbies response", payload => {
			dispatch(setLobbyList(payload));
		});

		getState().racingReducer.socket.on("create lobby response", payload => {
			dispatch(setCreateLobbySuccess(payload.result));
			if (payload.result) {
				let racer = {
					lobbyName: payload.lobbyName,
					racerName: getState().racingReducer.username,
				};
				dispatch(send_message('join lobby', racer));
			}
		});

		getState().racingReducer.socket.on("join lobby response", payload => {
			dispatch(setLobby(payload));
		});

		getState().racingReducer.socket.on("leave lobby response", payload => {
			if (payload.result) {
				dispatch(leaveLobby());
			}
		});

		getState().racingReducer.socket.on("active lobby update", payload => {
			let lobby = payload.lobby;
			if (getState().racingReducer.in_lobby && getState().racingReducer.active_lobby == lobby.name) {
				if (getState().racingReducer.lobby_status != lobby.status && lobby.status == "Race countdown beginning...") {
					dispatch(sendCommand({type: "RACE_START", startTime: lobby.startTimeString}));
				} else if (lobby.status == "Race!") {
					// send a pos update
				} else if (getState().racingReducer.lobby_status != lobby.status && lobby.status == "Race Over!") {
					let meIndex = getState().racingReducer.lobby_racers.indexOf(getState().racingReducer.username);
					dispatch(sendCommand({type: "RACE_END_ALL", meIndex: meIndex, data: getState().racingReducer.lobby_racers}));
				}
				dispatch(updateActiveLobby(lobby));
			}
		});

	};
}

export const send_message = (type, payload) => {
	return function(dispatch, getState) {
		getState().racingReducer.socket.emit(type, payload);
	}
}
export const getLobbyList = () => {
	return function(dispatch, getState) {
		
	}
};

export const discoverBLE = () => {
	return function(dispatch, getState) {
		if(getState().racingReducer.manager != "") {
			getState().racingReducer.manager.startDeviceScan(null, null, (error, device) => {
				if (error) {
					getState().racingReducer.manager.stopDeviceScan();
					setTimeout(() => {
						dispatch(discoverBLE());
					}, 500);
					return;
				} else {
					if (device.name != "" && getState().racingReducer.devices.indexOf(device.name) == -1) {
						dispatch(addDevice(device.name));
					}
				}
			});
		} else {
			return Promise.resolve();
		}
	}
};

export const connectBLE = (deviceName) => {
	return function(dispatch, getState) {
		getState().racingReducer.manager.stopDeviceScan();
		getState().racingReducer.manager.startDeviceScan(null, null, (error, device) => {
			if (error) {
				dispatch(setDeviceStatus("Error Scanning... Attempting again..."));
				setTimeout(() => {
					dispatch(connectBLE(deviceName));
				}, 500);
				return;
			} else {
				if (device.name == deviceName) {
					getState().racingReducer.manager.stopDeviceScan();
					dispatch(setDeviceStatus("Connecting..."));
					device.connect()
						.then((device) => {
							dispatch(setConnected({result: true, device: device}));
							dispatch(setDeviceStatus("Discovering Services..."));
							return device.discoverAllServicesAndCharacteristics()
						})
						.then((device) => {
							dispatch(setDeviceStatus("Subscribing to UART Service..."));
							getState().racingReducer.subscription = device.monitorCharacteristicForService(getState().racingReducer.uart_serviceUUID, getState().racingReducer.uart_txUUID, (error, characteristic) => {
								if (error) {
									dispatch(setDeviceStatus("Error creating Subscription"));
									return
								}
								if (getState().racingReducer.process_data) {
									const buffer = new Buffer(characteristic.value, 'base64');
									let buf = new ArrayBuffer(4);
									let view = new DataView(buf);
									let main_imu_string = "";
									let imu_data = [];
									dispatch(clearIMUString());
									for (let i = 0; i < 3; i++) {
										let imu_string = "";
										for (let j = 0; j < 4; j++) {
											let index = (4 * i) + j;
											view.setUint8(3 - j, buffer[220 + index]);
										}
										let imu_val = view.getFloat32(0);
										imu_data.push(imu_val);
										imu_string += imu_val.toString().substr(0, 5);
										if (imu_string[0] != "-") {
											imu_string = ["+", imu_string].join("");
										}
										if (i == 0) {
											imu_string = ["X: ", imu_string].join("");
										} else if (i == 1) {
											imu_string = ["Y: ", imu_string].join("");
										} else {
											imu_string = ["Z: ", imu_string].join("");
										}
										imu_string = [imu_string, "\n"].join("");
										main_imu_string = [main_imu_string, imu_string].join("");
									}
									dispatch(setIMUString(main_imu_string));
									dispatch(imuDataSet(imu_data));
									const bufStr = buffer.toString();
									const gps_data = process_gps_string(bufStr);
									if (gps_data.valid) {
										if (!getState().racingReducer.first_time) {
											if (gps_data.lock) {
												dispatch(sendCommand({type: "IDLE"}));
												dispatch(setFirstTime(true));
											} else {
												dispatch(sendCommand({type: "GPS_RIP_2020NOV"}));
												dispatch(setFirstTime(true));
											}
										} else {
											if (!getState().racingReducer.gps_lock && gps_data.lock) {
												dispatch(sendCommand({type: "IDLE"}));
											} else if (getState().racingReducer.gps_lock && !gps_data.lock) {
												dispatch(sendCommand({type: "GPS_RIP_2020NOV"}));
											}
										}
										dispatch(setGPSString(gps_data.forPrint));
										dispatch(gpsDataSet(gps_data.forArray));
										dispatch(gpsLockSet(gps_data.lock));
										dispatch(utcTimeSet(gps_data.utc));
										if (getState().racingReducer.in_lobby) {
											let toSend = {
												lobbyName: getState().racingReducer.active_lobby,
												racerName: getState().racingReducer.username,
												gpsData: gps_data.forArray,
												imuData: imu_data,
												time: gps_data.utc
											}
											dispatch(send_message("gps_imu_data", toSend))
										}
									}
								}
							})
						})
						.then(() => {
							return;
						}, (error) => {
							dispatch(setDeviceStatus("Some sort of error..."));
							return;
						})
				}
			}
		});
	}
};

export const sendCommand = (command) => {
	return function(dispatch, getState) {
		let commandToSend;
		switch (command.type) {
			/*
				commandPacket = {
					type: command,
				};
			*/
			case "GPS_RIP_2020NOV":
				commandToSend = "@";
				break;
			/*
				commandPacket = {
					type: command,
				};
			*/
			case "IDLE":
				commandToSend = "A";
				break;
			/*
				commandPacket = {
					type: command,
					startTime: time,
				};
			*/
			case "RACE_START":
				commandToSend = "B";
				commandToSend += command.startTime;
				break;
			/*
				commandPacket = {
					type: command,
					data: {
						position: "3rd",
						distanceStringLength: 7,
						distanceString: "3.3 / 4"
					}
				};
			*/
			case "POS_UPDATE":
				commandToSend = "C";
				let code = String.fromCharCode(command.data.distanceStringLength);
				commandToSend += command.data.position.concat(code.concat(command.data.distanceString));
				break;
			/*
				commandPacket = {
					type: command,
					data: "3"
				};
			*/
			case "RACE_END":
				commandToSend = "D";
				commandToSend += String.fromCharCode(command.data);
				break;
			/*
				commandPacket = {
					type: command,
					meIndex: 3,
					data: ["Anita", "Devin", "Grant", "Preston"]
				};
			*/
			case "RACE_END_ALL":
				commandToSend = "E";
				for (let i = 0; i < command.data.length; i++) {
					commandToSend = commandToSend.concat(command.data[i])
					for (let j = command.data[i].length; j < 19; j++) {
						commandToSend = commandToSend.concat('\0');
					}
					if (i == command.meIndex) {
						commandToSend = commandToSend.concat('\u0001');
					} else {
						commandToSend = commandToSend.concat('\0');
					}
				}
				break;
		}
		for (let i = commandToSend.length; i < 121; i++) {
			commandToSend = commandToSend.concat('\0');
		}
		const valueBase64 = new Buffer(commandToSend).toString('base64');
		getState().racingReducer.device.writeCharacteristicWithoutResponseForService(getState().racingReducer.uart_serviceUUID, getState().racingReducer.uart_rxUUID, valueBase64);
	}
}

function process_gps_string(gps_data_string) {
	if(gps_data_string[2] == "N") {
		if ((gps_data_string[43] != "W" && gps_data_string[43] != "E") || (gps_data_string[30] != "N" && gps_data_string[30] != "S")) {
			return {
				forPrint: "GPS DATA MALFORMED",
				forArray: [],
				lock: false,
				utc: "UTC DATA MALFORMED",
				vaid: false,
			}
		}
		// parse position and time and set lock to true
		let utc_time = gps_data_string.substring(7, 17);
		gps_substr_lat_1 = NaN;
		gps_substr_lat_2 = NaN;
		gps_substr_lat_1 = parseFloat(gps_data_string.substring(20, 22));
		gps_substr_lat_2 = parseFloat(gps_data_string.substring(22, 29));
		let lat_data = gps_substr_lat_1 + gps_substr_lat_2/60;
		let lat_string = lat_data.toString().substring(0, 7);
		lat_data = (gps_data_string[30] == "S") ? -lat_data : lat_data;
		lat_string = (gps_data_string[30] == "S") ? lat_string + " South\n" : lat_string + " North\n";

		gps_substr_lon_1 = NaN;
		gps_substr_lon_2 = NaN;
		gps_substr_lon_1 = parseFloat(gps_data_string.substring(32, 35));
		gps_substr_lon_2 = parseFloat(gps_data_string.substring(35, 42));
		let lon_data = gps_substr_lon_1 + gps_substr_lon_2/60;
		let lon_string = lon_data.toString().substring(0, 7);
		lon_string = (gps_data_string[43] == "W") ? lon_string + " West\n" : lon_string + " East\n";
		lon_data = (gps_data_string[43] == "W") ? -lon_data : lon_data;
		gps_string_print = "Time: " + utc_time + " UTC\n";
		gps_string_print = gps_string_print.concat(lat_string.concat(lon_string));

		return {
			forPrint: gps_string_print,
			forArray: [lat_data, lon_data],
			lock: true,
			utc: utc_time,
			valid: !isNaN(lon_data) && !isNaN(lat_data)
		}
		
	} else if (gps_data_string[2] == "P") {
		// parse time only and set lock to false
		let utc_time = gps_data_string.substring(7, 17);
		let for_print = "Time: " + utc_time.concat(" UTC\n NO GPS LOCK");
		return {
			forPrint: for_print,
			forArray: [],
			lock: false,
			utc: utc_time,
			valid: true,
		}
	} else {
		return {
			forPrint: "GPS DATA MALFORMED",
			forArray: [],
			lock: false,
			utc: "UTC DATA MALFORMED",
			vaid: false,
		}
	}
}
