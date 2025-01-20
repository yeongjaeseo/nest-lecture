import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BldgController } from './bldg.controller';
import { BldgService } from './bldg.service';
import { Bldg } from './bldg.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Bldg])],
  controllers: [BldgController],
  providers: [BldgService],
})
export class BldgModule {}
