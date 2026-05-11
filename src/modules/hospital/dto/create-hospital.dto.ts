import { 
  IsString, 
  IsNotEmpty, 
  IsNumber, 
  IsOptional, 
  IsBoolean, 
  IsEnum, 
  IsJSON 
} from 'class-validator';
import { Transform } from 'class-transformer';
import { HospitalType } from '@prisma/client';

export class CreateHospitalDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsOptional()
  image?: string;

  @Transform(({ value }) => Number(value))
  @IsNumber()
  @IsNotEmpty()
  latitude: number;

  @Transform(({ value }) => Number(value))
  @IsNumber()
  @IsNotEmpty()
  longitude: number;

  @IsString()
  @IsOptional()
  phone?: string;

  @Transform(({ value }) => value === 'true' || value === 'Yes' || value === true)
  @IsBoolean()
  @IsOptional()
  emergency?: boolean;

  @IsString()
  @IsOptional()
  ambulance?: string;

  @IsOptional() // Karena di Prisma Json? (Optional)
  diseases?: any; // Bisa pakai any atau Record<string, any>

  @IsString()
  @IsOptional()
  operationTime?: string;

  @IsEnum(HospitalType) // Memastikan input sesuai enum: HOSPITAL, CLINIC, dll
  @IsOptional()
  type?: HospitalType;

  @Transform(({ value }) => Number(value))
  @IsNumber()
  @IsNotEmpty()
  districtId: number;
}
