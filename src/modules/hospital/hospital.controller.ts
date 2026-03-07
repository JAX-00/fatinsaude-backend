import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  ParseIntPipe,
  Query,
} from '@nestjs/common';
import { HospitalService } from './hospital.service';
import { CreateHospitalDto } from './dto/create-hospital.dto';
import { QueryHospitalDto } from './dto/query-hospital.dto';

@Controller('hospitals')
export class HospitalController {
  constructor(private readonly hospitalService: HospitalService) {}

  @Get('filter')
  filter(
    @Query('districtId') districtId?: number,
    @Query('disease') disease?: string,
  ) {
    return this.hospitalService.filter(districtId, disease);
  }
  
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.hospitalService.findOne(id);
  }

  @Get()
  findAll(@Query('districtId') districtId?: string) {
    return this.hospitalService.findAll(
      districtId ? Number(districtId) : undefined,
    );
  }

  @Post()
  create(@Body() dto: CreateHospitalDto) {
    return this.hospitalService.create(dto);
  }
}
