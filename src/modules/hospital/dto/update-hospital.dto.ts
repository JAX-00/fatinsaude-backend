import { PartialType } from '@nestjs/mapped-types';
import { CreateHospitalDto } from './create-hospital.dto';
import { IsEnum, IsOptional, IsNumber } from 'class-validator';
import { Transform } from 'class-transformer';
import { HospitalType } from '@prisma/client';

export class UpdateHospitalDto extends PartialType(CreateHospitalDto) {
  @IsEnum(HospitalType)
  @IsOptional()
  type?: HospitalType;

  @IsEnum(['GOVERNO', 'PRIVADU', 'ONG', 'OTHER'])
  @IsOptional()
  ownership?: any;

  @Transform(({ value }) => Number(value))
  @IsNumber()
  @IsOptional()
  districtId?: number;
}