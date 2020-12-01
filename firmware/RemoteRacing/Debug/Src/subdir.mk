################################################################################
# Automatically-generated file. Do not edit!
################################################################################

# Add inputs and outputs from these tool invocations to the build variables 
C_SRCS += \
../Src/BLE.c \
../Src/GPS.c \
../Src/LCD.c \
../Src/LEDs.c \
../Src/MMA8452Q.c \
../Src/freertos.c \
../Src/main.c \
../Src/racing_tasks.c \
../Src/stm32f0xx_hal_msp.c \
../Src/stm32f0xx_hal_timebase_tim.c \
../Src/stm32f0xx_it.c \
../Src/syscalls.c \
../Src/sysmem.c \
../Src/system_stm32f0xx.c 

OBJS += \
./Src/BLE.o \
./Src/GPS.o \
./Src/LCD.o \
./Src/LEDs.o \
./Src/MMA8452Q.o \
./Src/freertos.o \
./Src/main.o \
./Src/racing_tasks.o \
./Src/stm32f0xx_hal_msp.o \
./Src/stm32f0xx_hal_timebase_tim.o \
./Src/stm32f0xx_it.o \
./Src/syscalls.o \
./Src/sysmem.o \
./Src/system_stm32f0xx.o 

C_DEPS += \
./Src/BLE.d \
./Src/GPS.d \
./Src/LCD.d \
./Src/LEDs.d \
./Src/MMA8452Q.d \
./Src/freertos.d \
./Src/main.d \
./Src/racing_tasks.d \
./Src/stm32f0xx_hal_msp.d \
./Src/stm32f0xx_hal_timebase_tim.d \
./Src/stm32f0xx_it.d \
./Src/syscalls.d \
./Src/sysmem.d \
./Src/system_stm32f0xx.d 


# Each subdirectory must supply rules for building sources it contributes
Src/BLE.o: ../Src/BLE.c
	arm-none-eabi-gcc "$<" -mcpu=cortex-m0 -std=gnu11 -g3 -DUSE_HAL_DRIVER -DSTM32F030x8 -DDEBUG -c -I../Inc -I../Drivers/STM32F0xx_HAL_Driver/Inc -I../Drivers/CMSIS/Include -I"/Users/pjfossee/College/473/RemoteRacing/firmware/RemoteRacing/Src/FreeRTOS/Source/portable/GCC/ARM_CM0" -I../Drivers/STM32F0xx_HAL_Driver/Inc/Legacy -I../Drivers/CMSIS/Device/ST/STM32F0xx/Include -I"/Users/pjfossee/College/473/RemoteRacing/firmware/RemoteRacing/Src/FreeRTOS/Source/portable/MemMang" -I"/Users/pjfossee/College/473/RemoteRacing/firmware/RemoteRacing/Src/FreeRTOS/Source/include" -O0 -ffunction-sections -fdata-sections -Wall -fstack-usage -MMD -MP -MF"Src/BLE.d" -MT"$@" --specs=nano.specs -mfloat-abi=soft -mthumb -o "$@"
Src/GPS.o: ../Src/GPS.c
	arm-none-eabi-gcc "$<" -mcpu=cortex-m0 -std=gnu11 -g3 -DUSE_HAL_DRIVER -DSTM32F030x8 -DDEBUG -c -I../Inc -I../Drivers/STM32F0xx_HAL_Driver/Inc -I../Drivers/CMSIS/Include -I"/Users/pjfossee/College/473/RemoteRacing/firmware/RemoteRacing/Src/FreeRTOS/Source/portable/GCC/ARM_CM0" -I../Drivers/STM32F0xx_HAL_Driver/Inc/Legacy -I../Drivers/CMSIS/Device/ST/STM32F0xx/Include -I"/Users/pjfossee/College/473/RemoteRacing/firmware/RemoteRacing/Src/FreeRTOS/Source/portable/MemMang" -I"/Users/pjfossee/College/473/RemoteRacing/firmware/RemoteRacing/Src/FreeRTOS/Source/include" -O0 -ffunction-sections -fdata-sections -Wall -fstack-usage -MMD -MP -MF"Src/GPS.d" -MT"$@" --specs=nano.specs -mfloat-abi=soft -mthumb -o "$@"
