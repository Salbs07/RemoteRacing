#include <LEDs.h>

void toggleLED(LED_Color LED){
	switch(LED){
		case RED:
			HAL_GPIO_TogglePin(LED_RED_GPIO_Port, LED_RED_Pin);
			break;

		case YELLOW:
			HAL_GPIO_TogglePin(LED_YELLOW_GPIO_Port, LED_YELLOW_Pin);
			break;

		case GREEN:
			HAL_GPIO_TogglePin(LED_GREEN_GPIO_Port, LED_GREEN_Pin);
			break;
	}
}


void setLED(LED_Color LED, LED_State state){
	switch(LED){
			case RED:
				HAL_GPIO_WritePin(LED_RED_GPIO_Port, LED_RED_Pin, state);
				break;

			case YELLOW:
				HAL_GPIO_WritePin(LED_YELLOW_GPIO_Port, LED_YELLOW_Pin, state);
				break;

			case GREEN:
				HAL_GPIO_WritePin(LED_GREEN_GPIO_Port, LED_GREEN_Pin, state);
				break;
		}
}
