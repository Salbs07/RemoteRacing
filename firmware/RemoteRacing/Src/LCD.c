#include "LCD.h"

/**************************************************************************/
/*
		INSTRUCTIONS FOR SETUP
*/
/**************************************************************************/
// TODO:
// 1) follow the schematic pinout - LCD screen won't work otherwise
// 2) instantiate LCD_CS, LCD_RD, and LCD_WR with GPIO output level == high

/*
    //Example use:

	char greeting[] = "Hello!";
	...
  	LCD_Init();
    fillScreen(ILI9341_OLIVE);
	LCD_draw_text(greeting, 7, 0, 0, 6, ILI9341_BLACK);
 */

// Note: An easy way to remove text is to write the same text but in the same
//		color as the background. It's much faster!


/**************************************************************************/
/*
		CALLABLE FUNCTIONS
*/
/**************************************************************************/


/**************************************************************************/
/*
   brief:    Initializes the LCD screen - once called, the LCD is ready
   	   	   	   to be used
*/
/**************************************************************************/
void LCD_Init(void) {
	  uint8_t cmd, x, numArgs;
	  const uint8_t *addr = initcmd;

	  _width = ILI9341_TFTWIDTH;
	  _height = ILI9341_TFTHEIGHT;
	  rotation = 1;
	  cursor_y = cursor_x = 0;
	  textsize_x = textsize_y = 1;
	  textcolor = textbgcolor = 0xFFFF;
	  wrap = 1;
	  _cp437 = 0;

	    // Toggles the logic analyzer //////////////////////////
	    HAL_GPIO_WritePin(LCD_DC_GPIO_Port, LCD_DC_Pin, GPIO_PIN_SET);
	    HAL_Delay(150);
	    HAL_GPIO_WritePin(LCD_DC_GPIO_Port, LCD_DC_Pin, GPIO_PIN_RESET);
	    HAL_Delay(150);
	    HAL_GPIO_WritePin(LCD_DC_GPIO_Port, LCD_DC_Pin, GPIO_PIN_SET);
	    HAL_Delay(150);
	    // TODO: (FOR DEBUGGING - CAN BE REMOVED) ///////////////

	    // Resets the LCD
	    sendCommand(ILI9341_SWRESET);
	    HAL_Delay(150);

	    // Sends the init command to the LCD
	    while ((cmd = pgm_read_byte(addr++)) > 0) {
	      x = pgm_read_byte(addr++);
	      numArgs = x & 0x7F;
	      sendCommands(cmd, addr, numArgs);
	      addr += numArgs;
	      if (x & 0x80)
	     	 HAL_Delay(150);
	    }


	    // sets the screen to display text in landscape mode
	 	 setRotation(1);

	 	  // read diagnostics ////////////////////////////////////
	 	  x = readcommand8(ILI9341_RDMODE);		// should return 0x94 or 0x84
	 	  x = readcommand8(ILI9341_RDMADCTL);	// should return 0x48
	 	  x = readcommand8(ILI9341_RDPIXFMT);	// should return 0x5, 0x6, or anything really...
	 	  x = readcommand8(ILI9341_RDIMGFMT);	// should return 0x80
	 	  x = readcommand8(ILI9341_RDSELFDIAG);	// should return 0xc0
	 	  HAL_Delay(1);
	 	  // TODO: (FOR DEBUGGING - CAN BE REMOVED) ///////////////

}

/**************************************************************************/
/*!
    @brief  Fill the framebuffer completely with one color
    @param  color 16-bit 5-6-5 Color to fill with
*/
/**************************************************************************/
void fillScreen(uint16_t color) {
	fillRect(0, 0, _width, _height, color);
}

