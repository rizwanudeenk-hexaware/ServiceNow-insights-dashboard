import { Controller, Get, Param } from '@nestjs/common';
import { ServicenowService } from 'src/servicenow/servicenow.service';

@Controller('api/metrics')
export class MetricsController {
    constructor(private snService: ServicenowService){}

    @Get(':id')
    async getMetric(@Param('id') id: string){
        switch(id){
            case 'm1':
                return this.snService.fetchTable(
                    'incident',
                    'active=true'
                );
            
            default:
                return {error: 'Invalid Metric ID'};
        }
    }
}
