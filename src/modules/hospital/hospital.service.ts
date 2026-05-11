import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateHospitalDto } from './dto/create-hospital.dto';
import { UpdateHospitalDto } from './dto/update-hospital.dto';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class HospitalService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateHospitalDto) {
    // cek district ada atau tidak
    const district = await this.prisma.district.findUnique({
      where: { id: dto.districtId },
    });

    if (!district) {
      throw new NotFoundException('District la hetan');
    }

    return this.prisma.hospital.create({
      data: dto,
      include: {
        district: true,
      },
    });
  }

  async findAll(districtId?: number) {
    return this.prisma.hospital.findMany({
      where: districtId ? {districtId} : undefined,
      include: {
        district: true,
      },
      orderBy: { name: 'asc' },
    });
  }

  async findOne(id: number) {
    const hospital = await this.prisma.hospital.findUnique({
      where: { id },
      include: { district: true },
    });

    if (!hospital) {
      throw new NotFoundException('Hospital la hetan');
    }

    return hospital;
  }

  async update(id: number, dto: UpdateHospitalDto) {
    const hospital = await this.prisma.hospital.findUnique({
      where: { id },
    });
    if (!hospital) throw new NotFoundException('Hospital not found.');

    // Delete old image if new image is uploaded
    if (dto.image && hospital.image && dto.image !== hospital.image) {
      this.deleteFile(hospital.image);
    }

    return this.prisma.hospital.update({
      where: {id},
      data: dto,
      include: {district: true},
    });
  }

  async remove(id: number){
    const hospital = await this.prisma.hospital.findUnique({where: {id}});
    if (!hospital) throw new NotFoundException('Hospital not found.');

    // Delete image file
    if (hospital.image) {
      this.deleteFile(hospital.image);
    }

    await this.prisma.hospital.delete({where: {id}, });
    return {message: 'Hospital berhasil dihapus.'};
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

  async filter(districtId?: number, disease?: string) {
    const where: any = {};

    if (districtId && !isNaN(districtId)) {
      where.districtId = districtId;
    }

    const hospitals = await this.prisma.hospital.findMany({
      where,
      include: { district: true },
      orderBy: { name: 'asc' },
    });

    if (disease && disease.trim() !== '') {
      const search = this.normalizeString(disease);
      return hospitals.filter((h) => {
        if (!h.diseases) return false;
        const diseasesArray = Array.isArray(h.diseases) ? h.diseases : [];
        return diseasesArray.some((d) =>
          this.normalizeString(String(d)).includes(search),
        );
      });
    }

    return hospitals;
  }

  private normalizeString(str: string): string {
    return str
      .toLowerCase()
      .trim()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '');
  }

}
