#include "racing_tasks.h"

void RTOS_INIT() {
	vTaskStartScheduler();
}

void RTOS_INIT_TASKS() {
	xTaskCreate(task_send_ble_packet, "send_ble_packet", 256, NULL, 0, task_send_ble_packet_handle);
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
        	ble_tx_packet.imu_data[0] = getY();
        	ble_tx_packet.imu_data[0] = getZ();
        	ble_tx_packet.ending[0] = '-';
        	ble_tx_packet.ending[1] = '-';
        	ble_tx_packet.ending[2] = '-';
        	ble_tx_packet.ending[3] = '\r';
        	ble_tx_packet.ending[4] = '\n';

        	ble_send(&huart2, &ble_tx_packet);
        }
	}
}
