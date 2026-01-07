import { Controller, Get } from '@nestjs/common';
import { ServicenowService } from 'src/servicenow/servicenow.service';
import { WidgetCodes } from '../service-now-insights-widget-codes.enum';

@Controller('api/metrics')
export class MetricsController {
    constructor(private snService: ServicenowService){}

    @Get(WidgetCodes.TOTAL_OPEN_INCIDENTS)
    getTotalOpenIncidents(){
        return this.snService.fetchTable(
            'incident',
            'active=true'
        );
    }

    @Get(WidgetCodes.UNASSIGNED_TICKETS)
    getUnassignedTickets(){
        return this.snService.fetchTable(
            'incident',
            'active=true^assigned_toISEMPTY'
        )
    }

    @Get(WidgetCodes.STALE_TICKETS)
    getStaleTickets(){
        return this.snService.fetchTable(
            'incident',
            'active=true^sys_updated_on<javascript:gs.daysAgoStart(30)'
        )
    }

    @Get(WidgetCodes.CRITICAL_BACKLOG)
    getCriticalBacklog(){
        return this.snService.fetchTable(
            'incident',
            'priority<3^stateNOT IN6,7'
        )
    }

    @Get(WidgetCodes.VOLUME_BY_PRIORITY)
    getVolumeByPriority(){
        return this.snService.fetchTable(
            'incident',
            'active=true^priorityIN1,2,3,4',
            'priority'
        )
    }

    @Get(WidgetCodes.CATEGORY_DISTRIBUTION)
    getCategoryDistribution(){
        return this.snService.fetchTable(
            'incident',
            'active=true^categoryISNOTEMPTY',
            'category'
        )
    }

    @Get(WidgetCodes.GROUP_WORKLOAD)
    getGroupWorkload(){
        return this.snService.fetchTable(
            'incident',
            'active=true^assignment_groupISNOTEMPTY',
            'assignment_group'
        )
    }

    @Get(WidgetCodes.SLA_BREACH_STATUS)
    getSlaBreachStatus(){
        return this.snService.fetchTable(
            'task_sla',
            'stage=in_progress^has_breached=true',
            'stage'
        )
    }

    @Get(WidgetCodes.STATE_FUNNEL)
    getStateFunnel(){
        return this.snService.fetchTable(
            'incident',
            'stateIN1,2,3^active=true',
            'state'
        )
    }

    @Get(WidgetCodes.TOP_MONTHLY_CALLERS)
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
