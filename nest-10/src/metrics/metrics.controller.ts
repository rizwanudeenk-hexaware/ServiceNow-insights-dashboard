import { Controller, Get } from '@nestjs/common';
import { ServicenowService } from 'src/servicenow/servicenow.service';

@Controller('api/metrics')
export class MetricsController {
    constructor(private snService: ServicenowService){}

    @Get('total-open-incidents')
    getTotalOpenIncidents(){
        return this.snService.fetchTable(
            'incident',
            'active=true'
        );
    }

    @Get('unassigned-tickets')
    getUnassignedTickets(){
        return this.snService.fetchTable(
            'incident',
            'active=true^assigned_toISEMPTY'
        )
    }

    @Get('stale-tickets')
    getStaleTickets(){
        return this.snService.fetchTable(
            'incident',
            'active=true^sys_updated_on<javascript:gs.daysAgoStart(30)'
        )
    }

    @Get('critical-backlog')
    getCriticalBacklog(){
        return this.snService.fetchTable(
            'incident',
            'priority<3^stateNOT IN6,7'
        )
    }

    @Get('volume-by-priority')
    getVolumeByPriority(){
        return this.snService.fetchTable(
            'incident',
            'active=true^priorityIN1,2,3,4',
            'priority'
        )
    }

    @Get('category-distribution')
    getCategoryDistribution(){
        return this.snService.fetchTable(
            'incident',
            'active=true^categoryISNOTEMPTY',
            'category'
        )
    }

    @Get('group-workload')
    getGroupWorkload(){
        return this.snService.fetchTable(
            'incident',
            'active=true^assignment_groupISNOTEMPTY',
            'assignment_group'
        )
    }

    @Get('sla-breach-status')
    getSlaBreachStatus(){
        return this.snService.fetchTable(
            'task_sla',
            'stage=in_progress^has_breached=true',
            'stage'
        )
    }

    @Get('state-funnel')
    getStateFunnel(){
        return this.snService.fetchTable(
            'incident',
            'stateIN1,2,3^active=true',
            'state'
        )
    }

    @Get('top-monthly-callers')
    getTopMonthlyCallers(){
        return this.snService.fetchTable(
            'incident',
            'opened_atONThis month@javascript:gs.beginningOfThisMonth()@javascript:gs.endOfThisMonth()',
            'caller_id',
            'COUNTDESC',
            5
        )
    }
}
