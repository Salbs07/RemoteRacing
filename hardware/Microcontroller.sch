EESchema Schematic File Version 4
LIBS:remote_racing_pcb-cache
EELAYER 30 0
EELAYER END
$Descr A4 11693 8268
encoding utf-8
Sheet 7 7
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
L Device:C C9
U 1 1 5F908C14
P 7650 3100
F 0 "C9" H 7765 3146 50  0000 L CNN
F 1 "100nF" H 7765 3055 50  0000 L CNN
F 2 "Capacitors_SMD:C_0805" H 7688 2950 50  0001 C CNN
F 3 "~" H 7650 3100 50  0001 C CNN
	1    7650 3100
	1    0    0    -1  
$EndComp
$Comp
L Device:C C11
U 1 1 5F908F9A
P 8150 3100
F 0 "C11" H 8265 3146 50  0000 L CNN
F 1 "4.7uF" H 8265 3055 50  0000 L CNN
F 2 "Capacitors_SMD:C_0805" H 8188 2950 50  0001 C CNN
F 3 "~" H 8150 3100 50  0001 C CNN
	1    8150 3100
	1    0    0    -1  
$EndComp
$Comp
L Device:C C7
U 1 1 5F902F9D
P 7150 3100
F 0 "C7" H 7265 3146 50  0000 L CNN
F 1 "100nF" H 7265 3055 50  0000 L CNN
F 2 "Capacitors_SMD:C_0805" H 7188 2950 50  0001 C CNN
F 3 "~" H 7150 3100 50  0001 C CNN
	1    7150 3100
	1    0    0    -1  
$EndComp
Wire Wire Line
	7150 2950 7650 2950
Wire Wire Line
	8150 2950 7650 2950
Connection ~ 7650 2950
Wire Wire Line
	7150 3250 7650 3250
Wire Wire Line
	8150 3250 7650 3250
Connection ~ 7650 3250
$Comp
L power:GND #PWR0125
U 1 1 5F90BE03
P 7650 3250
F 0 "#PWR0125" H 7650 3000 50  0001 C CNN
F 1 "GND" H 7655 3077 50  0000 C CNN
F 2 "" H 7650 3250 50  0001 C CNN
F 3 "" H 7650 3250 50  0001 C CNN
	1    7650 3250
	1    0    0    -1  
$EndComp
$Comp
L power:+3.3V #PWR0126
U 1 1 5F90CDB7
P 7650 2950
F 0 "#PWR0126" H 7650 2800 50  0001 C CNN
F 1 "+3.3V" H 7665 3123 50  0000 C CNN
F 2 "" H 7650 2950 50  0001 C CNN
F 3 "" H 7650 2950 50  0001 C CNN
	1    7650 2950
	1    0    0    -1  
$EndComp
Text Notes 6850 2700 0    50   ~ 0
Place Capacitors between VDD and VSS pins
$Comp
L Device:C C8
U 1 1 5F914531
P 7350 4250
F 0 "C8" H 7465 4296 50  0000 L CNN
F 1 "10nF" H 7465 4205 50  0000 L CNN
F 2 "Capacitors_SMD:C_0805" H 7388 4100 50  0001 C CNN
F 3 "~" H 7350 4250 50  0001 C CNN
	1    7350 4250
	1    0    0    -1  
$EndComp
$Comp
L Device:C C10
U 1 1 5F91529D
P 7900 4250
F 0 "C10" H 8015 4296 50  0000 L CNN
F 1 "1uF" H 8015 4205 50  0000 L CNN
F 2 "Capacitors_SMD:C_0805" H 7938 4100 50  0001 C CNN
F 3 "~" H 7900 4250 50  0001 C CNN
	1    7900 4250
	1    0    0    -1  
$EndComp
Wire Wire Line
	7350 4100 7650 4100
Wire Wire Line
	7350 4400 7650 4400
$Comp
L power:+3.3V #PWR0127
U 1 1 5F9183FA
P 7650 4100
F 0 "#PWR0127" H 7650 3950 50  0001 C CNN
F 1 "+3.3V" H 7665 4273 50  0000 C CNN
F 2 "" H 7650 4100 50  0001 C CNN
F 3 "" H 7650 4100 50  0001 C CNN
	1    7650 4100
	1    0    0    -1  
$EndComp
Connection ~ 7650 4100
Wire Wire Line
	7650 4100 7900 4100
$Comp
L power:GND #PWR0128
U 1 1 5F918B19
P 7650 4400
F 0 "#PWR0128" H 7650 4150 50  0001 C CNN
F 1 "GND" H 7655 4227 50  0000 C CNN
F 2 "" H 7650 4400 50  0001 C CNN
F 3 "" H 7650 4400 50  0001 C CNN
	1    7650 4400
	1    0    0    -1  
