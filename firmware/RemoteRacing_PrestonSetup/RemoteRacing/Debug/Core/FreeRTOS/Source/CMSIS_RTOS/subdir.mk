################################################################################
# Automatically-generated file. Do not edit!
################################################################################

# Add inputs and outputs from these tool invocations to the build variables 
C_SRCS += \
../Core/FreeRTOS/Source/CMSIS_RTOS/cmsis_os.c 

OBJS += \
./Core/FreeRTOS/Source/CMSIS_RTOS/cmsis_os.o 

C_DEPS += \
./Core/FreeRTOS/Source/CMSIS_RTOS/cmsis_os.d 


# Each subdirectory must supply rules for building sources it contributes
Core/FreeRTOS/Source/CMSIS_RTOS/cmsis_os.o: ../Core/FreeRTOS/Source/CMSIS_RTOS/cmsis_os.c
	arm-none-eabi-gcc "$<" -mcpu=cortex-m0 -std=gnu11 -g3 -DUSE_HAL_DRIVER -DSTM32F030x8 -DDEBUG -c -I../Drivers/Custom/inc -I../Drivers/STM32F0xx_HAL_Driver/Inc -I../Drivers/CMSIS/Include -I../Core/Inc -I../Drivers/STM32F0xx_HAL_Driver/Inc/Legacy -I../Drivers/CMSIS/Device/ST/STM32F0xx/Include -I../Core/FreeRTOS/Source/include -I../Core/FreeRTOS/Source/portable/GCC/ARM_CM0 -I../Core/FreeRTOS/Source/portable/MemMang -O0 -ffunction-sections -fdata-sections -Wall -fstack-usage -MMD -MP -MF"Core/FreeRTOS/Source/CMSIS_RTOS/cmsis_os.d" -MT"$@" --specs=nano.specs -mfloat-abi=soft -mthumb -o "$@"

