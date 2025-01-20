import { Controller, Get } from '@nestjs/common';
import { BldgService } from './bldg.service';
import { Bldg } from './bldg.entity';

@Controller('bldg')
export class BldgController {
  constructor(private readonly bldgService: BldgService) {}

  @Get()
  async findAll(): Promise<Bldg[]> {
    return this.bldgService.findAll();
  }
}
