EESchema Schematic File Version 4
LIBS:remote_racing_pcb-cache
EELAYER 30 0
EELAYER END
$Descr A4 11693 8268
encoding utf-8
Sheet 3 7
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
L power:GND #PWR0108
U 1 1 5F96F689
P 6700 2200
F 0 "#PWR0108" H 6700 1950 50  0001 C CNN
F 1 "GND" H 6705 2027 50  0000 C CNN
F 2 "" H 6700 2200 50  0001 C CNN
F 3 "" H 6700 2200 50  0001 C CNN
	1    6700 2200
	1    0    0    -1  
$EndComp
$Comp
L power:+3.3V #PWR0109
U 1 1 5F9707D9
P 8150 2200
F 0 "#PWR0109" H 8150 2050 50  0001 C CNN
F 1 "+3.3V" H 8165 2373 50  0000 C CNN
F 2 "" H 8150 2200 50  0001 C CNN
F 3 "" H 8150 2200 50  0001 C CNN
	1    8150 2200
	1    0    0    -1  
$EndComp
Text GLabel 7250 2300 0    50   Input ~ 0
NRST
Text GLabel 7250 2400 0    50   Input ~ 0
SWCLK
Text GLabel 7750 2400 2    50   Input ~ 0
SWDIO
Wire Wire Line
	6700 2200 7250 2200
Wire Wire Line
	7750 2200 8150 2200
Text Notes 7100 1850 0    50   ~ 0
Programming Header
Text Notes 3850 4600 0    50   ~ 0
LCD 8-Bit header\n
Text Notes 3950 2300 0    50   ~ 0
LCD Header
$Comp
L Connector_Generic:Conn_01x12 J2
U 1 1 5F99C381
P 4350 3100
F 0 "J2" H 4300 2350 50  0000 L CNN
F 1 "Conn_01x12" H 4100 3750 50  0000 L CNN
F 2 "Pin_Headers:Pin_Header_Straight_2x06_Pitch2.54mm" H 4350 3100 50  0001 C CNN
F 3 "~" H 4350 3100 50  0001 C CNN
	1    4350 3100
	1    0    0    -1  
$EndComp
$Comp
L power:+3.3V #PWR0110
U 1 1 5F99D691
P 3550 2600
F 0 "#PWR0110" H 3550 2450 50  0001 C CNN
F 1 "+3.3V" H 3565 2728 50  0000 L CNN
F 2 "" H 3550 2600 50  0001 C CNN
F 3 "" H 3550 2600 50  0001 C CNN
	1    3550 2600
	1    0    0    -1  
$EndComp
$Comp
L power:GND #PWR0111
U 1 1 5F99FB6C
P 3550 2850
F 0 "#PWR0111" H 3550 2600 50  0001 C CNN
F 1 "GND" H 3555 2677 50  0000 C CNN
F 2 "" H 3550 2850 50  0001 C CNN
F 3 "" H 3550 2850 50  0001 C CNN
	1    3550 2850
	1    0    0    -1  
