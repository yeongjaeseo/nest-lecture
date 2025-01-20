import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Bldg } from './bldg.entity';

@Injectable()
export class BldgService {
  constructor(
    @InjectRepository(Bldg)
    private readonly bldgRepository: Repository<Bldg>,
  ) {}

  async findAll(): Promise<Bldg[]> {
    return this.bldgRepository.find();
  }
}