Src/LCD.o: ../Src/LCD.c
	arm-none-eabi-gcc "$<" -mcpu=cortex-m0 -std=gnu11 -g3 -DUSE_HAL_DRIVER -DSTM32F030x8 -DDEBUG -c -I../Inc -I../Drivers/STM32F0xx_HAL_Driver/Inc -I../Drivers/CMSIS/Include -I"/Users/pjfossee/College/473/RemoteRacing/firmware/RemoteRacing/Src/FreeRTOS/Source/portable/GCC/ARM_CM0" -I../Drivers/STM32F0xx_HAL_Driver/Inc/Legacy -I../Drivers/CMSIS/Device/ST/STM32F0xx/Include -I"/Users/pjfossee/College/473/RemoteRacing/firmware/RemoteRacing/Src/FreeRTOS/Source/portable/MemMang" -I"/Users/pjfossee/College/473/RemoteRacing/firmware/RemoteRacing/Src/FreeRTOS/Source/include" -O0 -ffunction-sections -fdata-sections -Wall -fstack-usage -MMD -MP -MF"Src/LCD.d" -MT"$@" --specs=nano.specs -mfloat-abi=soft -mthumb -o "$@"
Src/LEDs.o: ../Src/LEDs.c
	arm-none-eabi-gcc "$<" -mcpu=cortex-m0 -std=gnu11 -g3 -DUSE_HAL_DRIVER -DSTM32F030x8 -DDEBUG -c -I../Inc -I../Drivers/STM32F0xx_HAL_Driver/Inc -I../Drivers/CMSIS/Include -I"/Users/pjfossee/College/473/RemoteRacing/firmware/RemoteRacing/Src/FreeRTOS/Source/portable/GCC/ARM_CM0" -I../Drivers/STM32F0xx_HAL_Driver/Inc/Legacy -I../Drivers/CMSIS/Device/ST/STM32F0xx/Include -I"/Users/pjfossee/College/473/RemoteRacing/firmware/RemoteRacing/Src/FreeRTOS/Source/portable/MemMang" -I"/Users/pjfossee/College/473/RemoteRacing/firmware/RemoteRacing/Src/FreeRTOS/Source/include" -O0 -ffunction-sections -fdata-sections -Wall -fstack-usage -MMD -MP -MF"Src/LEDs.d" -MT"$@" --specs=nano.specs -mfloat-abi=soft -mthumb -o "$@"
Src/MMA8452Q.o: ../Src/MMA8452Q.c
	arm-none-eabi-gcc "$<" -mcpu=cortex-m0 -std=gnu11 -g3 -DUSE_HAL_DRIVER -DSTM32F030x8 -DDEBUG -c -I../Inc -I../Drivers/STM32F0xx_HAL_Driver/Inc -I../Drivers/CMSIS/Include -I"/Users/pjfossee/College/473/RemoteRacing/firmware/RemoteRacing/Src/FreeRTOS/Source/portable/GCC/ARM_CM0" -I../Drivers/STM32F0xx_HAL_Driver/Inc/Legacy -I../Drivers/CMSIS/Device/ST/STM32F0xx/Include -I"/Users/pjfossee/College/473/RemoteRacing/firmware/RemoteRacing/Src/FreeRTOS/Source/portable/MemMang" -I"/Users/pjfossee/College/473/RemoteRacing/firmware/RemoteRacing/Src/FreeRTOS/Source/include" -O0 -ffunction-sections -fdata-sections -Wall -fstack-usage -MMD -MP -MF"Src/MMA8452Q.d" -MT"$@" --specs=nano.specs -mfloat-abi=soft -mthumb -o "$@"
Src/freertos.o: ../Src/freertos.c
	arm-none-eabi-gcc "$<" -mcpu=cortex-m0 -std=gnu11 -g3 -DUSE_HAL_DRIVER -DSTM32F030x8 -DDEBUG -c -I../Inc -I../Drivers/STM32F0xx_HAL_Driver/Inc -I../Drivers/CMSIS/Include -I"/Users/pjfossee/College/473/RemoteRacing/firmware/RemoteRacing/Src/FreeRTOS/Source/portable/GCC/ARM_CM0" -I../Drivers/STM32F0xx_HAL_Driver/Inc/Legacy -I../Drivers/CMSIS/Device/ST/STM32F0xx/Include -I"/Users/pjfossee/College/473/RemoteRacing/firmware/RemoteRacing/Src/FreeRTOS/Source/portable/MemMang" -I"/Users/pjfossee/College/473/RemoteRacing/firmware/RemoteRacing/Src/FreeRTOS/Source/include" -O0 -ffunction-sections -fdata-sections -Wall -fstack-usage -MMD -MP -MF"Src/freertos.d" -MT"$@" --specs=nano.specs -mfloat-abi=soft -mthumb -o "$@"
