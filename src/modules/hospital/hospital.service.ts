import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateHospitalDto } from './dto/create-hospital.dto';
import { QueryHospitalDto } from './dto/query-hospital.dto';
import path from 'path';

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

async filter(districtId?: number, disease?: string) {
  // buat object where
  const where: any = {};

  if (districtId) {
    where.districtId = districtId;
  }

  if (disease) {
    // gunakan array_contains karena field diseases Json?
    // kita masukkan sebagai array supaya Prisma bisa cek apakah array JSON mengandung disease
    where.diseases = {
      array_contains: [disease],
    };
  }

  return this.prisma.hospital.findMany({
    where,
    include: { district: true },
    orderBy: { name: 'asc' },
  });
}

}
