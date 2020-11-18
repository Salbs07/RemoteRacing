#ifndef BLE_H_
#define BLE_H_

#include "stm32f0xx_hal.h"

#define BLE_RX_DATA_SIZE 120
#define GPS_MAX_COMMAND_LENGTH 220
#define IMU_DATA_LENGTH 3
#define END_LING_LENGTH 5

typedef enum {POSITIONS = 0x00000000, RACE_LENGTH = 0x00000001, RACE_START = 0x00000002, RACE_END = 0x00000003} command_t;

typedef struct __attribute__ ((__packed__)) {
	uint8_t gps_data[GPS_MAX_COMMAND_LENGTH];
	 float imu_data[IMU_DATA_LENGTH];
	 uint8_t ending[END_LING_LENGTH];
} ble_data_packet_tx_t;

typedef struct {
	command_t command;
	uint8_t command_data[BLE_RX_DATA_SIZE];
} ble_data_packet_rx_t;

void ble_init(UART_HandleTypeDef *BLE_UART);
void ble_send(UART_HandleTypeDef *BLE_UART, ble_data_packet_tx_t *packet);

#endif