/**************************************************************************/
/*
   @brief    Fill a rectangle completely with one color. Update in subclasses if
   desired!
    @param    x   Top left corner x coordinate
    @param    y   Top left corner y coordinate
    @param    w   Width in pixels
    @param    h   Height in pixels
   @param    color 16-bit 5-6-5 Color to fill with
*/
/**************************************************************************/
void fillRect(int16_t x, int16_t y, int16_t w, int16_t h, uint16_t color) {
	if (w && h) {   // Nonzero width and height?
	    if (w < 0) {  // If negative width...
	      x += w + 1; //   Move X to left edge
	      w = -w;     //   Use positive width
	    }
	    if (x < _width) { // Not off right
	      if (h < 0) {    // If negative height...
	        y += h + 1;   //   Move Y to top edge
	        h = -h;       //   Use positive height
	      }
	      if (y < _height) { // Not off bottom
	        int16_t x2 = x + w - 1;
	        if (x2 >= 0) { // Not off left
	          int16_t y2 = y + h - 1;
	          if (y2 >= 0) { // Not off top
	        	  int16_t i, j;
	            // Rectangle partly or fully overlaps screen
	            if (x < 0) {
	              x = 0;
	              w = x2 + 1;
	            } // Clip left
	            if (y < 0) {
	              y = 0;
	              h = y2 + 1;
	            } // Clip top
	            if (x2 >= _width) {
	              w = _width - x;
	            } // Clip right
	            if (y2 >= _height) {
	              h = _height - y;
	            } // Clip bottom
	            	for (i = x; i < x + w; i++) {
	            		for (j = y; j < y + h; j++) {
	            			writePixel(i, j, color);
	            		}
	            	}
	          }
	        }
	      }
	    }
	}
}

/**************************************************************************/
/*!
    @brief  Writes the sepcified char str to the LCD
    @param  buffer      String to be written to LCD screen
    @param  len      	length of the string to be written to LCD screen
    @param  x      Horizontal position (0 = top).
    @param  y      Vertical position   (0 = top).
    @param  s      size of text
    @param  color  16-bit pixel color in '565' RGB format-use macros in LCD.h
*/
/**************************************************************************/
void LCD_draw_text(char* buffer, uint8_t len, uint16_t x, uint16_t y,
		uint8_t s, uint16_t color) {
	uint8_t i;
	setTextSize(s);
	setTextColor(color);
	setCursor(x, y);
	for (i = 0; i < len; i++) {
		write(*(buffer + i));
	}

}


/**************************************************************************/
/*
   	   HELPER FUNCTIONS
*/
/**************************************************************************/


/*
   brief:    Sends the command byte (no data bytes) to the LCD
   param:    commandByte	The command to be sent
*/
void sendCommand(uint8_t commandByte) {
    HAL_GPIO_WritePin(LCD_CS_GPIO_Port, LCD_CS_Pin, GPIO_PIN_RESET);
    // Command mode
    HAL_GPIO_WritePin(LCD_DC_GPIO_Port, LCD_DC_Pin, GPIO_PIN_RESET);
    HAL_GPIO_WritePin(LCD_WR_GPIO_Port, LCD_WR_Pin, GPIO_PIN_RESET);
    // Send the command byte
    write8Bit(commandByte);
    HAL_GPIO_WritePin(LCD_WR_GPIO_Port, LCD_WR_Pin, GPIO_PIN_SET);
    HAL_GPIO_WritePin(LCD_CS_GPIO_Port, LCD_CS_Pin, GPIO_PIN_SET);
}

/*
   @brief    Sends the command byte and data bytes to the LCD
   @param    commandByte	The command to be sent
   @param    dataBytes		The data bytes to be sent
   @param    numDataBytes	The number of data bytes
*/
void sendCommands(uint8_t commandByte, const uint8_t *dataBytes, uint8_t numDataBytes) {
    HAL_GPIO_WritePin(LCD_CS_GPIO_Port, LCD_CS_Pin, GPIO_PIN_RESET);
    // Command mode
	HAL_GPIO_WritePin(LCD_DC_GPIO_Port, LCD_DC_Pin, GPIO_PIN_RESET);
    HAL_GPIO_WritePin(LCD_WR_GPIO_Port, LCD_WR_Pin, GPIO_PIN_RESET);
    // Send the command byte
    write8Bit(commandByte);
    HAL_GPIO_WritePin(LCD_WR_GPIO_Port, LCD_WR_Pin, GPIO_PIN_SET);

	  if (numDataBytes > 0) {
		  uint8_t i;
		  // Data mode
		  HAL_GPIO_WritePin(LCD_DC_GPIO_Port, LCD_DC_Pin, GPIO_PIN_SET);
		  for (i = 0; i < numDataBytes; i++) {
			    HAL_GPIO_WritePin(LCD_WR_GPIO_Port, LCD_WR_Pin, GPIO_PIN_RESET);
			    // Send the data byte
			    write8Bit(*(dataBytes + i));
			    HAL_GPIO_WritePin(LCD_WR_GPIO_Port, LCD_WR_Pin, GPIO_PIN_SET);
		  }
	  }
	HAL_GPIO_WritePin(LCD_CS_GPIO_Port, LCD_CS_Pin, GPIO_PIN_SET);
}

