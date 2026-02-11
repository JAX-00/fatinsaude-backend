import {IsString, IsNotEmpty, MinLength } from 'class-validator';

export class CreateDistrictDto{
  
  @IsString()
  @IsNotEmpty()
  @MinLength(2)

  name: string;
}