$EndComp
Connection ~ 7650 4400
Wire Wire Line
	7650 4400 7900 4400
Text Notes 6800 3850 0    50   ~ 0
Place Capacitors between VDDA and VSSA pins
$Comp
L power:+3.3V #PWR0129
U 1 1 5F91E2D5
P 5400 1950
F 0 "#PWR0129" H 5400 1800 50  0001 C CNN
F 1 "+3.3V" H 5415 2123 50  0000 C CNN
F 2 "" H 5400 1950 50  0001 C CNN
F 3 "" H 5400 1950 50  0001 C CNN
	1    5400 1950
	1    0    0    -1  
$EndComp
Wire Wire Line
	5450 5600 5350 5600
Wire Wire Line
	5250 5600 5350 5600
Connection ~ 5350 5600
$Comp
L power:GND #PWR0130
U 1 1 5F91FE4D
P 5350 5650
F 0 "#PWR0130" H 5350 5400 50  0001 C CNN
F 1 "GND" H 5355 5477 50  0000 C CNN
F 2 "" H 5350 5650 50  0001 C CNN
F 3 "" H 5350 5650 50  0001 C CNN
	1    5350 5650
	1    0    0    -1  
$EndComp
Wire Wire Line
	5350 5600 5350 5650
Wire Wire Line
	5400 1950 5400 2000
Connection ~ 5400 2000
Text GLabel 5950 4600 2    50   Input ~ 0
IMU_SDA
Text GLabel 5950 4700 2    50   Input ~ 0
IMU_SCL
$Comp
L power:GND #PWR0131
U 1 1 5F930D28
P 4700 2450
F 0 "#PWR0131" H 4700 2200 50  0001 C CNN
F 1 "GND" H 4705 2277 50  0000 C CNN
F 2 "" H 4700 2450 50  0001 C CNN
F 3 "" H 4700 2450 50  0001 C CNN
	1    4700 2450
	1    0    0    -1  
$EndComp
Wire Wire Line
	4750 2400 4700 2400
Wire Wire Line
	4700 2400 4700 2450
$Comp
L Mouser_Components:SKQGAKE010 S1
U 1 1 5F93311F
P 2850 2200
F 0 "S1" H 3250 2465 50  0000 C CNN
F 1 "Button" H 3250 2374 50  0000 C CNN
F 2 "SKQGAKE010" H 3500 2300 50  0001 L CNN
F 3 "" H 3500 2200 50  0001 L CNN
F 4 "Tact switch,SMT,SPST,with stem,3.43N o/f Stem Tactile Switch, SPST-NO 50 mA 1.5mm" H 3500 2100 50  0001 L CNN "Description"
F 5 "" H 3500 2000 50  0001 L CNN "Height"
F 6 "688-SKQGAKE010" H 3500 1900 50  0001 L CNN "Mouser Part Number"
F 7 "https://www.mouser.co.uk/ProductDetail/ALPS/SKQGAKE010?qs=6EGMNY9ZYDT%2FL8q647gzYA%3D%3D" H 3500 1800 50  0001 L CNN "Mouser Price/Stock"
F 8 "ALPS" H 3500 1700 50  0001 L CNN "Manufacturer_Name"
F 9 "SKQGAKE010" H 3500 1600 50  0001 L CNN "Manufacturer_Part_Number"
	1    2850 2200
	1    0    0    -1  
$EndComp
$Comp
L Device:C C6
U 1 1 5F93620F
P 4050 2500
F 0 "C6" H 4165 2546 50  0000 L CNN
F 1 "100nF" H 4165 2455 50  0000 L CNN
F 2 "Capacitors_SMD:C_0805" H 4088 2350 50  0001 C CNN
F 3 "~" H 4050 2500 50  0001 C CNN
	1    4050 2500
	1    0    0    -1  
$EndComp
Wire Wire Line
	4050 2200 4050 2350
Wire Wire Line
	4050 2200 3650 2200
Wire Wire Line
	3650 2300 3650 2650
Wire Wire Line
	3650 2650 4050 2650
$Comp
L power:GND #PWR0132
U 1 1 5F938715
P 4050 2750
F 0 "#PWR0132" H 4050 2500 50  0001 C CNN
F 1 "GND" H 4055 2577 50  0000 C CNN
F 2 "" H 4050 2750 50  0001 C CNN
F 3 "" H 4050 2750 50  0001 C CNN
	1    4050 2750
	1    0    0    -1  
$EndComp
Wire Wire Line
	4050 2650 4050 2750
Connection ~ 4050 2650
NoConn ~ 2850 2300
Wire Wire Line
	4750 2200 4050 2200
