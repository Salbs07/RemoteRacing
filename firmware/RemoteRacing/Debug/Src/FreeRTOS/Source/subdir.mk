################################################################################
# Automatically-generated file. Do not edit!
################################################################################

# Add inputs and outputs from these tool invocations to the build variables 
C_SRCS += \
../Src/FreeRTOS/Source/croutine.c \
../Src/FreeRTOS/Source/event_groups.c \
../Src/FreeRTOS/Source/list.c \
../Src/FreeRTOS/Source/queue.c \
../Src/FreeRTOS/Source/tasks.c \
../Src/FreeRTOS/Source/timers.c 

OBJS += \
./Src/FreeRTOS/Source/croutine.o \
./Src/FreeRTOS/Source/event_groups.o \
./Src/FreeRTOS/Source/list.o \
./Src/FreeRTOS/Source/queue.o \
./Src/FreeRTOS/Source/tasks.o \
./Src/FreeRTOS/Source/timers.o 

C_DEPS += \
./Src/FreeRTOS/Source/croutine.d \
./Src/FreeRTOS/Source/event_groups.d \
./Src/FreeRTOS/Source/list.d \
./Src/FreeRTOS/Source/queue.d \
./Src/FreeRTOS/Source/tasks.d \
./Src/FreeRTOS/Source/timers.d 


# Each subdirectory must supply rules for building sources it contributes
Src/FreeRTOS/Source/croutine.o: ../Src/FreeRTOS/Source/croutine.c
	arm-none-eabi-gcc "$<" -mcpu=cortex-m0 -std=gnu11 -g3 -DUSE_HAL_DRIVER -DSTM32F030x8 -DDEBUG -c -I../Inc -I../Drivers/STM32F0xx_HAL_Driver/Inc -I../Drivers/CMSIS/Include -I"C:/Users/DatBoi/RemoteRacing/firmware/RemoteRacing/Src/FreeRTOS/Source/portable/GCC/ARM_CM0" -I../Drivers/STM32F0xx_HAL_Driver/Inc/Legacy -I../Drivers/CMSIS/Device/ST/STM32F0xx/Include -I"C:/Users/DatBoi/RemoteRacing/firmware/RemoteRacing/Src/FreeRTOS/Source/portable/MemMang" -I"C:/Users/DatBoi/RemoteRacing/firmware/RemoteRacing/Src/FreeRTOS/Source/include" -O0 -ffunction-sections -fdata-sections -Wall -fstack-usage -MMD -MP -MF"Src/FreeRTOS/Source/croutine.d" -MT"$@" --specs=nano.specs -mfloat-abi=soft -mthumb -o "$@"
Src/FreeRTOS/Source/event_groups.o: ../Src/FreeRTOS/Source/event_groups.c
	arm-none-eabi-gcc "$<" -mcpu=cortex-m0 -std=gnu11 -g3 -DUSE_HAL_DRIVER -DSTM32F030x8 -DDEBUG -c -I../Inc -I../Drivers/STM32F0xx_HAL_Driver/Inc -I../Drivers/CMSIS/Include -I"C:/Users/DatBoi/RemoteRacing/firmware/RemoteRacing/Src/FreeRTOS/Source/portable/GCC/ARM_CM0" -I../Drivers/STM32F0xx_HAL_Driver/Inc/Legacy -I../Drivers/CMSIS/Device/ST/STM32F0xx/Include -I"C:/Users/DatBoi/RemoteRacing/firmware/RemoteRacing/Src/FreeRTOS/Source/portable/MemMang" -I"C:/Users/DatBoi/RemoteRacing/firmware/RemoteRacing/Src/FreeRTOS/Source/include" -O0 -ffunction-sections -fdata-sections -Wall -fstack-usage -MMD -MP -MF"Src/FreeRTOS/Source/event_groups.d" -MT"$@" --specs=nano.specs -mfloat-abi=soft -mthumb -o "$@"
