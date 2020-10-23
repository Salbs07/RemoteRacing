EESchema Schematic File Version 4
LIBS:remote_racing_pcb-cache
EELAYER 30 0
EELAYER END
$Descr A4 11693 8268
encoding utf-8
Sheet 5 8
Title ""
Date ""
Rev ""
Comp ""
Comment1 ""
Comment2 ""
Comment3 ""
Comment4 ""
$EndDescr
Text GLabel 5400 4600 0    50   Input ~ 0
accel_SCL
Text GLabel 5900 5300 3    50   Input ~ 0
accel_SDA
Wire Wire Line
	6600 4400 6850 4400
$Comp
L Device:C C?
U 1 1 5F9263CF
P 6850 4050
F 0 "C?" H 6965 4096 50  0000 L CNN
F 1 "4.7uF" H 6965 4005 50  0000 L CNN
F 2 "" H 6888 3900 50  0001 C CNN
F 3 "~" H 6850 4050 50  0001 C CNN
	1    6850 4050
	1    0    0    -1  
$EndComp
Wire Wire Line
	6850 3700 6100 3700
Text Notes 6900 3900 0    50   ~ 0
Place Ceramic \nCapacitor near pins
Wire Wire Line
	6850 3700 6850 3900
Wire Wire Line
	6850 4200 6850 4400
$Comp
L Mouser_Components:MMA8452QR1 AC?
U 1 1 5F92167B
P 5400 4300
F 0 "AC?" H 6000 5081 50  0000 C CNN
F 1 "MMA8452QR1" H 6000 4990 50  0000 C CNN
F 2 "MMA8452QR1" H 6450 4700 50  0001 L CNN
F 3 "http://www.nxp.com/docs/en/data-sheet/MMA8452Q.pdf" H 6450 4600 50  0001 L CNN
F 4 "NXP - MMA8452QR1 - ACCELEROMETER, 1024/512/256COUNTS/G, QFN" H 6450 4500 50  0001 L CNN "Description"
F 5 "1" H 6450 4400 50  0001 L CNN "Height"
F 6 "841-MMA8452QR1" H 6450 4300 50  0001 L CNN "Mouser Part Number"
F 7 "https://www.mouser.co.uk/ProductDetail/NXP-Semiconductors/MMA8452QR1?qs=nf24X8JpkflP9lEXYucw7A%3D%3D" H 6450 4200 50  0001 L CNN "Mouser Price/Stock"
F 8 "NXP" H 6450 4100 50  0001 L CNN "Manufacturer_Name"
F 9 "MMA8452QR1" H 6450 4000 50  0001 L CNN "Manufacturer_Part_Number"
	1    5400 4300
	1    0    0    -1  
$EndComp
NoConn ~ 5900 3700
NoConn ~ 6000 3700
NoConn ~ 6100 5300
NoConn ~ 6600 4300
$Comp
L power:+3.3V #PWR?
U 1 1 5F92A081
P 6850 3700
F 0 "#PWR?" H 6850 3550 50  0001 C CNN
F 1 "+3.3V" H 6865 3873 50  0000 C CNN
F 2 "" H 6850 3700 50  0001 C CNN
F 3 "" H 6850 3700 50  0001 C CNN
	1    6850 3700
	1    0    0    -1  
$EndComp
Connection ~ 6850 3700
$Comp
L power:+3.3V #PWR?
U 1 1 5F92B3EA
P 4000 4300
F 0 "#PWR?" H 4000 4150 50  0001 C CNN
F 1 "+3.3V" H 4015 4473 50  0000 C CNN
F 2 "" H 4000 4300 50  0001 C CNN
F 3 "" H 4000 4300 50  0001 C CNN
	1    4000 4300
	1    0    0    -1  
$EndComp
NoConn ~ 5400 4500
$Comp
L Device:C C?
U 1 1 5F92D4E8
P 4500 4550
F 0 "C?" H 4615 4596 50  0000 L CNN
F 1 "0.1nF" H 4615 4505 50  0000 L CNN
F 2 "" H 4538 4400 50  0001 C CNN
F 3 "~" H 4500 4550 50  0001 C CNN
	1    4500 4550
	1    0    0    -1  
$EndComp
Wire Wire Line
	5400 4400 4500 4400
$Comp
L Device:C C?
U 1 1 5F92E7E2
P 4000 4550
F 0 "C?" H 4115 4596 50  0000 L CNN
F 1 "0.1nF" H 4115 4505 50  0000 L CNN
F 2 "" H 4038 4400 50  0001 C CNN
F 3 "~" H 4000 4550 50  0001 C CNN
	1    4000 4550
	1    0    0    -1  
$EndComp
Wire Wire Line
	5400 4300 4000 4300
Wire Wire Line
	4000 4300 4000 4400
Connection ~ 4000 4300
Wire Wire Line
	4000 4700 4500 4700
Wire Wire Line
	4500 4700 5400 4700
Connection ~ 4500 4700
$Comp
L power:GND #PWR?
U 1 1 5F930686
P 4000 4700
F 0 "#PWR?" H 4000 4450 50  0001 C CNN
F 1 "GND" H 4005 4527 50  0000 C CNN
F 2 "" H 4000 4700 50  0001 C CNN
F 3 "" H 4000 4700 50  0001 C CNN
	1    4000 4700
	1    0    0    -1  
$EndComp
Connection ~ 4000 4700
$EndSCHEMATC