/*
   @brief    Sends the command byte and 16-bit data bytes to the LCD
   @param    commandByte	The command to be sent
   @param    dataHalfWords		The data half-words to be sent
   @param    numDataHalfWords	The number of data half-words
*/
void sendCommands16(uint8_t commandByte, const uint16_t *dataHalfWords, uint8_t numDataHalfWords) {
    HAL_GPIO_WritePin(LCD_CS_GPIO_Port, LCD_CS_Pin, GPIO_PIN_RESET);
    // Command mode
	HAL_GPIO_WritePin(LCD_DC_GPIO_Port, LCD_DC_Pin, GPIO_PIN_RESET);
    HAL_GPIO_WritePin(LCD_WR_GPIO_Port, LCD_WR_Pin, GPIO_PIN_RESET);
	// Send the command byte
	write8Bit(commandByte);
    HAL_GPIO_WritePin(LCD_WR_GPIO_Port, LCD_WR_Pin, GPIO_PIN_SET);

	  if (numDataHalfWords > 0) {
			uint8_t i;
		  // Data mode
		  HAL_GPIO_WritePin(LCD_DC_GPIO_Port, LCD_DC_Pin, GPIO_PIN_SET);
		  for (i = 0; i < numDataHalfWords; i++) {
			    HAL_GPIO_WritePin(LCD_WR_GPIO_Port, LCD_WR_Pin, GPIO_PIN_RESET);
				write8Bit((uint8_t)((*(dataHalfWords + i)) >> 8));
			    HAL_GPIO_WritePin(LCD_WR_GPIO_Port, LCD_WR_Pin, GPIO_PIN_SET);
			    HAL_GPIO_WritePin(LCD_WR_GPIO_Port, LCD_WR_Pin, GPIO_PIN_RESET);
				write8Bit((uint8_t)((*(dataHalfWords + i)) & 0xFF));
			    HAL_GPIO_WritePin(LCD_WR_GPIO_Port, LCD_WR_Pin, GPIO_PIN_SET);
		  }
	  }
	HAL_GPIO_WritePin(LCD_CS_GPIO_Port, LCD_CS_Pin, GPIO_PIN_SET);
}

/*
    @brief  Writes data to LCD
    @param    d		The data to be sent
*/
void write8Bit(uint8_t d) {
	// TODO: if different pins from LCD.h are used, this function will NOT work!
	// 		 This code is optimized but not portable
	uint32_t x;
	   d = (d & 0xF0) >> 4 | (d & 0x0F) << 4;
	   d = (d & 0xCC) >> 2 | (d & 0x33) << 2;
	   d = (d & 0xAA) >> 1 | (d & 0x55) << 1;
	x = ((d & 0x0f) << 12);
	GPIOB->BSRR = x;
	GPIOB->BRR  = ~(x | 0xffff0fff);
	x = (d & 0xf0) << 2;
	GPIOC->BSRR = x;
	GPIOC->BRR  = ~(x | 0xfffffc3f);
}

