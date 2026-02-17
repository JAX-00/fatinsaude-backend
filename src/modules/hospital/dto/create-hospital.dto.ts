import { 
  IsString, 
  IsNotEmpty, 
  IsNumber, 
  IsOptional, 
  IsBoolean, 
  IsEnum, 
  IsJSON 
} from 'class-validator';
<<<<<<< HEAD
import { HospitalType } from '@prisma/client'; // Import enum dari prisma client
=======
import { HospitalType } from '@prisma/client';
>>>>>>> develop

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
<<<<<<< HEAD
  ambulance?: string;

  @IsOptional() // Karena di Prisma Json? (Optional)
  diseases?: any; // Bisa pakai any atau Record<string, any>
=======
  ambulance?: string; // Bisa diisi nomor telepon atau teks bantuan

  @IsOptional()
  diseases?: any;
>>>>>>> develop

  @IsString()
  @IsOptional()
  operationTime?: string;

<<<<<<< HEAD
  @IsEnum(HospitalType) // Memastikan input sesuai enum: HOSPITAL, CLINIC, dll
=======
  @IsEnum(HospitalType)
>>>>>>> develop
  @IsOptional()
  type?: HospitalType;

  @IsNumber()
  @IsNotEmpty()
  districtId: number;
}
