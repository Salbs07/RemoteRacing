#include "racing_tasks.h"

void RTOS_INIT() {
	ble_receive_ready = xSemaphoreCreateBinary();
	vTaskStartScheduler();
}

void RTOS_INIT_TASKS() {
	xTaskCreate(task_send_ble_packet, "send_ble_packet", 256, NULL, 0, task_send_ble_packet_handle);
	xTaskCreate(task_receive_ble_packet, "receive_ble_packet", 256, NULL, 1, task_receive_ble_packet_handle);
}

void task_send_ble_packet() {
	TickType_t xLastWakeTime;
	const TickType_t xFrequency = 50;
	xLastWakeTime = xTaskGetTickCount();
	for(;;) {
		vTaskDelayUntil( &xLastWakeTime, xFrequency );
		uint8_t ** gps_read_data = gps_get_data();
        if (gps_read_data[0] != NULL && gps_read_data[1] != NULL) {
        	if ( gps_read_data[1] >  gps_read_data[0]) {
        		unsigned int size = gps_read_data[1] - gps_read_data[0];
        		memcpy(ble_tx_packet.gps_data, gps_read_data[0], size);
        		memset(ble_tx_packet.gps_data + size, 0, GPS_MAX_COMMAND_LENGTH - size);
        	} else {
        		unsigned int size = (txBuffer + GPS_TX_BUFFER_SIZE) - gps_read_data[0];
        		memcpy(ble_tx_packet.gps_data, gps_read_data[0], size);
        		memcpy(ble_tx_packet.gps_data + size, txBuffer, gps_read_data[1] - txBuffer);
        		size += (gps_read_data[1] - txBuffer);
        		memset(ble_tx_packet.gps_data + size, 0, GPS_MAX_COMMAND_LENGTH - size);
        	}
        	ble_tx_packet.imu_data[0] = getX();
        	ble_tx_packet.imu_data[1] = getY();
        	ble_tx_packet.imu_data[2] = getZ();
        	ble_tx_packet.ending[0] = '-';
        	ble_tx_packet.ending[1] = '-';
        	ble_tx_packet.ending[2] = '-';
        	ble_tx_packet.ending[3] = '\r';
        	ble_tx_packet.ending[4] = '\n';

        	ble_send(&huart1, &ble_tx_packet);
        }
	}
}
void task_receive_ble_packet() {
	for(;;) {
//		if( xSemaphoreTake(ble_receive_ready, portMAX_DELAY) == pdTRUE ) {
		xSemaphoreTake(ble_receive_ready, portMAX_DELAY);

		uint8_t index = 0, position;
		const char race_end_msg[] = "    race finished!";
		char race_pos_msg[] = "  th place!";
		float current_time, time_to_wait;

		switch((uint8_t)RX_BUFFER.command) {
		case GPS_RIP_2020NOV:
			// display messsage that the GPS has moved onto the next life
			fillScreen(ILI9341_LIGHTGREY);
			break;

		case IDLE:
			// "use the app to start a race"
			 fillScreen(ILI9341_BLACK);
			break;

		case RACE_START:
			// Packet Format:
			//	command: 	'_'
			// 	data:		10 bytes: HHMMSS.SSS

			START_TIME = convert_time(&RX_BUFFER.command_data);

			// "put phone down, race starting soon"
			//print_function();

			// LED countdown
			current_time = gps_get_time();
			time_to_wait = START_TIME - current_time - 2;
			vTaskDelay((int) 1000*time_to_wait);
			setLED(RED, ON);
			vTaskDelay(1000);
			setLED(YELLOW, ON);
			vTaskDelay(1000);
			setLED(GREEN, ON);

			// print "Race!"

			break;

		case POS_UPDATE:
			// Packet Format:
			//	command: 	'U'
			// 	data:		<3 char array position, ie '1st', '2nd', '3rd'...> <length of next string (as an int)> <char array containing fraction, ie "3.3 / 4.0"> <padding characters>
			memcpy(&POSITION, RX_BUFFER.command_data, 3);
			memcpy(&DIST_FRACTION_SIZE, RX_BUFFER.command_data + 3, 1);
			memcpy(&DIST_FRACTION, RX_BUFFER.command_data + 4, DIST_FRACTION_SIZE);

			// Print to LCD:
			//	"Pos: <POSITION>"
			//	"<DIST_FRACTION> miles"
			break;

		case RACE_END:
			// Packet Format:
			//	command: 	'_'
			// 	data:		position in first byte

			// print finished on LCD

			// print time finished on LCD
			// get time from GPS data
//			FINISH_TIME = gps_get_time();

			position = RX_BUFFER.command_data[0];

			// constructs position message
			if(position % 10 == 1 && position != 11) {
				race_pos_msg[2] = 's';
				race_pos_msg[3] = 't';
			}
			else if(position % 10 == 2 && position != 12) {
				race_pos_msg[2] = 'n';
				race_pos_msg[3] = 'd';
			}
			else if(position % 10 == 3 && position != 13) {
				race_pos_msg[2] = 'r';
				race_pos_msg[3] = 'd';
			}

			if(position > 9) {
				race_pos_msg[0] = position/10 + '0';
				position %= 10;
			}
			race_pos_msg[1] = position + '0';

			// print position to LCD

			break;
		case RACE_END_ALL:
			// Positions of each racer

			// Packet Format:
			//	command: 	''
			// 	data:		6x: 19 character name + 1 character bool
			while (RX_BUFFER.command_data[index] && index < 120){
				// copy the names
				memcpy(&RACERS[index/20].name, RX_BUFFER.command_data + index, 19);
				memcpy(&RACERS[index/20].is_you, RX_BUFFER.command_data + index + 19, 1);
				index += 20;
			}

			// print the names and positions

			break;
		default:
			break;
		}
	}
}

