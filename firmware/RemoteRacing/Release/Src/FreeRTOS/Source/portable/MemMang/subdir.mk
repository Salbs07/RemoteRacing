################################################################################
# Automatically-generated file. Do not edit!
################################################################################

# Add inputs and outputs from these tool invocations to the build variables 
C_SRCS += \
../Src/FreeRTOS/Source/portable/MemMang/heap_4.c 

OBJS += \
./Src/FreeRTOS/Source/portable/MemMang/heap_4.o 

C_DEPS += \
./Src/FreeRTOS/Source/portable/MemMang/heap_4.d 


# Each subdirectory must supply rules for building sources it contributes
Src/FreeRTOS/Source/portable/MemMang/heap_4.o: ../Src/FreeRTOS/Source/portable/MemMang/heap_4.c
	arm-none-eabi-gcc "$<" -mcpu=cortex-m0 -std=gnu11 -DUSE_HAL_DRIVER -DSTM32F030x8 -c -I../Inc -I../Drivers/STM32F0xx_HAL_Driver/Inc -I../Drivers/CMSIS/Include -I"/Users/pjfossee/College/473/RemoteRacing/firmware/RemoteRacing/Src/FreeRTOS/Source/portable/GCC/ARM_CM0" -I../Drivers/STM32F0xx_HAL_Driver/Inc/Legacy -I../Drivers/CMSIS/Device/ST/STM32F0xx/Include -I"/Users/pjfossee/College/473/RemoteRacing/firmware/RemoteRacing/Src/FreeRTOS/Source/portable/MemMang" -I"/Users/pjfossee/College/473/RemoteRacing/firmware/RemoteRacing/Src/FreeRTOS/Source/include" -O3 -ffunction-sections -fdata-sections -Wall -fstack-usage -MMD -MP -MF"Src/FreeRTOS/Source/portable/MemMang/heap_4.d" -MT"$@" --specs=nano.specs -mfloat-abi=soft -mthumb -o "$@"

