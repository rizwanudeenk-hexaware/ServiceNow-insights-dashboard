import axios from 'axios';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ServicenowService {

    async fetchTable(table: string, query: string){
        const url = `${process.env.SERVICENOW_INSTANCE}/api/now/stats/${table}`;

        const response = await axios.get(
                url, {
                params: {
                    sysparm_query: query,
                    sysparm_count: true
                },
                auth: {
                    username: process.env.SERVICENOW_USERNAME!,
                    password: process.env.SERVICENOW_PASSWORD!
                }
            });

        return response.data.result;
    }
}
