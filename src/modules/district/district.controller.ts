import { Controller, Get, Post, Body, Param, ParseIntPipe } from '@nestjs/common';
import { DistrictService } from './district.service';
import { CreateDistrictDto } from './dto/create-district.dto';

@Controller('districts')
export class DistrictController {
  
  constructor(private readonly districtService: DistrictService) {}

  @Get()
  findAll() {
    return this.districtService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number){
    return this.districtService.findOne(id);
  }

  @Post()
  create(@Body() dto: CreateDistrictDto) {
    return this.districtService.create(dto);
  }
}
