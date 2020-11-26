import React from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ImageBackground,
  ScrollView,
} from 'react-native';
import {BleManager} from 'react-native-ble-plx';
import { Buffer } from 'buffer';

type AppState = {gps_string: string, imu_string: string, info: string, values: object};
type NavigationType = any;

const backgroundImage = "../Assets/Images/main_background_2.jpeg";

class TestSensor extends React.Component<NavigationType, AppState> {
  manager;
	serviceUUID;
	uart_rxUUID;
	uart_txUUID;
	subscription;

  constructor(props: any) {
	super(props);
	this.state = {gps_string: "", imu_string: "", info: "", values: {}};
	this.manager = new BleManager();
	this.serviceUUID = "6e400001-b5a3-f393-e0a9-e50e24dcca9e";
	this.uart_rxUUID = "6e400002-b5a3-f393-e0a9-e50e24dcca9e";
	this.uart_txUUID = "6e400003-b5a3-f393-e0a9-e50e24dcca9e";
	this.subscription = "";
    // let self = this;
    // setInterval(() => {fetch('http://45.79.182.118:3100/').then((response) => {response.text().then((html) => {self.setState({textResponse: html})})})}, 3000);
  }

  info(message) {
    this.setState({info: message + "\n"})
  }

  error(message) {
    this.setState({info: "ERROR: " + message})
  }

  updateValue(value) {
    this.setState({gps_string: value});
  }

  componentDidMount() {
	if (Platform.OS === 'ios') {
		this.manager.onStateChange((state) => {
		  if (state === 'PoweredOn') this.scanAndConnect()
		})
	  } else {
		this.scanAndConnect()
	  }
  }

  scanAndConnect() {
    this.manager.startDeviceScan(null, 
                                 null, (error, device) => {
      this.info("Scanning...")
      console.log(device)
      
      if (error) {
        this.error(error.message)
        return
      }

      if (device.name === 'Bluefruit52') {
        this.info("Connecting to Remote Racer")
        this.manager.stopDeviceScan()
        device.connect()
          .then((device) => {
            this.info("Discovering services and characteristics")
            return device.discoverAllServicesAndCharacteristics()
          })
          .then((device) => {
            this.info("Setting notifications")
						this.setupNotifications(device)
          })
          .then(() => {
            this.info("Listening...")
          }, (error) => {
            this.error(error.message)
          })
      }
    });
  }

	async setupNotifications(device) {
		this.subscription = device.monitorCharacteristicForService(this.serviceUUID, this.uart_txUUID, (error, characteristic) => {
			if (error) {
				this.error(error.message)
				return
			}
			const buffer = new Buffer(characteristic.value, 'base64');
			console.log(buffer);
			let buf = new ArrayBuffer(4);
			let view = new DataView(buf);
			let main_imu_string = "";
			this.setState({imu_string: ""})
			for (let i = 0; i < 3; i++) {
				let imu_string = "";
				for (let j = 0; j < 4; j++) {
					let index = (4 * i) + j;
					view.setUint8(3 - j, buffer[220 + index]);
				}
				let imu_val = view.getFloat32(0);
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
			this.setState({imu_string: main_imu_string})
			const bufStr = buffer.toString();
			this.updateValue(bufStr);
		})
	}

	componentWillUnmount() {
		if (this.subscription != "") {
			this.subscription.remove();
		}
		this.manager.cancelDeviceConnection;
	}

  render() {
    return (
      <ImageBackground source={require(backgroundImage)} style={styles.backgroundImage}>
		<View style={styles.test}>
          <View style={{flex: 2, justifyContent: "flex-start", flexDirection: "row", alignSelf: "center"}}>
		  	<TouchableOpacity style={styles.button} onPress={() => this.begin_printing_data()}>
              <Text style={styles.buttonText}>Begin Test</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={() => this.end_printing_data()}>
              <Text style={styles.buttonText}>End Test</Text>
            </TouchableOpacity>
          </View>
          <View style={{flex: 20, flexDirection: 'row', alignItems: 'stretch'}}>
			  <View style={styles.dataViewer}>
				  <View style={styles.dataTitle}>
					  <Text style={styles.dataTextTitle}>GPS:</Text>
				  </View>
				  <View style={styles.data}>
				  		<ScrollView> 
							<Text style={styles.dataText}>{this.state.gps_string}</Text>
						</ScrollView> 
				  </View>
			  </View>
			  <View style={styles.dataViewer}>
			  	<View style={styles.dataTitle}>
					  <Text style={styles.dataTextTitle}>IMU:</Text>
				  </View>
				  <View style={styles.data}>
				  	<ScrollView> 
						<Text style={styles.dataText}>{this.state.imu_string}</Text>
					</ScrollView> 
				  </View>
			  </View>
          </View>
		  <View style={{flex: 1}}>
          </View>
        </View>
      </ImageBackground>
    )
  }

  parse_device_data() {
	  return "";
  }

  begin_printing_data() {
	// this.setState({gps_string: this.state.gps_string + "GPS_DATA\n"});
	// this.setState({imu_string: this.state.imu_string + "IMU_DATA\n"});
  }

  end_printing_data() {
	this.setState({gps_string: "", imu_string: ""});
  }
}

const styles = StyleSheet.create({
  test: {
    flex: 1,
    // alignItems: 'center',
    // justifyContent: 'space-around',
  },
  button: {
	flex: 3,
    backgroundColor: '#FFFFFF',
    opacity: 0.9,
    color: "white",
    padding: 10,
    borderRadius: 10,
    height: 45,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 10,

  },
  buttonText: {
    color: "#333333",
    fontSize: 20,
  },
  backgroundImage: {
    flex: 1,
    // resizeMode: "cover",
    // justifyContent: "center"
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

export default TestSensor;
