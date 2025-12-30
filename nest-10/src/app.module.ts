import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ServicenowModule } from './servicenow/servicenow.module';
import { MetricsModule } from './metrics/metrics.module';

@Module({
  imports: [ServicenowModule, MetricsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
