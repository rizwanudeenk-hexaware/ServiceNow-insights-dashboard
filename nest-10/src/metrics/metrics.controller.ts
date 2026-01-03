import { Controller, Get, Param } from '@nestjs/common';
import { ServicenowService } from 'src/servicenow/servicenow.service';

@Controller('api/metrics')
export class MetricsController {
    constructor(private snService: ServicenowService){}

    @Get(':name')
    async getMetric(@Param('name') name: string){
        switch(name){

            case 'total-open-incidents': // M1
                return this.snService.fetchTable(
                    'incident',
                    'active=true'
                );

            case 'unassigned-tickets': // M6
                return this.snService.fetchTable(
                    'incident',
                    'active=true^assigned_toISEMPTY'
                )
            
            case 'stale-tickets': // M10
                return this.snService.fetchTable(
                    'incident',
                    'active=true^sys_updated_on<javascript:gs.daysAgoStart(30)'
                )

            case 'critical-backlog': // M3
                return this.snService.fetchTable(
                    'incident',
                    'priority<3^stateNOT IN6,7'
                )

            case 'volume-by-priority': // M2
                return this.snService.fetchTable(
                    'incident',
                    'active=true^priorityIN1,2,3,4',
                    'priority'
                )
            
            case 'category-distribution': // M4
                return this.snService.fetchTable(
                    'incident',
                    'active=true^categoryISNOTEMPTY',
                    'category'
                )
            
            case 'group-workload': // M5
                return this.snService.fetchTable(
                    'incident',
                    'active=true^assignment_groupISNOTEMPTY',
                    'assignment_group'
                )
            
            case 'sla-breach-status': // M7
                return this.snService.fetchTable(
                    'task_sla',
                    'stage=in_progress^has_breached=true',
                    'stage'
                )
            
            case 'state-funnel': // M9
                return this.snService.fetchTable(
                    'incident',
                    'stateIN1,2,3^active=true',
                    'state'
                )
            
            case 'top-monthly-callers': //M8
                return this.snService.fetchTable(
                    'incident',
                    'opened_atONThis month@javascript:gs.beginningOfThisMonth()@javascript:gs.endOfThisMonth()',
                    'caller_id',
                    'COUNTDESC',
                    5
                )
            
            default:
                return {error: 'Invalid Metric Name'};
        }
    }
}
