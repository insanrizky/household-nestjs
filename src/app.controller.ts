import { Controller, Get } from '@nestjs/common';
import { ApiOkResponse } from '@nestjs/swagger';

@Controller()
export class AppController {
  @Get()
  @ApiOkResponse({
    description: 'WaveTech Electronics Pte Ltd - Household Warranty Claims',
  })
  getHello(): string {
    return 'WaveTech Electronics Pte Ltd - Household Warranty Claims';
  }
}
