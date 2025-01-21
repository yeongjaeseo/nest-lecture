import { IsNumber } from 'class-validator';

export class BldgNearbyDto {
  @IsNumber()
  x: number;

  @IsNumber()
  y: number;

  @IsNumber()
  radius: number;
}
