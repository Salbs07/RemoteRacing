#ifndef BLE_H_
#define BLE_H_

#include "main.h"
#include "GPS.h"

extern UART_HandleTypeDef huart2;

#define BLE_TX_DATA_SIZE 120

typedef struct {
	uint8_t gps_data[GPS_TX_BUFFER_SIZE];
	float imu_data[3];

} ble_data_packet_tx_t;

typedef enum {POSITIONS = 0x00000000, RACE_LENGTH = 0x00000001, RACE_START = 0x00000002, RACE_END = 0x00000003} command_t;

typedef struct {
	command_t command;
	uint8_t command_data[BLE_TX_DATA_SIZE];
} ble_data_packet_rx_t;

void ble_init();
void ble_send(ble_data_packet_tx_t *packet);

#endif