$EndComp
Text GLabel 4150 2900 0    50   Input ~ 0
LCD_SEL
Text GLabel 4150 2800 0    50   Input ~ 0
LCD_SCK
Text GLabel 4150 3100 0    50   Input ~ 0
LCD_MISO
Text GLabel 4150 3000 0    50   Input ~ 0
LCD_MOSI
Text GLabel 4150 3300 0    50   Input ~ 0
LCD_DC
Text GLabel 4150 3200 0    50   Input ~ 0
LCD_CCS
Text GLabel 4150 3500 0    50   Input ~ 0
LCD_YP
Text GLabel 4150 3400 0    50   Input ~ 0
LCD_XM
Text GLabel 4150 3700 0    50   Input ~ 0
LCD_YM
Text GLabel 4150 3600 0    50   Input ~ 0
LCD_XP
Text GLabel 4450 5000 2    50   Input ~ 0
LCD_8BIT_5
Text GLabel 4450 5100 2    50   Input ~ 0
LCD_8BIT_6
Text GLabel 4450 5200 2    50   Input ~ 0
LCD_8BIT_7
Text GLabel 3950 5200 0    50   Input ~ 0
LCD_8BIT_3
Text GLabel 3950 5100 0    50   Input ~ 0
LCD_8BIT_2
Text GLabel 3950 5000 0    50   Input ~ 0
LCD_8BIT_1
Text GLabel 4450 4900 2    50   Input ~ 0
LCD_8BIT_4
Text GLabel 3950 4900 0    50   Input ~ 0
LCD_8BIT_0
Text Notes 5050 2600 0    50   ~ 0
3V3
Text Notes 5050 2700 0    50   ~ 0
GND
Text Notes 4450 3500 0    50   ~ 0
X+
Text Notes 4450 3400 0    50   ~ 0
Y-
Text Notes 4450 3300 0    50   ~ 0
X-
Text Notes 4450 3200 0    50   ~ 0
Y+
Text Notes 4450 3100 0    50   ~ 0
CCS
Text Notes 4450 3000 0    50   ~ 0
D/C | WR
Text Notes 4450 2900 0    50   ~ 0
MOSI | RD
Text Notes 4450 2800 0    50   ~ 0
MISO
Text Notes 4450 2700 0    50   ~ 0
SCK | C/D
Text Notes 4450 2600 0    50   ~ 0
CS
Text GLabel 7250 4050 0    50   Input ~ 0
LED_GREEN
$Comp
L Device:R_US R?
U 1 1 5FA0EA97
P 7400 4050
AR Path="/5F96E2E5/5FA0EA97" Ref="R?"  Part="1" 
AR Path="/5F9239BE/5FA0EA97" Ref="R3"  Part="1" 
F 0 "R3" V 7195 4050 50  0000 C CNN
F 1 "R_US" V 7286 4050 50  0000 C CNN
F 2 "Resistors_SMD:R_0805" V 7440 4040 50  0001 C CNN
F 3 "~" H 7400 4050 50  0001 C CNN
	1    7400 4050
	0    1    1    0   
$EndComp
$Comp
L power:GND #PWR0112
U 1 1 5FA0EA9D
P 7750 3950
AR Path="/5F9239BE/5FA0EA9D" Ref="#PWR0112"  Part="1" 
AR Path="/5F96E2E5/5FA0EA9D" Ref="#PWR?"  Part="1" 
F 0 "#PWR0112" H 7750 3700 50  0001 C CNN
F 1 "GND" H 7755 3777 50  0000 C CNN
F 2 "" H 7750 3950 50  0001 C CNN
F 3 "" H 7750 3950 50  0001 C CNN
	1    7750 3950
	1    0    0    -1  
$EndComp
Text Notes 7200 3050 0    50   ~ 0
Countdown LEDs
$Comp
L Device:R_US R?
U 1 1 5FA0EA91
P 7400 3700
AR Path="/5F96E2E5/5FA0EA91" Ref="R?"  Part="1" 
AR Path="/5F9239BE/5FA0EA91" Ref="R2"  Part="1" 
F 0 "R2" V 7195 3700 50  0000 C CNN
F 1 "R_US" V 7286 3700 50  0000 C CNN
F 2 "Resistors_SMD:R_0805" V 7440 3690 50  0001 C CNN
F 3 "~" H 7400 3700 50  0001 C CNN
	1    7400 3700
	0    1    1    0   
$EndComp
Text GLabel 7250 3700 0    50   Input ~ 0
LED_YELLOW
$Comp
L Device:R_US R?
U 1 1 5FA0EA8B
P 7400 3350
AR Path="/5F96E2E5/5FA0EA8B" Ref="R?"  Part="1" 
AR Path="/5F9239BE/5FA0EA8B" Ref="R1"  Part="1" 
F 0 "R1" V 7195 3350 50  0000 C CNN
F 1 "R_US" V 7286 3350 50  0000 C CNN
F 2 "Resistors_SMD:R_0805" V 7440 3340 50  0001 C CNN
F 3 "~" H 7400 3350 50  0001 C CNN
	1    7400 3350
	0    1    1    0   
$EndComp
Text GLabel 7250 3350 0    50   Input ~ 0
LED_RED
Wire Wire Line
	7550 3350 7550 3550
Wire Wire Line
	7550 3550 7850 3550
