import { Controller } from '@nestjs/common';
import { BldgService } from './bldg.service';

@Controller('bldg')
export class BldgController {
  constructor(private bldgService: BldgService) {}
}
