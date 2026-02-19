import { 
  IsString, 
  IsNotEmpty, 
  IsNumber, 
  IsOptional, 
  IsBoolean, 
  IsEnum, 
  IsJSON 
} from 'class-validator';
import { HospitalType } from '@prisma/client'; // Import enum dari prisma client

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
  ambulance?: string;

  @IsOptional() // Karena di Prisma Json? (Optional)
  diseases?: any; // Bisa pakai any atau Record<string, any>

  @IsString()
  @IsOptional()
  operationTime?: string;

  @IsEnum(HospitalType) // Memastikan input sesuai enum: HOSPITAL, CLINIC, dll
  @IsOptional()
  type?: HospitalType;

  @IsNumber()
  @IsNotEmpty()
  districtId: number;
}
