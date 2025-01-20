import { Test, TestingModule } from '@nestjs/testing';
import { BldgService } from './bldg.service';

describe('BldgService', () => {
  let service: BldgService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BldgService],
    }).compile();

    service = module.get<BldgService>(BldgService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