/*
   @brief    Writes a line using Bresenham's algorithm
    @param    x0  Start point x coordinate
    @param    y0  Start point y coordinate
    @param    x1  End point x coordinate
    @param    y1  End point y coordinate
    @param    color 16-bit 5-6-5 Color to draw with
*/
void writeLine(int16_t x0, int16_t y0, int16_t x1, int16_t y1, uint16_t color) {
	int16_t steep = abs(y1 - y0) > abs(x1 - x0);
	  if (steep) {
	    _swap_int16_t(x0, y0);
	    _swap_int16_t(x1, y1);
	  }

	  if (x0 > x1) {
	    _swap_int16_t(x0, x1);
	    _swap_int16_t(y0, y1);
	  }

	  int16_t dx, dy;
	  dx = x1 - x0;
	  dy = abs(y1 - y0);

	  int16_t err = dx / 2;
	  int16_t ystep;

	  if (y0 < y1) {
	    ystep = 1;
	  } else {
	    ystep = -1;
	  }

	  for (; x0 <= x1; x0++) {
	    if (steep) {
	      writePixel(y0, x0, color);
	    } else {
	      writePixel(x0, y0, color);
	    }
	    err -= dy;
	    if (err < 0) {
	      y0 += ystep;
	      err += dx;
	    }
	  }
}

/*
   @brief    Draw a perfectly vertical line
    @param    x   Top-most x coordinate
    @param    y   Top-most y coordinate
    @param    h   Height in pixels
   @param    color 16-bit 5-6-5 Color to fill with
*/
void drawFastVLine(int16_t x, int16_t y, int16_t h, uint16_t color) {
	  HAL_GPIO_WritePin(LCD_CS_GPIO_Port, LCD_CS_Pin, GPIO_PIN_RESET);
	  writeLine(x, y, x, y + h - 1, color);
	  HAL_GPIO_WritePin(LCD_CS_GPIO_Port, LCD_CS_Pin, GPIO_PIN_SET);
}

/*
   @brief    Draw a perfectly horizontal line (this is often optimized in a
   subclass!)
    @param    x   Left-most x coordinate
    @param    y   Left-most y coordinate
    @param    w   Width in pixels
   @param    color 16-bit 5-6-5 Color to fill with
*/
void drawFastHLine(int16_t x, int16_t y, int16_t w, uint16_t color) {
	  HAL_GPIO_WritePin(LCD_CS_GPIO_Port, LCD_CS_Pin, GPIO_PIN_RESET);
	  writeLine(x, y, x + w - 1, y, color);
	  HAL_GPIO_WritePin(LCD_CS_GPIO_Port, LCD_CS_Pin, GPIO_PIN_SET);
}

/*
   @brief    Draw a line
    @param    x0  Start point x coordinate
    @param    y0  Start point y coordinate
    @param    x1  End point x coordinate
    @param    y1  End point y coordinate
    @param    color 16-bit 5-6-5 Color to draw with
*/
void drawLine(int16_t x0, int16_t y0, int16_t x1, int16_t y1, uint16_t color) {
	  if (x0 == x1) {
	    if (y0 > y1) {_swap_int16_t(y0, y1);}
	    drawFastVLine(x0, y0, y1 - y0 + 1, color);
	  }
	  else if (y0 == y1) {
	    if (x0 > x1) {_swap_int16_t(x0, x1);}
	    drawFastHLine(x0, y0, x1 - x0 + 1, color);
	  }
	  else {
		HAL_GPIO_WritePin(LCD_CS_GPIO_Port, LCD_CS_Pin, GPIO_PIN_RESET);
	    writeLine(x0, y0, x1, y1, color);
		HAL_GPIO_WritePin(LCD_CS_GPIO_Port, LCD_CS_Pin, GPIO_PIN_SET);
	  }
}

/*
   brief:    Rotates the screen depending on the value of m
   param:	m	m == 0: 8 bit interface is at the bottom of the screen
   	   	   	   	m == 1: 8 bit interface is to the left of the screen
   	   	   	    m == 2: 8 bit interface is at the top of the screen
   	   	   	    m == 3: 8 bit interface is to the right of the screen
*/
void setRotation(uint8_t m) {
  rotation = m % 4; // can't be higher than 3
  switch (rotation) {
  case 0:
    m = (MADCTL_MX | MADCTL_BGR);
    _width = ILI9341_TFTWIDTH;
    _height = ILI9341_TFTHEIGHT;
    break;
  case 1:
    m = (MADCTL_MV | MADCTL_BGR);
    _width = ILI9341_TFTHEIGHT;
    _height = ILI9341_TFTWIDTH;
    break;
  case 2:
    m = (MADCTL_MY | MADCTL_BGR);
    _width = ILI9341_TFTWIDTH;
    _height = ILI9341_TFTHEIGHT;
    break;
  case 3:
    m = (MADCTL_MX | MADCTL_MY | MADCTL_MV | MADCTL_BGR);
    _width = ILI9341_TFTHEIGHT;
    _height = ILI9341_TFTWIDTH;
    break;
  }
  sendCommands(ILI9341_MADCTL, &m, 1);
}


