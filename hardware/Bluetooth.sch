EESchema Schematic File Version 4
LIBS:remote_racing_pcb-cache
EELAYER 30 0
EELAYER END
$Descr A4 11693 8268
encoding utf-8
Sheet 4 7
Title ""
Date ""
Rev ""
Comp ""
Comment1 ""
Comment2 ""
Comment3 ""
Comment4 ""
$EndDescr
$Comp
L SparkFun-RF:SparkFun_Pro_nRF52840_Mini U1
U 1 1 5F9BAE9A
P 5800 3950
F 0 "U1" H 5800 4515 50  0000 C CNN
F 1 "SparkFun_Pro_nRF52840_Mini" H 5800 4424 50  0000 C CNN
F 2 "libs:SparkFun_Pro_nRF52840_Mini" H 5800 3950 50  0001 C CNN
F 3 "https://cdn.sparkfun.com/assets/learn_tutorials/8/2/0/nRF52840Mini_Graphical_Datasheet.pdf" H 5800 3950 50  0001 C CNN
	1    5800 3950
	1    0    0    -1  
$EndComp
NoConn ~ 6300 3650
$Comp
L power:+3.3V #PWR0115
U 1 1 5F9BF593
P 6850 4050
F 0 "#PWR0115" H 6850 3900 50  0001 C CNN
F 1 "+3.3V" H 6865 4223 50  0000 C CNN
F 2 "" H 6850 4050 50  0001 C CNN
F 3 "" H 6850 4050 50  0001 C CNN
	1    6850 4050
	1    0    0    -1  
$EndComp
Wire Wire Line
	6300 3750 6550 3750
Wire Wire Line
	6400 4050 6850 4050
$Comp
L power:GND #PWR0116
U 1 1 5F9BDCB6
P 6550 3750
F 0 "#PWR0116" H 6550 3500 50  0001 C CNN
F 1 "GND" H 6555 3577 50  0000 C CNN
F 2 "" H 6550 3750 50  0001 C CNN
F 3 "" H 6550 3750 50  0001 C CNN
	1    6550 3750
	1    0    0    -1  
$EndComp
Wire Wire Line
	6300 3950 6400 3950
Wire Wire Line
	6400 3950 6400 4050
NoConn ~ 6300 3850
NoConn ~ 6300 4050
NoConn ~ 6300 4150
NoConn ~ 6300 4250
NoConn ~ 6300 4350
NoConn ~ 6300 4450
NoConn ~ 6300 4550
NoConn ~ 6300 4650
NoConn ~ 6300 4750
NoConn ~ 5300 4150
NoConn ~ 5300 4250
NoConn ~ 5300 4350
NoConn ~ 5300 4450
NoConn ~ 5300 4550
NoConn ~ 5300 4650
NoConn ~ 5300 4750
Text GLabel 5300 3750 0    50   Input ~ 0
BLE_RX
Text GLabel 5300 3650 0    50   Input ~ 0
BLE_TX
Text Notes 6650 3650 0    50   ~ 0
Using the 3v3 regulator and\nbattery charger onboard the\nBluetooth breakout board.
$EndSCHEMATC