Wire Wire Line
	7550 3700 7550 3650
Wire Wire Line
	7550 3650 7850 3650
Wire Wire Line
	7550 4050 7550 3750
Wire Wire Line
	7550 3750 7850 3750
Wire Wire Line
	7850 3850 7750 3850
Wire Wire Line
	7750 3850 7750 3950
$Comp
L Connector_Generic:Conn_02x03_Odd_Even J3
U 1 1 5FA228B3
P 7450 2300
F 0 "J3" H 7500 2617 50  0000 C CNN
F 1 "Conn_02x03_Odd_Even" H 7500 2526 50  0000 C CNN
F 2 "Pin_Headers:Pin_Header_Straight_2x03_Pitch2.54mm" H 7450 2300 50  0001 C CNN
F 3 "~" H 7450 2300 50  0001 C CNN
	1    7450 2300
	1    0    0    -1  
$EndComp
NoConn ~ 7750 2300
$Comp
L Connector_Generic:Conn_02x04_Odd_Even J1
U 1 1 5FA2882F
P 4150 5000
F 0 "J1" H 4200 5317 50  0000 C CNN
F 1 "Conn_02x04_Odd_Even" H 4200 5226 50  0000 C CNN
F 2 "Pin_Headers:Pin_Header_Straight_2x04_Pitch2.54mm" H 4150 5000 50  0001 C CNN
F 3 "~" H 4150 5000 50  0001 C CNN
	1    4150 5000
	1    0    0    -1  
$EndComp
$Comp
L Connector_Generic:Conn_01x04 J?
U 1 1 5FA0EAA4
P 8050 3650
AR Path="/5F96E2E5/5FA0EAA4" Ref="J?"  Part="1" 
AR Path="/5F9239BE/5FA0EAA4" Ref="J4"  Part="1" 
F 0 "J4" H 8130 3642 50  0000 L CNN
F 1 "Conn_01x04" H 8130 3551 50  0000 L CNN
F 2 "Pin_Headers:Pin_Header_Straight_1x04_Pitch2.54mm" H 8050 3650 50  0001 C CNN
F 3 "~" H 8050 3650 50  0001 C CNN
	1    8050 3650
	1    0    0    -1  
$EndComp
Text Notes 7100 4800 0    50   ~ 0
Spare GPIO Header\n
$Comp
L Connector_Generic:Conn_01x05 J5
U 1 1 5FA4EC99
P 7750 5150
F 0 "J5" H 7830 5192 50  0000 L CNN
F 1 "Conn_01x05" H 7830 5101 50  0000 L CNN
F 2 "Pin_Headers:Pin_Header_Straight_1x05_Pitch2.54mm" H 7750 5150 50  0001 C CNN
F 3 "~" H 7750 5150 50  0001 C CNN
	1    7750 5150
	1    0    0    -1  
$EndComp
Text GLabel 7550 5250 0    50   Input ~ 0
SPARE_GPIO_3
Text GLabel 7550 5150 0    50   Input ~ 0
SPARE_GPIO_2
Text GLabel 7550 5050 0    50   Input ~ 0
SPARE_GPIO_1
Text GLabel 7550 4950 0    50   Input ~ 0
SPARE_GPIO_0
$Comp
L power:GND #PWR0113
U 1 1 5FA58DE2
P 7450 5450
AR Path="/5F9239BE/5FA58DE2" Ref="#PWR0113"  Part="1" 
AR Path="/5F96E2E5/5FA58DE2" Ref="#PWR?"  Part="1" 
F 0 "#PWR0113" H 7450 5200 50  0001 C CNN
F 1 "GND" H 7455 5277 50  0000 C CNN
F 2 "" H 7450 5450 50  0001 C CNN
F 3 "" H 7450 5450 50  0001 C CNN
	1    7450 5450
	1    0    0    -1  
$EndComp
Wire Wire Line
	7550 5350 7450 5350
Wire Wire Line
	7450 5350 7450 5450
Wire Wire Line
	3550 2700 3550 2850
Wire Wire Line
	4150 2700 3550 2700
Wire Wire Line
	4150 2600 3550 2600
$EndSCHEMATC