void setTextSize(uint8_t s) {
	  textsize_x = (s > 0) ? s : 1;
	  textsize_y = (s > 0) ? s : 1;
}
void setTextColor(uint16_t c) { textcolor = textbgcolor = c; };
void setCursor(int16_t x, int16_t y) {
    cursor_x = x;
    cursor_y = y;
  }

/*
   @brief   Draw a single character
    @param    x   Bottom left corner x coordinate
    @param    y   Bottom left corner y coordinate
    @param    c   The 8-bit font-indexed character (likely ascii)
    @param    color 16-bit 5-6-5 Color to draw chraracter with
    @param    bg 16-bit 5-6-5 Color to fill background with (if same as color,
   no background)
    @param    size_x  Font magnification level in X-axis, 1 is 'original' size
    @param    size_y  Font magnification level in Y-axis, 1 is 'original' size
*/
void drawChar(int16_t x, int16_t y, unsigned char c, uint16_t color,
                uint16_t bg, uint8_t size_x, uint8_t size_y) {

	    if ((x >= _width) ||              // Clip right
	        (y >= _height) ||             // Clip bottom
	        ((x + 6 * size_x - 1) < 0) || // Clip left
	        ((y + 8 * size_y - 1) < 0))   // Clip top
	      return;

	    if (!_cp437 && (c >= 176))
	      c++; // Handle 'classic' charset behavior

		//HAL_GPIO_WritePin(LCD_CS_GPIO_Port, LCD_CS_Pin, GPIO_PIN_RESET);
	    for (int8_t i = 0; i < 5; i++) { // Char bitmap = 5 columns
	      uint8_t line = pgm_read_byte(&font[c * 5 + i]);
	      for (int8_t j = 0; j < 8; j++, line >>= 1) {
	        if (line & 1) {
	          if (size_x == 1 && size_y == 1)
	            writePixel(x + i, y + j, color);
	          else
	            fillRect(x + i * size_x, y + j * size_y, size_x, size_y,
	                          color);
	        } else if (bg != color) {
	          if (size_x == 1 && size_y == 1)
	            writePixel(x + i, y + j, bg);
	          else
	        	  fillRect(x + i * size_x, y + j * size_y, size_x, size_y, bg);
	        }
	      }
	    }
	    if (bg != color) { // If opaque, draw vertical line for last column
	      if (size_x == 1 && size_y == 1)
	        drawFastVLine(x + 5, y, 8, bg);
	      else
	    	  fillRect(x + 5 * size_x, y, size_x, 8 * size_y, bg);
	    }
		//HAL_GPIO_WritePin(LCD_CS_GPIO_Port, LCD_CS_Pin, GPIO_PIN_SET);
}

/*
    @brief  Print one byte/character of data, used to support print()
    @param  c  The 8-bit ascii character to write
*/
size_t write(uint8_t c) {
    if (c == '\n') {              // Newline?
      cursor_x = 0;               // Reset x to zero,
      cursor_y += textsize_y * 8; // advance y one line
    }
    else if (c != '\r') {       // Ignore carriage returns
      if (wrap && ((cursor_x + textsize_x * 6) > _width)) { // Off right?
        cursor_x = 0;                                       // Reset x to zero,
        cursor_y += textsize_y * 8; // advance y one line
      }
      drawChar(cursor_x, cursor_y, c, textcolor, textbgcolor, textsize_x,
               textsize_y);
      cursor_x += textsize_x * 6; // Advance x one char
    }
    return 1;
}

