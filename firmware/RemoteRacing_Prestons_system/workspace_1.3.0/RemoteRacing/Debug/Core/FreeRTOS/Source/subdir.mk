################################################################################
# Automatically-generated file. Do not edit!
################################################################################

# Add inputs and outputs from these tool invocations to the build variables 
C_SRCS += \
../Core/FreeRTOS/Source/croutine.c \
../Core/FreeRTOS/Source/event_groups.c \
../Core/FreeRTOS/Source/list.c \
../Core/FreeRTOS/Source/queue.c \
../Core/FreeRTOS/Source/tasks.c \
../Core/FreeRTOS/Source/timers.c 

OBJS += \
./Core/FreeRTOS/Source/croutine.o \
./Core/FreeRTOS/Source/event_groups.o \
./Core/FreeRTOS/Source/list.o \
./Core/FreeRTOS/Source/queue.o \
./Core/FreeRTOS/Source/tasks.o \
./Core/FreeRTOS/Source/timers.o 

C_DEPS += \
./Core/FreeRTOS/Source/croutine.d \
./Core/FreeRTOS/Source/event_groups.d \
./Core/FreeRTOS/Source/list.d \
./Core/FreeRTOS/Source/queue.d \
./Core/FreeRTOS/Source/tasks.d \
./Core/FreeRTOS/Source/timers.d 


# Each subdirectory must supply rules for building sources it contributes
Core/FreeRTOS/Source/croutine.o: ../Core/FreeRTOS/Source/croutine.c
	arm-none-eabi-gcc "$<" -mcpu=cortex-m0 -std=gnu11 -g3 -DUSE_HAL_DRIVER -DSTM32F030x8 -DDEBUG -c -I../Drivers/Custom/inc -I../Drivers/STM32F0xx_HAL_Driver/Inc -I../Drivers/CMSIS/Include -I../Core/Inc -I../Drivers/STM32F0xx_HAL_Driver/Inc/Legacy -I../Drivers/CMSIS/Device/ST/STM32F0xx/Include -I../Core/FreeRTOS/Source/include -I../Core/FreeRTOS/Source/portable/GCC/ARM_CM0 -I../Core/FreeRTOS/Source/portable/MemMang -O0 -ffunction-sections -fdata-sections -Wall -fstack-usage -MMD -MP -MF"Core/FreeRTOS/Source/croutine.d" -MT"$@" --specs=nano.specs -mfloat-abi=soft -mthumb -o "$@"
Core/FreeRTOS/Source/event_groups.o: ../Core/FreeRTOS/Source/event_groups.c
	arm-none-eabi-gcc "$<" -mcpu=cortex-m0 -std=gnu11 -g3 -DUSE_HAL_DRIVER -DSTM32F030x8 -DDEBUG -c -I../Drivers/Custom/inc -I../Drivers/STM32F0xx_HAL_Driver/Inc -I../Drivers/CMSIS/Include -I../Core/Inc -I../Drivers/STM32F0xx_HAL_Driver/Inc/Legacy -I../Drivers/CMSIS/Device/ST/STM32F0xx/Include -I../Core/FreeRTOS/Source/include -I../Core/FreeRTOS/Source/portable/GCC/ARM_CM0 -I../Core/FreeRTOS/Source/portable/MemMang -O0 -ffunction-sections -fdata-sections -Wall -fstack-usage -MMD -MP -MF"Core/FreeRTOS/Source/event_groups.d" -MT"$@" --specs=nano.specs -mfloat-abi=soft -mthumb -o "$@"
Core/FreeRTOS/Source/list.o: ../Core/FreeRTOS/Source/list.c
	arm-none-eabi-gcc "$<" -mcpu=cortex-m0 -std=gnu11 -g3 -DUSE_HAL_DRIVER -DSTM32F030x8 -DDEBUG -c -I../Drivers/Custom/inc -I../Drivers/STM32F0xx_HAL_Driver/Inc -I../Drivers/CMSIS/Include -I../Core/Inc -I../Drivers/STM32F0xx_HAL_Driver/Inc/Legacy -I../Drivers/CMSIS/Device/ST/STM32F0xx/Include -I../Core/FreeRTOS/Source/include -I../Core/FreeRTOS/Source/portable/GCC/ARM_CM0 -I../Core/FreeRTOS/Source/portable/MemMang -O0 -ffunction-sections -fdata-sections -Wall -fstack-usage -MMD -MP -MF"Core/FreeRTOS/Source/list.d" -MT"$@" --specs=nano.specs -mfloat-abi=soft -mthumb -o "$@"
Core/FreeRTOS/Source/queue.o: ../Core/FreeRTOS/Source/queue.c
	arm-none-eabi-gcc "$<" -mcpu=cortex-m0 -std=gnu11 -g3 -DUSE_HAL_DRIVER -DSTM32F030x8 -DDEBUG -c -I../Drivers/Custom/inc -I../Drivers/STM32F0xx_HAL_Driver/Inc -I../Drivers/CMSIS/Include -I../Core/Inc -I../Drivers/STM32F0xx_HAL_Driver/Inc/Legacy -I../Drivers/CMSIS/Device/ST/STM32F0xx/Include -I../Core/FreeRTOS/Source/include -I../Core/FreeRTOS/Source/portable/GCC/ARM_CM0 -I../Core/FreeRTOS/Source/portable/MemMang -O0 -ffunction-sections -fdata-sections -Wall -fstack-usage -MMD -MP -MF"Core/FreeRTOS/Source/queue.d" -MT"$@" --specs=nano.specs -mfloat-abi=soft -mthumb -o "$@"
Core/FreeRTOS/Source/tasks.o: ../Core/FreeRTOS/Source/tasks.c
	arm-none-eabi-gcc "$<" -mcpu=cortex-m0 -std=gnu11 -g3 -DUSE_HAL_DRIVER -DSTM32F030x8 -DDEBUG -c -I../Drivers/Custom/inc -I../Drivers/STM32F0xx_HAL_Driver/Inc -I../Drivers/CMSIS/Include -I../Core/Inc -I../Drivers/STM32F0xx_HAL_Driver/Inc/Legacy -I../Drivers/CMSIS/Device/ST/STM32F0xx/Include -I../Core/FreeRTOS/Source/include -I../Core/FreeRTOS/Source/portable/GCC/ARM_CM0 -I../Core/FreeRTOS/Source/portable/MemMang -O0 -ffunction-sections -fdata-sections -Wall -fstack-usage -MMD -MP -MF"Core/FreeRTOS/Source/tasks.d" -MT"$@" --specs=nano.specs -mfloat-abi=soft -mthumb -o "$@"
Core/FreeRTOS/Source/timers.o: ../Core/FreeRTOS/Source/timers.c
	arm-none-eabi-gcc "$<" -mcpu=cortex-m0 -std=gnu11 -g3 -DUSE_HAL_DRIVER -DSTM32F030x8 -DDEBUG -c -I../Drivers/Custom/inc -I../Drivers/STM32F0xx_HAL_Driver/Inc -I../Drivers/CMSIS/Include -I../Core/Inc -I../Drivers/STM32F0xx_HAL_Driver/Inc/Legacy -I../Drivers/CMSIS/Device/ST/STM32F0xx/Include -I../Core/FreeRTOS/Source/include -I../Core/FreeRTOS/Source/portable/GCC/ARM_CM0 -I../Core/FreeRTOS/Source/portable/MemMang -O0 -ffunction-sections -fdata-sections -Wall -fstack-usage -MMD -MP -MF"Core/FreeRTOS/Source/timers.d" -MT"$@" --specs=nano.specs -mfloat-abi=soft -mthumb -o "$@"

