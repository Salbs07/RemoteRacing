#ifndef ACCEL_H_
#define ACCEL_H_

/* accel.h
   This file contains the interface for the IMU accelerometer
*/

// ToDo: include reference to SparkFun cpp interface

#include "main.h"

/////////////////////////////////////////////////
////// MMA8452Q Miscellaneous Declarations //////
/////////////////////////////////////////////////
#define MMA8452Q_Address 0x1D

typedef enum{
	STATUS_MMA8452Q = 0x00,
	OUT_X_MSB = 0x01,
	OUT_X_LSB = 0x02,
	OUT_Y_MSB = 0x03,
	OUT_Y_LSB = 0x04,
	OUT_Z_MSB = 0x05,
	OUT_Z_LSB = 0x06,
	SYSMOD = 0x0B,
	INT_SOURCE = 0x0C,
	WHO_AM_I = 0x0D,
	XYZ_DATA_CFG = 0x0E,
	HP_FILTER_CUTOFF = 0x0F,
	PL_STATUS = 0x10,
	PL_CFG = 0x11,
	PL_COUNT = 0x12,
	PL_BF_ZCOMP = 0x13,
	P_L_THS_REG = 0x14,
	FF_MT_CFG = 0x15,
	FF_MT_SRC = 0x16,
	FF_MT_THS = 0x17,
	FF_MT_COUNT = 0x18,
	TRANSIENT_CFG = 0x1D,
	TRANSIENT_SRC = 0x1E,
	TRANSIENT_THS = 0x1F,
	TRANSIENT_COUNT = 0x20,
	PULSE_CFG = 0x21,
	PULSE_SRC = 0x22,
	PULSE_THSX = 0x23,
	PULSE_THSY = 0x24,
	PULSE_THSZ = 0x25,
	PULSE_TMLT = 0x26,
	PULSE_LTCY = 0x27,
	PULSE_WIND = 0x28,
	ASLP_COUNT = 0x29,
	CTRL_REG1 = 0x2A,
	CTRL_REG2 = 0x2B,
	CTRL_REG3 = 0x2C,
	CTRL_REG4 = 0x2D,
	CTRL_REG5 = 0x2E,
	OFF_X = 0x2F,
	OFF_Y = 0x30,
	OFF_Z = 0x31
}MMA8452Q_Register;

typedef enum{
	SCALE_2G = 2,
	SCALE_4G = 4,
	SCALE_8G = 8
} MMA8452Q_Scale;

typedef enum{
	DR_800_Hz,
	DR_400_Hz,
	DR_200_Hz,
	DR_100_Hz,
	DR_50_Hz,
	DR_12_Hz,
	DR_6_Hz,
	DR_1_Hz
} MMA8452Q_Data_Rate;

// Possible SYSMOD (system mode) States
#define SYSMOD_STANDBY 0b00
#define SYSMOD_WAKE 0b01
#define SYSMOD_SLEEP 0b10

// global variables
uint8_t SCALE;		// tracks accelerometer scale
float X, Y, Z;		// holds updated calculated acceleration

// accelerometer I2C handle
extern I2C_HandleTypeDef hi2c1;


uint8_t initMMA8452Q(uint8_t addr, MMA8452Q_Scale scale, MMA8452Q_Data_Rate rate);
void setScale(MMA8452Q_Scale scale);
void setDataRate(MMA8452Q_Data_Rate data_rate);
void standby(void);
void active(void);
uint8_t isActive(void);
uint8_t available(void);
void read();
void writeRegisters(MMA8452Q_Register reg, uint8_t *buffer, uint16_t len);
void writeRegister(MMA8452Q_Register reg, uint8_t data);
uint8_t readRegister(MMA8452Q_Register reg);
void readRegisters(MMA8452Q_Register reg, uint8_t *buffer, uint16_t len);
short getRawX(void);
short getRawY(void);
short getRawZ(void);
float getX(void);
float getY(void);
float getZ(void);

#endif // ACCEL_H_
