#include "BLE.h"

void ble_init(UART_HandleTypeDef *BLE_UART) {
	HAL_UART_MspInit(BLE_UART);
}

void ble_send(UART_HandleTypeDef *BLE_UART, ble_data_packet_tx_t *packet) {
	HAL_UART_Transmit_DMA(BLE_UART, (uint8_t *) packet, sizeof(*packet));
}
