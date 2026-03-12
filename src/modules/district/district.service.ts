import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateDistrictDto } from './dto/create-district.dto';
import { UpdateDistrictDto } from './dto/update-district.dto';

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

  async update(id: number, dto: UpdateDistrictDto) {
    const district = await this.prisma.district.findUnique({ where: { id},});

    if (!district){
      throw new NotFoundException('District la hetan');  
    }

    return this.prisma.district.update({
      where: { id },
      data: dto, 
    });
  }

  async remove(id: number) {
    const district = await this.prisma.district.findUnique({ where: { id },
    });

    if (!district) {
      throw new NotFoundException('District la hetan');
    }

    await this.prisma.district.delete({  where: { id },
    });

    return { message: 'District berhasil dihapus' };
  }
}