/*
    @brief   Set the "address window" - the rectangle we will write to RAM with
   the next chunk of      SPI data writes. The ILI9341 will automatically wrap
   the data as each row is filled
    @param   x1  TFT memory 'x' origin
    @param   y1  TFT memory 'y' origin
    @param   w   Width of rectangle
    @param   h   Height of rectangle
*/
void setAddrWindow(uint16_t x1, uint16_t y1, uint16_t w, uint16_t h) {
	  uint16_t x[2] = {x1, x1 + w - 1}, y[2] = {y1, y1 + h - 1};
	  sendCommands16(ILI9341_CASET, x, 2);
	  sendCommands16(ILI9341_PASET, y, 2);
	  sendCommand(ILI9341_RAMWR); // Write to RAM
}

/*
    @brief  Draw a single pixel to the display at requested coordinates.
            Not self-contained; should follow a startWrite() call.
    @param  x      Horizontal position (0 = left).
    @param  y      Vertical position   (0 = top).
    @param  color  16-bit pixel color in '565' RGB format.
*/
void writePixel(int16_t x, int16_t y, uint16_t color) {
	  if ((x >= 0) && (x < _width) && (y >= 0) && (y < _height)) {
		  //uint8_t data[] = {color >> 8, color & 0xFF};
	    // THEN set up transaction (if needed) and draw...
	    setAddrWindow(x, y, 1, 1);

	    HAL_GPIO_WritePin(LCD_CS_GPIO_Port, LCD_CS_Pin, GPIO_PIN_RESET);
		HAL_GPIO_WritePin(LCD_DC_GPIO_Port, LCD_DC_Pin, GPIO_PIN_SET);

	    HAL_GPIO_WritePin(LCD_WR_GPIO_Port, LCD_WR_Pin, GPIO_PIN_RESET);
	    write8Bit((color >> 8));
	    HAL_GPIO_WritePin(LCD_WR_GPIO_Port, LCD_WR_Pin, GPIO_PIN_SET);
	    HAL_GPIO_WritePin(LCD_WR_GPIO_Port, LCD_WR_Pin, GPIO_PIN_RESET);
	    write8Bit((color & 0xFF));
	    HAL_GPIO_WritePin(LCD_WR_GPIO_Port, LCD_WR_Pin, GPIO_PIN_SET);

		HAL_GPIO_WritePin(LCD_CS_GPIO_Port, LCD_CS_Pin, GPIO_PIN_SET);
	  }
}



/**************************************************************************/
/*
     DEBUGGING FUNCTIONS
*/
/**************************************************************************/


