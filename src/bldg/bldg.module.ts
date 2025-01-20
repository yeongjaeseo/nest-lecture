import { Module } from '@nestjs/common';
import { BldgController } from './bldg.controller';
import { BldgService } from './bldg.service';

@Module({
  controllers: [BldgController],
  providers: [BldgService]
})
export class BldgModule {}