Src/main.o: ../Src/main.c
	arm-none-eabi-gcc "$<" -mcpu=cortex-m0 -std=gnu11 -g3 -DUSE_HAL_DRIVER -DSTM32F030x8 -DDEBUG -c -I../Inc -I../Drivers/STM32F0xx_HAL_Driver/Inc -I../Drivers/CMSIS/Include -I"/Users/pjfossee/College/473/RemoteRacing/firmware/RemoteRacing/Src/FreeRTOS/Source/portable/GCC/ARM_CM0" -I../Drivers/STM32F0xx_HAL_Driver/Inc/Legacy -I../Drivers/CMSIS/Device/ST/STM32F0xx/Include -I"/Users/pjfossee/College/473/RemoteRacing/firmware/RemoteRacing/Src/FreeRTOS/Source/portable/MemMang" -I"/Users/pjfossee/College/473/RemoteRacing/firmware/RemoteRacing/Src/FreeRTOS/Source/include" -O0 -ffunction-sections -fdata-sections -Wall -fstack-usage -MMD -MP -MF"Src/main.d" -MT"$@" --specs=nano.specs -mfloat-abi=soft -mthumb -o "$@"
Src/racing_tasks.o: ../Src/racing_tasks.c
	arm-none-eabi-gcc "$<" -mcpu=cortex-m0 -std=gnu11 -g3 -DUSE_HAL_DRIVER -DSTM32F030x8 -DDEBUG -c -I../Inc -I../Drivers/STM32F0xx_HAL_Driver/Inc -I../Drivers/CMSIS/Include -I"/Users/pjfossee/College/473/RemoteRacing/firmware/RemoteRacing/Src/FreeRTOS/Source/portable/GCC/ARM_CM0" -I../Drivers/STM32F0xx_HAL_Driver/Inc/Legacy -I../Drivers/CMSIS/Device/ST/STM32F0xx/Include -I"/Users/pjfossee/College/473/RemoteRacing/firmware/RemoteRacing/Src/FreeRTOS/Source/portable/MemMang" -I"/Users/pjfossee/College/473/RemoteRacing/firmware/RemoteRacing/Src/FreeRTOS/Source/include" -O0 -ffunction-sections -fdata-sections -Wall -fstack-usage -MMD -MP -MF"Src/racing_tasks.d" -MT"$@" --specs=nano.specs -mfloat-abi=soft -mthumb -o "$@"
Src/stm32f0xx_hal_msp.o: ../Src/stm32f0xx_hal_msp.c
	arm-none-eabi-gcc "$<" -mcpu=cortex-m0 -std=gnu11 -g3 -DUSE_HAL_DRIVER -DSTM32F030x8 -DDEBUG -c -I../Inc -I../Drivers/STM32F0xx_HAL_Driver/Inc -I../Drivers/CMSIS/Include -I"/Users/pjfossee/College/473/RemoteRacing/firmware/RemoteRacing/Src/FreeRTOS/Source/portable/GCC/ARM_CM0" -I../Drivers/STM32F0xx_HAL_Driver/Inc/Legacy -I../Drivers/CMSIS/Device/ST/STM32F0xx/Include -I"/Users/pjfossee/College/473/RemoteRacing/firmware/RemoteRacing/Src/FreeRTOS/Source/portable/MemMang" -I"/Users/pjfossee/College/473/RemoteRacing/firmware/RemoteRacing/Src/FreeRTOS/Source/include" -O0 -ffunction-sections -fdata-sections -Wall -fstack-usage -MMD -MP -MF"Src/stm32f0xx_hal_msp.d" -MT"$@" --specs=nano.specs -mfloat-abi=soft -mthumb -o "$@"
Src/stm32f0xx_hal_timebase_tim.o: ../Src/stm32f0xx_hal_timebase_tim.c
	arm-none-eabi-gcc "$<" -mcpu=cortex-m0 -std=gnu11 -g3 -DUSE_HAL_DRIVER -DSTM32F030x8 -DDEBUG -c -I../Inc -I../Drivers/STM32F0xx_HAL_Driver/Inc -I../Drivers/CMSIS/Include -I"/Users/pjfossee/College/473/RemoteRacing/firmware/RemoteRacing/Src/FreeRTOS/Source/portable/GCC/ARM_CM0" -I../Drivers/STM32F0xx_HAL_Driver/Inc/Legacy -I../Drivers/CMSIS/Device/ST/STM32F0xx/Include -I"/Users/pjfossee/College/473/RemoteRacing/firmware/RemoteRacing/Src/FreeRTOS/Source/portable/MemMang" -I"/Users/pjfossee/College/473/RemoteRacing/firmware/RemoteRacing/Src/FreeRTOS/Source/include" -O0 -ffunction-sections -fdata-sections -Wall -fstack-usage -MMD -MP -MF"Src/stm32f0xx_hal_timebase_tim.d" -MT"$@" --specs=nano.specs -mfloat-abi=soft -mthumb -o "$@"
