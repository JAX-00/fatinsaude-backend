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
  UseGuards,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { BadRequestException } from '@nestjs/common';
import { HospitalService } from './hospital.service';
import { CreateHospitalDto } from './dto/create-hospital.dto';
import { UpdateHospitalDto } from './dto/update-hospital.dto';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';
import { Roles } from '../../common/decorators/roles.decorator';
import { Role } from '@prisma/client';

@Controller('hospitals')
export class HospitalController {
  constructor(private readonly hospitalService: HospitalService) {}

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads/hospitals',
        filename: (req, file, cb) => {
          const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
          cb(null, `${file.fieldname}-${uniqueSuffix}${extname(file.originalname)}`);
        },
      }),
      limits: {
        fileSize: 5 * 1024 * 1024, // 5MB limit
      },
      fileFilter: (req, file, cb) => {
        const allowedMimeTypes = ['image/jpeg', 'image/png', 'image/webp'];
        if (allowedMimeTypes.includes(file.mimetype)) {
          cb(null, true);
        } else {
          cb(new BadRequestException('Format imajen la suporta! Favór uza JPEG, PNG, ka WebP.'), false);
        }
      },
    }),
  )
  create(
    @Body() dto: CreateHospitalDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    if (file) {
      dto.image = `/uploads/hospitals/${file.filename}`;
    }

    // Manual parsing because of multipart/form-data
    if (dto.latitude) dto.latitude = Number(dto.latitude);
    if (dto.longitude) dto.longitude = Number(dto.longitude);
    if (dto.districtId) dto.districtId = Number(dto.districtId);
    if (typeof dto.emergency === 'string') {
      dto.emergency = dto.emergency === 'true' || dto.emergency === 'Yes';
    }
    if (typeof dto.diseases === 'string') {
      try {
        dto.diseases = JSON.parse(dto.diseases);
      } catch (e) {
        dto.diseases = dto.diseases.split(',').map(s => s.trim());
      }
    }

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
    @Query('districtId') districtId?: string,
    @Query('disease') disease?: string,
  ) {
    return this.hospitalService.filter(
      districtId ? Number(districtId) : undefined,
      disease
    );
  }
  
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.hospitalService.findOne(id);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads/hospitals',
        filename: (req, file, cb) => {
          const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
          cb(null, `${file.fieldname}-${uniqueSuffix}${extname(file.originalname)}`);
        },
      }),
      limits: {
        fileSize: 5 * 1024 * 1024, // 5MB limit
      },
      fileFilter: (req, file, cb) => {
        const allowedMimeTypes = ['image/jpeg', 'image/png', 'image/webp'];
        if (allowedMimeTypes.includes(file.mimetype)) {
          cb(null, true);
        } else {
          cb(new BadRequestException('Format imajen la suporta! Favór uza JPEG, PNG, ka WebP.'), false);
        }
      },
    }),
  )
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateHospitalDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    if (file) {
      dto.image = `/uploads/hospitals/${file.filename}`;
    }

    if (dto.latitude) dto.latitude = Number(dto.latitude);
    if (dto.longitude) dto.longitude = Number(dto.longitude);
    if (dto.districtId) dto.districtId = Number(dto.districtId);
    if (typeof dto.emergency === 'string') {
      dto.emergency = dto.emergency === 'true' || dto.emergency === 'Yes';
    }
    if (typeof dto.diseases === 'string') {
      try {
        dto.diseases = JSON.parse(dto.diseases);
      } catch (e) {
        dto.diseases = dto.diseases.split(',').map(s => s.trim());
      }
    }

    return this.hospitalService.update(id, dto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  remove(@Param('id', ParseIntPipe) id: number) { return this.hospitalService.remove(id); }

}
