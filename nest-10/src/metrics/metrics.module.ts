import { Module } from '@nestjs/common';
import { ServicenowModule } from 'src/servicenow/servicenow.module';
import { MetricsController } from './metrics.controller';

@Module({
    imports: [ServicenowModule],
    controllers: [MetricsController]
})
export class MetricsModule {
}
