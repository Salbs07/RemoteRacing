#ifndef RACING_TASKS_H_
#define RACING_TASKS_H_

#include "main.h"
#include "FreeRTOS.h"
#include "task.h"
#include "timers.h"
#include "queue.h"
#include "semphr.h"
#include "event_groups.h"
#include "MMA8452Q.h"
#include "GPS.h"
#include "BLE.h"

extern UART_HandleTypeDef huart1;
extern UART_HandleTypeDef huart2;

void RTOS_INIT();
void RTOS_INIT_TASKS();

xTaskHandle task_send_ble_packet_handle;
void task_send_ble_packet();

ble_data_packet_tx_t ble_tx_packet;
extern uint8_t txBuffer[GPS_TX_BUFFER_SIZE];

#endif
