#ifndef GPS_H_
#define GPS_H_

#define GPS_RX_BUFFER_SIZE 144
#define GPS_RX_BUFFER_HALF_SIZE GPS_RX_BUFFER_SIZE/2
#define GPS_TX_BUFFER_SIZE GPS_RX_BUFFER_SIZE/2

#include <string.h>
#include "main.h"
#include "racing_tasks.h"

#define MAX_PACKET_LENGTH 255
#define GPS_GPRMC_ONLY "$PMTK314,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0*29\r\n"
#define GPS_GPRMC_ONLY_SIZE 51
#define GPS_10HZ "$PMTK220,100*2F\r\n"
#define GPS_10HZ_SIZE 17
#define GPS_BAUD_57600 "$PMTK251,57600*2C\r\n"
#define GPS_BAUD_57600_SIZE 19
#define GPS_UART_TIMEOUT 2000 //milliseconds

extern UART_HandleTypeDef huart1;
extern ble_data_packet_tx_t ble_tx_packet;

uint8_t txBuffer[GPS_TX_BUFFER_SIZE]; // incoming data buffer to be filled by DMA

uint8_t gps_init();
void gps_log_data();
void gps_Recieve_Full();
void gps_Recieve_Half();

#endif
