EESchema Schematic File Version 4
LIBS:remote_racing_pcb-cache
EELAYER 30 0
EELAYER END
$Descr A4 11693 8268
encoding utf-8
Sheet 6 7
Title ""
Date ""
Rev ""
Comp ""
Comment1 ""
Comment2 ""
Comment3 ""
Comment4 ""
$EndDescr
Text GLabel 6000 4300 2    50   Input ~ 0
GPS_RX
Text GLabel 6000 4200 2    50   Input ~ 0
GPS_TX
$Comp
L Mouser_Components:L86-M33 IC1
U 1 1 5F9D17FD
P 4600 3800
F 0 "IC1" H 5300 4065 50  0000 C CNN
F 1 "L86-M33" H 5300 3974 50  0000 C CNN
F 2 "Mouser_Components:L80-M39" H 5850 3900 50  0001 L CNN
F 3 "" H 5850 3800 50  0001 L CNN
F 4 "GPS/GLONASS receiver + antenna pack of 1" H 5850 3700 50  0001 L CNN "Description"
F 5 "" H 5850 3600 50  0001 L CNN "Height"
F 6 "277-L86-M33" H 5850 3500 50  0001 L CNN "Mouser Part Number"
F 7 "https://www.mouser.co.uk/ProductDetail/Quectel/L86-M33?qs=GedFDFLaBXFvEvNOo6IDYg%3D%3D" H 5850 3400 50  0001 L CNN "Mouser Price/Stock"
F 8 "Quectel" H 5850 3300 50  0001 L CNN "Manufacturer_Name"
F 9 "L86-M33" H 5850 3200 50  0001 L CNN "Manufacturer_Part_Number"
	1    4600 3800
	1    0    0    -1  
$EndComp
$Comp
L power:+3.3V #PWR0122
U 1 1 5F9D2813
P 7250 3900
F 0 "#PWR0122" H 7250 3750 50  0001 C CNN
F 1 "+3.3V" H 7265 4073 50  0000 C CNN
F 2 "" H 7250 3900 50  0001 C CNN
F 3 "" H 7250 3900 50  0001 C CNN
	1    7250 3900
	1    0    0    -1  
$EndComp
Wire Wire Line
	6000 3900 6000 4000
NoConn ~ 4600 4100
NoConn ~ 4600 4200
$Comp
L power:GND #PWR0123
U 1 1 5F9D45F8
P 7250 4200
F 0 "#PWR0123" H 7250 3950 50  0001 C CNN
F 1 "GND" H 7255 4027 50  0000 C CNN
F 2 "" H 7250 4200 50  0001 C CNN
F 3 "" H 7250 4200 50  0001 C CNN
	1    7250 4200
	1    0    0    -1  
$EndComp
$Comp
L power:GND #PWR0124
U 1 1 5F9D53CF
P 4550 4350
F 0 "#PWR0124" H 4550 4100 50  0001 C CNN
F 1 "GND" H 4555 4177 50  0000 C CNN
F 2 "" H 4550 4350 50  0001 C CNN
F 3 "" H 4550 4350 50  0001 C CNN
	1    4550 4350
	1    0    0    -1  
$EndComp
Wire Wire Line
	4600 4300 4550 4300
Wire Wire Line
	4550 4300 4550 4350
Text GLabel 4600 3800 0    50   Input ~ 0
GPS_FORCE_ON
NoConn ~ 4600 3900
Text GLabel 6000 3800 2    50   Input ~ 0
GPS_1PPS
Wire Wire Line
	6000 4100 6600 4100
$Comp
L Device:C C4
U 1 1 5F9DA1CB
P 6800 4050
F 0 "C4" H 6915 4096 50  0000 L CNN
F 1 "10uF" H 6915 4005 50  0000 L CNN
F 2 "Capacitors_SMD:C_0805" H 6838 3900 50  0001 C CNN
F 3 "~" H 6800 4050 50  0001 C CNN
	1    6800 4050
	1    0    0    -1  
$EndComp
$Comp
L Device:C C5
U 1 1 5F9DA8A9
P 7250 4050
F 0 "C5" H 7365 4096 50  0000 L CNN
F 1 "100nF" H 7365 4005 50  0000 L CNN
F 2 "Capacitors_SMD:C_0805" H 7288 3900 50  0001 C CNN
F 3 "~" H 7250 4050 50  0001 C CNN
	1    7250 4050
	1    0    0    -1  
$EndComp
Wire Wire Line
	6000 3900 6800 3900
Connection ~ 6000 3900
Wire Wire Line
	6800 3900 7250 3900
Connection ~ 6800 3900
Connection ~ 7250 3900
Wire Wire Line
	6600 4100 6600 4200
Wire Wire Line
	6600 4200 6800 4200
Wire Wire Line
	6800 4200 7250 4200
Connection ~ 6800 4200
Connection ~ 7250 4200
Text Notes 6600 3600 0    50   ~ 0
Place Ceramic \nCapacitors near VCC pin
$EndSCHEMATC