Src/FreeRTOS/Source/list.o: ../Src/FreeRTOS/Source/list.c
	arm-none-eabi-gcc "$<" -mcpu=cortex-m0 -std=gnu11 -g3 -DUSE_HAL_DRIVER -DSTM32F030x8 -DDEBUG -c -I../Inc -I../Drivers/STM32F0xx_HAL_Driver/Inc -I../Drivers/CMSIS/Include -I"C:/Users/DatBoi/RemoteRacing/firmware/RemoteRacing/Src/FreeRTOS/Source/portable/GCC/ARM_CM0" -I../Drivers/STM32F0xx_HAL_Driver/Inc/Legacy -I../Drivers/CMSIS/Device/ST/STM32F0xx/Include -I"C:/Users/DatBoi/RemoteRacing/firmware/RemoteRacing/Src/FreeRTOS/Source/portable/MemMang" -I"C:/Users/DatBoi/RemoteRacing/firmware/RemoteRacing/Src/FreeRTOS/Source/include" -O0 -ffunction-sections -fdata-sections -Wall -fstack-usage -MMD -MP -MF"Src/FreeRTOS/Source/list.d" -MT"$@" --specs=nano.specs -mfloat-abi=soft -mthumb -o "$@"
Src/FreeRTOS/Source/queue.o: ../Src/FreeRTOS/Source/queue.c
	arm-none-eabi-gcc "$<" -mcpu=cortex-m0 -std=gnu11 -g3 -DUSE_HAL_DRIVER -DSTM32F030x8 -DDEBUG -c -I../Inc -I../Drivers/STM32F0xx_HAL_Driver/Inc -I../Drivers/CMSIS/Include -I"C:/Users/DatBoi/RemoteRacing/firmware/RemoteRacing/Src/FreeRTOS/Source/portable/GCC/ARM_CM0" -I../Drivers/STM32F0xx_HAL_Driver/Inc/Legacy -I../Drivers/CMSIS/Device/ST/STM32F0xx/Include -I"C:/Users/DatBoi/RemoteRacing/firmware/RemoteRacing/Src/FreeRTOS/Source/portable/MemMang" -I"C:/Users/DatBoi/RemoteRacing/firmware/RemoteRacing/Src/FreeRTOS/Source/include" -O0 -ffunction-sections -fdata-sections -Wall -fstack-usage -MMD -MP -MF"Src/FreeRTOS/Source/queue.d" -MT"$@" --specs=nano.specs -mfloat-abi=soft -mthumb -o "$@"
Src/FreeRTOS/Source/tasks.o: ../Src/FreeRTOS/Source/tasks.c
	arm-none-eabi-gcc "$<" -mcpu=cortex-m0 -std=gnu11 -g3 -DUSE_HAL_DRIVER -DSTM32F030x8 -DDEBUG -c -I../Inc -I../Drivers/STM32F0xx_HAL_Driver/Inc -I../Drivers/CMSIS/Include -I"C:/Users/DatBoi/RemoteRacing/firmware/RemoteRacing/Src/FreeRTOS/Source/portable/GCC/ARM_CM0" -I../Drivers/STM32F0xx_HAL_Driver/Inc/Legacy -I../Drivers/CMSIS/Device/ST/STM32F0xx/Include -I"C:/Users/DatBoi/RemoteRacing/firmware/RemoteRacing/Src/FreeRTOS/Source/portable/MemMang" -I"C:/Users/DatBoi/RemoteRacing/firmware/RemoteRacing/Src/FreeRTOS/Source/include" -O0 -ffunction-sections -fdata-sections -Wall -fstack-usage -MMD -MP -MF"Src/FreeRTOS/Source/tasks.d" -MT"$@" --specs=nano.specs -mfloat-abi=soft -mthumb -o "$@"
Src/FreeRTOS/Source/timers.o: ../Src/FreeRTOS/Source/timers.c
	arm-none-eabi-gcc "$<" -mcpu=cortex-m0 -std=gnu11 -g3 -DUSE_HAL_DRIVER -DSTM32F030x8 -DDEBUG -c -I../Inc -I../Drivers/STM32F0xx_HAL_Driver/Inc -I../Drivers/CMSIS/Include -I"C:/Users/DatBoi/RemoteRacing/firmware/RemoteRacing/Src/FreeRTOS/Source/portable/GCC/ARM_CM0" -I../Drivers/STM32F0xx_HAL_Driver/Inc/Legacy -I../Drivers/CMSIS/Device/ST/STM32F0xx/Include -I"C:/Users/DatBoi/RemoteRacing/firmware/RemoteRacing/Src/FreeRTOS/Source/portable/MemMang" -I"C:/Users/DatBoi/RemoteRacing/firmware/RemoteRacing/Src/FreeRTOS/Source/include" -O0 -ffunction-sections -fdata-sections -Wall -fstack-usage -MMD -MP -MF"Src/FreeRTOS/Source/timers.d" -MT"$@" --specs=nano.specs -mfloat-abi=soft -mthumb -o "$@"

