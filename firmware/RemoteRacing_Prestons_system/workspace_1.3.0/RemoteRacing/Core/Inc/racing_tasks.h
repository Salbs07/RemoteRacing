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

void RTOS_INIT();
void RTOS_INIT_TASKS();

xTaskHandle gps_packet_recieved_handle;
void task_gps_packet_recieved();

SemaphoreHandle_t gpsDataReady_s;
SemaphoreHandle_t sendBlePacket_s;

ble_data_packet_tx_t ble_tx_packet;

#endif
