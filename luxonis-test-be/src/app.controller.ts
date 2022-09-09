import { Controller, Get, Param } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('properties/:page')
  async getProperties(@Param('page') page: number) {
    return await this.appService.getProperties(page);
  }

  @Get('propertiesCount')
  async getPropertiesCount() {
    return await this.appService.getPropertiesCount();
  }
}
