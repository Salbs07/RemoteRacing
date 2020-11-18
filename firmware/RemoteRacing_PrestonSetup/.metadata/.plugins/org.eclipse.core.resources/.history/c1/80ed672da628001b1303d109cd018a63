#include "BLE.h"

UART_HandleTypeDef * BLE_UART = &huart2; // huart2 externed in header - redefine if changing uarts - for debugging statements

void ble_init() {
	HAL_UART_MspInit(BLE_UART);
}

void ble_send(ble_data_packet_tx_t *packet) {
	HAL_UART_Transmit_DMA(BLE_UART, (uint8_t *) packet, sizeof(packet));
}
