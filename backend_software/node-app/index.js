import { createServer } from "http";
import { Server } from "socket.io";

const httpServer = createServer();
const io = new Server(httpServer, {
  // ...
});

const port = 3100;

function getDistanceFromLatLonInMi(lat1, lon1, lat2, lon2) {
  var R = 3958.8; // Radius of the earth in miles
  var dLat = deg2rad(lat2-lat1);  // deg2rad below
  var dLon = deg2rad(lon2-lon1); 
  var a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * 
    Math.sin(dLon/2) * Math.sin(dLon/2)
    ; 
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
  var d = R * c; // Distance in mi
  return d;
}

function deg2rad(deg) {
  return deg * (Math.PI/180)
}

function getStartTime(current_time) {
	let current_seconds = parseInt(current_time.substring(4, 6));
	let current_minutes = parseInt(current_time.substring(2, 4));
	let current_hours = parseInt(current_time.substring(0, 2));
	current_seconds += 30;

	let current_minutes_s = (current_seconds > 59) ? current_minutes + 1: current_minutes;
	let current_seconds_s = (current_seconds > 59) ? current_seconds - 60 : current_seconds;

	let current_hours_s =  (current_minutes > 59) ? current_hours + 1 : current_hours;
	let current_minutes_s = (current_minutes > 59) ? current_minutes - 60 : current_minutes;

	let current_hours_s = (current_hours > 23) ? 0 : current_hours;

	const filler = "0";

	let new_sec = current_seconds > 9 ? current_seconds.toString() : filler.concat(current_seconds.toString());
	let new_min = current_minutes > 9 ? current_minutes.toString() : filler.concat(current_minutes.toString());
	let new_hour = current_hours > 9 ? current_hours.toString() : filler.concat(current_hours.toString());

	let new_sec_s = current_seconds_s > 9 ? current_seconds_s.toString() : filler.concat(current_seconds_s.toString());
	let new_min_s = current_minutes_s > 9 ? current_minutes_s.toString() : filler.concat(current_minutes_s.toString());
	let new_hour_s = current_hours_s > 9 ? current_hours_s.toString() : filler.concat(current_hours_s.toString());
	let start_time_s = new_hour_s.concat(new_min_s.concat(new_sec_s.concat(current_time.substring(6, 10))));

	let start_time = new_hour.concat(new_min.concat(new_sec.concat(current_time.substring(6, 10))));
	return {value: parseFloat(start_time_s), stringData: start_time};

}

class Racer {
	name = "";
	time = "";
	ready = false;
	distance_so_far = 0;
	gpsDataLast = [];
	imu_difficulty = 0;
	elevation_difficulty = 0;
	finished = false;
	position = 0;

	constructor(racer_name) {
		this.name = racer_name;
	};

	updateDistance(gpsData) {
		if (!this.finished) {
			if (this.gpsDataLast.length == 0) {
				this.gpsDataLast = gpsData;
			} else {
				this.distance_so_far += getDistanceFromLatLonInMi(this.gpsDataLast[0], this.gpsDataLast[1], gpsData[0], gpsData[1]);
				this.gpsDataLast = gpsData;
			}
		}
	}
}

function racer_compare(racer1, racer2) {
	if (racer1.distance_so_far > racer2.distance_so_far) {
		return -1;
	} else if (racer1.distance_so_far < racer2.distance_so_far) {
		return 1;
	} else {
		return 0;
	}
}

function racer_compare_times(racer1, racer2) {
	if (racer1.time < racer2.time) {
		return -1;
	} else if (racer1.time > racer2.time) {
		return 1;
	} else {
		return 0;
	}
}

class Lobby {
	name = "";
	race_length = 0;
	racers = [];
	chat_names = [];
	chat_messages = [];
	status = "Waiting...";
	startTime = 0;
	startTimeString = "";
	interval;

	constructor(race_length, name) {
		this.race_length = race_length;
		this.name = name;
		setInterval(() => this.sortAndUpdate(), 1000);
	};

	sortAndUpdate() {
		this.racers.sort(racer_compare);
		io.emit("active lobby update", {lobby: this});
	}

