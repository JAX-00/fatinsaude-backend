import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateEducationDto } from './dto/create-education.dto';
import { UpdateEducationDto } from './dto/update-education.dto';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class EducationService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateEducationDto) {
    return this.prisma.education.create({
      data: dto,
    });
  }

  async findAll() {
    return this.prisma.education.findMany({
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOne(id: number) {
    const education = await this.prisma.education.findUnique({
      where: { id },
    });
    if (!education) throw new NotFoundException('Conteudu la hetan');
    return education;
  }

  async update(id: number, dto: UpdateEducationDto) {
    const education = await this.prisma.education.findUnique({ where: { id } });
    if (!education) throw new NotFoundException('Conteudu la hetan');

    if (dto.image && education.image && dto.image !== education.image) {
      this.deleteFile(education.image);
    }

    return this.prisma.education.update({
      where: { id },
      data: dto,
    });
  }

  async remove(id: number) {
    const education = await this.prisma.education.findUnique({ where: { id } });
    if (!education) throw new NotFoundException('Conteudu la hetan');

    if (education.image) {
      this.deleteFile(education.image);
    }

    return this.prisma.education.delete({
      where: { id },
    });
  }

  private deleteFile(filePath: string) {
    const cleanPath = filePath.replace('/uploads', '');
    const fullPath = path.join(__dirname, '../../..', 'uploads', cleanPath);
    try {
      if (fs.existsSync(fullPath)) {
        fs.unlinkSync(fullPath);
      }
    } catch (err) {
      console.log('⚠ Gagal hapus file:', fullPath);
    }
  }
}
