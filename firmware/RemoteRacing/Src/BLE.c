#include "BLE.h"
#include "racing_tasks.h"

void ble_init(UART_HandleTypeDef *BLE_UART) {
	HAL_UART_MspInit(BLE_UART);
	HAL_UART_Receive_DMA(BLE_UART, (uint8_t *) &RX_BUFFER, sizeof(RX_BUFFER));
}

void ble_send(UART_HandleTypeDef *BLE_UART, ble_data_packet_tx_t *packet) {
	HAL_UART_Transmit_DMA(BLE_UART, (uint8_t *) packet, sizeof(*packet));
}
/*
void ble_receive(UART_HandleTypeDef *BLE_UART) {
	HAL_UART_Receive_DMA(BLE_UART, RX_BUFFER, sizeof(RX_BUFFER));
}
*/
void ble_receive_full() {
	xSemaphoreGiveFromISR(ble_receive_ready, NULL);
}
/*
void ble_recieve_half() {
	memcpy(txBufferInsertIndex, rxBuffer, GPS_RX_BUFFER_HALF_SIZE);
	txBufferInsertIndex = (txBufferInsertIndex == txBuffer + GPS_TX_BUFFER_LAST_POS) ? txBuffer : txBufferInsertIndex + GPS_RX_BUFFER_HALF_SIZE;
}
*/