	updateStatus() {
		let startRace = true;
		this.racers.forEach((racer) => {
			if (!racer.ready) {
				startRace = false;
			}
		});

		if (this.racers.length == 0) {
			startRace = false;
		}

		if (startRace) {
			this.status = "Race countdown beginning...";
			let startInfo = getStartTime(this.racers[0].time);
			this.startTime = startInfo.value;
			this.startTimeString = startInfo.stringData;
		}
	}

	addRacer(racer) {
		let racer_names = this.racers.map(racer => racer.name);
		if (!racer_names.includes(racer.name)) {
			this.racers.push(racer);
			return true;
		} else {
			return false;
		}
	}

	updateRacer(payload) {
		let racer = this.racers.filter(racer => racer.name == payload.racerName);
		if (racer.length > 0 && this.status == "Race!") {
			racer[0].updateDistance(payload.gpsData);
			racer[0].imu_difficulty += (payload.imuData[0] + payload.imuData[1] + payload.imuData[2]);
			racer[0].time = payload.time;
			if (racer[0].distance_so_far >= this.race_length) {
				racer[0].finished = true;
				let all_finished = true;
				this.racers.forEach((racer_i) => {
					if (!racer_i.finished) {
						all_finished = false;
					}
				});
				if (all_finished) {
					this.status = "Race Over!";
					// this.racers.sort(racer_compare_times);
					io.emit("active lobby update", {lobby: this});
				}
			}
		} else if (racer.length > 0 && this.status != "Race Over!") {
			racer[0].time = payload.time;
			if (this.status == "Race countdown beginning..." && parseFloat(racer[0].time) >= this.startTime) {
				this.status = "Race!";
				io.emit("active lobby update", {lobby: this});
			}
		}
	}
}

let lobbies = [];

io.on("connection", socket => {
  socket.on("get lobbies", payload => {
		let lobby_names = lobbies.map(lobby => lobby.name);
    socket.emit("get lobbies response", lobby_names);
	});

	socket.on("create lobby", payload => {
		let lobby_names = lobbies.map(lobby => lobby.name);
		let lobby = new Lobby(payload.distance, payload.name);
		let is_valid = !lobby_names.includes(lobby.name);
		if (is_valid) {
			lobbies.push(lobby);
			lobby_names = lobbies.map(lobby => lobby.name);
			socket.emit("create lobby response", {result: true, lobbyName: lobby.name});
			io.emit("get lobbies response", lobby_names);
		} else {
			socket.emit("create lobby response", {result: false, lobbyName: ""});
		}
	});

	socket.on("join lobby", payload => {
		let lobby = lobbies.filter(lobby => lobby.name == payload.lobbyName);
		if (lobby.length == 1) {
			let racer = new Racer(payload.racerName);
			let result = lobby[0].addRacer(racer);
			socket.emit("join lobby response", {result: result, lobbyName: lobby[0].name});
			io.emit("active lobby update", {lobby: lobby[0]});
		}
	});

	socket.on("leave lobby", payload => {
		let lobby = lobbies.filter(lobby => lobby.name == payload.lobbyName);
		if (lobby.length == 1) {
			lobby[0].racers = lobby[0].racers.filter(racer => racer.name != payload.racerName);
			lobby[0].updateStatus();
			socket.emit("leave lobby response", {result: true});
			io.emit("active lobby update", {lobby: lobby[0]});
		} else {
			socket.emit("leave lobby response", {result: false});
		}
	});

	socket.on("update readyup", payload => {
		let lobby = lobbies.filter(lobby => lobby.name == payload.lobbyName);
		if (lobby.length == 1) {
			let racer = lobby[0].racers.filter(racer => racer.name == payload.racerName);
			if (racer.length > 0) {
				racer[0].ready = payload.readyup;
				lobby[0].updateStatus();
				io.emit("active lobby update", {lobby: lobby[0]});
			}
		}
	});

	socket.on("gps_imu_data", payload => {
		let lobby = lobbies.filter(lobby => lobby.name == payload.lobbyName);
		if (lobby.length == 1) {
			lobby[0].updateRacer(payload);
		}
	});

	socket.on("new message", payload => {
		let lobby = lobbies.filter(lobby => lobby.name == payload.lobbyName);
		if (lobby.length == 1) {
			lobby[0].chat_names.push(payload.racerName);
			lobby[0].chat_messages.push(payload.message);
			io.emit("active lobby update", {lobby: lobby[0]});
		}
	});
});

httpServer.listen(port, () => console.log("server running on port:" + port));
