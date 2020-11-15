#include "racing_tasks.h"
#include "BLE.h"

void RTOS_INIT() {
	gpsDataReady_s = xSemaphoreCreateBinary();
	sendBlePacket_s = xSemaphoreCreateBinary();
	vTaskStartScheduler();
}

void RTOS_INIT_TASKS() {
	xTaskCreate(task_gps_packet_recieved, "gps_packet_recieved", 256, NULL, 0, gps_packet_recieved_handle);
}

void task_gps_packet_recieved() {
	for(;;) {
        if( xSemaphoreTake( gpsDataReady_s, ( TickType_t ) 20 ) == pdTRUE )
        {
        	xSemaphoreGive(sendBlePacket_s);
        }
	}
}

void task_send_ble_packet() {
	for(;;) {
        if(xSemaphoreTake(sendBlePacket_s, ( TickType_t ) 20 ) == pdTRUE )
        {

        }
	}
}
