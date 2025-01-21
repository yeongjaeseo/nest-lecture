import { Controller, Get, Query } from '@nestjs/common';
import { BldgService } from './bldg.service';
import { Bldg } from './bldg.entity';
import { BldgNearbyDto } from './dto/bldg-nearby-dto';
@Controller('bldg')
export class BldgController {
  constructor(private readonly bldgService: BldgService) {}

  @Get()
  async findAll(): Promise<Bldg[]> {
    return this.bldgService.findAll();
  }

  @Get('nearby')
  async findNearby(@Query() query: BldgNearbyDto): Promise<Bldg[]> {
    return this.bldgService.findNearby(query.x, query.y, query.radius);
  }
}
