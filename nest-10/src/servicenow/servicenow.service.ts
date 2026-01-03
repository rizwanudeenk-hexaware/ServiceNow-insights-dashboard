import axios from 'axios';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ServicenowService {

    async fetchTable(table: string, query: string, groupBy?: string, orderBy?: string, limit?: number){
        const url = `${process.env.SERVICENOW_INSTANCE}/api/now/stats/${table}`;

        const response = await axios.get(
                url, {
                params: {
                    sysparm_query: query,
                    sysparm_count: true,
                    sysparm_display_value: 'all',
                    ...(groupBy && {sysparm_group_by: groupBy}),
                },
                auth: {
                    username: process.env.SERVICENOW_USERNAME!,
                    password: process.env.SERVICENOW_PASSWORD!
                }
            });

        let results = response.data.result;

        if (orderBy === 'COUNTDESC') {
            results.sort((a, b) => parseInt(b.stats.count) - parseInt(a.stats.count));
        }

        return limit ? results.slice(0,limit) : results;
    }
}