Src/stm32f0xx_it.o: ../Src/stm32f0xx_it.c
	arm-none-eabi-gcc "$<" -mcpu=cortex-m0 -std=gnu11 -g3 -DUSE_HAL_DRIVER -DSTM32F030x8 -DDEBUG -c -I../Inc -I../Drivers/STM32F0xx_HAL_Driver/Inc -I../Drivers/CMSIS/Include -I"/Users/pjfossee/College/473/RemoteRacing/firmware/RemoteRacing/Src/FreeRTOS/Source/portable/GCC/ARM_CM0" -I../Drivers/STM32F0xx_HAL_Driver/Inc/Legacy -I../Drivers/CMSIS/Device/ST/STM32F0xx/Include -I"/Users/pjfossee/College/473/RemoteRacing/firmware/RemoteRacing/Src/FreeRTOS/Source/portable/MemMang" -I"/Users/pjfossee/College/473/RemoteRacing/firmware/RemoteRacing/Src/FreeRTOS/Source/include" -O0 -ffunction-sections -fdata-sections -Wall -fstack-usage -MMD -MP -MF"Src/stm32f0xx_it.d" -MT"$@" --specs=nano.specs -mfloat-abi=soft -mthumb -o "$@"
Src/syscalls.o: ../Src/syscalls.c
	arm-none-eabi-gcc "$<" -mcpu=cortex-m0 -std=gnu11 -g3 -DUSE_HAL_DRIVER -DSTM32F030x8 -DDEBUG -c -I../Inc -I../Drivers/STM32F0xx_HAL_Driver/Inc -I../Drivers/CMSIS/Include -I"/Users/pjfossee/College/473/RemoteRacing/firmware/RemoteRacing/Src/FreeRTOS/Source/portable/GCC/ARM_CM0" -I../Drivers/STM32F0xx_HAL_Driver/Inc/Legacy -I../Drivers/CMSIS/Device/ST/STM32F0xx/Include -I"/Users/pjfossee/College/473/RemoteRacing/firmware/RemoteRacing/Src/FreeRTOS/Source/portable/MemMang" -I"/Users/pjfossee/College/473/RemoteRacing/firmware/RemoteRacing/Src/FreeRTOS/Source/include" -O0 -ffunction-sections -fdata-sections -Wall -fstack-usage -MMD -MP -MF"Src/syscalls.d" -MT"$@" --specs=nano.specs -mfloat-abi=soft -mthumb -o "$@"
Src/sysmem.o: ../Src/sysmem.c
	arm-none-eabi-gcc "$<" -mcpu=cortex-m0 -std=gnu11 -g3 -DUSE_HAL_DRIVER -DSTM32F030x8 -DDEBUG -c -I../Inc -I../Drivers/STM32F0xx_HAL_Driver/Inc -I../Drivers/CMSIS/Include -I"/Users/pjfossee/College/473/RemoteRacing/firmware/RemoteRacing/Src/FreeRTOS/Source/portable/GCC/ARM_CM0" -I../Drivers/STM32F0xx_HAL_Driver/Inc/Legacy -I../Drivers/CMSIS/Device/ST/STM32F0xx/Include -I"/Users/pjfossee/College/473/RemoteRacing/firmware/RemoteRacing/Src/FreeRTOS/Source/portable/MemMang" -I"/Users/pjfossee/College/473/RemoteRacing/firmware/RemoteRacing/Src/FreeRTOS/Source/include" -O0 -ffunction-sections -fdata-sections -Wall -fstack-usage -MMD -MP -MF"Src/sysmem.d" -MT"$@" --specs=nano.specs -mfloat-abi=soft -mthumb -o "$@"
Src/system_stm32f0xx.o: ../Src/system_stm32f0xx.c
	arm-none-eabi-gcc "$<" -mcpu=cortex-m0 -std=gnu11 -g3 -DUSE_HAL_DRIVER -DSTM32F030x8 -DDEBUG -c -I../Inc -I../Drivers/STM32F0xx_HAL_Driver/Inc -I../Drivers/CMSIS/Include -I"/Users/pjfossee/College/473/RemoteRacing/firmware/RemoteRacing/Src/FreeRTOS/Source/portable/GCC/ARM_CM0" -I../Drivers/STM32F0xx_HAL_Driver/Inc/Legacy -I../Drivers/CMSIS/Device/ST/STM32F0xx/Include -I"/Users/pjfossee/College/473/RemoteRacing/firmware/RemoteRacing/Src/FreeRTOS/Source/portable/MemMang" -I"/Users/pjfossee/College/473/RemoteRacing/firmware/RemoteRacing/Src/FreeRTOS/Source/include" -O0 -ffunction-sections -fdata-sections -Wall -fstack-usage -MMD -MP -MF"Src/system_stm32f0xx.d" -MT"$@" --specs=nano.specs -mfloat-abi=soft -mthumb -o "$@"

