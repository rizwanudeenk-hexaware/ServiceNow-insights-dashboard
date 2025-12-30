import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { ServicenowService } from './servicenow.service';

@Module({
  imports: [HttpModule],
  providers: [ServicenowService],
  exports: [ServicenowService]
})
export class ServicenowModule {}
