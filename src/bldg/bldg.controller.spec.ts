import { Test, TestingModule } from '@nestjs/testing';
import { BldgController } from './bldg.controller';

describe('BldgController', () => {
  let controller: BldgController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BldgController],
    }).compile();

    controller = module.get<BldgController>(BldgController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
