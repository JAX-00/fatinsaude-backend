import {IsOptional, IsInt, IsString} from 'class-validator';
import { Type } from 'class-transformer';

export class QueryHospitalDto {
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  districtId?: number;

  @IsOptional()
  @IsString()
  disease?: string;
}