// returns the current time in the format of a floating point number HHMMSS.SSS
float gps_get_time() {
	// get the current gps data
    uint8_t * gps_data = ble_tx_packet.gps_data;

    // GPS messages must start with GPRMC
    if(gps_data[1] != 'G' || (gps_data[2] != 'P' && gps_data[2] != 'N') || gps_data[3] != 'R' || gps_data[4] != 'M' || gps_data[5] != 'C')
        return 0;

    return convert_time(gps_data + 7);
}

// converts a uint8_t array in the format HHMMSS.SS to a float of the same format
float convert_time(uint8_t * time_in) {
	int index = 0;
	float time = 0, milliseconds = 0;

	// add the numbers before the decimal
	for(; index < 6; index++){
		time *= 10;
		time += time_in[index] - '0';
	}

	index++;    // skipping the decimal point in the message to continue to parse the number

	// add the numbers after the decimal
	for(; index < 9; index++){
		milliseconds *= 10;
		milliseconds += time_in[index] - '0';
	}
	milliseconds /= 1000;

	return time + milliseconds;
}

/* LCD FUNCTIONS - located here as the racer struct was not easily accessed through LCD.h*/
// prints the results of the race. The user is in red text.
void print_race_end_all(racer_t* racers, uint8_t num_racers) {
	  uint8_t i;
	  char results[] = "   RESULTS";
	  char space[] = "\n ";
	  lastcase = 3;
	  num_racer_results = num_racers;
	  erase_end();

	  LCD_draw_text_helper(results, strlen(results), 0, 0, 4, ILI9341_BLACK);
	  //LCD_draw_text_helper(space, strlen(space), cursor_x, cursor_y, 4, ILI9341_BLACK);
	  for (i = 0; i < num_racers; i++) {
		  char place[] = {i + 49 , ' '};
		  LCD_draw_text_helper(space, strlen(space), cursor_x, cursor_y, 3, ILI9341_BLACK);
		  RESULTS[i] = racers[i];
		  if ((racers + i)->is_you) {
			  LCD_draw_text_helper(place, 2, cursor_x, cursor_y, 3, ILI9341_RED);
			  LCD_draw_text_helper(racers[i].name, strlen(racers[i].name), cursor_x, cursor_y, 3, ILI9341_RED);
		  }
		  else {
			  LCD_draw_text_helper(place, 2, cursor_x, cursor_y, 3, ILI9341_BLACK);
			  LCD_draw_text_helper(racers[i].name, strlen(racers[i].name), cursor_x, cursor_y, 3, ILI9341_BLACK);
		  }
	  }
}
// IT IS NOT NECESSARY TO CALL THIS FUNCTION - text is already taken care of.
void erase_end_all(void) {
	  uint8_t i;
	  char results[] = "   RESULTS";
	  char space[] = "\n ";
	  lastcase = 3;
	  LCD_draw_text_helper(results, strlen(results), 0, 0, 4, ILI9341_WHITE);
	  for (i = 0; i < num_racer_results; i++) {
		  char place[] = {i + 49 , ' '};
		  LCD_draw_text_helper(space, strlen(space), cursor_x, cursor_y, 3, ILI9341_WHITE);
		  LCD_draw_text_helper(place, 2, cursor_x, cursor_y, 3, ILI9341_WHITE);
		  LCD_draw_text_helper(RESULTS[i].name, strlen(RESULTS[i].name), cursor_x, cursor_y, 3, ILI9341_WHITE);
	  }
}

