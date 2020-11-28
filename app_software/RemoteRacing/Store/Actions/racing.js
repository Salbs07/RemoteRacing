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
} from "./types";

import { Buffer } from 'buffer';
import { ActionSheetIOS } from "react-native";

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

export const setProcessData = (name) => (
	{
		type: SET_PROCESS_DATA,
		data: name
	}
);



//async functions
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
										dispatch(setGPSString(gps_data.forPrint));
										dispatch(gpsDataSet(gps_data.forArray));
										dispatch(gpsLockSet(gps_data.lock));
										dispatch(utcTimeSet(gps_data.utc));
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

function process_gps_string(gps_data_string) {
	if(gps_data_string[2] == "N") {
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
			forPrint: "GPRMC - NO LOCK\n",
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

export const sendCommand = (command) => {
	return function(dispatch, getState) {
		commandToSend;
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
				};
			*/
			case "RACE_START":
				commandToSend = "B";
				current_seconds = parseInt(getState().utc_time.substring(4, 6));
				current_minutes = parseInt(getState().utc_time.substring(2, 4));
				current_hours = parseInt(getState().utc_time.substring(0, 2));
				current_seconds += 30;

				current_minutes = (current_seconds > 59) ? current_minutes + 1: current_minutes;
				current_seconds = (current_seconds > 59) ? current_seconds - 60 : current_seconds;

				current_hours =  (current_minutes > 59) ? current_hours + 1 : current_hours;
				current_minutes = (current_minutes > 59) ? current_minutes - 60 : current_minutes;

				current_hours = (current_hours > 23) ? 0 : current_hours;

				start_time = current_hours.toString().concat(current_minutes.toString().concat(current_seconds.toString().concat(getState().utc_time.substring(6, 10))));
				commandToSend += start_time;
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
				commandToSend += command.data.position.concat(command.data.distanceStringLength.toString().concat(command.data.distanceString));
				break;
			/*
				commandPacket = {
					type: command,
					data: "3"
				};
			*/
			case "RACE_END":
				commandToSend = "D";
				commandToSend += command.data.toString();
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
		const valueBase64 = new Buffer(commandToSend).toString('base64');
		getState().device.writeCharacteristicWithoutResponseForService(getState().racingReducer.uart_serviceUUID, getState().racingReducer.uart_txUUID, valueBase64);
	}
}