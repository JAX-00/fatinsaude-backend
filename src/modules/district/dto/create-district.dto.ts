import {IsString, IsNotEmpty, MinLength, IsOptional } from 'class-validator';

export class CreateDistrictDto{
  
  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  name: string;

  @IsOptional()
  @IsString()
  image?: string;
}