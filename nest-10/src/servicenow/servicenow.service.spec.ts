import { Test, TestingModule } from '@nestjs/testing';
import { ServicenowService } from './servicenow.service';

describe('ServicenowService', () => {
  let service: ServicenowService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ServicenowService],
    }).compile();

    service = module.get<ServicenowService>(ServicenowService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
