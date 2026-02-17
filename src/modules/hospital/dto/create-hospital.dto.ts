import { 
  IsString, 
  IsNotEmpty, 
  IsNumber, 
  IsOptional, 
  IsBoolean, 
  IsEnum, 
  IsJSON 
} from 'class-validator';
import { HospitalType } from '@prisma/client';

export class CreateHospitalDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsOptional()
  image?: string;

  @IsNumber()
  @IsNotEmpty()
  latitude: number;

  @IsNumber()
  @IsNotEmpty()
  longitude: number;

  @IsString()
  @IsOptional()
  phone?: string;

  @IsBoolean()
  @IsOptional()
  emergency?: boolean;

  @IsString()
  @IsOptional()
  ambulance?: string; // Bisa diisi nomor telepon atau teks bantuan

  @IsOptional()
  diseases?: any;

  @IsString()
  @IsOptional()
  operationTime?: string;

  @IsEnum(HospitalType)
  @IsOptional()
  type?: HospitalType;

  @IsNumber()
  @IsNotEmpty()
  districtId: number;
}
