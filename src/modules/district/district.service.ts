import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateDistrictDto } from './dto/create-district.dto';
import { UpdateDistrictDto } from './dto/update-district.dto';
import * as fs from 'fs';
import * as path from 'path';
import { BadRequestException } from '@nestjs/common';


@Injectable()
export class DistrictService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateDistrictDto) {
      return this.prisma.district.create({
        data: dto,
      });
    } 

  async findAll() {
    return this.prisma.district.findMany({
      include: { hospitals: true },
      orderBy: {name: 'asc'},
    });
  }

  async findOne(id: number) {
    const district = await this.prisma.district.findUnique({ where: { id } });

    if (!district) {
      throw new NotFoundException('District la hetan');
    }
    return district;
  }

  async update(id: number, dto: any) {
    const district = await this.prisma.district.findUnique({
      where: { id },
    });

    if (!district) {
      throw new NotFoundException('District la hetan');
    }

    // =============================
    // CEK JIKA ADA IMAGE BARU
    // =============================
    if (dto.image && district.image) {
      const cleanPath = district.image.replace('/uploads', '');

      const oldFilePath = path.join(
        __dirname,
        '../../..',
        'uploads',
        cleanPath
      );

      try {
        if (fs.existsSync(oldFilePath)) {
          fs.unlinkSync(oldFilePath);
          console.log('✅ Old image deleted');
        }
      } catch (err) {
        console.log('⚠ Gagal hapus image lama, skip...');
      }
    }

    // =============================
    // UPDATE DATA
    // =============================
    return this.prisma.district.update({
      where: { id },
      data: dto,
    });
  }

  async remove(id: number) {
    const district = await this.prisma.district.findUnique({
      where: { id },
      include: { hospitals: true }, // 🔥 penting
    });

    if (!district) {
      throw new BadRequestException('District tidak ditemukan');
    }

    // ❌ CEK RELASI DULU
    if (district.hospitals.length > 0) {
      throw new BadRequestException(
        'District tidak bisa dihapus karena masih memiliki data hospital'
      );
    }

    // ✅ HAPUS FILE (kalau aman)
    if (district.image) {
      const cleanPath = district.image.replace('/uploads', '');

      const filePath = path.join(
        __dirname,
        '../../..',
        'uploads',
        cleanPath
      );

      try {
        if (fs.existsSync(filePath)) {
          fs.unlinkSync(filePath);
          console.log('✅ File deleted');
        }
      } catch (err) {
        console.log('⚠ Skip delete file');
      }
    }

    // ✅ HAPUS DATABASE
    return this.prisma.district.delete({
      where: { id },
    });
  }
}
