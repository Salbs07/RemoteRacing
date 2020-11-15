/*
 * GPS.c
 *
 *  Created on: Nov 11, 2020
 *      Author: pjfossee
 *
 *    /-----------OVERRUN RESET FOR REFERENCE-----------------//
//	  if (__HAL_UART_GET_FLAG(&huart1, UART_FLAG_ORE) != RESET) {
//		  __HAL_UART_CLEAR_IT(&huart1, UART_CLEAR_OREF);
//		}
 */

#include "GPS.h"

UART_HandleTypeDef * GPS_UART = &huart1; // huart1 externed in header - redefine if changing uarts
uint8_t rxBuffer[GPS_RX_BUFFER_SIZE]; // incoming data buffer to be filled by DMA

/*
 * Initialize the GPS module to a higher baud rate (9600 -> 57600), to only output GPRMC data, and to output at 10Hz rate
 */
uint8_t gps_init() {
	HAL_Delay(100);
	uint8_t command_baud_57600[GPS_BAUD_57600_SIZE] = GPS_BAUD_57600;
	uint8_t command_gprmc[GPS_GPRMC_ONLY_SIZE] = GPS_GPRMC_ONLY;
	uint8_t command_10hz[GPS_10HZ_SIZE] = GPS_10HZ;

	HAL_StatusTypeDef result = HAL_UART_Transmit(GPS_UART, command_baud_57600, GPS_BAUD_57600_SIZE, GPS_UART_TIMEOUT);
	if (result != HAL_OK) {
		return 0;
	}

	GPS_UART->Init.BaudRate = 57600;
	if (HAL_UART_Init(GPS_UART) != HAL_OK) {
		return 0;
	}

	HAL_Delay(100);

	result = HAL_UART_Transmit(GPS_UART, command_gprmc, GPS_GPRMC_ONLY_SIZE, GPS_UART_TIMEOUT);
	if (result != HAL_OK) {
		return 0;
	}

	HAL_Delay(100);

	result = HAL_UART_Transmit(GPS_UART, command_10hz, GPS_10HZ_SIZE, GPS_UART_TIMEOUT);
	if (result != HAL_OK) {
		return 0;
	}

	HAL_Delay(100);

	// Initialize DMA for GPS_UART
	HAL_UART_MspInit(GPS_UART);

	// Begin Receiving DMA for GPS_UART
	HAL_UART_Receive_DMA(GPS_UART, rxBuffer, GPS_RX_BUFFER_SIZE);
	return 1;
}

void gps_Recieve_Full() {
	memcpy(ble_tx_packet->gps_data, rxBuffer + GPS_RX_BUFFER_HALF_SIZE, GPS_TX_BUFFER_SIZE);
}

void gps_Recieve_Half() {
	memcpy(ble_tx_packet->gps_data, rxBuffer, GPS_TX_BUFFER_SIZE);
}