uint8_t readcommand8(uint8_t commandByte) {
	  uint8_t result;
	  uint8_t data = 0x10;

	  sendCommands(0xD9, &data, 1);

	  HAL_GPIO_WritePin(LCD_CS_GPIO_Port, LCD_CS_Pin, GPIO_PIN_RESET);
	  // Command mode
	  HAL_GPIO_WritePin(LCD_DC_GPIO_Port, LCD_DC_Pin, GPIO_PIN_RESET);
	  HAL_GPIO_WritePin(LCD_WR_GPIO_Port, LCD_WR_Pin, GPIO_PIN_RESET);
	  // Send the command byte
	  write8Bit(commandByte);
	  HAL_GPIO_WritePin(LCD_WR_GPIO_Port, LCD_WR_Pin, GPIO_PIN_SET);
	  HAL_Delay(1);

	  resetPins();
	  set8BitInput();
	  // Data mode
	  HAL_GPIO_WritePin(LCD_DC_GPIO_Port, LCD_DC_Pin, GPIO_PIN_SET);
	  HAL_GPIO_WritePin(LCD_RD_GPIO_Port, LCD_RD_Pin, GPIO_PIN_RESET);
	  HAL_Delay(1);
	  // Obtain data from LCD
	  result = read8Bit();
	  HAL_GPIO_WritePin(LCD_RD_GPIO_Port, LCD_RD_Pin, GPIO_PIN_SET);

	  HAL_GPIO_WritePin(LCD_RD_GPIO_Port, LCD_RD_Pin, GPIO_PIN_RESET);
	  HAL_Delay(1);
	  // Obtain data from LCD
	  result = read8Bit();
	  HAL_GPIO_WritePin(LCD_RD_GPIO_Port, LCD_RD_Pin, GPIO_PIN_SET);
	  HAL_GPIO_WritePin(LCD_CS_GPIO_Port, LCD_CS_Pin, GPIO_PIN_SET);
		set8BitOutput();
	  return result;
}
uint8_t read8Bit() {
	uint8_t result = 0;
	if (HAL_GPIO_ReadPin(D0_GPIO_Port, D0_Pin)) {
		result |= 0x01;
	}
	if (HAL_GPIO_ReadPin(D1_GPIO_Port, D1_Pin)) {
		result |= 0x02;
	}
	if (HAL_GPIO_ReadPin(D2_GPIO_Port, D2_Pin)) {
		result |= 0x04;
	}
	if (HAL_GPIO_ReadPin(D3_GPIO_Port, D3_Pin)) {
		result |= 0x08;
	}
	if (HAL_GPIO_ReadPin(D4_GPIO_Port, D4_Pin)) {
		result |= 0x10;
	}
	if (HAL_GPIO_ReadPin(D5_GPIO_Port, D5_Pin)) {
		result |= 0x20;
	}
	if (HAL_GPIO_ReadPin(D6_GPIO_Port, D6_Pin)) {
		result |= 0x40;
	}
	if (HAL_GPIO_ReadPin(D7_GPIO_Port, D7_Pin)) {
		result |= 0x80;
	}
	return result;
}
void resetPins(void) {
	  /*Configure GPIO pin Output Level */
	  HAL_GPIO_WritePin(GPIOC, D0_Pin|D1_Pin|D2_Pin|D3_Pin, GPIO_PIN_RESET);

	  /*Configure GPIO pin Output Level */
	  HAL_GPIO_WritePin(GPIOB, D4_Pin|D5_Pin|D6_Pin|D7_Pin, GPIO_PIN_RESET);
}
void set8BitOutput(void) {
	  GPIO_InitTypeDef GPIO_InitStruct = {0};

	  /*Configure GPIO pins : LCD_WR_Pin D3_Pin D2_Pin D1_Pin
	                           D0_Pin */
	  GPIO_InitStruct.Pin = D3_Pin|D2_Pin|D1_Pin|D0_Pin;
	  GPIO_InitStruct.Mode = GPIO_MODE_OUTPUT_PP;
	  GPIO_InitStruct.Pull = GPIO_NOPULL;
	  GPIO_InitStruct.Speed = GPIO_SPEED_FREQ_HIGH;
	  HAL_GPIO_Init(GPIOC, &GPIO_InitStruct);

	  /*Configure GPIO pins : D7_Pin D6_Pin D5_Pin D4_Pin */
	  GPIO_InitStruct.Pin = D7_Pin|D6_Pin|D5_Pin|D4_Pin;
	  GPIO_InitStruct.Mode = GPIO_MODE_OUTPUT_PP;
	  GPIO_InitStruct.Pull = GPIO_NOPULL;
	  GPIO_InitStruct.Speed = GPIO_SPEED_FREQ_HIGH;
	  HAL_GPIO_Init(GPIOB, &GPIO_InitStruct);

}
void set8BitInput(void) {
	  GPIO_InitTypeDef GPIO_InitStruct = {0};

	  /*Configure GPIO pins : LCD_WR_Pin D3_Pin D2_Pin D1_Pin
	                           D0_Pin */
	  GPIO_InitStruct.Pin = D3_Pin|D2_Pin|D1_Pin|D0_Pin;
	  GPIO_InitStruct.Mode = GPIO_MODE_INPUT;
	  GPIO_InitStruct.Pull = GPIO_NOPULL;
	  HAL_GPIO_Init(GPIOC, &GPIO_InitStruct);

	  /*Configure GPIO pins : D7_Pin D6_Pin D5_Pin D4_Pin */
	  GPIO_InitStruct.Pin = D7_Pin|D6_Pin|D5_Pin|D4_Pin;
	  GPIO_InitStruct.Mode = GPIO_MODE_INPUT;
	  GPIO_InitStruct.Pull = GPIO_NOPULL;
	  HAL_GPIO_Init(GPIOB, &GPIO_InitStruct);
}
