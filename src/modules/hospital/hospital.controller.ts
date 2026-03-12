import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  ParseIntPipe,
  Query,
  NotFoundException,
} from '@nestjs/common';
import { HospitalService } from './hospital.service';
import { CreateHospitalDto } from './dto/create-hospital.dto';
import { UpdateHospitalDto } from './dto/update-hospital.dto';

@Controller('hospitals')
export class HospitalController {
  constructor(private readonly hospitalService: HospitalService) {}

  @Post()
  create(@Body() dto: CreateHospitalDto) {
    return this.hospitalService.create(dto);
  }

  @Get()
  findAll(@Query('districtId') districtId?: string) { 
    return this.hospitalService.findAll(
      districtId ? Number(districtId) : undefined,
    );
  }

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

  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateHospitalDto
  ) {
    return this.hospitalService.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) { return this.hospitalService.remove(id); }

}
