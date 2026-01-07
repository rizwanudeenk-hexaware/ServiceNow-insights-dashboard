import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ServicenowModule } from './servicenow/servicenow.module';
import { MetricsModule } from './metrics/metrics.module';
import { WidgetsModule } from './widgets/widgets.module';

@Module({
  imports: [ConfigModule.forRoot(), ServicenowModule, MetricsModule, WidgetsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
