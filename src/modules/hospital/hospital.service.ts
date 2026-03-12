import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateHospitalDto } from './dto/create-hospital.dto';
import { UpdateHospitalDto } from './dto/update-hospital.dto';

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
    // cek hospital ada atau tidak
    const hospital = await this.prisma.hospital.findUnique({
      where: { id },
    });
    if (!hospital) throw new NotFoundException('Hospital not found.');

    return this.prisma.hospital.update({
      where: {id},
      data: dto,
      include: {district: true},
    });
  }

  async remove(id: number){
    const hospital = await this.prisma.hospital.findUnique({where: {id}});
    if (!hospital) throw new NotFoundException('Hospital not found.');

    await this.prisma.hospital.delete({where: {id}, });

    return {message: 'Hospital berhasil dihapus.'};
  }

  async filter(districtId?: number, disease?: string) {
    // buat object where
    const where: any = {};

    if (districtId) {
      where.districtId = districtId;
    }

    if (disease) {
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
