#ifndef BLE_H_
#define BLE_H_

#include "stm32f0xx_hal.h"

#define BLE_RX_DATA_SIZE 120
#define GPS_MAX_COMMAND_LENGTH 220
#define IMU_DATA_LENGTH 3
#define END_LING_LENGTH 5

// command: gps not locked, 	data: N/A
// command: idle, 				data: N/A - GPS data maybe not sent
// command: start race, 		data: race start time
// command: position update, 	data: new location - maybe send once per second when position changes or not at all
// command: race finish, 		data: finishing position
// command: entire race finish, data: finishing positions of all racers
typedef enum {GPS_RIP_2020NOV = 0x40, IDLE = 0x41, RACE_START = 0x42, POS_UPDATE = 0x43, RACE_END = 0x44, RACE_END_ALL = 0x45} command_t;

typedef struct __attribute__ ((__packed__)) {
	uint8_t gps_data[GPS_MAX_COMMAND_LENGTH];
	 float imu_data[IMU_DATA_LENGTH];
	 uint8_t ending[END_LING_LENGTH];
} ble_data_packet_tx_t;

typedef struct __attribute__ ((__packed__)) {
	command_t command;
	uint8_t command_data[BLE_RX_DATA_SIZE];
} ble_data_packet_rx_t;

ble_data_packet_rx_t RX_BUFFER;

void ble_init(UART_HandleTypeDef *BLE_UART);
void ble_send(UART_HandleTypeDef *BLE_UART, ble_data_packet_tx_t *packet);
//void ble_receive(UART_HandleTypeDef *BLE_UART, ble_data_packet_rx_t *packet);
void ble_receive_full();
//void ble_recieve_half();

#endif
