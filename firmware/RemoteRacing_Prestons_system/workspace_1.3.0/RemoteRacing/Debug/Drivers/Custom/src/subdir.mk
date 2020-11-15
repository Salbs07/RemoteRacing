################################################################################
# Automatically-generated file. Do not edit!
################################################################################

# Add inputs and outputs from these tool invocations to the build variables 
C_SRCS += \
../Drivers/Custom/src/BLE.c \
../Drivers/Custom/src/GPS.c \
../Drivers/Custom/src/LCD.c \
../Drivers/Custom/src/MMA8452Q.c 

OBJS += \
./Drivers/Custom/src/BLE.o \
./Drivers/Custom/src/GPS.o \
./Drivers/Custom/src/LCD.o \
./Drivers/Custom/src/MMA8452Q.o 

C_DEPS += \
./Drivers/Custom/src/BLE.d \
./Drivers/Custom/src/GPS.d \
./Drivers/Custom/src/LCD.d \
./Drivers/Custom/src/MMA8452Q.d 


# Each subdirectory must supply rules for building sources it contributes
Drivers/Custom/src/BLE.o: ../Drivers/Custom/src/BLE.c
	arm-none-eabi-gcc "$<" -mcpu=cortex-m0 -std=gnu11 -g3 -DUSE_HAL_DRIVER -DSTM32F030x8 -DDEBUG -c -I../Drivers/Custom/inc -I../Drivers/STM32F0xx_HAL_Driver/Inc -I../Drivers/CMSIS/Include -I../Core/Inc -I../Drivers/STM32F0xx_HAL_Driver/Inc/Legacy -I../Drivers/CMSIS/Device/ST/STM32F0xx/Include -I../Core/FreeRTOS/Source/include -I../Core/FreeRTOS/Source/portable/GCC/ARM_CM0 -I../Core/FreeRTOS/Source/portable/MemMang -O0 -ffunction-sections -fdata-sections -Wall -fstack-usage -MMD -MP -MF"Drivers/Custom/src/BLE.d" -MT"$@" --specs=nano.specs -mfloat-abi=soft -mthumb -o "$@"
Drivers/Custom/src/GPS.o: ../Drivers/Custom/src/GPS.c
	arm-none-eabi-gcc "$<" -mcpu=cortex-m0 -std=gnu11 -g3 -DUSE_HAL_DRIVER -DSTM32F030x8 -DDEBUG -c -I../Drivers/Custom/inc -I../Drivers/STM32F0xx_HAL_Driver/Inc -I../Drivers/CMSIS/Include -I../Core/Inc -I../Drivers/STM32F0xx_HAL_Driver/Inc/Legacy -I../Drivers/CMSIS/Device/ST/STM32F0xx/Include -I../Core/FreeRTOS/Source/include -I../Core/FreeRTOS/Source/portable/GCC/ARM_CM0 -I../Core/FreeRTOS/Source/portable/MemMang -O0 -ffunction-sections -fdata-sections -Wall -fstack-usage -MMD -MP -MF"Drivers/Custom/src/GPS.d" -MT"$@" --specs=nano.specs -mfloat-abi=soft -mthumb -o "$@"
Drivers/Custom/src/LCD.o: ../Drivers/Custom/src/LCD.c
	arm-none-eabi-gcc "$<" -mcpu=cortex-m0 -std=gnu11 -g3 -DUSE_HAL_DRIVER -DSTM32F030x8 -DDEBUG -c -I../Drivers/Custom/inc -I../Drivers/STM32F0xx_HAL_Driver/Inc -I../Drivers/CMSIS/Include -I../Core/Inc -I../Drivers/STM32F0xx_HAL_Driver/Inc/Legacy -I../Drivers/CMSIS/Device/ST/STM32F0xx/Include -I../Core/FreeRTOS/Source/include -I../Core/FreeRTOS/Source/portable/GCC/ARM_CM0 -I../Core/FreeRTOS/Source/portable/MemMang -O0 -ffunction-sections -fdata-sections -Wall -fstack-usage -MMD -MP -MF"Drivers/Custom/src/LCD.d" -MT"$@" --specs=nano.specs -mfloat-abi=soft -mthumb -o "$@"
Drivers/Custom/src/MMA8452Q.o: ../Drivers/Custom/src/MMA8452Q.c
	arm-none-eabi-gcc "$<" -mcpu=cortex-m0 -std=gnu11 -g3 -DUSE_HAL_DRIVER -DSTM32F030x8 -DDEBUG -c -I../Drivers/Custom/inc -I../Drivers/STM32F0xx_HAL_Driver/Inc -I../Drivers/CMSIS/Include -I../Core/Inc -I../Drivers/STM32F0xx_HAL_Driver/Inc/Legacy -I../Drivers/CMSIS/Device/ST/STM32F0xx/Include -I../Core/FreeRTOS/Source/include -I../Core/FreeRTOS/Source/portable/GCC/ARM_CM0 -I../Core/FreeRTOS/Source/portable/MemMang -O0 -ffunction-sections -fdata-sections -Wall -fstack-usage -MMD -MP -MF"Drivers/Custom/src/MMA8452Q.d" -MT"$@" --specs=nano.specs -mfloat-abi=soft -mthumb -o "$@"