Connection ~ 4050 2200
Text GLabel 3950 2000 0    50   Input ~ 0
NRST
Text Notes 3000 1850 0    50   ~ 0
Reset Button
Text GLabel 5950 3500 2    50   Input ~ 0
SWDIO
Text GLabel 5950 3600 2    50   Input ~ 0
SWCLK
Text GLabel 5950 2600 2    50   Input ~ 0
LCD_SEL
Text GLabel 5950 2700 2    50   Input ~ 0
LCD_SCK
Text GLabel 5950 2800 2    50   Input ~ 0
LCD_MISO
Text GLabel 5950 2900 2    50   Input ~ 0
LCD_MOSI
NoConn ~ 5950 3000
NoConn ~ 5950 4200
NoConn ~ 5950 4800
NoConn ~ 5950 5000
NoConn ~ 4750 5100
NoConn ~ 4750 4200
NoConn ~ 4750 4100
NoConn ~ 4750 4000
NoConn ~ 4750 3900
NoConn ~ 4750 3700
NoConn ~ 4750 3500
NoConn ~ 4750 3400
NoConn ~ 4750 3300
NoConn ~ 4750 3200
NoConn ~ 4750 3100
Text GLabel 5950 3100 2    50   Input ~ 0
BLE_RX
Text GLabel 5950 3200 2    50   Input ~ 0
BLE_TX
Text GLabel 5950 2400 2    50   Input ~ 0
GPS_RX
Text GLabel 5950 2500 2    50   Input ~ 0
GPS_TX
Text GLabel 4750 4300 0    50   Input ~ 0
LCD_DC
Text GLabel 4750 4400 0    50   Input ~ 0
LCD_CCS
Text GLabel 5950 3900 2    50   Input ~ 0
LCD_YP
Wire Wire Line
	5400 2000 5450 2000
Wire Wire Line
	5450 2000 5550 2000
Connection ~ 5450 2000
Wire Wire Line
	5350 2000 5400 2000
Wire Wire Line
	5250 2000 5350 2000
Connection ~ 5350 2000
$Comp
L MCU_ST_STM32F0:STM32F030R8Tx U2
U 1 1 5F8FBD6E
P 5350 3800
F 0 "U2" H 5750 2050 50  0000 C CNN
F 1 "STM32F030R8Tx" H 5350 3800 50  0000 C CNN
F 2 "Digikey Library:64-LQFP_(10x10)" H 4850 2100 50  0001 R CNN
F 3 "http://www.st.com/st-web-ui/static/active/en/resource/technical/document/datasheet/DM00088500.pdf" H 5350 3800 50  0001 C CNN
	1    5350 3800
	1    0    0    -1  
$EndComp
Text GLabel 5950 4000 2    50   Input ~ 0
LCD_XM
Text GLabel 5950 4100 2    50   Input ~ 0
LCD_YM
Text GLabel 5950 4900 2    50   Input ~ 0
LCD_XP
Text GLabel 4750 5200 0    50   Input ~ 0
SPARE_GPIO_0
Text GLabel 4750 5300 0    50   Input ~ 0
SPARE_GPIO_1
Text GLabel 4750 5400 0    50   Input ~ 0
SPARE_GPIO_2
Text GLabel 4750 3000 0    50   Input ~ 0
SPARE_GPIO_3
Text GLabel 5950 5100 2    50   Input ~ 0
LCD_8BIT_3
Text GLabel 5950 5200 2    50   Input ~ 0
LCD_8BIT_7
Text GLabel 5950 5300 2    50   Input ~ 0
LCD_8BIT_2
Text GLabel 5950 5400 2    50   Input ~ 0
LCD_8BIT_6
Text GLabel 5950 2300 2    50   Input ~ 0
GPS_FORCE_ON
Text GLabel 5950 2200 2    50   Input ~ 0
GPS_1PPS
NoConn ~ 5950 3300
NoConn ~ 5950 3400
Text GLabel 4750 4800 0    50   Input ~ 0
LCD_8BIT_4
Text GLabel 4750 4700 0    50   Input ~ 0
LCD_8BIT_0
Text GLabel 4750 4600 0    50   Input ~ 0
LCD_8BIT_5
Text GLabel 4750 4500 0    50   Input ~ 0
LCD_8BIT_1
NoConn ~ 2850 2200
Wire Wire Line
	4050 2200 4050 2000
Wire Wire Line
	4050 2000 3950 2000
Text GLabel 5950 4400 2    50   Input ~ 0
IMU_INT_2
Text GLabel 5950 4500 2    50   Input ~ 0
IMU_INT_1
NoConn ~ 5950 4300
Text GLabel 5950 3700 2    50   Input ~ 0
LED_GREEN
Text GLabel 4750 4900 0    50   Input ~ 0
LED_YELLOW
Text GLabel 4750 5000 0    50   Input ~ 0
LED_RED
$EndSCHEMATC
