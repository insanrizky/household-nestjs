import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
  @Get()
  getHello(): string {
    return 'WaveTech Electronics Pte Ltd';
  }
}
