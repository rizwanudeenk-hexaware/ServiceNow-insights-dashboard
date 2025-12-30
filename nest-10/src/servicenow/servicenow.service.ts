import axios from 'axios';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ServicenowService {

    async fetchTable(table: string, query: string, groupBy?: string){
        const url = `${process.env.SERVICENOW_INSTANCE}/api/now/stats/${table}`;

        const response = await axios.get(
                url, {
                params: {
                    sysparm_query: query,
                    sysparm_count: true,
                    ...(groupBy && {sysparm_group_by: groupBy}),
                    sysparm_display_value: 'all'
                },
                auth: {
                    username: process.env.SERVICENOW_USERNAME!,
                    password: process.env.SERVICENOW_PASSWORD!
                }
            });

        return response.data.result;
    }
}
