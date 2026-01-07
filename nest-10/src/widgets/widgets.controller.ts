import { Controller, Get } from '@nestjs/common';
import { WidgetsService } from './widgets.service';

@Controller('widgets')
export class WidgetsController {
  constructor(private readonly widgetsService: WidgetsService) {}

  @Get()
  async getWidgetMappings() {
    return this.widgetsService.getWidgetMappings();
  }
}
