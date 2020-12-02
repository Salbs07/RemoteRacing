################################################################################
# Automatically-generated file. Do not edit!
################################################################################

-include ../makefile.init

RM := rm -rf

# All of the sources participating in the build are defined here
-include sources.mk
-include Startup/subdir.mk
-include Src/FreeRTOS/Source/portable/MemMang/subdir.mk
-include Src/FreeRTOS/Source/portable/GCC/ARM_CM0/subdir.mk
-include Src/FreeRTOS/Source/CMSIS_RTOS/subdir.mk
-include Src/FreeRTOS/Source/subdir.mk
-include Src/subdir.mk
-include Drivers/STM32F0xx_HAL_Driver/Src/subdir.mk
-include subdir.mk
-include objects.mk

ifneq ($(MAKECMDGOALS),clean)
ifneq ($(strip $(S_DEPS)),)
-include $(S_DEPS)
endif
ifneq ($(strip $(S_UPPER_DEPS)),)
-include $(S_UPPER_DEPS)
endif
ifneq ($(strip $(C_DEPS)),)
-include $(C_DEPS)
endif
endif

-include ../makefile.defs

BUILD_ARTIFACT_NAME := RemoteRacing
BUILD_ARTIFACT_EXTENSION := elf
BUILD_ARTIFACT_PREFIX := 
BUILD_ARTIFACT := $(BUILD_ARTIFACT_PREFIX)$(BUILD_ARTIFACT_NAME).$(BUILD_ARTIFACT_EXTENSION)

# Add inputs and outputs from these tool invocations to the build variables 
EXECUTABLES += \
RemoteRacing.elf \

SIZE_OUTPUT += \
default.size.stdout \

OBJDUMP_LIST += \
RemoteRacing.list \

OBJCOPY_BIN += \
RemoteRacing.bin \


# All Target
all: main-build

# Main-build Target
main-build: RemoteRacing.elf secondary-outputs

# Tool invocations
RemoteRacing.elf: $(OBJS) $(USER_OBJS) C:\Users\DatBoi\RemoteRacing\firmware\RemoteRacing\STM32F030R8TX_FLASH.ld
	arm-none-eabi-gcc -o "RemoteRacing.elf" @"objects.list" $(USER_OBJS) $(LIBS) -mcpu=cortex-m0 -T"C:\Users\DatBoi\RemoteRacing\firmware\RemoteRacing\STM32F030R8TX_FLASH.ld" --specs=nosys.specs -Wl,-Map="RemoteRacing.map" -Wl,--gc-sections -static --specs=nano.specs -mfloat-abi=soft -mthumb -Wl,--start-group -lc -lm -Wl,--end-group
	@echo 'Finished building target: $@'
	@echo ' '

default.size.stdout: $(EXECUTABLES)
	arm-none-eabi-size  $(EXECUTABLES)
	@echo 'Finished building: $@'
	@echo ' '

RemoteRacing.list: $(EXECUTABLES)
	arm-none-eabi-objdump -h -S $(EXECUTABLES) > "RemoteRacing.list"
	@echo 'Finished building: $@'
	@echo ' '

RemoteRacing.bin: $(EXECUTABLES)
	arm-none-eabi-objcopy  -O binary $(EXECUTABLES) "RemoteRacing.bin"
	@echo 'Finished building: $@'
	@echo ' '

# Other Targets
clean:
	-$(RM) *
	-@echo ' '

secondary-outputs: $(SIZE_OUTPUT) $(OBJDUMP_LIST) $(OBJCOPY_BIN)

fail-specified-linker-script-missing:
	@echo 'Error: Cannot find the specified linker script. Check the linker settings in the build configuration.'
	@exit 2

warn-no-linker-script-specified:
	@echo 'Warning: No linker script specified. Check the linker settings in the build configuration.'

.PHONY: all clean dependents fail-specified-linker-script-missing warn-no-linker-script-specified
.SECONDARY:

-include ../makefile.targets
